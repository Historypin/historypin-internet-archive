'use strict';

/**
 * module variables
 */
var express;
var path;
var router;

/**
 * variable assignments
 */
express = require( 'express' );
path = require( 'path' );
router = express.Router();

router.get( '/', require( path.join( __dirname, '..', 'controllers', 'home', 'get' ) ) );
router.get( '/ajax/get-gallery', require( path.join( __dirname, '..', 'controllers', 'ajax', 'gallery', 'get' ) ) );
router.get( '/ajax/get-mapping', require( path.join( __dirname, '..', 'controllers', 'ajax', 'mapping', 'get' ) ) );
router.get( '/ajax/get-project', require( path.join( __dirname, '..', 'controllers', 'ajax', 'project', 'get' ) ) );
router.get( '/ajax/listing', require( path.join( __dirname, '..', 'controllers', 'ajax', 'listing', 'get' ) ) );

module.exports = function routes( app ) {
  app.use( express.static( path.join( __dirname, '..', '..', 'public' ) ) );
  app.use( router );
};