'use strict';

/**
 * module dependenceis
 */
var rotateBatchJob = require( '../../helpers/batch-jobs/rotate-batch-job' );

function rotateBatchJobPage( req, res, next ) {
  rotateBatchJob()
    .then(
      /**
       * @param {string} directory absolute path to current processing batch job
       */
      function ( directory ) {
        res.send( directory );
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

module.exports = rotateBatchJobPage;
