/* globals describe, it */
'use strict';

/**
 * module dependencies
 */
var expect = require( 'chai' ).expect;
var getHomePageContext = require( '../../../../../app/contexts/pages/home' );
var context = require( '../../../fixtures/context' );
var fileExists = require( 'node-file-exists' );

describe( 'getHomePageContext( context )', function () {
  context = getHomePageContext( context );

  describe( 'should return context', function () {
    it( 'as an object', function () {
      expect( context ).to.be.an( 'object' );
    } );

    describe( 'that contains', function () {
      describe( 'partials.home', function () {
        it( 'as a string', function () {
          expect( context.partials.home ).to.be.an( 'string' );
        } );

        it( 'that refers to a view file that exits', function () {
          var file_exists = fileExists( context.partials.home + '/index.hjs' );
          expect( file_exists ).to.be.true;
        } );
      } );

      describe( 'partials[ form-search ]', function () {
        it( 'as a string', function () {
          expect( context.partials[ 'form-search' ] ).to.be.an( 'string' );
        } );

        it( 'that refers to a view file that exits', function () {
          var file_exists = fileExists( context.partials[ 'form-search' ] + '.hjs' );
          expect( file_exists ).to.be.true;
        } );
      } );

      describe( 'body', function () {
        it( 'as an object', function () {
          expect( context.body ).to.be.an( 'object' );
        } );

        it( 'that contains `id` as a string value set to `home`', function () {
          expect( context.body.id ).to.equal( 'home' );
        } );
      } );

      describe( 'template', function () {
        it( 'as a string', function () {
          expect( context.template ).to.be.an( 'string' );
        } );

        it( 'set to the string value of partials.home', function () {
          expect( context.template ).to.equal( context.partials.home );
        } );
      } );
    } );
  } );
} );
