'use strict';

/**
 * module dependencies
 */
var config = require( '../../config/index' );
var createBatchJobDirectories = require( './create-batch-job-directories' );
var getDirectoriesFiles = require( '../get-directories-files' );
var path = require( 'path' );
var rename = require( 'rename-bluebird' );

/**
 * rotates batch jobs from queue state to processing state. note: will not rotate a batch job if
 * one is already in a processing state
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
 * @returns {Promise.<string>}
 */
function rotateBatchJob() {
  return getDirectoriesFiles( path.join( config.batch_job.directory.path, 'processing' ) )
    .catch(
      /**
       * @param {Error} err
       * @throws {Error}
       * @returns {Promise.<{ directories:[], files:[] }>}
       */
      function ( err ) {
        if ( err.code === 'ENOENT' ) {
          return createBatchJobDirectories()
            .then(
              /**
               * @returns {Promise}
               */
              function () {
                return getDirectoriesFiles(
                  path.join( config.batch_job.directory.path, 'processing' )
                );
              }
            );
        }

        throw err;
      }
    )
    .then(
      /**
       * @param {{ directories:[], files:[] }} directories_files
       * @returns {Promise.<{ directories:[], files:[] }>|string}
       */
      function ( directories_files ) {
        if ( directories_files.directories.length === 0 ) {
          return getDirectoriesFiles( path.join( config.batch_job.directory.path, 'queued' ) );
        }

        return path.join(
          config.batch_job.directory.path, 'processing', directories_files.directories[ 0 ]
        );
      }
    )
    .then(
      /**
       * @param {string|{ directories:[], files:[] }} directories_files
       * @returns {string|Promise.<string>}
       */
      function ( directories_files ) {
        if ( typeof directories_files === 'string' ) {
          return directories_files;
        }

        if ( directories_files.directories.length < 1 ) {
          return {
            message: 'no batch jobs to rotate'
          };
        }

        // @todo: change batch_job.directory.path
        // @todo: change state in batch_job or remove current state from it and just rely on directory?

        return rename(
          path.join( config.batch_job.directory.path, 'queued', directories_files.directories[ 0 ] ),
          path.join( config.batch_job.directory.path, 'processing', directories_files.directories[ 0 ] )
        );
      }
    )
    .then(
      /**
       * @param {string} result
       * @returns {string}
       */
      function ( result ) {
        return { processing: result };
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

module.exports = rotateBatchJob;
