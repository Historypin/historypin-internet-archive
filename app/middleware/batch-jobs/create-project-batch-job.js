'use strict';

/**
 * module dependencies
 */
var createProjectBatchJobHelper = require( '../../helpers/create-project-batch-job' );

/**
 * @param {IncomingMessage} req
 *
 * @param {ServerResponse} res
 * @param {Function} res.send
 *
 * @param {Function} next
 */
function createProjectBatchJob( req, res, next ) {
  var result;

  result = createProjectBatchJobHelper( req );

  if ( result instanceof Error ) {
    next( err );
    return;
  }

  res.send( result );
}

module.exports = createProjectBatchJob;
