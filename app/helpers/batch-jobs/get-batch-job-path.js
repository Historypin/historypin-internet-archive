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
 * @returns {Promise.<string>}
 */
function getBatchJobPath( state ) {
  return getBatchJobDirectories( state )
    .then(
      /**
       * @param {Array} directories
       * @returns {string}
       */
      function ( directories ) {
        if ( !Array.isArray( directories ) || directories.length === 0 ) {
          return '';
        }

        return path.join(
          config.batch_jobs.directory, state, directories[ 0 ], config.batch_jobs.file
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

module.exports = getBatchJobPath;
