'use strict';

/**
 * module dependencies
 */
var config = require( '../../../config' );
var createFile = require( 'node-create-file' );
var path = require( 'path' );

/**
 * @param {IncomingMessage} req
 * @param {Object} req.body
 * @param {string} req.body.app_data
 *
 * @param {ServerResponse} res
 * @param {Function} res.send
 * @param {Function} next
 */
module.exports = function getIndex( req, res, next ) {
  var app_data;
  var file_path_name;

  app_data = JSON.parse( req.body.app_data );
  file_path_name = path.join( config.batch_jobs.projects, app_data.project + '_' + Date.now() + '_' + app_data.count + '.json' );

  createFile( file_path_name, req.body.app_data )
    .then(
      function() {
        res.send( { 'batch-job-created': true } );
      }
    ).catch(
      function( err ) {
        next( err );
      }
    );
};
