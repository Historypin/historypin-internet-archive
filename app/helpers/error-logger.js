'use strict';

/**
 * @param {Error} err
 *
 * @param {IncomingMessage} req
 * @param {string} req.body
 * @param {Object} req.connection
 * @param {Object} req.headers
 * @param {string} req.method
 * @param {string} req.originalUrl
 * @param {Object} req.session
 * @param {number} req.status
 *
 * @returns {undefined}
 */
function errorLogger( err, req ) {
  var error;

  error = {};
  error.method = req.method;
  error.originalUrl = req.originalUrl;
  error.status = err.status || 500;
  error.date = new Date();
  error.remoteAddress = req.connection.remoteAddress;
  error.headers = req.headers;
  error.session = req.session;
  error.body = req.body;
  error.err = err;

  console.error( error );
}

module.exports = errorLogger;
