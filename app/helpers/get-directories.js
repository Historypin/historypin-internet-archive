/* eslint no-sync: off */

'use strict';

/**
 * module dependencies
 */
var fs = require( 'fs' );
var path = require( 'path' );
var Promise = require( 'bluebird' );

/**
 * given an absolute directory path, return an array of the directory names,
 * not their absolute path, within that absolute directory path
 *
 * @param {string} directory absolute path
 * @returns {Promise.<Array|Error>}
 */
function getDirectories( directory ) {
  return new Promise(
    /**
     * @param {Function} resolve
     * @param {Function} reject
     */
    function ( resolve, reject ) {
      try {
        resolve(
          fs.readdirSync( directory )
            .reduce(
              function ( acc, file ) {
                if ( fs.statSync( path.join( directory, file ) ).isDirectory() ) {
                  acc.push( file );
                }

                return acc;
              },
              []
            )
        );
      } catch ( err ) {
        reject( err );
      }
    }
  );
}

module.exports = getDirectories;
