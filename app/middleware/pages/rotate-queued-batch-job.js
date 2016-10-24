'use strict';

/**
 * module dependenceis
 */
var rotateBatchJob = require( '../../helpers/batch-jobs/rotate-queued-batch-job' );

/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @param {Function} next
 */
function rotateBatchJobPage( req, res, next ) {
  rotateBatchJob()
    .then(
      /**
       * @param {string} result absolute path to current processing batch job
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

module.exports = rotateBatchJobPage;
