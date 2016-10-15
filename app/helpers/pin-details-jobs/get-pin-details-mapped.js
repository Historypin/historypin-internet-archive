'use strict';

/**
 * module dependencies
 */
var getMappedMetadata = require( '../metadata-mapping/get-mapped-metadata' );
var loadJsonFile = require( 'load-json-file' );
var path = require( 'path' );

/**
 * cycles through each pin detail in the array provided and adds the mapping result of the
 * internet archive and history pin metadata to the pin detail object. this added data
 * will be used in the metadata upload to the internet archive
 *
 * @param {Array} pin_details
 * @throws {Error}
 */
function getPinDetailsMapped( pin_details ) {
  return loadJsonFile(
    path.join( __dirname, '..', '..', '..', 'public', 'json', 'internet-archive-to-historypin.json' )
  )
    .then(
      /**
       * @param {Object} mapping
       * @returns {Array}
       */
      function ( mapping ) {
        return pin_details.reduce(
          /**
           * @param {Array} acc
           * @param {Object} pin_detail
           * @returns {Array}
           */
          function ( acc, pin_detail ) {
            pin_detail.metadata_mapped = getMappedMetadata( mapping, pin_detail );
            acc.push( pin_detail );

            return acc;
          },
          []
        );
      }
    )
    .catch(
      /**
       * @param {Error} err
       * @throws {error}
       * @returns {undefined}
       */
      function ( err ) {
        throw err;
      }
    );
}

module.exports = getPinDetailsMapped;
