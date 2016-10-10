'use strict';

/**
 * module dependenices
 */
var processMetadataBatchJobs = require( '../middleware/metadata-batch-jobs/process-metadata-batch-jobs' );

/**
 * @param {Function} router
 * @param {Function} router.get
 */
function addBatchJobRouting( router ) {
  router.get( '/metadata-batch-jobs', processMetadataBatchJobs );
}

module.exports = addBatchJobRouting;
