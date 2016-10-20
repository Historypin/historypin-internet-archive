'use strict';

var config = require( '../../config' );
var mkdirp = require( 'mkdir-p-bluebird' );
var path = require( 'path' );
var Promise = require( 'bluebird' );

/**
 * @returns {Promise.<Promise[]>}
 */
function createBatchJobDirectories() {
  return Promise.all(
    config.batch_job.state.available.reduce(
      function ( acc, directory_state ) {
        acc.push(
          mkdirp( path.join( config.batch_job.directory.path, directory_state ) )
        );

        return acc;
      },
      []
    )
  );
}

module.exports = createBatchJobDirectories;
