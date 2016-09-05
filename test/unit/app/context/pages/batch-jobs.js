/* globals before, describe, it */
'use strict';

/**
 * module dependencies
 */
var expect = require( 'chai' ).expect;
var getBatchJobsPageContext = require( '../../../../../app/contexts/pages/batch-jobs' );
var fileExists = require( 'node-file-exists' );

describe( 'getBatchJobsPageContext( context )', function () {
  var context;

  before( function () {
    context = require( '../../../fixtures/context' );
    context = getBatchJobsPageContext( context );
  } );

  describe( 'should return context', function () {
    it( 'as an object', function () {
      expect( context ).to.be.an( 'object' );
    } );

    describe( 'that contains', function () {
      describe( 'partials[ batch-jobs ]', function () {
        it( 'as a string', function () {
          expect( context.partials[ 'batch-jobs' ] ).to.be.an( 'string' );
        } );

        it( 'that refers to a view file that exits', function () {
          var file_exists = fileExists( context.partials[ 'batch-jobs' ] + '/index.hjs' );
          expect( file_exists ).to.be.true;
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

          it( 'equal to `batch-jobs`', function () {
            expect( context.body.id ).to.equal( 'batch-jobs' );
          } );
        } );
      } );

      describe( 'template', function () {
        it( 'as a string', function () {
          expect( context.template ).to.be.an( 'string' );
        } );

        it( 'set to the string value of partials[ batch-jobs ]', function () {
          expect( context.template ).to.equal( context.partials[ 'batch-jobs' ] );
        } );
      } );
    } );
  } );
} );
