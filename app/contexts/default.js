'use strict';

/**
 * @param {IncomingMessage} req
 * @param {IncomingMessage} req.session
 * @returns {{}|*}
 */
module.exports = function getInitialContext( req ) {
  var context;

  context = {};
  context.partials = {};
  context.lang = req.session.lang;
  context.csrfToken = req.csrfToken();

  if ( process.env.NODE_ENV === 'development' ) {
    context.development = true;
  }

  return context;
};