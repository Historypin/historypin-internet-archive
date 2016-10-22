'use strict';

/**
 * module dependencies
 */
var pageAiReadApi = require( '../middleware/pages/ia-api-read' );

/**
 * @param {Function} router
 * @param {Function} router.get
 */
function iaApiReadRouting( router ) {
  router.get( '/ia-api-read', function ( req, res, next ) {
    req.type = 'all';
    next();
  }, pageAiReadApi );

  router.get( '/ia-api-read/:identifier', function ( req, res, next ) {
    req.type = 'all';
    next();
  }, pageAiReadApi );

  router.get( '/ia-api-read/:identifier/files', function ( req, res, next ) {
    req.type = 'files';
    next();
  }, pageAiReadApi );

  router.get( '/ia-api-read/:identifier/files/:index/name', function ( req, res, next ) {
    req.type = 'files_index';
    next();
  }, pageAiReadApi );

  router.get( '/ia-api-read/:identifier/files_count', function ( req, res, next ) {
    req.type = 'files_count';
    next();
  }, pageAiReadApi );

  router.get( '/ia-api-read/:identifier/metadata', function ( req, res, next ) {
    req.type = 'metadata';
    next();
  }, pageAiReadApi );

  router.get( '/ia-api-read/:identifier/metadata/collection', function ( req, res, next ) {
    req.type = 'collection';
    next();
  }, pageAiReadApi );

  router.get( '/ia-api-read/:identifier/metadata/collection/:index', function ( req, res, next ) {
    req.type = 'collection_index';
    next();
  }, pageAiReadApi );

  router.get( '/ia-api-read/:identifier/metadata/title', function ( req, res, next ) {
    req.type = 'title';
    next();
  }, pageAiReadApi );

  router.get( '/ia-api-read/:identifier/server', function ( req, res, next ) {
    req.type = 'server';
    next();
  }, pageAiReadApi );
}

module.exports = iaApiReadRouting;
