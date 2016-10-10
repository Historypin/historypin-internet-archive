'use strict';

/**
 * module dependencies
 */
var config = require( '../../config' );
var getDefaultContext = require( '../../contexts/default' );
var getGenericPageContext = require( '../../contexts/pages/generic' );
var getPageContext = require( '../../contexts/pages/batch-jobs' );
var getDirectories = require( '../../helpers/get-directories' );
var getBatchJobs = require( '../../helpers/batch-jobs/get-batch-jobs' );
var path = require( 'path' );
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
  var state = 'processing';

  context = getDefaultContext( req );
  context = getGenericPageContext( req, context );
  context = getPageContext( context );

  getDirectories( path.join( config.batch_jobs.directory, state ) )
    .then(
      /**
       * @param {Array} directory_names
       */
      function ( directory_names ) {
        return getBatchJobs( directory_names, state );
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
