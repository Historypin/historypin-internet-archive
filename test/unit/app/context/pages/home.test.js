/* globals before,describe, it */
'use strict';

/**
 * module dependencies
 */
var expect = require( 'chai' ).expect;
var getHomePageContext = require( '../../../../../app/contexts/pages/home' );
var fileExists = require( 'node-file-exists' );

describe( 'getHomePageContext( context )', function () {
  var context;

  before( function () {
    context = require( '../../../fixtures/context' );
    context = getHomePageContext( context );
  } );

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
          expect( file_exists ).to.equal( true );
        } );
      } );

      describe( 'partials[ form-search ]', function () {
        it( 'as a string', function () {
          expect( context.partials[ 'form-search' ] ).to.be.an( 'string' );
        } );

        it( 'that refers to a view file that exits', function () {
          var file_exists = fileExists( context.partials[ 'form-search' ] + '.hjs' );
          expect( file_exists ).to.equal( true );
        } );
      } );

      describe( 'body', function () {
        it( 'as an object', function () {
          expect( context.body ).to.be.an( 'object' );
        } );

        describe( 'that contains id', function () {
          it( 'as a string', function () {
            expect( context.body.id ).to.be.a( 'string' );
          } );

          it( 'equal to `home`', function () {
            expect( context.body.id ).to.equal( 'home' );
          } );
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
