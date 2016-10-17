'use strict';

/**
 * module dependencies
 */
var addPinsToProcessingBatchJob = require( '../../helpers/batch-jobs/add-pins-to-processing-batch-job' );
var getBatchJobs = require( '../../helpers/batch-jobs/get-batch-jobs' );

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
  getBatchJobs( 'processing' )
    .then(
      /**
       * @param {[{}]} result
       * @returns {{ message: string }|Promise.<{}>}
       */
      function ( result ) {
        var batch_job;

        if ( result.length < 1 ) {
          return { message: 'no processing batch job' };
        }

        batch_job = result[ 0 ];

        if ( batch_job.pins.ids.length === batch_job.pins.count ) {
          // @todo: mark batch_job.pins that all pins have been added?
          return { message: 'all pins have been added' };
        }

        return addPinsToProcessingBatchJob( batch_job );
      }
    )
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
