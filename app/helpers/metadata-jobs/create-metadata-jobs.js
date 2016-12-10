/* eslint max-lines:off */

'use strict';

/**
 * module dependencies
 */
var config = require( '../../config' );
var createMetadataJobDirectories = require( './create-metadata-job-directories' );
var difference = require( 'lodash.difference' );
var getBatchJobs = require( '../batch-jobs/get-batch-jobs' );
var getDirectoriesFiles = require( '../get-directories-files' );
var getPinDetails = require( '../api/get-pin-details' );
var getPinDetailsMapped = require( '../pins/get-pin-details-mapped' );
var path = require( 'path' );
var saveMetadataJobs = require( './save-metadata-jobs' );
var separateCopyrightPins = require( '../pins/separate-copyright-pins' );
var writeJsonFile = require( 'write-json-file' );

/**
 * @throws {Error}
 * @returns {Promise.<string|{batch_job: Object, path: string}>}
 */
function createMetadataJobs() {
  var current_batch_job;
  var pin_ids_queued;
  var pin_ids_skipped;
  var pin_ids_to_process;
  var pins_to_process;
  var total_pins_processed = 0;

  var promise_result = {
    batch_job: '',
    message: ''
  };

  /**
   * get a list of batch jobs from the processing state
   *
   * @returns {Promise.<{ batch_job: string, message: string }>}
   */
  return getBatchJobs( 'processing' )
    .then(
      /**
       * set the current_batch_job to the first batch job from the list
       *
       * @param {batch_job[]} batch_jobs
       * @returns {batch_job}
       */
      function ( batch_jobs ) {
        if ( !Array.isArray( batch_jobs ) || batch_jobs.length < 1 ) {
          return;
        }

        current_batch_job = batch_jobs[ 0 ];
      }
    )
    .then(
      /**
       * get a list of metadata jobs in the queued state
       *
       * @returns {Promise.<{directories: string[], files: string[]}|Error>|undefined}
       */
      function () {
        if ( !current_batch_job ) {
          return;
        }

        promise_result.batch_job = current_batch_job.directory.name;

        if ( current_batch_job.pins[ 'all-metadata-jobs-queued' ] ) {
          current_batch_job = null;
          return;
        }

        return getDirectoriesFiles(
          path.join(
            current_batch_job.directory.path,
            current_batch_job.directory.name,
            'metadata',
            'queued'
          )
        );
      }
    )
    .catch(
      /**
       * if the metadata/queued directory doesn't exist, create the metadata directories
       *
       * @param {Error} err
       * @throws {Error}
       * @returns {Promise.<{ directories: string[], files: string[] }>}
       */
      function ( err ) {
        if ( err.code === 'ENOENT' ) {
          /**
           * @returns {Promise.<Promise[]>}
           */
          return createMetadataJobDirectories( current_batch_job )
            .then(
              /**
               * @returns {Promise.<{ directories: string[], files: string[] }>}
               */
              function () {
                return getDirectoriesFiles(
                  path.join(
                    current_batch_job.directory.path,
                    current_batch_job.directory.name,
                    'metadata',
                    'queued'
                  )
                );
              }
            );
        }

        throw err;
      }
    )
    .then(
      /**
       * subtract the list of pin ids in the queued state
       * from the total batch job pins that need to be processed
       *
       * @param {{directories: string[], files: string[]}|undefined} directories_files
       * @returns {Array|undefined}
       */
      function ( directories_files ) {
        var files;

        if ( !directories_files || !Array.isArray( directories_files.files ) ) {
          return;
        }

        // convert queued directory files, 1234.json, to pin ids
        files = directories_files.files.reduce(
          function ( acc, file ) {
            acc.push( parseInt( file, 10 ) );

            return acc;
          },
          []
        );

        // get a diff between the currently queued metadata jobs
        // and those that still need to be created
        pin_ids_to_process = difference( current_batch_job.pins.ids, files );
      }
    )
    .then(
      /**
       * get a list of metadata jobs in the skipped state
       *
       * @returns {Promise.<{directories: string[], files: string[]}|Error>|undefined}
       */
      function () {
        if ( !current_batch_job ) {
          return;
        }

        return getDirectoriesFiles(
          path.join(
            current_batch_job.directory.path,
            current_batch_job.directory.name,
            'metadata',
            'skipped'
          )
        );
      }
    )
    .then(
      /**
       * subtract the list of pin ids in the skipped state
       * from the pin_ids_to_process
       *
       * @param {{directories: string[], files: string[]}|undefined} directories_files
       * @returns {Array|undefined}
       */
      function ( directories_files ) {
        var files;

        if ( !directories_files || !Array.isArray( directories_files.files ) ) {
          return;
        }

        // convert skipped directory files, 1234.json, to pin ids
        files = directories_files.files.reduce(
          function ( acc, file ) {
            acc.push( parseInt( file, 10 ) );

            return acc;
          },
          []
        );

        // get a diff between the currently skipped metadata jobs
        // and those that still need to be created
        pin_ids_to_process = difference( pin_ids_to_process, files );
      }
    )
    .then(
      /**
       * throttle the pin_ids_to_process based on config.metadata_job.creation_throttle
       * @returns {[]|undefined}
       */
      function () {
        if ( !pin_ids_to_process ) {
          return;
        }

        pin_ids_to_process = pin_ids_to_process.slice( 0, config.metadata_job.creation_throttle );
        return pin_ids_to_process;
      }
    )
    .then(
      /**
       * get pin details for each pin id provided
       *
       * @param {[]|undefined} pin_ids
       * @returns {Promise.<pin[]>|undefined}
       */
      function ( pin_ids ) {
        if ( !Array.isArray( pin_ids ) ) {
          return;
        }

        if ( pin_ids.length < 1 ) {
          return;
        }

        return getPinDetails(
          current_batch_job.project,
          pin_ids
        );
      }
    )
    .then(
      /**
       * separate the copyright and public domain pins
       *
       * @param {pin[]|undefined} pin_details
       * @returns {Promise.<{ pins:{ copyright: pin[], public_domain: pin[] } }>|undefined}
       */
      function ( pin_details ) {
        if ( !Array.isArray( pin_details ) ) {
          return;
        }

        if ( pin_details.length < 1 ) {
          return;
        }

        return separateCopyrightPins( pin_details );
      }
    )
    .then(
      /**
       * save copyright pins to skipped state
       *
       * @param {{ copyright: pin[], public_domain: pin[] }|undefined} pins_separated
       * @returns {Promise.<Promise[]>|undefined}
       */
      function ( pins_separated ) {
        if ( !pins_separated || !Array.isArray( pins_separated.copyright ) ) {
          return;
        }

        pins_to_process = pins_separated;
        pin_ids_skipped = pins_to_process.copyright.length;

        return saveMetadataJobs(
          path.join(
            current_batch_job.directory.path,
            current_batch_job.directory.name,
            'metadata',
            'skipped'
          ),
          pins_to_process.copyright
        );
      }
    )
    .then(
      /**
       * map metadata
       *
       * for any pins.public_domain, map the hp metadata to the ia metadata
       * add that mapping result to each metadata job
       *
       * @returns {Promise.<[{ pin:pin, metadata_mapped:{} }]>|undefined}
       */
      function () {
        if ( !pins_to_process || !Array.isArray( pins_to_process.public_domain ) ) {
          return;
        }

        return getPinDetailsMapped( pins_to_process.public_domain );
      }
    )
    .then(
      /**
       * save public domain pins to the queued state
       *
       * @param {Array.<[{ pin:pin, metadata_mapped:{} }]>|undefined} pins_to_queue
       * @returns {Promise.<Promise[]>|undefined}
       */
      function ( pins_to_queue ) {
        if ( !Array.isArray( pins_to_queue ) ) {
          return;
        }

        pin_ids_queued = pins_to_queue.length;

        return saveMetadataJobs(
          path.join(
            current_batch_job.directory.path,
            current_batch_job.directory.name,
            'metadata',
            'queued'
          ),
          pins_to_queue
        );
      }
    )
    .then(
      /**
       * get an update of the queued metadata file directory
       *
       * @param {Promise.<Promise[]>|undefined} result
       * @returns {Promise.<{directories: string[], files: string[]}>|undefined}
       */
      function ( result ) {
        if ( !result ) {
          return;
        }

        return getDirectoriesFiles(
          path.join(
            current_batch_job.directory.path,
            current_batch_job.directory.name,
            'metadata',
            'queued'
          )
        );
      }
    )
    .then(
      /**
       * add the total number of files in the queued directory to the total_pins_processed count
       *
       * @param {{directories: string[], files: string[]}|undefined} directories_files
       * @returns {number}
       */
      function ( directories_files ) {
        if ( !directories_files || !Array.isArray( directories_files.files ) ) {
          return;
        }

        total_pins_processed += directories_files.files.length;

        return total_pins_processed;
      }
    )
    .then(
      /**
       * get an update of the skipped metadata file directory
       *
       * @param {number} total_pins_processed
       * @returns {Promise.<{directories: string[], files: string[]}>|undefined}
       */
      function ( total_pins_processed ) {
        if ( !total_pins_processed ) {
          return;
        }

        return getDirectoriesFiles(
          path.join(
            current_batch_job.directory.path,
            current_batch_job.directory.name,
            'metadata',
            'skipped'
          )
        );
      }
    )
    .then(
      /**
       * add the total number of files in the skipped directory to the total_pins_processed count
       *
       * @param {{directories: string[], files: string[]}|undefined} directories_files
       * @returns {number}
       */
      function ( directories_files ) {
        if ( !directories_files || !Array.isArray( directories_files.files ) ) {
          return;
        }

        total_pins_processed += directories_files.files.length;

        return total_pins_processed;
      }
    )
    .then(
      /**
       * if all metadata jobs have been queued, update the all-metadata-jobs-queued property
       *
       * @param {number} total_pins_processed
       * @returns {undefined}
       */
      function (total_pins_processed) {
        if ( !total_pins_processed ) {
          return;
        }

        if ( total_pins_processed < current_batch_job.pins.count ) {
          return;
        }

        current_batch_job.pins[ 'all-metadata-jobs-queued' ] = true;

        return writeJsonFile(
          path.join(
            current_batch_job.directory.path,
            current_batch_job.directory.name,
            current_batch_job.filename
          ),
          current_batch_job
        );
      }
    )
    .then(
      /**
       * update promise result and return it
       *
       * @returns {{ batch_job: string, message: string }}
       */
      function () {
        if ( pin_ids_queued ) {
          promise_result.message = 'queued %n metadata jobs'.replace( '%n', pin_ids_queued );
        }

        if ( pin_ids_skipped ) {
          if ( promise_result.message ) {
            promise_result.message += ', ';
          }

          promise_result.message += 'skipped %n metadata jobs'.replace( '%n', pin_ids_skipped );
        }

        return promise_result;
      }
    )
    .catch(
      /**
       * @param {Error} err
       * @throws {Error}
       * @returns {undefined}
       */
      function ( err ) {
        throw err;
      }
    );
}

module.exports = createMetadataJobs;
