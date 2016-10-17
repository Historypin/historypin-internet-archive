'use strict';

/**
 * module dependencies
 */
var getProjectPinIds = require( './../api/get-project-pin-ids' );
var saveBatchJob = require( './save-batch-job' );
var path = require( 'path' );

/**
 * retrieves the current processing batch job, adds batch job project pin ids if the current
 * pin ids and project count do not yet match, and then saves the updated batch job
 *
 * does nothing if batch job’s pin ids length and project count are equal
 *
 * @param {batch_job} batch_job
 *
 * @returns {Promise.<string|cached_batch_job>}
 */
function addPinsToProcessingBatchJob( batch_job ) {
  var cached_batch_job = batch_job;

  return getProjectPinIds( batch_job )
    .then(
      /**
       * @param {Array} pin_ids
       * @returns {string|Promise}
       */
      function ( pin_ids ) {
        if ( !Array.isArray( pin_ids ) || pin_ids.length === 0 ) {
          return '';
        }

        // @todo: remove duplicates if they exist
        cached_batch_job.pins.ids = cached_batch_job.pins.ids.concat( pin_ids );

        return saveBatchJob(
          path.join(
            cached_batch_job.directory.path,
            'processing',
            cached_batch_job.directory.name,
            cached_batch_job.filename
          ),
          cached_batch_job
        );
      }
    )
    .then(
      /**
       * @param {Object} result
       * @returns {{ message: string }|batch_job}
       */
      function ( result ) {
        if ( typeof result === 'string' ) {
          return { message: '' };
        }

        return cached_batch_job;
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

module.exports = addPinsToProcessingBatchJob;
