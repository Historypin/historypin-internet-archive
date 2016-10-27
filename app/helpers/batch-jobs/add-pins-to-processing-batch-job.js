'use strict';

/**
 * module dependencies
 */
var getBatchJobs = require( '../../helpers/batch-jobs/get-batch-jobs' );
var getProjectPinIds = require( './../api/get-project-pin-ids' );
var path = require( 'path' );
var uniq = require( 'lodash.uniq' );
var writeJsonFile = require( 'write-json-file' );

/**
 * retrieves the current processing batch job, adds batch job project pin ids if the current
 * pin ids and project count do not yet match, and then saves the updated batch job
 *
 * does nothing if batch job’s pin ids length and project count are equal
 *
 * @throws {Error}
 * @returns {Promise.<string|batch_job>}
 */
function addPinsToProcessingBatchJob() {
  var batch_job;

  var promise_result = {
    batch_job: null,
    message: null
  };

  /**
   * @returns {Promise.<batch_job[]>}
   */
  return getBatchJobs( 'processing' )
    .then(
      /**
       * @param {batch_job[]} batch_jobs
       * @returns {undefined|Promise.<[{}]>}
       */
      function ( batch_jobs ) {
        if ( batch_jobs.length < 1 ) {
          promise_result.message = 'no batch jobs to process';
          return;
        }

        batch_job = batch_jobs[ 0 ];
        promise_result.batch_job = batch_job.directory.name;

        if ( batch_job.pins[ 'all-pins-added' ] ) {
          promise_result.message = 'all pins have been added';
          return;
        }

        return getProjectPinIds( batch_job );
      }
    )
    .then(
      /**
       * if no pin_ids are passed in continue
       *
       * if pin_ids are passed in:
       *  - concatenate with current batch_job.pin.ids
       *  - make sure the pins arrayr contains unique values
       *  - mark all-pins-added as true if that’s the case
       *  - save the updated batch job
       *
       * @param {undefined|[{}]} pin_ids
       * @returns {undefined|Promise}
       */
      function ( pin_ids ) {
        if ( !pin_ids ) {
          return;
        }

        if ( pin_ids.length === 0 ) {
          promise_result.message = 'no more pins to add';
          return;
        }

        batch_job.pins.ids = uniq( batch_job.pins.ids.concat( pin_ids ) );

        if ( batch_job.pins.ids.length === batch_job.pins.count ) {
          batch_job.pins[ 'all-pins-added' ] = true;
        }

        promise_result.message =
          'added %n pins to batch job %s'
            .replace( '%n', String( pin_ids.length ) )
            .replace( '%s', batch_job.directory.name );

        return writeJsonFile(
          path.join(
            batch_job.directory.path,
            batch_job.directory.name,
            batch_job.filename
          ),
          batch_job
        );
      }
    )
    .then(
      /**
       * @returns {{ batch_job: string|null, message: string|null }}
       */
      function () {
        return promise_result;
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

module.exports = addPinsToProcessingBatchJob;
