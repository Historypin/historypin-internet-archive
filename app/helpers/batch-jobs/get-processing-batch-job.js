'use strict';

var config = require( '../../config' );
var getDirectories = require( '../../helpers/get-directories' );
var path = require( 'path' );
var Promise = require( 'bluebird' );
var removeKeep = require( '../../helpers/remove-keep' );
var rename = require( 'rename-bluebird' );

/**
 * returns the full path to the first batch job directory in the processing directory
 *
 *  - processing directory searched
 *    - batch job exists
 *      - that path is returned
 *    - batch job does not exist
 *      - queued directory is searched
 *        - batch job does not exist
 *          - empty string is returned
 *        - batch job exists
 *          - it’s moved to the processing directory and that string is returned
 *
 * @returns {Promise.<string|Error>}
 */
function getProcessingBatchJob() {
  return new Promise(
    /**
     * @param {Function} resolve
     * @param {Function} reject
     * @returns {undefined}
     */
    function ( resolve, reject ) {
      getDirectories( path.join( config.batch_jobs.base_path, 'processing' ) )
        .then(
          /**
           * @param {Array} directories
           * @returns {undefined|Promise}
           */
          function ( directories ) {
            directories = removeKeep( directories );

            if ( directories.length > 0 ) {
              resolve( path.join( config.batch_jobs.base_path, 'processing', directories[ 0 ] ) );
              return;
            }

            return getDirectories( path.join( config.batch_jobs.base_path, 'queued' ) )
          }
        )
        .then(
          /**
           * @param {Array} directories
           * @returns {Promise|string}
           */
          function ( directories ) {
            directories = removeKeep( directories );

            if ( directories.length > 0 ) {
              return rename(
                path.join( config.batch_jobs.base_path, 'queued', directories[ 0 ] ),
                path.join( config.batch_jobs.base_path, 'processing', directories[ 0 ] )
              );
            }

            return '';
          }
        )
        .then(
          /**
           * @param {string} directory
           */
          function ( directory ) {
            resolve( directory);
          }
        )
        .catch(
          /**
           * @param {Error} err
           */
          function ( err ) {
            reject( err );
          }
        );
    }
  );
}

module.exports = getProcessingBatchJob;
