'use strict';

/**
 * module dependencies
 */
var getBatchJobs = require( '../batch-jobs/get-batch-jobs' );
var getDirectoriesFiles = require( '../get-directories-files' );
var loadJsonFile = require( 'load-json-file' );
var path = require( 'path' );

function processMetadataJob() {
  var current_batch_job;

  var promise_result = {
    batch_job: '',
    metadata_job: '',
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
       * @returns {boolean}
       */
      function ( batch_jobs ) {
        if ( !Array.isArray( batch_jobs ) || batch_jobs.length < 1 ) {
          return false;
        }

        current_batch_job = batch_jobs[ 0 ];
        promise_result.batch_job = current_batch_job.directory.name;

        return true;
      }
    )
    .then(
      /**
       * get a list of metadata jobs in the processing state
       *
       * @param {boolean} get_list
       * @returns {boolean|Promise.<{directories: string[], files: string[]}|Error>}
       */
      function ( get_list ) {
        if ( !get_list ) {
          return false;
        }

        return getDirectoriesFiles(
          path.join(
            current_batch_job.directory.path,
            current_batch_job.directory.name,
            'metadata',
            'processing'
          )
        );
      }
    )
    .then(
      /**
       * get the current metadata job name
       *
       * @param {{ directories: string[], files: string[] }} directories_files
       * @returns {boolean|string}
       */
      function ( directories_files ) {
        if ( !directories_files || directories_files.files.length < 1 ) {
          return false;
        }

        promise_result.metadata_job = directories_files.files[ 0 ];

        return directories_files.files[ 0 ];
      }
    )
    .then(
      /**
       * get the metadata job details
       *
       * @param {boolean} metadata_job_name
       * @return {boolean|{}}
       */
      function ( metadata_job_name ) {
        if ( !metadata_job_name ) {
          return false;
        }

        return loadJsonFile.sync(
          path.join(
            current_batch_job.directory.path,
            current_batch_job.directory.name,
            'metadata',
            'processing',
            metadata_job_name
          )
        );
      }
    )
    .then(
      /**
       * upload metadata and media file
       *
       * @param {boolean|{}} metadata_job_details
       */
      function ( metadata_job_details ) {
        if ( !metadata_job_details ) {
          return;
        }
      }
    )
    .then(
      /**
       * @returns {{ batch_job: string, message: string }}
       */
      function () {
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

module.exports = processMetadataJob;
