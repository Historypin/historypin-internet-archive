'use strict';

/**
 * module dependencies
 */
var createProjectBatchJobHelper = require( '../../helpers/batch-jobs/create-project-batch-job' );

/**
 * @param {IncomingMessage} req
 *
 * @param {ServerResponse} res
 * @param {Function} res.send
 *
 * @param {Function} next
 */
function createProjectBatchJob( req, res, next ) {
  createProjectBatchJobHelper( req )
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

module.exports = createProjectBatchJob;
