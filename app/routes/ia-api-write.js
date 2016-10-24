'use strict';

/**
 * module dependencies
 */
var pageAiWriteApi = require( '../middleware/pages/ia-api-write' );

/**
 * @param {Function} router
 * @param {Function} router.get
 */
function iaApiWriteRouting( router ) {
  router.get( '/ia-api-write/:identifier', function ( req, res, next ) {
    next();
  }, pageAiWriteApi );
}

module.exports = iaApiWriteRouting;
