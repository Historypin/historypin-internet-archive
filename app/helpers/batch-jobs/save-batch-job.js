'use strict';

/**
 * module dependencies
 */
var writeJsonFile = require( 'write-json-file' );

/**
 * @param {string} path
 * @param {Object} batch_job
 * @param {*} return_value
 *
 * @throws {Error}
 * @returns {Promise.<*>}
 */
function saveBatchJob( path, batch_job, return_value ) {
  return writeJsonFile( path, batch_job )
    .then(
      /**
       * @returns {*}
       */
      function () {
        return return_value;
      }
    )
    .catch(
      /**
       * @param {Error} err
       * @returns {undefined}
       */
      function ( err ) {
        throw err;
      }
    );
}

module.exports = saveBatchJob;
