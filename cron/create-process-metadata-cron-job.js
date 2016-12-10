/* eslint no-new: off */

'use strict';

/**
 * module dependencies
 */
var config = require( '../app/config/index' );
var CronJob = require( 'cron' ).CronJob;
var processMetadataJob = require( '../app/helpers/metadata-jobs/process-metadata-job' );

/**
 * @returns {undefined}
 */
function processMetadata() {
  processMetadataJob()
    .then(
      /**
       * @param {{ batch_job: string|null, message: string|null }} result
       * @returns {undefined}
       */
      function ( result ) {
        if ( !result.message ) {
          return;
        }

        console.log( new Date().toUTCString(), 'cronjob processMetadata()', JSON.stringify( result ) );
      }
    )
    .catch(
      /**
       * @param {Error} err
       * @returns {undefined}
       */
      function ( err ) {
        console.log( new Date().toUTCString(), 'cronjob processMetadata()', err );
        throw err;
      }
    );
}

/**
 * @returns {undefined}
 */
function createProcessMetadataCronJob() {
  new CronJob(
    config.cron.schedules.process_metadata,
    processMetadata,
    null,
    true,
    config.timezone
  );

  console.log(
    new Date().toUTCString(),
    'cronjob processMetadata() created - %schedule'
      .replace( '%schedule', config.cron.schedules.process_metadata )
  );
}

module.exports = createProcessMetadataCronJob;
