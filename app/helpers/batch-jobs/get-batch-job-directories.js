'use strict';

/**
 * module dependencies
 */
var config = require( '../../config/index' );
var getDirectoriesFiles = require( '../get-directories-files' );
var path = require( 'path' );

/**
 * given a batch job state, returns all of the directories in that batch job state
 *
 * @param {string} state
 * @throws {Error}
 * @returns {Promise.<{ directories: Array, files: Array }>}
 */
function getBatchJobDirectories( state ) {
  return getDirectoriesFiles( path.join( config.batch_jobs.directory, state ) )
    .then(
      /**
       * @param {Object} directories_files
       * @returns {Object}
       */
      function ( directories_files ) {
        return directories_files;
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
