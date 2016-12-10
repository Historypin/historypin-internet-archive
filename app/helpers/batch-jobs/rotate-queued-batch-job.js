'use strict';

/**
 * module dependencies
 */
var config = require( '../../config/index' );
var createBatchJobDirectories = require( './create-batch-job-directories' );
var getDirectoriesFiles = require( '../get-directories-files' );
var loadJsonFile = require( 'load-json-file' );
var path = require( 'path' );
var rename = require( 'rename-bluebird' );
var writeJsonFile = require( 'write-json-file' );

/**
 * rotates batch jobs from queue state to processing state.
 *
 * will not rotate a batch job if one is already in a processing state
 *
 *  - processing directory searched
 *    - batch job exists
 *      - that path is returned
 *    - batch job does not exist
 *      - queued directory is searched
 *        - batch job does not exist
 *          - no rotations string is returned
 *        - batch job exists
 *          - it’s moved to the processing directory and that string is returned
 *
 * @throws {Error}
 * @returns {Promise.<Object>}
 */
function rotateQueuedBatchJob() {
  var current_directory;
  var destination_directory;
  var directory_batch_job_processing = path.join( config.batch_job.directory.path, 'processing' );
  var project_batch_job;

  var promise_result = {
    batch_job: null,
    message: null
  };

  /**
   * get a list of directories in processing state
   *
   * @returns {Promise.<{ directories: string[], files: string[] }>}
   */
  return getDirectoriesFiles( directory_batch_job_processing )
    .catch(
      /**
       * create batch job directories if they don’t exist
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
          return createBatchJobDirectories()
            .then(
              /**
               * @returns {Promise.<{ directories: string[], files: string[] }>}
               */
              function () {
                return getDirectoriesFiles( directory_batch_job_processing );
              }
            );
        }

        throw err;
      }
    )
    .then(
      /**
       * if there is a directory in the processing state
       *   no need to rotate
       * else if there are no batch job directories in the processing state
       *   get a listing of the
       *   directories in the queued state
       *
       * @param {{ directories: string[], files: string[] }} directories_files
       * @returns {Promise.<{ directories: string[], files: string[] }>|undefined}
       */
      function ( directories_files ) {
        if ( directories_files.directories.length > 0 ) {
          return;
        }

        return getDirectoriesFiles( path.join( config.batch_job.directory.path, 'queued' ) );
      }
    )
    .then(
      /**
       * if no batch job directories exist in queued state
       *   nothing to rotate
       * else if batch job directories exist
       *   set the current and destination directories for the
       *   first batch job
       *
       * @param {{ directories: string[], files: string[] }|undefined} directories_files
       * @returns {undefined}
       */
      function ( directories_files ) {
        if ( !directories_files || directories_files.directories.length < 1 ) {
          return;
        }

        current_directory = path.join(
          config.batch_job.directory.path, 'queued', directories_files.directories[ 0 ]
        );

        destination_directory = path.join(
          config.batch_job.directory.path, 'processing', directories_files.directories[ 0 ]
        );
      }
    )
    .then(
      /**
       * if no current_directory has been set
       *   nothing to rotate
       * else
       *   retrieve the current batch job based on the current_directory just set
       *
       * @returns {batch_job|undefined}
       */
      function () {
        if ( !current_directory ) {
          return;
        }

        return loadJsonFile(
          path.join( current_directory, config.batch_job.filename )
        );
      }
    )
    .then(
      /**
       * if no batch job, nothing to rotate
       *
       * if there’s a batch job to rotate, update its directory.path and state.current
       *
       * @param {batch_job|undefined} batch_job
       * @returns {Promise.<undefined>|undefined}
       */
      function ( batch_job ) {
        if ( !batch_job ) {
          return;
        }

        project_batch_job = batch_job;
        promise_result.batch_job = project_batch_job.directory.name;
        batch_job.directory.path = path.join( config.batch_job.directory.path, 'processing' );
        batch_job.state.current = 'processing';

        return writeJsonFile( path.join( current_directory, config.batch_job.filename ), batch_job );
      }
    )
    .then(
      /**
       * if no current_directory
       *   nothing to rotate
       * else
       *   move the current_directory to the destination_directory
       *
       * @returns {undefined|Promise.<string>}
       */
      function () {
        if ( !current_directory ) {
          return;
        }

        return rename(
          path.join( current_directory ),
          path.join( destination_directory )
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
          promise_result.message = 'batch job moved from queued to processing';
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

module.exports = rotateQueuedBatchJob;
