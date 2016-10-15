'use strict';

/**
 * module dependencies
 */
var createPinDetailsJob = require( '../../helpers/pin-details-jobs/create-pin-details-job' );

/**
 * @param {IncomingMessage} req
 *
 * @param {ServerResponse} res
 * @param {Function} res.send
 *
 * @param {Function} next
 * @returns {undefined}
 */
function pinDetailsJob( req, res, next ) {
  createPinDetailsJob()
    .then(
      /**
       * @param {Object} result
       * @returns {undefined}
       */
      function ( result ) {
        res.send( result );
      }
    )
    .catch(
      /**
       * @param {Error} err
       */
      function ( err ) {
        next( err );
      }
    );
}

module.exports = pinDetailsJob;
