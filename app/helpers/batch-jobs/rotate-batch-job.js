'use strict';

/**
 * module dependencies
 */
var config = require( '../../config/index' );
var getBatchJobDirectories = require( './get-batch-job-directories' );
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
  return getBatchJobDirectories( 'processing' )
    .then(
      /**
       * @param {Object} directories_files
       * @returns {Promise|string}
       */
      function ( directories_files ) {
        if (
          !Array.isArray( directories_files.directories ) ||
          directories_files.directories.length === 0
        ) {
          return getBatchJobDirectories( 'queued' );
        }

        return path.join(
          config.batch_jobs.directory, 'processing', directories_files.directories[ 0 ]
        );
      }
    )
    .then(
      /**
       * @param {string|Object} directories_files
       * @param {Array} directories_files.directories
       *
       * @returns {string|Promise.<string>}
       */
      function ( directories_files ) {
        if ( typeof directories_files === 'string' ) {
          return directories_files;
        }

        if ( directories_files.directories.length < 1 ) {
          return 'no batch jobs to rotate';
        }

        return rename(
          path.join( config.batch_jobs.directory, 'queued', directories_files.directories[ 0 ] ),
          path.join( config.batch_jobs.directory, 'processing', directories_files.directories[ 0 ] )
        );
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
