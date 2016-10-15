'use strict';

/**
 * module dependencies
 */
var getPinDetailRequestOptions = require( '../api/get-pin-detail-request-options' );
var getApiPromise = require( 'node-historypin' ).getApiPromise;
var Promise = require( 'bluebird' );

/**
 * gets pin details for up to the config metadata jobs creation throttle amount and returns them as
 * an array
 *
 * @param {string} project
 * @param {Array} pin_ids
 *
 * @throws {Error}
 *
 * @returns {Promise.<[{ pin:{} }]>}
 */
function getPinDetails( project, pin_ids ) {
  var promises;

  promises = pin_ids.reduce(
    function ( acc, pin_id ) {
      acc.push( getApiPromise( getPinDetailRequestOptions( project, pin_id ) ) );
      return acc;
    },
    []
  );

  return Promise.all( promises )
    .then(
      /**
       * @param {Array} results
       * @returns {[{ pin:{} }]}
       */
      function ( results ) {
        return results.reduce(
          /**
           * @param {Array} acc
           *
           * @param {Object} result
           * @param {Object} result.body
           *
           * @returns {Array}
           */
          function ( acc, result ) {
            acc.push( { pin: JSON.parse( result.body ) } );

            return acc;
          },
          []
        );
      }
    )
    .catch(
      /**
       * @param {Error} err
       * @throws {Error}
       * @returns {undefined}
       */
      function ( err ) {
        throw err;
      }
    );
}

module.exports = getPinDetails;
