'use strict';

/**
 * module dependencies
 */
var path = require( 'path' );
var Promise = require( 'bluebird' );
var writeJsonFile = require( 'write-json-file' );

/**
 *
 * @param {string} directory
 * @param {Array.<[{ pin:{}, metadata_mapped:{} }]>} metadata_jobs
 *
 * @throws {Error}
 * @returns {Promise.<Promise[]>}
 */
function saveMetadataJobs( directory, metadata_jobs ) {
  return Promise.all(
    metadata_jobs.reduce(
      function ( acc, metadata_job ) {
        acc.push(
          writeJsonFile( path.join( directory, metadata_job.pin.id + '.json' ), metadata_job )
        );

        return acc;
      },
      []
    )
  );
}

module.exports = saveMetadataJobs;
