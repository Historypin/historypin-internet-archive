'use strict';

/**
 * @param {Function} router
 * @param {Function} router.get
 */
module.exports = function addHomeRouting( router ) {
  router.get( '/batch-jobs', require( '../controllers/batch-jobs/get' ) );
};
