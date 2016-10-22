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
  router.get( '/ia-api-write', function ( req, res, next ) {
    req.type = 'all';
    next();
  }, pageAiWriteApi );
}

module.exports = iaApiWriteRouting;
