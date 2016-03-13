'use strict';

/**
 * module variables
 */
var path;

/**
 * variable assignments
 */
path = require( 'path' );

/**
 * @param {Object} context
 * @returns {*}
 */
module.exports = function getIndexPageContext( context ) {
  context.partials.home = path.join( __dirname, '..', '..', 'views', 'home' );
  context.partials[ 'form-search' ] = path.join( __dirname, '..', '..', 'views', 'home', 'form-search' );

  return context;
};