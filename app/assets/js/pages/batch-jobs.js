'use strict';

/**
 * module dependencies
 */
var lib = require( 'node-front-end-lib' );

function playBatchJob( button ) {
  var response;

  var data = 'project=%project&_csrf=%csrf'
    .replace( '%project', encodeURIComponent( button.getAttribute( 'data-project' ) ) )
    .replace( '%csrf', encodeURIComponent( document.getElementsByName( '_csrf' )[ 0 ].value ) );

  lib.ajax.post( '/ajax/play-batch-job', { data: data } )
    .then(
      function ( xhr ) {
        response = lib.extractXhrResponse( xhr );
        response = JSON.parse( response );

        if ( response.status === 'success' ) {
          lib.removeClass( button, 'icon-play' );
          lib.addClass( button, 'icon-pause' );
          lib.removeClass( button, 'clicked' );
        }
      }
    )
    .catch(
      function ( err ) {
        console.log( err );
      }
    );
}

function pauseBatchJob( button ) {
  var response;

  var data = 'project=%project&_csrf=%csrf'
    .replace( '%project', encodeURIComponent( button.getAttribute( 'data-project' ) ) )
    .replace( '%csrf', encodeURIComponent( document.getElementsByName( '_csrf' )[ 0 ].value ) );

  lib.ajax.post( '/ajax/pause-batch-job', { data: data } )
    .then(
      function ( xhr ) {
        response = lib.extractXhrResponse( xhr );
        response = JSON.parse( response );

        if ( response.status === 'success' ) {
          lib.removeClass( button, 'icon-pause' );
          lib.addClass( button, 'icon-play' );
          lib.removeClass( button, 'clicked' );
        }
      }
    )
    .catch(
      function ( err ) {
        console.log( err );
      }
    );
}

function handlePlayPauseClick( evt, app_data ) {
  if ( lib.hasClass( this, 'clicked' ) ) {
    return;
  }

  lib.toggleClass( this, 'clicked' );

  if ( lib.hasClass( this, 'icon-pause' ) ) {
    pauseBatchJob( this, app_data );
  } else if ( lib.hasClass( this, 'icon-play' )) {
    playBatchJob( this, app_data );
  }
}

function attachPlayPauseHandler( button, app_data ) {
  button.addEventListener( 'click', function( evt ) {
    handlePlayPauseClick.call( this, evt, app_data );
  } );
}

function addPlayPauseListener( app_data ) {
  var i;

  for ( i = 0; i < app_data.play_pause.length; i += 1 ) {
    attachPlayPauseHandler( app_data.play_pause[ i ], app_data );
  }
}

function setup( page ) {
  var app_data;

  if ( page !== 'batch-jobs' ) {
    return;
  }

  app_data = {};
  app_data.batch_job_rows = document.getElementById( 'batch-job-rows' );
  app_data.play_pause = document.getElementsByClassName( 'play-pause' );

  addPlayPauseListener( app_data );
}

module.exports = setup;