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
var getPinDetailsMapped = require( './../pin-details-jobs/get-pin-details-mapped' );
var path = require( 'path' );
var saveMetadataJobs = require( './save-metadata-jobs' );
var writeJsonFile = require( 'write-json-file' );

/**
 * @throws {Error}
 * @returns {Promise.<string|{batch_job: Object, path: string}>}
 */
function createMetadataJobs() {
  var project_batch_job;

  /**
   * get the current project batch job in the processing directory
   *
   * @returns {Promise.<Object>}
   */
  return getBatchJobs( 'processing' )
    .then(
      /**
       * get a list of the currently queued metadata batch jobs
       *
       * @param {Object} batch_job
       * @param {Object} batch_job.location
       * @param {string} batch_job.location.directory
       *
       * @returns {Promise.<{directories: Array, files: Array}|Error>}
       */
      function ( batch_job ) {
        if ( !batch_job || batch_job.length < 1 ) {
          return [];
        }

        project_batch_job = batch_job[ 0 ];

        if ( project_batch_job.pins[ 'all-metadata-jobs-queued' ] ) {
          return { message: 'all metadata jobs have been queued' };
        }

        return getDirectoriesFiles(
          path.join( project_batch_job.directory.path, 'metadata', 'queued' )
        );
      }
    )
    .catch(
      /**
       * @param {Error} err
       * @throws {Error}
       * @returns {Promise.<{ directories:[], files:[] }>}
       */
      function ( err ) {
        if ( err.code === 'ENOENT' ) {
          return createMetadataJobDirectories( project_batch_job )
            .then(
              /**
               * @returns {Promise}
               */
              function () {
                return getDirectoriesFiles(
                  path.join(
                    project_batch_job.directory.path,
                    project_batch_job.directory.name,
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
       * create an array of metadata jobs not yet queued for processing
       * throttle the list based on a config value
       *
       * @param {Object} directories_files
       * @returns {Array}
       */
      function ( directories_files ) {
        var files;
        var pin_ids;

        if ( !Array.isArray( directories_files.files ) ) {
          return directories_files;
        }

        if ( directories_files.files.length === project_batch_job.count ) {
          project_batch_job.pins[ 'all-pins-queued' ] = true;
        }

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
        return pin_ids.slice( 0, config.metadata_job.creation_throttle );
      }
    )
    .then(
      /**
       * get pin details for each pin id provided
       * add that detail to each metadata job
       *
       * @param {Array} pin_ids
       * @returns {Promise.<[{ pin:{} }]>}
       */
      function ( pin_ids ) {
        if ( !Array.isArray( pin_ids ) ) {
          return pin_ids;
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
       * @param {Array.<[{ pin:{} }]>} metadata_jobs
       * @returns {Promise.<[{ pin:{}, metadata_mapped:{} }]>}
       */
      function ( metadata_jobs ) {
        if ( !Array.isArray( metadata_jobs ) ) {
          return metadata_jobs;
        }

        return getPinDetailsMapped( metadata_jobs );
      }
    )
    .then(
      /**
       * save the metadata jobs
       *
       * @param {Array.<[{ pin:{}, metadata_mapped:{} }]>} metadata_jobs
       * @returns {Promise.<[{ pin:{}, metadata_mapped:{} }]>}
       */
      function ( metadata_jobs ) {
        if ( !Array.isArray( metadata_jobs ) ) {
          return metadata_jobs;
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
       * @param {string} result
       * @returns {string}
       */
      function ( result ) {
        if ( result ) {
          return result;
        }

        return writeJsonFile(
          path.join(
            project_batch_job.directory.path,
            project_batch_job.directory.name,
            project_batch_job.filename
          ),
          project_batch_job
        );
      }
    )
    .then(
      /**
       * @param {string} result
       * @returns {string}
       */
      function ( result ) {
        return { message: 'added %n metadata jobs'.replace( '%n', config.metadata_job.creation_throttle ) };
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
