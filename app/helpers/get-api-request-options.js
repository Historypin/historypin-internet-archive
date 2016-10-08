'use strict';

/**
 * @param {IncomingMessage} req
 * @param {string} req.path
 * @param {Object} req.query
 *
 * @returns {{}}
 */
module.exports = function getApiRequestOptions( req ) {
  var request_options = {};

  request_options.project = req.query.project.trim();
  request_options.qs = req.query;
  delete request_options.qs.project;
  request_options.api_endpoint = req.path.replace( '/ajax/', '' );

  return request_options;
};
