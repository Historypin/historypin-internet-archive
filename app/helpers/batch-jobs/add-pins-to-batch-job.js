'use strict';

/**
 * module dependencies
 */
var getBatchJobObject = require( './get-batch-job-object' );
var getProjectPinIds = require( './../api/get-project-pin-ids' );
var saveBatchJob = require( './save-batch-job' );

/**
 * retrieves the current processing batch job, adds batch job project pin ids if the current
 * pin ids and project count do not yet match, and then saves the updated batch job
 *
 * does nothing if batch job’s pin ids length and project count are equal
 *
 * @returns {Promise.<string|cached_result>}
 */
function addPinsToBatchJob() {
  /**
   * @typedef {Object}
   * @property {Object} batch_job
   * @property {string} path
   * @property {Array} pin_ids
   */
  var cached_result;

  return getBatchJobObject( 'processing' )
    .then(
      /**
       * @param {Object|string} result
       * @param {Object} result.batch_job
       * @param {string} result.path
       *
       * @returns {string|Promise}
       */
      function ( result ) {
        if ( !result ) {
          return '';
        }

        if ( result.batch_job.pins.ids.length === result.batch_job.count ) {
          return '';
        }

        cached_result = result;

        return getProjectPinIds( result.batch_job );
      }
    )
    .then(
      /**
       * @param {Array} pin_ids
       * @returns {string|Promise}
       */
      function ( pin_ids ) {
        if ( !Array.isArray( pin_ids ) || pin_ids.length === 0 ) {
          return '';
        }

        cached_result.pin_ids = pin_ids;
        cached_result.batch_job.pins.ids = cached_result.batch_job.pins.ids.concat( pin_ids );

        return saveBatchJob( cached_result.path, cached_result.batch_job );
      }
    )
    .then(
      /**
       * @param {Object} result
       * @returns {string|cached_result}
       */
      function ( result ) {
        if ( typeof result === 'string' ) {
          return result;
        }

        return cached_result;
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

module.exports = addPinsToBatchJob;
