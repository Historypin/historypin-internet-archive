'use strict';

/**
 * module dependencies
 */
var config = require( '../../config' );
var fs = require( 'fs' );
var path = require( 'path' );
var Promise = require( 'bluebird' );

/**
 * @param {string} directory
 */
function getProjectBatchJob( directory ) {
  console.log( directory );
  return new Promise(
    /**
     * @param {Function} resolve
     * @param {Function} reject
     */
    function ( resolve, reject ) {
      var file;

      file = path.join( config.batch_jobs.base_path, 'queued', directory, config.batch_jobs.file );

      fs.readFile( file, function ( err, data ) {
        if ( err ) {
          reject( err );
          return;
        }

        try {
          resolve( JSON.parse( data ) );
        } catch ( error ) {
          reject( error );
        }
      } );
    }
  );
}

module.exports = getProjectBatchJob;
