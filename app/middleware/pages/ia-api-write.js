'use strict';

/**
 * module dependencies
 */
var config = require( '../../config' );
var iaApiWrite = require( 'internet-archive-metadata-api' ).write;

/**
 * @param {IncomingMessage} req
 * @param {Object} req.query
 *
 * @param {ServerResponse} res
 * @param {Function} res.send
 *
 * @param {Function} next
 *
 * @returns {undefined}
 */
function iaApiWritePage( req, res, next ) {
  if ( req.headers.host.indexOf( 'localhost' ) === -1 ) {
    res.send( { message: 'this route is only allowed on localhost' } );
    return;
  }

  iaApiWrite(
    {
      access: config.s3.access,
      identifier: encodeURIComponent( req.params.identifier ),
      patch: '[ { "add": "/identifier", "value": "test-api" }, { "add": "/publisher", "value": "test-api" } ]',
      secret: config.s3.secret,
      target: 'metadata'
    }
  )
    .then(
      /**
       * @param {Object} result absolute path to current processing batch job
       * @returns {undefined}
       */
      function ( result ) {
        result.parsed = JSON.parse( result.body );
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

module.exports = iaApiWritePage;
