'use strict';

/**
 * module dependencies
 */
var getBatchJobMetadataCounts = require( './get-batch-job-metadata-counts' );
var Promise = require( 'bluebird' );

/**
 * @throws {Error}
 * @param {batch_job[]} batch_jobs
 * @returns {batch_job[]}
 */
function getBatchJobsMetadataCounts( batch_jobs ) {
  return Promise.all(
    batch_jobs.reduce(
      /**
       * @param acc
       * @param batch_job
       * @returns {*}
       */
      function ( acc, batch_job ) {
        acc.push( getBatchJobMetadataCounts( batch_job ) );

        return acc;
      },
      []
    )
  )
    .then(
      /**
       * @param {batch_job[]} result
       * @returns {batch_job[]}
       */
      function ( result ) {
        return result;
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

module.exports = getBatchJobsMetadataCounts;
