'use strict';

/**
 * @param {Function} router
 * @param {Function} router.get
 * @param {Function} router.post
 */
module.exports = function addAjaxRouting( router ) {
  router.get( '/ajax/get-batch-job-rows', require( '../controllers/ajax/get-batch-job-rows/get' ) );
  router.get( '/ajax/get-gallery', require( '../controllers/ajax/gallery/get' ) );
  router.get( '/ajax/get-map', require( '../controllers/ajax/map/get' ) );
  router.get( '/ajax/get-mapping', require( '../controllers/ajax/mapping/get' ) );
  router.get( '/ajax/get-pin', require( '../controllers/ajax/pin/get' ) );
  router.get( '/ajax/get-project', require( '../controllers/ajax/project/get' ) );
  router.get( '/ajax/listing', require( '../controllers/ajax/listing/get' ) );
  router.post( '/ajax/create-batch-job', require( '../controllers/ajax/create-batch-job/post' ) );
};
