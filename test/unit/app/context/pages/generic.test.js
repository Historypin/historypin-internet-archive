/* globals describe, it */
'use strict';

/**
 * module dependencies
 */
var expect = require( 'chai' ).expect;
var getGenericPageContext = require( '../../../../../app/contexts/pages/generic' );
var req = require( '../../../fixtures/req' );
var context = require( '../../../fixtures/context' );
var fileExists = require( 'node-file-exists' );

describe( 'getGenericPageContext( req, context )', function () {
  context = getGenericPageContext( req, context );

  describe( 'should return an object that contains `partials[ html-open ]`', function () {
    it( 'as a string', function () {
      expect( context.partials[ 'html-open' ] ).to.be.an( 'string' );
    } );

    it( 'that refers to a view file that exits', function () {
      var file_exists = fileExists( context.partials[ 'html-open' ] + '.hjs' );
      expect( file_exists ).to.be.true;
    } );
  } );

  describe( 'should return an object that contains `partials[ html-close ]`', function () {
    it( 'as a string', function () {
      expect( context.partials[ 'html-close' ] ).to.be.an( 'string' );
    } );

    it( 'that refers to a view file that exits', function () {
      var file_exists = fileExists( context.partials[ 'html-close' ] + '.hjs' );
      expect( file_exists ).to.be.true;
    } );
  } );
} );
