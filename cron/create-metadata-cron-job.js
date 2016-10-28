/* eslint no-new: off */

'use strict';

/**
 * module dependencies
 */
var config = require( '../app/config/index' );
var createMetadataJobs = require( '../app/helpers/metadata-jobs/create-metadata-jobs' );
var CronJob = require( 'cron' ).CronJob;

/**
 * @returns {undefined}
 */
function metadata() {
  createMetadataJobs()
    .then(
      /**
       * @param {{ batch_job: string|null, message: string|null }} result
       * @returns {undefined}
       */
      function ( result ) {
        console.log( new Date().toUTCString(), 'cronjob metadata()', JSON.stringify( result ) );
      }
    )
    .catch(
      /**
       * @param {Error} err
       * @returns {undefined}
       */
      function ( err ) {
        console.log( new Date().toUTCString(), 'cronjob metadata()', err );
      }
    );
}

/**
 * @returns {undefined}
 */
function createMetadataCronJob() {
  new CronJob(
    config.cron.schedules.metadata_jobs,
    metadata,
    null,
    true,
    config.timezone
  );

  console.log(
    new Date().toUTCString(),
    'cronjob metadata() created - %schedule'
      .replace( '%schedule', config.cron.schedules.metadata_jobs )
  );
}

module.exports = createMetadataCronJob;
