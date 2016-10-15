'use strict';

/**
 * module dependencies
 */
var getBatchJobObject = require( '../batch-jobs/get-batch-job-object' );
var getDirectoriesFiles = require( '../get-directories-files' );
var getPinDetails = require( '../api/get-pin-details' );
var getPinDetailsMapped = require( './get-pin-details-mapped' );
var path = require( 'path' );

/**
 * @throws {Error}
 * @returns {Promise.<string|{batch_job: Object, path: string}>}
 */
function createPinDetailsJob() {
  var cached_batch_job;

  return getBatchJobObject( 'processing' )
    .then(
      /**
       * @param {Object} batch_job
       * @param {Object} batch_job.location
       * @param {string} batch_job.location.directory
       *
       * @returns {Promise.<{directories: Array, files: Array}|Error>}
       */
      function ( batch_job ) {

        cached_batch_job = batch_job;

        return getDirectoriesFiles(
          path.join( batch_job.location.directory, 'metadata', 'queued' )
        );
      }
    )
    .then(
      /**
       * @param {Object} directories_files
       * @returns {Object}
       */
      function ( directories_files ) {
        // wait until all metadata batch jobs have been queued before marking the flag
        // all-pins-queued as true. only process metadata batch jobs once that flag
        // has been marked as true
        // @todo: set "all-pins-queued": true here?
        if ( directories_files.files.length === cached_batch_job.count ) {
          return directories_files;
        }

        return getPinDetails(
          cached_batch_job.batch_job.project,
          cached_batch_job.batch_job.pins.ids,
          directories_files.files
        );
      }
    )
    .then(
      /**
       * @param {Array} pin_details
       * @returns {Array}
       */
      function ( pin_details ) {
        return getPinDetailsMapped( pin_details );
      }
    )
    .then(
      /**
       * @param {string} result
       * @returns {string}
       */
      function ( result ) {
        // @todo: need to save each mapping result as a metadata batch job
        return result;
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

module.exports = createPinDetailsJob;
