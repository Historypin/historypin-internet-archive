'use strict';

/**
 * module dependencies
 */
// var iaApiWrite = require( 'internet-archive-metadata-api' ).write;

/**
 * @param {IncomingMessage} req
 * @param {Object} req.query
 *
 * @param {ServerResponse} res
 * @param {Function} res.send
 *
 * @param {Function} next
 */
function iaApiWritePage( req, res, next ) {
  res.send( { message: 'developing ...' } );
}

module.exports = iaApiWritePage;
