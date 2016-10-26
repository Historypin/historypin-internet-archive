/* eslint no-invalid-this: off */

'use strict';

/**
 * event listener for HTTP server "listening" event
 *
 * @returns {undefined}
 */
function onListening() {
  if ( this.key && this.cert ) {
    console.log( 'listening on https:', this.address() );

    return;
  }

  console.log( 'listening on http:', this.address() );
}

module.exports = onListening;
