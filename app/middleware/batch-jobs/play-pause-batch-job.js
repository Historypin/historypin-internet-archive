'use strict';

/**
 * module dependencies
 */
var playPauseBatchJobHelper = require( '../../helpers/batch-jobs/play-pause-batch-job' );

/**
 * @param {IncomingMessage} req
 *
 * @param {ServerResponse} res
 * @param {Function} res.send
 * @param {Function} res.status
 */
function playPauseBatchJob( req, res ) {
  playPauseBatchJobHelper( req )
    .then(
      /**
       * @param {{ batch_job: batch_job, status: string }} result
       * @returns {undefined}
       */
      function ( result ) {
        res.send( result );
        result.ip = req.headers[ 'x-forwarded-for' ] || req.connection.remoteAddress;
        console.log( new Date().toUTCString(), 'playPauseBatchJob()', JSON.stringify( result ) );
      }
    )
    .catch(
      /**
       * @param {Error} err
       */
      function ( err ) {
        res.status( 500 ).send( {
          message: err.message,
          status: 'failed'
        } );
      }
    );
}

module.exports = playPauseBatchJob;
