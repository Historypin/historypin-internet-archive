'use strict';

/**
 * module dependencies
 */
var getApiPromise = require( 'node-historypin' ).getApiPromise;

module.exports = function callHandleApi( req, res, next ) {
  getApiPromise( req.historypin.api_options, req.headers )
    .then(
      /**
       * @param {Object} result
       * @param {IncomingMessage} result.response
       * @param {string} result.body
       */
      function ( result ) {
        res.send( JSON.parse( result.body ) );
      }
    )
    .catch(
      /**
       * @param {Error} err
       */
      function ( err ) {
        next( err );
      }
    );
};
