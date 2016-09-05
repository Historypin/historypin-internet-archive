/* globals describe, it */
'use strict';

/**
 * module dependencies
 */
var expect = require( 'chai' ).expect;
var getDefaultContext = require( '../../../../app/contexts/default' );
var req = require( '../../fixtures/req' );

describe( 'getInitialContext( req )', function () {
  var context = getDefaultContext( req );

  describe( 'should return', function () {
    it( 'an object', function () {
      expect( context ).to.be.an( 'object' );
    } );

    it( 'that contains `partials` as an object', function () {
      expect( context.partials ).to.be.an( 'object' );
    } );

    it( 'that contains `lang` as a string, equal to the req.session.lang value', function () {
      expect( context.lang ).to.equal( 'en' );
    } );

    it( 'that contains `csrfToken` as a string, equal to the value returned by req.csrfToken()', function () {
      expect( context.csrfToken ).to.equal( '56Gshjfe$' );
    } );

    if ( process.env.NODE_ENV === 'development' ) {
      it( 'that contains `development` as a boolean set to true when process.env.NODE_ENV is development', function () {
        expect( context.development ).to.equal( true );
      } );
    } else {
      it( 'that contains `development` as a boolean, set to false when process.env.NODE_ENV is not development', function () {
        expect( context.development ).to.equal( false );
      } );
    }
  } );
} );
