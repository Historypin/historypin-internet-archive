'use strict';

/**
 * module dependencies
 */
var config = require( '../../config/index' );
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

  batch_job.count = parseInt( req.body.count, 10 );
  batch_job.date = new Date( timestamp ).toUTCString();
  batch_job.directory.name = project + '-' + timestamp;
  batch_job.directory.path = config.batch_job.directory.path;
  batch_job.filename = config.batch_job.filename;
  batch_job.project = project;
  batch_job.state = config.batch_job.state;
  batch_job.timestamp = timestamp;

  return batch_job;
}

/**
 * @param {IncomingMessage} req
 * @returns {Promise.<{ batch_job: string }>}
 */
function createBatchJob( req ) {
  var batch_job;
  var batch_job_directory;

  batch_job = setupBatchJob( req );

  batch_job_directory = path.join(
    batch_job.directory.path,
    batch_job.state.initial,
    batch_job.directory.name
  );

  return Promise.all( mkdirp( batch_job_directory ) )
    .then(
      /**
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
       * @returns {{ batch_job: string }}
       */
      function () {
        return { batch_job: batch_job.directory.name };
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
