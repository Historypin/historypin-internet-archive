'use strict';

/**
 * normalize a port into a number, string, or false
 *
 * @param {number} val
 * @return {*}
 */
function normalizePort( val ) {
  var port = parseInt( val, 10 );

  if ( isNaN( port ) ) {
    // named pipe
    return val;
  }

  if ( port >= 0 ) {
    // port number
    return port;
  }

  return false;
}

module.exports = normalizePort;
