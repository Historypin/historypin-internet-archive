'use strict';

/**
 * module dependencies
 */
var getProcessingBatchJob = require( '../../helpers/batch-jobs/get-processing-batch-job' );

/**
 * @param {IncomingMessage} req
 *
 * @param {ServerResponse} res
 * @param {Function} res.send
 *
 * @param {Function} next
 */
function processBatchJob( req, res, next ) {
  getProcessingBatchJob()
    .then(
      /**
       * @param {string} result
       */
      function ( result ) {
        if ( !result ) {
          return 'no jobs to process';
        }

        return result;
      }
    )
    .then(
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

module.exports = processBatchJob;
