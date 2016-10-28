/* eslint no-new: off */

'use strict';

/**
 * module dependencies
 */
var addPinsToProcessingBatchJob = require( '../app/helpers/batch-jobs/add-pins-to-processing-batch-job' );
var config = require( '../app/config/index' );
var CronJob = require( 'cron' ).CronJob;

/**
 * @returns {undefined}
 */
function addPins() {
  addPinsToProcessingBatchJob()
    .then(
      /**
       * @param {{ batch_job: string|null, message: string|null }} result
       * @returns {undefined}
       */
      function ( result ) {
        console.log( new Date().toUTCString(), 'cronjob addPins()', JSON.stringify( result ) );
      }
    )
    .catch(
      /**
       * @param {Error} err
       * @returns {undefined}
       */
      function ( err ) {
        console.log( new Date().toUTCString(), 'cronjob addPins()', err );
      }
    );
}

/**
 * @returns {undefined}
 */
function createAddPinsCronJob() {
  new CronJob(
    config.cron.schedules.addpins,
    addPins,
    null,
    true,
    config.timezone
  );

  console.log(
    new Date().toUTCString(),
    'cronjob addPins() created - %schedule'
      .replace( '%schedule', config.cron.schedules.addpins )
  );
}

module.exports = createAddPinsCronJob;
