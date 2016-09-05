/* globals describe, it */
'use strict';

var expect = require( 'chai' ).expect;
var getDefaultContext = require( '../../../app/contexts/default' );

describe( 'getInitialContext( req )', function () {
  var req = {
    csrfToken: function csrfToken() {
      return '56Gshjfe$';
    },
    session: {
      lang: 'en'
    }
  };

  var context = getDefaultContext( req );

  it( 'should return an object', function () {
    expect( context ).to.be.an( 'object' );
  } );

  it( 'should return an object that contains a `partials` object', function() {
    expect( context.partials ).to.be.an( 'object' );
  } );

  it( 'should return an object that contains a `lang` string equal to the req.session.lang value', function() {
    expect( context.lang ).to.equal( 'en' );
  } );

  it( 'should return an object that contains a `csrfToken` string equal to the value returned by req.csrfToken()', function() {
    expect( context.csrfToken ).to.equal( '56Gshjfe$' );
  } );

  if ( process.env.NODE_ENV === 'development' ) {
    it( 'should return an object that contains a `development` boolean set to true when process.env.NODE_ENV is development', function() {
      expect( context.development ).to.equal( true );
    } );
  } else {
    it( 'should return an object that contains a `development` boolean set to false when process.env.NODE_ENV is not development', function() {
      expect( context.development ).to.equal( false );
    } );
  }
} );
