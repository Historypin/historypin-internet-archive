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
 */
function createBatchJob( req, res ) {
  createBatchJobHelper( req )
    .then(
      /**
       * @param {string} result
       */
      function( result ) {
        res.send( result );
      }
    )
    .catch(
      function( err ) {
        console.error( err );
        console.error( err.stack );
        res.status( 500 ).send( err );
      }
    );
}

module.exports = createBatchJob;
