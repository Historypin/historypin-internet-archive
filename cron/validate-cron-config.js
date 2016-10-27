'use strict';

/**
 * module dependencies
 */
var config = require( '../app/config/index' );

/**
 * @throws {Error}
 * @returns {undefined}
 */
function validateCronConfig() {
  if ( !( config.cron instanceof Object ) ) {
    throw new Error( 'config.cron does not exist as an Object' );
  }

  if ( !( config.cron.schedules instanceof Object ) ) {
    throw new Error( 'config.cron.schedule does not exist as an Object' );
  }

  if ( typeof config.cron.schedules.addpins !== 'string' ) {
    throw new Error( 'config.cron.schedules.addpins does not exist as a string' );
  }

  if ( typeof config.cron.schedules.metadata_jobs !== 'string' ) {
    throw new Error( 'config.cron.schedules[ metadata-jobs ] does not exist as a string' );
  }

  if ( typeof config.cron.schedules.rotate_queued !== 'string' ) {
    throw new Error( 'config.cron.schedules[ rotate-queued ] does not exist as a string' );
  }

  if ( typeof config.timezone !== 'string' ) {
    throw new Error( 'config.timezone does not exist as a string' );
  }
}

module.exports = validateCronConfig;
