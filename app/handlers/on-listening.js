/* eslint no-invalid-this: off */

'use strict';

/**
 * module dependencies
 */
var cron = require( '../../cron' );

/**
 * event listener for HTTP server "listening" event
 *
 * @returns {undefined}
 */
function onListening() {
  var protocol = 'http';

  if ( this.key && this.cert ) {
    protocol = 'https';
  }

  console.log( new Date().toUTCString(), 'listening on ' + protocol, this.address() );
  cron();
}

module.exports = onListening;
