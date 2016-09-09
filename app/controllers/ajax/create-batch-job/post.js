'use strict';

/**
 * module dependencies
 */
var config = require( '../../../config' );
var mkdir = require( 'mkdir-bluebird' );
var writeFile = require( 'write-file-bluebird' );
var path = require( 'path' );

/**
 * @param {IncomingMessage} req
 * @param {Object} req.body
 * @param {number} req.body.count
 * @param {string} req.body.project
 *
 * @param {ServerResponse} res
 * @param {Function} res.send
 * @param {Function} next
 */
module.exports = function createBatchJob( req, res, next ) {
  var app_data;
  var batch_job;
  var batch_job_file;
  var batch_job_path;
  var timestamp;

  timestamp = Date.now();

  app_data = {
    count: parseInt( req.body.count, 10 ),
    items_in_queue: 0,
    project: encodeURIComponent( req.body.project ),
    status: 'active',
    timestamp: timestamp
  };

  batch_job = app_data.project + '-' + timestamp;
  batch_job_path = path.join( config.batch_jobs.path, batch_job );
  batch_job_file = path.join( batch_job_path, config.batch_jobs.file );

  mkdir( batch_job_path )
    .then(
      function() {
        return writeFile( batch_job_file, JSON.stringify( app_data ) );
      }
    )
    .then(
      function () {
        res.send( {
          created: true,
          'batch-job': batch_job
        } );
      }
    )
    .catch(
      function ( err ) {
        next( err );
      }
    );
};
