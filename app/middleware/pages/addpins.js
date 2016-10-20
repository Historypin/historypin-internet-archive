'use strict';

/**
 * module dependencies
 */
var addPinsToProcessingBatchJob = require( '../../helpers/batch-jobs/add-pins-to-processing-batch-job' );

/**
 * @param {IncomingMessage} req
 *
 * @param {ServerResponse} res
 * @param {Function} res.send
 *
 * @param {Function} next
 * @returns {undefined}
 */
function addPinsToProcessingBatchJobPage( req, res, next ) {
  /**
   * @returns
   */
  return addPinsToProcessingBatchJob()
    .then(
      /**
       * @param {{ message: string }|Promise.<batch_job>} result
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

module.exports = addPinsToProcessingBatchJobPage;
