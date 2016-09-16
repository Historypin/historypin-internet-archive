'use strict';

/**
 * @param {Function} router
 * @param {Function} router.get
 * @param {Function} router.post
 */
module.exports = function addAjaxRouting( router ) {
  var callHandleApi = require( '../controllers/api/call-handle-api' );

  router.get( '/ajax/get-batch-job-rows', require( '../controllers/ajax/get-batch-job-rows/get' ) );
  router.get( '/ajax/get-map', require( '../controllers/ajax/map/get' ), callHandleApi );
  router.get( '/ajax/get-mapping', require( '../controllers/ajax/mapping/get' ), callHandleApi );
  router.get( '/ajax/get-pin', require( '../controllers/ajax/pin/get' ), callHandleApi );
  router.post( '/ajax/create-batch-job', require( '../controllers/ajax/create-batch-job/post' ) );
};
