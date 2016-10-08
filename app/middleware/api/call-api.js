'use strict';

/**
 * module dependencies
 */
var getApiPromise = require( 'node-historypin' ).getApiPromise;
var getApiRequestOptions = require( '../../helpers/get-api-request-options' );

/**
 * @param {IncomingMessage} req
 * @param {Object} req.headers
 *
 * @param {ServerResponse} res
 * @param {Function} res.send
 *
 * @param {Function} next
 */
function callApi( req, res, next ) {
  getApiPromise( getApiRequestOptions( req ), req.headers )
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
}

module.exports = callApi;
