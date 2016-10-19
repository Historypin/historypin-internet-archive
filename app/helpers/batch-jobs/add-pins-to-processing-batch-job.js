'use strict';

/**
 * module dependencies
 */
var getBatchJobs = require( '../../helpers/batch-jobs/get-batch-jobs' );
var getProjectPinIds = require( './../api/get-project-pin-ids' );
var path = require( 'path' );
var uniq = require( 'lodash.uniq' );
var writeJsonFile = require( 'write-json-file' );

/**
 * retrieves the current processing batch job, adds batch job project pin ids if the current
 * pin ids and project count do not yet match, and then saves the updated batch job
 *
 * does nothing if batch job’s pin ids length and project count are equal
 *
 * @returns {Promise.<string|project_batch_job>}
 */
function addPinsToProcessingBatchJob() {
  var project_batch_job;

  return getBatchJobs( 'processing' )
    .then(
      /**
       * @param {[{}]} result
       * @returns {{ message: string }|Promise.<{}>}
       */
      function ( result ) {
        if ( result.length < 1 ) {
          return { message: 'no processing batch job' };
        }

        project_batch_job = result[ 0 ];

        if ( project_batch_job.pins[ 'all-pins-added' ] ) {
          return { message: 'all pins have been added' };
        }
        
        return getProjectPinIds( project_batch_job );
      }
    )
    .then(
      /**
       * @param {Array} pin_ids
       * @returns {string|Promise}
       */
      function ( pin_ids ) {
        if ( !Array.isArray( pin_ids ) || pin_ids.length === 0 ) {
          return pin_ids;
        }

        project_batch_job.pins.ids = uniq( project_batch_job.pins.ids.concat( pin_ids ) );

        if ( project_batch_job.pins.ids.length === project_batch_job.pins.count ) {
          project_batch_job.pins[ 'all-pins-added' ] = true;
        }

        return writeJsonFile(
          path.join(
            project_batch_job.directory.path,
            project_batch_job.directory.name,
            project_batch_job.filename
          ),
          project_batch_job
        );
      }
    )
    .then(
      /**
       * @param {Object|undefined} result
       * @returns {{ message: string }|batch_job}
       */
      function ( result ) {
        if ( !result ) {
          return project_batch_job;
        }

        return result;
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

module.exports = addPinsToProcessingBatchJob;
