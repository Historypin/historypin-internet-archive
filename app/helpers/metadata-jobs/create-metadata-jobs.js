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
var writeJsonFile = require( 'write-json-file' );

/**
 * @throws {Error}
 * @returns {Promise.<string|{batch_job: Object, path: string}>}
 */
function createMetadataJobs() {
  var directory_metadata_queued;
  var pin_ids_added;
  var project_batch_job;
  var promise_result;

  /**
   * get the current project batch job in the processing directory
   *
   * @returns {Promise.<{ message: string }|batch_job>}
   */
  return getBatchJobs( 'processing' )
    .then(
      /**
       * get a list of the currently queued metadata batch jobs
       *
       * @param {batch_job} batch_job
       *
       * @returns {Promise.<{directories: string[], files: string[]}>|undefined}
       */
      function ( batch_job ) {
        if ( !Array.isArray( batch_job ) || batch_job.length < 1 ) {
          promise_result = { message: 'no batch jobs to process' };
          return;
        }

        project_batch_job = batch_job[ 0 ];

        if ( project_batch_job.pins[ 'all-metadata-jobs-queued' ] ) {
          promise_result = { message: 'all metadata jobs have been queued' };
          return;
        }

        directory_metadata_queued = path.join(
          project_batch_job.directory.path, project_batch_job.directory.name, 'metadata', 'queued'
        );

        return getDirectoriesFiles( directory_metadata_queued );
      }
    )
    .catch(
      /**
       * @param {Error} err
       * @throws {Error}
       * @returns {Promise.<{ directories: string[], files: string[] }>}
       */
      function ( err ) {
        if ( err.code === 'ENOENT' ) {
          /**
           * @returns {Promise.<Promise[]>}
           */
          return createMetadataJobDirectories( project_batch_job )
            .then(
              /**
               * @returns {Promise.<{ directories: string[], files: string[] }>}
               */
              function () {
                return getDirectoriesFiles( directory_metadata_queued );
              }
            );
        }

        throw err;
      }
    )
    .then(
      /**
       * create an array of metadata jobs not yet queued for processing
       * throttle the list based on config.metadata_job.creation_throttle
       *
       * @param {Object|undefined} directories_files
       * @param {Array} directories_files.files
       *
       * @returns {Array|undefined}
       */
      function ( directories_files ) {
        var files;

        /**
         * @type {Array}
         */
        var pin_ids;

        if ( !directories_files || !Array.isArray( directories_files.files ) ) {
          return;
        }

        // convert directory files, 1234.json, to pin ids
        files = directories_files.files.reduce(
          function ( acc, file ) {
            acc.push( parseInt( file, 10 ) );

            return acc;
          },
          []
        );

        // get a diff between the currently queued metadata jobs
        // and those that still need to be created
        pin_ids = difference( project_batch_job.pins.ids, files );

        // throttle the diff
        pin_ids = pin_ids.slice( 0, config.metadata_job.creation_throttle );
        pin_ids_added = pin_ids.length;

        return pin_ids;
      }
    )
    .then(
      /**
       * get pin details for each pin id provided
       * add that detail to each metadata job
       *
       * @param {Array|undefined} pin_ids
       * @returns {Promise.<[{ pin:{} }]>|undefined}
       */
      function ( pin_ids ) {
        if ( !Array.isArray( pin_ids ) ) {
          return;
        }

        if ( pin_ids.length < 1 ) {
          promise_result = { message: 'no pin ids to process' };
          return;
        }

        return getPinDetails(
          project_batch_job.project,
          pin_ids
        );
      }
    )
    .then(
      /**
       * map the hp metadata to the ia metadata
       * add that mapping result to each metadata job
       *
       * @param {Array.<[{ pin:{} }]>|undefined} metadata_jobs
       * @returns {Promise.<[{ pin:{}, metadata_mapped:{} }]>|undefined}
       */
      function ( metadata_jobs ) {
        if ( !Array.isArray( metadata_jobs ) ) {
          return;
        }

        return getPinDetailsMapped( metadata_jobs );
      }
    )
    .then(
      /**
       * save the metadata jobs
       *
       * @param {Array.<[{ pin:{}, metadata_mapped:{} }]>|undefined} metadata_jobs
       * @returns {Promise.<Promise[]>|undefined}
       */
      function ( metadata_jobs ) {
        if ( !Array.isArray( metadata_jobs ) ) {
          return;
        }

        return saveMetadataJobs(
          path.join(
            project_batch_job.directory.path,
            project_batch_job.directory.name,
            'metadata',
            'queued'
          ),
          metadata_jobs
        );
      }
    )
    .then(
      /**
       * get an update of the queued metadata file names
       *
       * @param {Promise.<Promise[]>|undefined} result
       * @returns {Promise.<{directories: string[], files: string[]}>|undefined}
       */
      function ( result ) {
        if ( !result ) {
          return;
        }

        return getDirectoriesFiles( directory_metadata_queued );
      }
    )
    .then(
      /**
       * if all metadata jobs have been queued, update the batch-job.json
       *
       * @param {Promise.<{directories: string[], files: string[]}>|undefined} directories_files
       * @param {Array} directories_files.files
       * @returns {undefined}
       */
      function ( directories_files ) {
        if ( !directories_files ) {
          return;
        }

        if ( directories_files.files.length >= project_batch_job.pins.count ) {
          project_batch_job.pins[ 'all-metadata-jobs-queued' ] = true;

          return writeJsonFile(
            path.join(
              project_batch_job.directory.path,
              project_batch_job.directory.name,
              project_batch_job.filename
            ),
            project_batch_job
          );
        }
      }
    )
    .then(
      /**
       * @returns {{ message: string }}
       */
      function () {
        if ( pin_ids_added ) {
          promise_result = { message: 'added %n metadata jobs'.replace( '%n', pin_ids_added ) };
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
