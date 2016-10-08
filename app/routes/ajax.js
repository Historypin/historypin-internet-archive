'use strict';

/**
 * module dependencies
 */
var callHandleApi = require( '../controllers/api/call-handle-api' );
var requestOptions = require( '../middleware/api/request-options' );

/**
 * @param {Function} router
 * @param {Function} router.get
 * @param {Function} router.post
 */
module.exports = function addAjaxRouting( router ) {

  router.get( '/ajax/get-batch-job-rows', require( '../controllers/ajax/get-batch-job-rows/get' ) );
  router.get( '/ajax/get-map', requestOptions, callHandleApi );
  router.get( '/ajax/get-mapping', requestOptions, callHandleApi );
  router.get( '/ajax/get-pin', requestOptions, callHandleApi );
  router.post( '/ajax/create-batch-job', require( '../controllers/ajax/create-batch-job/post' ) );
};
