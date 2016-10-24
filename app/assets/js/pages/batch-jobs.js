'use strict';

/**
 * module dependencies
 */
var lib = require( 'node-front-end-lib' );

function updateButtonUi( button, action, response ) {
  var tr = lib.findAncestorWithTagName( button, 'tr' );

  if ( action === 'pause' ) {
    lib.removeClass( button, 'icon-pause' );
    lib.addClass( button, 'icon-play' );
  } else if ( action === 'play' ) {
    lib.removeClass( button, 'icon-play' );
    lib.addClass( button, 'icon-pause' );
  }

  lib.removeClass( button, 'clicked' );

  button.setAttribute( 'data-state', response.state );
  button.setAttribute( 'data-action', response.action );
  tr.getElementsByClassName( 'state' )[ 0 ].innerHTML = response.state;
}

function playPauseBatchJob( button ) {
  var action = button.getAttribute( 'data-action' );
  var response;

  var data = 'action=%action&project=%project&state=%state&_csrf=%csrf'
    .replace( '%csrf', encodeURIComponent( document.getElementsByName( '_csrf' )[ 0 ].value ) )
    .replace( '%action', encodeURIComponent( action ) )
    .replace( '%project', encodeURIComponent( button.getAttribute( 'data-project' ) ) )
    .replace( '%state', encodeURIComponent( button.getAttribute( 'data-state' ) ) );

  lib.ajax.post( '/ajax/play-pause-batch-job', { data: data } )
    .then(
      function ( xhr ) {
        response = lib.extractXhrResponse( xhr );
        response = JSON.parse( response );

        if ( response.status === 'success' ) {
          updateButtonUi( button, action, response );
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
  playPauseBatchJob( this, app_data );
}

function attachPlayPauseHandler( button, app_data ) {
  button.addEventListener( 'click', function ( evt ) {
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