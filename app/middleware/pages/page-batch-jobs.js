'use strict';

/**
 * module dependencies
 */
var config = require( '../../config' );
var getDefaultContext = require( '../../contexts/default' );
var getGenericPageContext = require( '../../contexts/pages/generic' );
var getPageContext = require( '../../contexts/pages/batch-jobs' );
var getDirectories = require( '../../helpers/get-directories' );
var getProjectBatchJobs = require( '../../helpers/batch-jobs/get-project-batch-jobs' );
var path = require( 'path' );
var removeKeep = require( '../../helpers/remove-keep' );
var Promise = require( 'bluebird' );

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

  getDirectories( path.join( config.batch_jobs.base_path, 'queued' ) )
    .then(
      /**
       * @param {Array} directories
       */
      function ( directories ) {
        directories = removeKeep( directories );
        return getProjectBatchJobs( directories );
      }
    )
    .then(
      /**
       * @param {Array} promises
       */
      function ( promises ) {
        return Promise.all( promises );
      }
    )
    .then(
      function( batch_jobs ) {
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
