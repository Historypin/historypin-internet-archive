/* eslint no-invalid-this: off */

'use strict';

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
}

module.exports = onListening;
