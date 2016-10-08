'use strict';

/**
 * module dependencies
 */
var createProjectBatchJob = require( '../../../helpers/create-project-batch-job' );

/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @param {Function} next
 */
module.exports = function createBatchJobController( req, res, next ) {
  createProjectBatchJob( req, res, next );
};
