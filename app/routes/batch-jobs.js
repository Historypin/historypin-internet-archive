'use strict';

/**
 * module dependenices
 */
var getBatchJobsPage = require( '../middleware/pages/page-batch-jobs' );

/**
 * @param {Function} router
 * @param {Function} router.get
 */
function addBatchJobRouting( router ) {
  router.get( '/batch-jobs', getBatchJobsPage );
}

module.exports = addBatchJobRouting;
