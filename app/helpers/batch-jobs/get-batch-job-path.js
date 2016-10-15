'use strict';

/**
 * module dependencies
 */
var config = require( '../../config/index' );
var getBatchJobDirectories = require( './get-batch-job-directories' );
var path = require( 'path' );

/**
 * given a batch job state, returns the path to the first batch job in that state
 *
 * @param {string} state
 * @throws {Error}
 * @returns {Promise.<string, { directory: string, path: string }>}
 */
function getBatchJobPath( state ) {
  return getBatchJobDirectories( state )
    .then(
      /**
       * @param {Object} directories_files
       * @returns {string}
       */
      function ( directories_files ) {
        if (
          !Array.isArray( directories_files.directories ) ||
          directories_files.directories.length === 0
        ) {
          return '';
        }

        return {
          directory: path.join(
            config.batch_jobs.directory, state, directories_files.directories[ 0 ]
          ),
          path: path.join(
            config.batch_jobs.directory, state, directories_files.directories[ 0 ],
            config.batch_jobs.file
          )
        };
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

module.exports = getBatchJobPath;
