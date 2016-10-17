'use strict';

/**
 * module dependencies
 */
var addSpinner = require( '../add/add-spinner' );
var lib = require( 'node-front-end-lib' );

/**
 * @param {Object} app_data
 */
function updateUI( app_data ) {
  var item_control = document.getElementById( 'item-control' );

  app_data.form.removeChild( app_data.search );
  item_control.removeChild( app_data.item_control.previous );
  item_control.removeChild( app_data.item_control.next );
  item_control.removeChild( app_data.item_control.create_batch_job );

  lib.addClass( app_data.metadata.row, 'center' );
  addSpinner( app_data );
}

/**
 * @param {Object} app_data
 */
function createBatchJob( app_data ) {
  var data;
  var prompt;
  var response;

  data = 'project=%project&count=%count&_csrf=%csrf'
    .replace( '%project', encodeURIComponent( app_data.project ) )
    .replace( '%count', parseInt( app_data.count, 10 ) )
    .replace( '%csrf', encodeURIComponent( document.getElementsByName( '_csrf' )[ 0 ].value ) );

  prompt = 'are you sure you want to create a batch job for %project  ( %count items ) ?'
    .replace( '%project', encodeURIComponent( app_data.project ) )
    .replace( '%count', parseInt( app_data.count, 10 ) );

  if ( !confirm( prompt ) ) {
    return;
  }

  updateUI( app_data );

  lib.ajax.post( '/ajax/create-batch-job', { data: data } )
    .then(
      function ( xhr ) {
        response = lib.extractXhrResponse( xhr );
        response = JSON.parse( response );

        if ( !response.batch_job ) {
          throw new Error( 'check server error log' );
        }

        app_data.metadata.row.innerHTML = '<h2>batch job created</h2><a href="/batch-jobs">batch jobs</a>';
      }
    )
    .catch(
      function ( err ) {
        app_data.metadata.row.innerHTML = '<p class="error">we apologize; there was a problem creating the batch job.</p>';
        console.log( err );
      }
    );
}

module.exports = createBatchJob;
