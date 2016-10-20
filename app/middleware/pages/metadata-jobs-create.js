'use strict';

/**
 * module dependencies
 */
var createMetadataJobs = require( '../../helpers/metadata-jobs/create-metadata-jobs' );

/**
 * @param {IncomingMessage} req
 *
 * @param {ServerResponse} res
 * @param {Function} res.send
 *
 * @param {Function} next
 * @returns {undefined}
 */
function metadataJobsCreate( req, res, next ) {
  createMetadataJobs()
    .then(
      /**
       * @param {Object} result
       * @returns {undefined}
       */
      function ( result ) {
        res.send( result );
      }
    )
    .catch(
      /**
       * @param {Error} err
       */
      function ( err ) {
        next( err );
      }
    );
}

module.exports = metadataJobsCreate;
