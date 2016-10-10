'use strict';

/**
 * module dependencies
 */
var config = require( '../../config/index' );
var getDirectories = require( '../get-directories' );
var path = require( 'path' );

/**
 * given a batch job state, returns all of the directories in that batch job state
 *
 * @param {string} state
 * @throws {Error}
 * @returns {Promise.<Array>}
 */
function getBatchJobDirectories( state ) {
  return getDirectories( path.join( config.batch_jobs.directory, state ) )
    .then(
      /**
       * @param {Array} directories
       * @returns {Array}
       */
      function ( directories ) {
        return directories;
      }
    )
    .catch(
      /**
       * @param {Error} err
       * @throws {Error}
       */
      function ( err ) {
        throw err;
      }
    );
}

module.exports = getBatchJobDirectories;
