'use strict';

/**
 * module dependencies
 */
var config = require( '../../../config' );
var fs = require( 'fs' );

/**
 * @param {IncomingMessage} req
 * @param {Object} req.body
 * @param {string} req.body.app_data
 *
 * @param {ServerResponse} res
 * @param {Function} res.send
 * @param {Function} next
 */
module.exports = function getIndex( req, res, next ) {
  fs.readdir(
    config.batch_jobs.projects,
    function( err, files ) {
      if ( err ) {
        next( err );
        return;
      }

      res.send( files );
    }
  );
};
