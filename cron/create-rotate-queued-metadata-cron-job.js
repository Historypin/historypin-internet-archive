/* eslint no-new: off */

'use strict';

/**
 * module dependencies
 */
var config = require( '../app/config/index' );
var CronJob = require( 'cron' ).CronJob;
var rotateQueuedMetadataJob = require( '../app/helpers/metadata-jobs/rotate-queued-metadata-job' );

/**
 * @returns {undefined}
 */
function rotateQueuedMetadata() {
  rotateQueuedMetadataJob()
    .then(
      /**
       * @param {{ batch_job: string|null, message: string|null }} result
       * @returns {undefined}
       */
      function ( result ) {
        if ( !result.message ) {
          return;
        }

        console.log( new Date().toUTCString(), 'cronjob rotateQueuedMetadata()', JSON.stringify( result ) );
      }
    )
    .catch(
      /**
       * @param {Error} err
       * @returns {undefined}
       */
      function ( err ) {
        console.log( new Date().toUTCString(), 'cronjob rotateQueuedMetadata()', err );
        throw err;
      }
    );
}

/**
 * @returns {undefined}
 */
function createRotateQueuedMetadataJob() {
  new CronJob(
    config.cron.schedules.rotate_queued_metadata,
    rotateQueuedMetadata,
    null,
    true,
    config.timezone
  );

  console.log(
    new Date().toUTCString(),
    'cronjob rotateQueuedMetadata() created - %schedule'
      .replace( '%schedule', config.cron.schedules.rotate_queued_metadata )
  );
}

module.exports = createRotateQueuedMetadataJob;
