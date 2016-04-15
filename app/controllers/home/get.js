'use strict';

/**
 * module variables
 */
var getDefaultContext;
var getGenericPageContext;
var getHomePageContext;
var path;

/**
 * module dependencies
 */
path = require( 'path' );
getDefaultContext = require( path.join( __dirname, '..', '..', 'contexts', 'default' ) );
getGenericPageContext = require( path.join( __dirname, '..', '..', 'contexts', 'pages', 'generic' ) );
getHomePageContext = require( path.join( __dirname, '..', '..', 'contexts', 'pages', 'home' ) );

/**
 * @param {IncomingMessage} req
 *
 * @param {ServerResponse}  res
 * @param {Function}        res.render
 *
 * @param {Function} next
 */
module.exports = function getIndex( req, res, next ) {
  var context;

  context = getDefaultContext( req, context );
  context = getGenericPageContext( req, context );
  context = getHomePageContext( context );

  res.render( context.template, context );
};