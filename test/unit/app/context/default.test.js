/* globals describe, it */
'use strict';

/**
 * module dependencies
 */
var expect = require( 'chai' ).expect;
var getDefaultContext = require( '../../../../app/contexts/default' );
var req = require( '../../fixtures/req' );

describe( 'getDefaultContext( req )', function () {
  var context = getDefaultContext( req );

  describe( 'should return context', function () {
    it( 'as an object', function () {
      expect( context ).to.be.an( 'object' );
    } );

    describe( 'that contains', function () {
      describe( 'partials', function () {
        it( 'as an object', function () {
          expect( context.partials ).to.be.an( 'object' );
        } );
      } );

      describe( 'lang', function () {
        it( 'as a string', function () {
          expect( context.lang ).to.be.a( 'string' );
        } );

        it( 'equal to the req.session.lang value', function () {
          expect( context.lang ).to.equal( 'en' );
        } );
      } );


      describe( 'csrfToken', function () {
        it( 'as a string', function () {
          expect( context.csrfToken ).to.be.a( 'string' );
        } );

        it( 'equal to the value returned by req.csrfToken()', function () {
          expect( context.csrfToken ).to.equal( '56Gshjfe$' );
        } );
      } );

      describe( 'development', function () {
        it( 'as a boolean', function () {
          expect( context.development ).to.be.a( 'boolean' );
        } );

        if ( process.env.NODE_ENV === 'development' ) {
          it( 'set to true when process.env.NODE_ENV is development', function () {
            expect( context.development ).to.equal( true );
          } );
        } else {
          it( 'set to false when process.env.NODE_ENV is not development', function () {
            expect( context.development ).to.equal( false );
          } );
        }
      } );
    } );
  } );
} );
