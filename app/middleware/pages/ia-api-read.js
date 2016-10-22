'use strict';

/**
 * module dependencies
 */
var iaApiRead = require( 'internet-archive-metadata-api' ).read;

/**
 * @param {IncomingMessage} req
 * @param {Object} req.query
 *
 * @param {ServerResponse} res
 * @param {Function} res.send
 *
 * @param {Function} next
 */
function iaApiReadPage( req, res, next ) {
  iaApiRead(
    {
      count: parseInt( req.query.count, 10 ),
      identifier: encodeURIComponent( req.params.identifier || '' ),
      index: parseInt( req.params.index, 10 ),
      start: parseInt( req.query.start, 10 ),
      type: encodeURIComponent( req.type ) || ''
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

module.exports = iaApiReadPage;
