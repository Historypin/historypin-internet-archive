'use strict';

/**
 * module variables
 */
var path;

/**
 * module dependencies
 */
path = require( 'path' );

/**
 * @param {Object} context
 * @returns {*}
 */
module.exports = function getHomePageContext( context ) {
  context.partials.home = path.join( __dirname, '..', '..', 'views', 'home' );
  context.partials[ 'form-search' ] = path.join( __dirname, '..', '..', 'views', 'home', 'form-search' );
  context.template = context.partials.home;

  return context;
};