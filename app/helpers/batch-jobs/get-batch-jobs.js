'use strict';

/**
 * module dependencies
 */
var config = require( '../../config/index' );
var loadJsonFile = require( 'load-json-file' );
var path = require( 'path' );
var Promise = require( 'bluebird' );

/**
 * @param {Array} directory_names
 * @param {string} state
 * @returns {Promise.<Array>}
 */
function getBatchJobs( directory_names, state ) {
  return new Promise(
    /**
     * @param {Function} resolve
     */
    function ( resolve ) {
      resolve(
        directory_names.reduce(
          function ( acc, directory_name ) {
            acc.push(
              loadJsonFile(
                path.join(
                  config.batch_jobs.directory,
                  state,
                  directory_name,
                  config.batch_jobs.file
                )
              )
            );
            return acc;
          },
          []
        )
      );
    }
  );
}

module.exports = getBatchJobs;
