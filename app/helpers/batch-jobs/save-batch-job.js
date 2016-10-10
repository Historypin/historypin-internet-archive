'use strict';

/**
 * module dependencies
 */
var writeJsonFile = require( 'write-json-file' );

/**
 *
 * @param path
 * @param batch_job
 * @returns {Promise}
 */
function saveBatchJob( path, batch_job ) {
  return writeJsonFile( path, batch_job );
}

module.exports = saveBatchJob;
