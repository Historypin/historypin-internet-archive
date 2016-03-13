'use strict';

/**
 * module variables
 */
var getGenericPageContext;
var getHomePageContext;
var path;
var setLocale;

/**
 * variable assignments
 */
path = require( 'path' );
getGenericPageContext = require( path.join( __dirname, '..', '..', 'contexts', 'pages', 'generic' ) );
getHomePageContext = require( path.join( __dirname, '..', '..', 'contexts', 'pages', 'home' ) );
setLocale = require( 'node-helpers' ).setLocale;

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

  setLocale( req );

  context = {};
  context.partials = {};

  context = getGenericPageContext( req, context );
  context = getHomePageContext( context );
  context.template = context.partials.home;

  res.render( context.template, context );
};