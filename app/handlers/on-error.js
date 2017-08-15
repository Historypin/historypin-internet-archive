/* eslint no-process-exit: off, no-invalid-this: off */

'use strict';

/**
 * event listener for HTTP server "error" event
 *
 * @param {Error} error
 *
 * @throws {Error}
 *
 * @returns {undefined}
 */
function onError( error ) {
  var address = this.address();
  var bind;
  var port;

  if ( address && address.port ) {
    port = address.port;
  }

  if ( error.syscall !== 'listen' ) {
    throw error;
  }

  bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch ( error.code ) {
    case 'EACCES':
      console.error( bind + ' requires elevated privileges' );
      process.exit( 1 );
      break;
    case 'EADDRINUSE':
      console.error( bind + ' is already in use' );
      process.exit( 1 );
      break;
    default:
      throw error;
  }
}

module.exports = onError;
