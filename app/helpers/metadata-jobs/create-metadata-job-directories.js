'use strict';

var config = require( '../../config' );
var mkdirp = require( 'mkdir-p-bluebird' );
var path = require( 'path' );
var Promise = require( 'bluebird' );

/**
 * @param {batch_job} project_batch_job
 * @returns {Promise.<Promise[]>}
 */
function createMetadataJobDirectories( project_batch_job ) {
  return Promise.all(
    config.metadata_job.state.available.reduce(
      function ( acc, directory_state ) {
        acc.push(
          mkdirp(
            path.join(
              project_batch_job.directory.path,
              project_batch_job.directory.name,
              'metadata',
              directory_state
            )
          )
        );

        return acc;
      },
      []
    )
  );
}

module.exports = createMetadataJobDirectories;
