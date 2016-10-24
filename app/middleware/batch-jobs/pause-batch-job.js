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
function pauseBatchJob( req, res ) {
  setTimeout(
    function() {
      res.send( { message: 'developing pause batch job ...', status: 'success' } );
    },
    2000
  );
}

module.exports = pauseBatchJob;
