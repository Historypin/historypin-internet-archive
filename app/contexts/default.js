'use strict';

/**
 * @param {IncomingMessage} req
 * @param {IncomingMessage} req.session
 * @param {Object} context
 * @returns {*}
 */
module.exports = function getInitialContext( req, context ) {
  context = {};
  context.partials = {};
  context.lang = req.session.lang;
  context.csrfToken = req.csrfToken();

  if ( process.env.NODE_ENV === 'development' ) {
    context.development = true;
  }

  return context;
};