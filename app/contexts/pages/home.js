'use strict';

/**
 * module dependencies
 */
var path = require( 'path' );

/**
 * @param {Object} context
 * @returns {*}
 */
module.exports = function getHomePageContext( context ) {
  context.partials.home = path.join( __dirname, '..', '..', 'views', 'home' );
  context.partials[ 'form-search' ] = path.join( __dirname, '..', '..', 'views', 'home', 'form-search' );

  context.body = { id: 'home' };
  context.template = context.partials.home;

  return context;
};
