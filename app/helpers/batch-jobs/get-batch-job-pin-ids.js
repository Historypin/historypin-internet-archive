'use strict';

/**
 * module dependencies
 */
var getApiPromise = require( 'node-historypin' ).getApiPromise;
var getPinRequestOptions = require( '../get-pin-request-options' );
var getPinsFromJSON = require( '../get-pins-from-json' );

function getBatchJobPinIds( batch_job ) {
  return getApiPromise( getPinRequestOptions( batch_job ) )
    .then(
      /**
       * @param {Object} api_result
       */
      function ( api_result ) {
        if ( !api_result ) {
          return '';
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

module.exports = getBatchJobPinIds;
