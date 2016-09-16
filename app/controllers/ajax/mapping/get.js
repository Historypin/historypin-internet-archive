'use strict';

/**
 * module dependencies
 */
var getApiOptionsFromRequest = require( '../../../helpers/get-api-options-from-request' );

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
  req.historypin = req.historypin || {};
  req.historypin.api_options = getApiOptionsFromRequest( req );
  req.historypin.api_options.api_endpoint = 'get-map';
  next();
};
