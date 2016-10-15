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
 * @returns {Promise.<[{ pin:{}, metadata_mapped:{} }]>}
 */
function saveMetadataJobs( directory, metadata_jobs ) {
  var promises;

  promises = metadata_jobs.reduce(
    function ( acc, metadata_job ) {
      acc.push(
        writeJsonFile( path.join( directory, metadata_job.pin.id + '.json' ), metadata_job )
      );

      return acc;
    },
    []
  );

  return Promise.all( promises )
    .then(
      /**
       * @returns {Array.<[{ pin:{}, metadata_mapped:{} }]>}
       */
      function () {
        return metadata_jobs;
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

module.exports = saveMetadataJobs;
