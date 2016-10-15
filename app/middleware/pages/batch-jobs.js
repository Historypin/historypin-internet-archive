'use strict';

/**
 * module dependencies
 */
var config = require( '../../config' );
var getDefaultContext = require( '../../contexts/default' );
var getGenericPageContext = require( '../../contexts/pages/generic' );
var getPageContext = require( '../../contexts/pages/batch-jobs' );
var getDirectoriesFiles = require( '../../helpers/get-directories-files' );
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

  getDirectoriesFiles( path.join( config.batch_jobs.directory, state ) )
    .then(
      /**
       * @param {Object} directories_files
       */
      function ( directories_files ) {
        return getBatchJobs( directories_files.directories, state );
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
      /**
       * @param {Object} batch_jobs
       * @returns {undefined}
       */
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
