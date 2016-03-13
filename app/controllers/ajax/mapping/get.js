'use strict';

/**
 * module variables
 */
var callApi;

/**
 * variable assignments
 */
callApi = require( 'node-historypin' ).callApi;

/**
 * @param {IncomingMessage} req
 * @param {Object} options
 * @returns {Object}
 */
function addQueryString( req, options ) {
  options.qs = {};

  if ( req.query.paging && typeof req.query.paging === 'number' && !isNaN( req.query.paging ) ) {
    options.qs.paging = req.query.paging;
  }

  if ( req.query.limit && typeof req.query.limit === 'number' && !isNaN( req.query.limit ) ) {
    options.qs.limit = req.query.limit;
  }

  return options;
}

/**
 * @param {IncomingMessage} req
 * @param {Object} req.query
 *
 * @param {ServerResponse} res
 * @param {Function} res.send
 *
 * @param {Function} next
 */
module.exports = function ( req, res, next ) {
  var options;
  var result;

  options = {};

  if ( typeof req.query.project !== 'string' || req.query.project.length < 1 ) {
    res.send( {} );
    return;
  }

  options.project = req.query.project;
  options.api_endpoint = 'get-gallery';

  delete req.query.project;
  options.qs = req.query;

  callApi( req, options, function( result ) {
    if ( result instanceof Error ) {
      next( result );
      return;
    }

    res.send( result );
  } );
};