/* globals before, describe, it */
'use strict';

/**
 * module dependencies
 */
var expect = require( 'chai' ).expect;
var getGenericPageContext = require( '../../../../../app/contexts/pages/generic' );
var fileExists = require( 'node-file-exists' );

describe( 'getGenericPageContext( req, context )', function () {
  var context;
  var req;

  before( function () {
    context = require( '../../../fixtures/context' );
    req = require( '../../../fixtures/req' );
    context = getGenericPageContext( req, context );
  } );

  describe( 'should return context', function () {
    it( 'as an object', function () {
      expect( context ).to.be.an( 'object' );
    } );

    describe( 'that contains', function () {
      describe( 'partials[ html-open ]', function () {
        it( 'as a string', function () {
          expect( context.partials[ 'html-open' ] ).to.be.an( 'string' );
        } );

        it( 'that refers to a view file that exits', function () {
          var file_exists = fileExists( context.partials[ 'html-open' ] + '.hjs' );
          expect( file_exists ).to.be.true;
        } );
      } );

      describe( 'partials[ html-close ]', function () {
        it( 'as a string', function () {
          expect( context.partials[ 'html-close' ] ).to.be.an( 'string' );
        } );

        it( 'that refers to a view file that exits', function () {
          var file_exists = fileExists( context.partials[ 'html-close' ] + '.hjs' );
          expect( file_exists ).to.be.true;
        } );
      } );
    } );
  } );
} );
