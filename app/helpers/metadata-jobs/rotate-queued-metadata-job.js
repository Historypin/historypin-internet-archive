'use strict';

/**
 * module dependencies
 */
var getBatchJobs = require( '../batch-jobs/get-batch-jobs' );
var getDirectoriesFiles = require( '../get-directories-files' );
var path = require( 'path' );
var rename = require( 'rename-bluebird' );

/**
 * rotates metadata jobs from queue state to processing state.
 *
 * will not rotate a metadata job if one is already in a processing state
 *
 *  - processing directory searched
 *    - metadata job exists
 *      - that path is returned
 *    - metadata job does not exist
 *      - queued directory is searched
 *        - metadata job does not exist
 *          - no rotations string is returned
 *        - metadata job exists
 *          - it’s moved to the processing directory and that string is returned
 *
 * @throws {Error}
 * @returns {Promise.<Object>}
 */
function rotateQueuedMetadataJob() {
  var current_batch_job;
  var current_directory;
  var destination_directory;

  var promise_result = {
    batch_job: '',
    message: '',
    metadata_job: ''
  };

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
       * get a list of metadata jobs in the processing state
       *
       * @returns {Promise.<{directories: string[], files: string[]}|Error>|undefined}
       */
      function () {
        if ( !current_batch_job ) {
          return;
        }

        promise_result.batch_job = current_batch_job.directory.name;

        if ( !current_batch_job.pins[ 'all-metadata-jobs-queued' ] ) {
          return;
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
       * if there are metadata jobs in the processing state
       *   no need to rotate
       * else
       *   get a list of the metadata jobs in the queued state
       *
       * @param {{ directories: string[], files: string[] }} directories_files
       * @returns {Promise.<{ directories: string[], files: string[] }>|undefined}
       */
      function ( directories_files ) {
        if ( !directories_files || directories_files.files.length > 0 ) {
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
       * if no metadata jobs exist in the queued state
       *   nothing to rotate
       * else if metadata jobs directories exist in the queued state
       *   set the current and destination directories
       *   using the first metadata job
       *
       * @param {{ directories: string[], files: string[] }|undefined} directories_files
       * @returns {undefined}
       */
      function ( directories_files ) {
        if ( !directories_files || directories_files.files.length < 1 ) {
          return;
        }

        promise_result.metadata_job = directories_files.files[ 0 ];

        current_directory = path.join(
          current_batch_job.directory.path,
          current_batch_job.directory.name,
          'metadata',
          'queued',
          directories_files.files[ 0 ]
        );

        destination_directory = path.join(
          current_batch_job.directory.path,
          current_batch_job.directory.name,
          'metadata',
          'processing',
          directories_files.files[ 0 ]
        );
      }
    )
    .then(
      /**
       * if no current_directory has been set
       *   nothing to rotate
       * else
       *   move the metadata job from the current_directory to the destination_directory
       *
       * @returns {undefined|Promise.<string>}
       */
      function () {
        if ( !current_directory ) {
          return;
        }

        // @todo: may be better to use npm mv
        return rename(
          current_directory,
          destination_directory
        );
      }
    )
    .then(
      /**
       * @param {undefined|string} result
       * @returns {{ batch_job: string|null, message: string|null }}
       */
      function ( result ) {
        if ( result ) {
          promise_result.message = 'metadata job moved from queued to processing';
        }

        return promise_result;
      }
    )
    .catch(
      /**
       * @param {Error} err
       * @throws {Error}
       */
      function ( err ) {
        throw err;
      }
    );
}

module.exports = rotateQueuedMetadataJob;
