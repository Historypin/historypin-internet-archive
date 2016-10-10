'use strict';

/**
 * module dependencies
 */
var createBatchJobHelper = require( '../../helpers/batch-jobs/create-batch-job' );

/**
 * @param {IncomingMessage} req
 *
 * @param {ServerResponse} res
 * @param {Function} res.send
 *
 * @param {Function} next
 */
function createBatchJob( req, res, next ) {
  createBatchJobHelper( req )
    .then(
      function( result ) {
        res.send( result );
      }
    )
    .catch(
      function( err ) {
        next( err );
      }
    );
}

module.exports = createBatchJob;
