'use strict';

/**
 * module dependencies
 */
var fs = require( 'fs' );
var Promise = require( 'bluebird' );

/**
 * @param {string} base_directory
 * @returns {Promise}
 */
function getDirectories( base_directory ) {
  return new Promise(
    /**
     * @param {Function} resolve
     * @param {Function} reject
     */
    function ( resolve, reject ) {
      fs.readdir(
        base_directory,
        function( err, files ) {
          if ( err ) {
            reject( err );
            return;
          }

          resolve( files );
        }
      );
    }
  );
}

module.exports = getDirectories;
