'use strict';

/**
 * module dependencies
 */
var config = require( '../../config/index' );
var loadJsonFile = require( 'load-json-file' );
var path = require( 'path' );
var Promise = require( 'bluebird' );
var rename = require( 'rename-bluebird' );
var writeJsonFile = require( 'write-json-file' );

/**
 * rotates batch jobs from their current state to paused state.
 *
 * @returns {Promise.<{ state: state, status: string }|Error>}
 */
function playPauseBatchJob( req ) {
  var action = encodeURIComponent( req.body.action );
  var current_directory;
  var destination_directory;
  var new_action = 'play';
  var new_state = 'paused';
  var project = encodeURIComponent( req.body.project );
  var project_batch_job;
  var state = encodeURIComponent( req.body.state );

  if ( action === 'play' ) {
    new_action = 'pause';
    new_state = 'queued';
  }

  current_directory = path.join( config.batch_job.directory.path, state, project );
  destination_directory = path.join( config.batch_job.directory.path, new_state, project );

  return new Promise(
    /**
     * @param {Function} resolve
     * @param {Function} reject
     * @returns {undefined}
     */
    function ( resolve, reject ) {
      if ( state === new_state ) {
        reject( new Error( 'state and new state are the same - this shouldn’t happen' ) );

        return;
      }

      /**
       * load the batch file
       */
      loadJsonFile( path.join( current_directory, config.batch_job.filename ) )
        .then(
          /**
           * update batch_job properties
           *
           * @param {undefined|batch_job} batch_job
           * @returns {undefined|Promise.<undefined>}
           */
          function ( batch_job ) {
            project_batch_job = batch_job;
            project_batch_job.directory.path = path.join(
              config.batch_job.directory.path, new_state
            );
            project_batch_job.state.current = new_state;
            project_batch_job.state.play_pause_action = new_action;

            return writeJsonFile(
              path.join( current_directory, config.batch_job.filename ), project_batch_job
            );
          }
        )
        .then(
          /**
           * move the batch_job
           *
           * @returns {undefined|Promise.<string>}
           */
          function () {
            return rename(
              path.join( current_directory ),
              path.join( destination_directory )
            );
          }
        )
        .then(
          /**
           * @returns {Object}
           */
          function () {
            resolve( {
              action: new_action,
              state: new_state,
              status: 'success'
            } );
          }
        )
        .catch(
          /**
           * @param {Error} err
           */
          function ( err ) {
            reject( err );
          }
        );
    }
  );
}

module.exports = playPauseBatchJob;
