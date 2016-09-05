'use strict';

/**
 * @param {IncomingMessage} req
 * @param {IncomingMessage} req.session
 * @returns {{}|*}
 */
module.exports = function getDefaultContext( req ) {
  var context;

  context = {};
  context.partials = {};
  context.lang = req.session.lang;
  context.csrfToken = req.csrfToken();
  context.development = process.env.NODE_ENV === 'development';

  return context;
};
