/* eslint no-sync: off */

'use strict';

/**
 * module dependencies
 */
var fs = require( 'fs' );
var path = require( 'path' );
var Promise = require( 'bluebird' );

/**
 * given an absolute directory path, return an object containing an array of the directory names,
 * and file names, not their absolute paths, within that absolute directory path
 *
 * @param {string} directory absolute path
 * @returns {Promise.<{ directories: Array, files: Array }|Error>}
 */
function getDirectoriesFiles( directory ) {
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
                var stat = fs.statSync( path.join( directory, file ) );

                if ( stat.isDirectory() ) {
                  acc.directories.push( file );
                } else if ( stat.isFile() ) {
                  acc.files.push( file );
                }

                return acc;
              },
              {
                directories: [],
                files: []
              }
            )
        );
      } catch ( err ) {
        reject( err );
      }
    }
  );
}

module.exports = getDirectoriesFiles;
