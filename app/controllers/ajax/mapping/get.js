'use strict';

/**
 * module variables
 */
var getApiPromise;

/**
 * variable assignments
 */
getApiPromise = require( 'node-historypin' ).getApiPromise;

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

  if ( typeof req.query.project !== 'string' || req.query.project.length < 1 ) {
    res.send( {} );
    return;
  }

  options.project = req.query.project.trim();
  delete req.query.project;

  options.api_endpoint = 'get-map';
  options.qs = req.query;

  getApiPromise( req, options )
    .then(
      function( body ) {
        var json;
        json = JSON.parse( body );
        res.send( json );
      }
    )
    .catch(
      function( body ) {
        next( body );
      }
    );
};
