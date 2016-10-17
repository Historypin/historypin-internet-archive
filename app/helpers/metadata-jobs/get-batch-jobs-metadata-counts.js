'use strict';

var getBatchJobMetadataCounts = require( './get-batch-job-metadata-counts' );

function getBatchJobsMetadataCounts( batch_jobs ) {
  return getBatchJobMetadataCounts( batch_jobs[ 0 ] );
  // return batch_jobs.reduce(
  //   /**
  //    * @param acc
  //    * @param batch_job
  //    * @returns {*}
  //    */
  //   function ( acc, batch_job ) {
  //     getBatchJobMetadataCounts( batch_job )
  //       .then(
  //         /**
  //          * @param {string} result
  //          * @returns {string}
  //          */
  //         function ( result ) {
  //           acc.push( result );
  //
  //           return acc;
  //         }
  //       )
  //       .catch(
  //         /**
  //          * @param {Error} err
  //          * @returns {undefined}
  //          */
  //         function ( err ) {
  //           throw err;
  //         }
  //       );
  //
  //   },
  //   []
  // );
}

module.exports = getBatchJobsMetadataCounts;