'use strict';

/**
 * module dependencies
 */
var getApiOptionsFromRequest = require( '../../helpers/get-api-options-from-request' );

/**
 * @param {IncomingMessage} req
 * @param {Object} req.historypin
 *
 * @param {ServerResponse} res
 * @param {Function} next
 */
module.exports = function ( req, res, next ) {
  req.historypin = req.historypin || {};
  req.historypin.api_options = getApiOptionsFromRequest( req );
  req.historypin.api_options.api_endpoint = req.path.replace( '/ajax/', '' );

  next();
};
