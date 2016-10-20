'use strict';

/**
 * module dependencies
 */
var config = require( '../../config/index' );
var createBatchJobDirectories = require( './create-batch-job-directories' );
var getDirectoriesFiles = require( '../../helpers/get-directories-files' );
var loadJsonFile = require( 'load-json-file' );
var path = require( 'path' );

/**
 * given a batch job state, return all batch job objects in that state
 *
 * @param {string} state
 *
 * @throws {Error}
 * @returns {Promise.<batch_job[]>}
 */
function getBatchJobs( state ) {
  var directory_state = path.join( config.batch_job.directory.path, state );

  /**
   * @returns {Promise.<{ directories: string[], files: string[] }>}
   */
  return getDirectoriesFiles( directory_state )
    .catch(
      /**
       * @param {Error} err
       * @throws {Error}
       * @returns {undefined}
       */
      function ( err ) {
        if ( err.code === 'ENOENT' ) {
          /**
           * @returns {Promise.<Promise[]>}
           */
          return createBatchJobDirectories()
            .then(
              /**
               * @returns {Promise}
               */
              function () {
                return getDirectoriesFiles( directory_state );
              }
            );
        }

        throw err;
      }
    )
    .then(
      /**
       * @param {{ directories: string[], files: string[] }} directories_files
       * @returns {batch_job[]}
       */
      function ( directories_files ) {
        return directories_files.directories.reduce(
          /**
           * @param {Array} acc
           * @param {string} batch_job_directory
           * @returns {[{}]}
           */
          function ( acc, batch_job_directory ) {
            acc.push(
              loadJsonFile.sync(
                path.join( directory_state, batch_job_directory, config.batch_job.filename )
              )
            );

            return acc;
          },
          []
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

module.exports = getBatchJobs;
