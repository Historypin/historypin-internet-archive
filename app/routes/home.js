'use strict';

var getHome = require( '../middleware/pages/home' );

/**
 * @param {Function} router
 * @param {Function} router.get
 */
function addHomeRouting( router ) {
  router.get( '/', getHome );
}

module.exports = addHomeRouting;
