'use strict';

/**
 * @param {IncomingMessage} req
 * @returns {{}}
 */
module.exports = function getApiOptions( req ) {
  var options = {};

  options.project = req.query.project.trim();
  delete req.query.project;
  options.qs = req.query;

  return options;
};
