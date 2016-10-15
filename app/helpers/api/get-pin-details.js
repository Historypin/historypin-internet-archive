'use strict';

/**
 * module dependencies
 */
var config = require( '../../config' );
var difference = require( 'lodash.difference' );
var getPinDetailRequestOptions = require( '../api/get-pin-detail-request-options' );
var getApiPromise = require( 'node-historypin' ).getApiPromise;
var Promise = require( 'bluebird' );

/**
 * gets pin details for up to the config metadata jobs creation throttle amount and returns them as
 * an array
 *
 * @param {string} project
 * @param {Array} ids
 * @param {Array} files
 *
 * @throws {Error}
 *
 * @returns {Array}
 */
function getPinDetails( project, ids, files ) {
  var promises;
  var pin_ids;

  // @todo: need to sort out changing the files results to nrs that match the pin ids
  pin_ids = difference( ids, files );
  pin_ids = pin_ids.slice( 0, config.metadata_jobs.job_creation_throttle );

  promises = pin_ids.reduce(
    function ( acc, id ) {
      acc.push( getApiPromise( getPinDetailRequestOptions( project, id ) ) );
      return acc;
    },
    []
  );

  return Promise.all( promises )
    .then(
      /**
       * @param {Array} results
       * @returns {Array}
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
            acc.push( JSON.parse( result.body ) );

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
