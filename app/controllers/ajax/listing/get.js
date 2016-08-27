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
 * @param {Object} req.query
 *
 * @param {ServerResponse} res
 * @param {Function} res.send
 *
 * @param {Function} next
 */
module.exports = function ( req, res, next ) {
  var options;

  options = {};

  if ( typeof req.query.project !== 'string' ) {
    res.send( {} );
    return;
  }

  options.project = req.query.project;
  options.api_endpoint = 'listing';

  callApi( req, options, function( result ) {
    if ( result instanceof Error ) {
      next( result );
      return;
    }

    res.send( result );
  } );
};
