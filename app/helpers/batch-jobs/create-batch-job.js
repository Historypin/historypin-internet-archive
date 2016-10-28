'use strict';

/**
 * module dependencies
 */
var config = require( '../../config/index' );
var createBatchJobDirectories = require( './create-batch-job-directories' );
var mkdirp = require( 'mkdir-p-bluebird' );
var writeFile = require( 'write-file-bluebird' );
var path = require( 'path' );
var Promise = require( 'bluebird' );

/**
 * @param {IncomingMessage} req
 * @param {Object} req.body
 *
 * @returns {Object}
 */
function setupBatchJob( req ) {
  var batch_job = require( '../../models/batch-job' );
  var project = encodeURIComponent( req.body.project.trim() );
  var timestamp = Date.now();

  batch_job.date = new Date( timestamp ).toUTCString();
  batch_job.directory.name = timestamp + '-' + project;
  batch_job.directory.path = path.join( config.batch_job.directory.path, config.batch_job.state.initial );
  batch_job.filename = config.batch_job.filename;
  batch_job.pins.count = parseInt( req.body.count, 10 );
  batch_job.project = project;
  batch_job.state.available = config.batch_job.state.available;
  batch_job.state.current = config.batch_job.state.current;
  batch_job.state.initial = config.batch_job.state.initial;
  batch_job.state.play_pause_action = config.batch_job.state.play_pause_action;
  batch_job.timestamp = timestamp;

  return batch_job;
}

/**
 * @param {IncomingMessage} req
 * @param {Object} req.headers
 * @param {Object} req.connection
 *
 * @returns {Promise.<{ batch_job: string }>}
 */
function createBatchJob( req ) {
  var batch_job = setupBatchJob( req );

  var batch_job_directory = path.join(
    batch_job.directory.path,
    batch_job.directory.name
  );

  var promise_result = {
    batch_job: null,
    ip: req.headers[ 'x-forwarded-for' ] || req.connection.remoteAddress,
    message: null
  };

  /**
   * insure root batch job directories exist
   */
  return createBatchJobDirectories()
    .then(
      /**
       * create the new batch job directory in the appropriate root batch job directory
       *
       * @returns {Promise[]}
       */
      function () {
        return Promise.all( mkdirp( batch_job_directory ) );
      }
    )
    .then(
      /**
       * create the batch job
       *
       * @returns {Promise.<boolean>}
       */
      function () {
        return writeFile(
          path.join( batch_job_directory, batch_job.filename ),
          JSON.stringify( batch_job )
        );
      }
    )
    .then(
      /**
       * @returns {{ batch_job: string|null, message: string|null }}
       */
      function () {
        promise_result.batch_job = batch_job.directory.name;
        promise_result.message = 'batch job created';
        console.log( new Date().toUTCString(), 'createBatchJob()', promise_result );

        return promise_result;
      }
    )
    .catch(
      /**
       * @param {Error} err
       * @throws {Error}
       * @returns {undefined}
       */
      function ( err ) {
        throw err;
      }
    );
}

module.exports = createBatchJob;
