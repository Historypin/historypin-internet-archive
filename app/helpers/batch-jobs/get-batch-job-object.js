'use strict';

/**
 * module dependencies
 */
var getBatchJobPath = require( './get-batch-job-path' );
var loadJsonFile = require( 'load-json-file' );

/**
 * given a batch job state, returns the first batch job object in that state
 *
 * @param {string} state
 * @throws {Error}
 * @returns {Promise.<string|{batch_job: Object, path: string}>}
 */
function getBatchJobObject( state ) {
  var cached_path;

  return getBatchJobPath( state )
    .then(
      /**
       * @param {string} path
       */
      function ( path ) {
        if ( !path ) {
          return '';
        }

        cached_path = path;

        return loadJsonFile( path );
      }
    )
    .then(
      /**
       * @param {Object} batch_job
       * @returns {string|{batch_job: Object, path: string}}
       */
      function ( batch_job ) {
        if ( !batch_job ) {
          return '';
        }

        return {
          batch_job: batch_job,
          path: cached_path
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

module.exports = getBatchJobObject;
