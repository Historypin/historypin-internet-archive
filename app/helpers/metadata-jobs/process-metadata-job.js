'use strict';

/**
 * module dependencies
 */
var getBatchJobs = require( '../batch-jobs/get-batch-jobs' );
var getDirectoriesFiles = require( '../get-directories-files' );
var path = require( 'path' );

function processMetadataJob() {
  var current_batch_job;
  var directory_metadata_queued;

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

        directory_metadata_queued = path.join(
          current_batch_job.directory.path, current_batch_job.directory.name, 'metadata', 'queued'
        );

        return getDirectoriesFiles( directory_metadata_queued );
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
