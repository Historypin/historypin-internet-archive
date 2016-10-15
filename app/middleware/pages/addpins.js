'use strict';

/**
 * module dependencies
 */
var addPinsToBatchJob = require( '../../helpers/batch-jobs/add-pins-to-batch-job' );

/**
 * @param {IncomingMessage} req
 *
 * @param {ServerResponse} res
 * @param {Function} res.send
 *
 * @param {Function} next
 * @returns {undefined}
 */
function addPinsToBatchJobPage( req, res, next ) {
  addPinsToBatchJob()
    .then(
      /**
       * @param {string|cached_result} result
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

module.exports = addPinsToBatchJobPage;
