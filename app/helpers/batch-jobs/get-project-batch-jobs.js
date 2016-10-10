'use strict';

/**
 * module dependencies
 */
var getProjectBatchJob = require( './get-project-batch-job' );
var Promise = require( 'bluebird' );

/**
 * @param {Array} directories
 */
function getProjectBatchJobs( directories ) {
  return new Promise(
    /**
     * @param {Function} resolve
     */
    function ( resolve ) {
      resolve(
        directories.reduce(
          function ( acc, directory ) {
            acc.push( getProjectBatchJob( directory ) );
            return acc;
          },
          []
        )
      );
    }
  );
}

module.exports = getProjectBatchJobs;
