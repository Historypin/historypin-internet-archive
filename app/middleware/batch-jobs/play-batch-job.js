'use strict';

/**
 * module dependencies
 */

/**
 * @param {IncomingMessage} req
 *
 * @param {ServerResponse} res
 * @param {Function} res.send
 */
function playBatchJob( req, res ) {
  setTimeout(
    function() {
      res.send( { message: 'developing play batch job ...', status: 'success' } );
    },
    3000
  );
}

module.exports = playBatchJob;
