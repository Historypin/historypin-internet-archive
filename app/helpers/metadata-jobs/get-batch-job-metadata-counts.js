'use strict';

var config = require( '../../config' );
var getDirectoriesFiles = require( '../get-directories-files' );
var path = require( 'path' );
var Promise = require( 'bluebird' );

/**
 * mutates the batch_job
 * adds the nr of files is each metadata job state to batch_job.metadata[ state ]
 *
 * @param batch_job
 * @throws {Error}
 * @returns {Promise.<{batch_job}>}
 */
function getBatchJobMetadataCounts( batch_job ) {
  var directory = path.join(
    batch_job.directory.path, batch_job.directory.name, 'metadata'
  );

  batch_job.metadata = {};

  return Promise.all(
    config.metadata_job.state.available.reduce(
      function ( acc, state ) {
        var result = {};

        result[ state ] = getDirectoriesFiles( path.join( directory, state ) );
        acc.push( result );

        return acc;
      },
      []
    )
  )
    .then(
      /**
       * @param {Promise[]} results
       * @returns {batch_job[]}
       */
      function ( results ) {
        results.reduce(
          function ( acc, result ) {
            Object.keys( result ).reduce(
              function ( acc2, state ) {
                batch_job.metadata[ state ] = result[ state ].value().files.length;
                return acc2;
              },
              ''
            );

            return acc;
          },
          ''
        );

        return batch_job;
      }
    )
    .catch(
      /**
       * @param {Error} err
       * @throws {Error}
       * @returns {undefined}
       */
      function ( err ) {
        throw err;
      }
    );
}

module.exports = getBatchJobMetadataCounts;