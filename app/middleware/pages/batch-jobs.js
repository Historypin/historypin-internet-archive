'use strict';

/**
 * module dependencies
 */
var getDefaultContext = require( '../../contexts/default' );
var getGenericPageContext = require( '../../contexts/pages/generic' );
var getPageContext = require( '../../contexts/pages/batch-jobs' );
var getBatchJobs = require( '../../helpers/batch-jobs/get-batch-jobs' );
var getBatchJobsMetadataCounts = require( '../../helpers/metadata-jobs/get-batch-jobs-metadata-counts' );

/**
 * @param {IncomingMessage} req
 *
 * @param {ServerResponse} res
 * @param {Function} res.render
 *
 * @param {Function} next
 */
function pageBatchJobs( req, res, next ) {
  var context;

  context = getDefaultContext( req );
  context = getGenericPageContext( req, context );
  context = getPageContext( context );

  /**
   * get batch jobs in the processing directory
   */
  getBatchJobs( 'processing' )
    .then(
      /**
       * @param {batch_job[]} batch_jobs
       * @returns {batch_job[]}
       */
      function ( batch_jobs ) {
        return getBatchJobsMetadataCounts( batch_jobs );
      }
    )
    .then(
      /**
       * @param {batch_job[]} batch_jobs
       * @returns {undefined}
       */
      function ( batch_jobs ) {
        context.batch_jobs = batch_jobs;
        res.render( context.template, context );
      }
    )
    .catch(
      /**
       * {Error} err
       */
      function ( err ) {
        next( err );
      }
    );
}

module.exports = pageBatchJobs;
