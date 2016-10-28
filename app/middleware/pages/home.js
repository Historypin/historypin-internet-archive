'use strict';

/**
 * module dependencies
 */
var getDefaultContext = require( '../../contexts/default' );
var getGenericPageContext = require( '../../contexts/pages/generic' );
var getPageContext = require( '../../contexts/pages/home' );

/**
 * @param {IncomingMessage} req
 *
 * @param {ServerResponse} res
 * @param {Function} res.render
 */
function getHome( req, res ) {
  var context;

  context = getDefaultContext( req );
  context = getGenericPageContext( req, context );
  context = getPageContext( context );

  res.render( context.template, context );
}

module.exports = getHome;
