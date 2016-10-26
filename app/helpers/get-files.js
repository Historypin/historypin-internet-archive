/* eslint no-sync: off */

'use strict';

/**
 * module dependencies
 */
var fs = require( 'fs' );
var path = require( 'path' );

/**
 * given an absolute directory path, return an array of the file names,
 * not their absolute path, within that absolute directory path
 *
 * @param {string} directory absolute path
 * @returns {Promise.<Array|Error>}
 */
function getFiles( directory ) {
  return fs.readdirSync( directory )
    .reduce(
      function ( acc, file ) {
        if ( fs.statSync( path.join( directory, file ) ).isFile() ) {
          acc.push( file );
        }

        return acc;
      },
      []
    );
}

module.exports = getFiles;
