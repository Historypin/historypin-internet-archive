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
 * @param {Array.<[{ pin:pin }]>} pins
 * @throws {Error}
 * @returns {Promise.<[{ pin:pin, metadata_mapped:{} }]>}
 */
function getPinDetailsMapped( pins ) {
  return loadJsonFile(
    path.join(
      __dirname, '..', '..', '..', 'public', 'json', 'internet-archive-to-historypin.json'
    )
  )
    .then(
      /**
       * @param {Object} mapping
       * @returns {Array}
       */
      function ( mapping ) {
        return pins.reduce(
          /**
           * @param {Array} acc
           * @param {Object} metadata_job
           * @returns {Array.<[{ pin:pin, metadata_mapped:{} }]>}
           */
          function ( acc, metadata_job ) {
            metadata_job.metadata_mapped = getMappedMetadata( mapping, metadata_job );
            acc.push( metadata_job );

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
