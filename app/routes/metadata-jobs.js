'use strict';

/**
 * module dependenices
 */
var metadataJobs = require( '../middleware/pages/metadata-jobs' );

/**
 * @param {Function} router
 * @param {Function} router.get
 */
function metadataJobsRouting( router ) {
  router.get( '/metadata-jobs', metadataJobs );
}

module.exports = metadataJobsRouting;
