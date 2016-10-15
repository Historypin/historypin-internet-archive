'use strict';

/**
 * module dependencies
 */
var config = require( '../../config' );
var difference = require( 'lodash.difference' );
var getBatchJobObject = require( '../batch-jobs/get-batch-job-object' );
var getDirectoriesFiles = require( '../get-directories-files' );
var getPinDetails = require( '../api/get-pin-details' );
var getPinDetailsMapped = require( './../pin-details-jobs/get-pin-details-mapped' );
var path = require( 'path' );
var saveBatchJob = require( '../batch-jobs/save-batch-job' );
var saveMetadataJobs = require( './save-metadata-jobs' );

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
  return getBatchJobObject( 'processing' )
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
        project_batch_job = batch_job;

        return getDirectoriesFiles(
          path.join( project_batch_job.location.directory, 'metadata', 'queued' )
        );
      }
    )
    .then(
      /**
       * create an array of metadata jobs not yet queued for processing
       * throttle the list based on a config value
       * or return [] because project.batch_job.pins[ 'all-pins-queued' ] = true
       *
       * @param {Object} directories_files
       * @returns {Array}
       */
      function ( directories_files ) {
        var files;
        var pin_ids;

        if ( project_batch_job.batch_job.pins[ 'all-pins-queued' ] ) {
          return [];
        }

        if ( directories_files.files.length === project_batch_job.count ) {
          project_batch_job.batch_job.pins[ 'all-pins-queued' ] = true;

          return saveBatchJob( project_batch_job.location.path, project_batch_job.batch_job, [] );
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
        pin_ids = difference( project_batch_job.batch_job.pins.ids, files );

        // throttle the diff
        return pin_ids.slice( 0, config.metadata_jobs.job_creation_throttle );
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
        return getPinDetails(
          project_batch_job.batch_job.project,
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
        return saveMetadataJobs(
          path.join( project_batch_job.location.directory, 'metadata', 'queued' ),
          metadata_jobs
        );
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
