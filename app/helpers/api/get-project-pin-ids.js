'use strict';

/**
 * module dependencies
 */
var getApiPromise = require( 'node-historypin' ).getApiPromise;
var getPinRequestOptions = require( './get-project-pin-request-options' );
var getPinsFromJSON = require( './get-project-pins-from-json' );

/**
 * @param {batch_job} batch_job
 * @throws {Error}
 * @returns {Promise.<[{}]>}
 */
function getProjectPinIds( batch_job ) {
  return getApiPromise( getPinRequestOptions( batch_job ) )
    .then(
      /**
       * @param {Object} api_result
       * @returns {[{}]}
       */
      function ( api_result ) {
        if ( !api_result ) {
          return [ {} ];
        }

        return getPinsFromJSON( JSON.parse( api_result.body ) );
      }
    )
    .catch(
      /**
       * @param {Error} err
       */
      function ( err ) {
        throw err;
      }
    );
}

module.exports = getProjectPinIds;
