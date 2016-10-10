'use strict';

/**
 * module dependencies
 */
var config = require( '../../config/index' );
var mkdir = require( 'mkdir-bluebird' );
var writeFile = require( 'write-file-bluebird' );
var path = require( 'path' );
var Promise = require( 'bluebird' );

/**
 * @param {IncomingMessage} req
 * @param {Object} req.body
 * @param {number} req.body.count
 * @param {string} req.body.project
 *
 * @returns {Promise.<Object, Error>}
 */
function createBatchJob( req ) {
  var app_data;
  var batch_job_file;
  var batch_job_path;
  var date;
  var timestamp;

  timestamp = Date.now();
  date = new Date( timestamp ).toUTCString();

  app_data = {
    count: parseInt( req.body.count, 10 ),
    date: date,
    pins: {
      ids: [],
      page: 0
    },
    project: encodeURIComponent( req.body.project.trim() ),
    timestamp: timestamp
  };

  batch_job_path = path.join(
    config.batch_jobs.directory,
    config.batch_jobs.create_in,
    app_data.project + '-' + timestamp
  );

  batch_job_file = path.join( batch_job_path, config.batch_jobs.file );

  return new Promise(
    function ( resolve, reject ) {
      mkdir( path.join( batch_job_path ) )
        .then(
          function () {
            return mkdir( path.join( batch_job_path, 'media' ) );
          }
        )
        .then(
          function () {
            return mkdir( path.join( batch_job_path, 'metadata' ) );
          }
        )
        .then(
          function () {
            return mkdir( path.join( batch_job_path, 'metadata', 'queued' ) );
          }
        )
        .then(
          function () {
            return mkdir( path.join( batch_job_path, 'metadata', 'errored' ) );
          }
        )
        .then(
          function () {
            return mkdir( path.join( batch_job_path, 'metadata', 'processing' ) );
          }
        )
        .then(
          function () {
            return mkdir( path.join( batch_job_path, 'metadata', 'completed' ) );
          }
        )
        .then(
          function () {
            return mkdir( path.join( batch_job_path, 'media', 'queued' ) );
          }
        )
        .then(
          function () {
            return mkdir( path.join( batch_job_path, 'media', 'errored' ) );
          }
        )
        .then(
          function () {
            return mkdir( path.join( batch_job_path, 'media', 'processing' ) );
          }
        )
        .then(
          function () {
            return mkdir( path.join( batch_job_path, 'media', 'completed' ) );
          }
        )
        .then(
          /**
           * @returns {Promise.<boolean, Error>}
           */
          function () {
            return writeFile( batch_job_file, JSON.stringify( app_data ) );
          }
        )
        .then(
          function () {
            resolve(
              {
                created: true,
                'batch-job': batch_job_file
              }
            );
          }
        )
        .catch(
          function ( err ) {
            reject( err );
          }
        );
    }
  );
}

module.exports = createBatchJob;
