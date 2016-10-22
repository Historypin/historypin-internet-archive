'use strict';

/**
 * module dependencies
 */
var aiApi = require( '../middleware/pages/ia-api' );

/**
 * @param {Function} router
 * @param {Function} router.get
 */
function iaApiRouting( router ) {
  router.get( '/ia-api', function ( req, res, next ) {
    req.type = 'all';
    next();
  }, aiApi );

  router.get( '/ia-api/:identifier', function ( req, res, next ) {
    req.type = 'all';
    next();
  }, aiApi );

  router.get( '/ia-api/:identifier/files', function ( req, res, next ) {
    req.type = 'files';
    next();
  }, aiApi );

  router.get( '/ia-api/:identifier/files/:index/name', function ( req, res, next ) {
    req.type = 'files_index';
    next();
  }, aiApi );

  router.get( '/ia-api/:identifier/files_count', function ( req, res, next ) {
    req.type = 'files_count';
    next();
  }, aiApi );

  router.get( '/ia-api/:identifier/metadata', function ( req, res, next ) {
    req.type = 'metadata';
    next();
  }, aiApi );

  router.get( '/ia-api/:identifier/metadata/collection', function ( req, res, next ) {
    req.type = 'collection';
    next();
  }, aiApi );

  router.get( '/ia-api/:identifier/metadata/collection/:index', function ( req, res, next ) {
    req.type = 'collection_index';
    next();
  }, aiApi );

  router.get( '/ia-api/:identifier/metadata/title', function ( req, res, next ) {
    req.type = 'title';
    next();
  }, aiApi );

  router.get( '/ia-api/:identifier/server', function ( req, res, next ) {
    req.type = 'server';
    next();
  }, aiApi );
}

module.exports = iaApiRouting;
