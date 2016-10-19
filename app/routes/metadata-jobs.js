'use strict';

/**
 * module dependenices
 */
var metadataJobsCreate = require( '../middleware/pages/metadata-jobs-create' );

/**
 * @param {Function} router
 * @param {Function} router.get
 */
function metadataJobsRouting( router ) {
  router.get( '/metadata-jobs', metadataJobsCreate );
}

module.exports = metadataJobsRouting;
