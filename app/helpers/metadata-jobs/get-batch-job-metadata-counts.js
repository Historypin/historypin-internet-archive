'use strict';

var config = require( '../../config' );
var getDirectoriesFiles = require( '../get-directories-files' );
var path = require( 'path' );

/**
 *
 * @param batch_job
 * @throws {Error}
 * @returns {Promise}
 */
function getBatchJobMetadataCounts( batch_job ) {
  var directory = path.join(
    config.batch_job.directory.path, batch_job.state, batch_job.directory, 'metadata'
  );

  return getDirectoriesFiles( path.join( directory, 'completed' ) )
    .then(
      /**
       * @param {Array} result
       * @returns {Promise}
       */
      function ( result ) {
        batch_job.metadata.completed = result.files.length;
        return getDirectoriesFiles( path.join( directory, 'errored' ) );
      }
    )
    .then(
      /**
       * @param {Array} result
       * @returns {Promise}
       */
      function ( result ) {
        batch_job.metadata.errored = result.files.length;
        return getDirectoriesFiles( path.join( directory, 'processing' ) );
      }
    )
    .then(
      /**
       * @param {Array} result
       * @returns {Promise}
       */
      function ( result ) {
        batch_job.metadata.processing = result.files.length;
        return getDirectoriesFiles( path.join( directory, 'queued' ) );
      }
    )
    .then(
      /**
       * @param {Array} result
       * @returns {Promise}
       */
      function ( result ) {
        batch_job.metadata.queued = result.files.length;
        return batch_job;
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

module.exports = getBatchJobMetadataCounts;