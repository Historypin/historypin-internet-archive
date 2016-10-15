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
 * @returns {Promise.<string|{batch_job: Object, location: Object}>}
 */
function getBatchJobObject( state ) {
  var cached_location;

  return getBatchJobPath( state )
    .then(
      /**
       * @param {string|Object} location
       * @param {string} location.path
       *
       * @returns {string|Object}
       */
      function ( location ) {
        if ( !location ) {
          return '';
        }

        cached_location = location;

        return loadJsonFile( location.path );
      }
    )
    .then(
      /**
       * @param {Object} batch_job
       * @returns {string|{batch_job: Object, location: Object}}
       */
      function ( batch_job ) {
        if ( !batch_job ) {
          return '';
        }

        return {
          batch_job: batch_job,
          location: cached_location
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
