'use strict';

/**
 * module dependencies
 */
var addCurrentItemToPage = require( './add-current-item-to-page' );
var addSpinner = require( './add-spinner' );
var getPinDetails = require( './get-pin-details' );
var getProjectPinIds = require( './get-project-pin-ids' );
var handleGetPinDetails = require( './handle-get-pin-details' );
var handleGetProjectPinIds = require( './handle-get-project-pin-ids' );
var lib = require( 'node-front-end-lib' );
var updateItemControls = require( './update-item-controls' );

/**
 * @param {Object} app_data
 */
function createBatchJob( app_data ) {
  var data;
  var response;
  var item_control;

  data = 'app_data=' + JSON.stringify( app_data );
  data += '&_csrf=' + encodeURIComponent( document.getElementsByName( '_csrf' )[ 0 ].value );

  if ( confirm( 'are you sure you want to create a batch job for ' + app_data.project + ' ( ' + app_data.count + ' items ) ?' ) ) {
    item_control = document.getElementById( 'item-control' );
    app_data.form.removeChild( app_data.search );
    item_control.removeChild( app_data.item_control.previous );
    item_control.removeChild( app_data.item_control.next );
    item_control.removeChild( app_data.item_control.create_batch_job );

    lib.addClass( app_data.metadata.row, 'center' );
    addSpinner( app_data );

    lib.ajax.post( '/ajax/create-batch-job', { data: data } )
      .then(
        function ( xhr ) {
          response = lib.extractXhrResponse( xhr );
          response = JSON.parse( response );

          if ( response[ 'batch-job-created' ] !== true ) {
            return;
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
}

/**
 * @param {Object} app_data
 */
function previousItem( app_data ) {
  app_data.current_item_index -= 1;
  processItemRequest( app_data );
}

/**
 * @param {Object} app_data
 */
function processItemRequest( app_data ) {
  // get project pin ids
  if ( app_data.current_item_index === app_data.items.length - 1 ) {
    if ( app_data.current_item_index + 1 >= app_data.count ) {
      return;
    }

    getProjectPinIds( app_data )
      .then(
        function ( xhr ) {
          handleGetProjectPinIds.call( this, xhr, app_data );
        }
      )
      .catch(
        function ( err ) {
          console.log( err );
        }
      );
  }

  // get item details
  if ( app_data.items[ app_data.current_item_index ] && !app_data.items[ app_data.current_item_index ].details ) {
    getPinDetails( app_data )
      .then(
        function ( xhr ) {
          handleGetPinDetails.call( this, xhr, app_data );
        }
      )
      .catch(
        function ( err ) {
          console.log( err );
        }
      );

    return;
  }

  updateItemControls( app_data );
  addCurrentItemToPage( app_data );
}

/**
 * @param {Object} app_data
 */
function nextItem( app_data ) {
  app_data.current_item_index += 1;

  if ( app_data.current_item_index === app_data.count ) {
    app_data.current_item_index -= 1;
    return;
  }

  processItemRequest( app_data );
}

/**
 * @param {string} action
 * @returns {*}
 */
function getControlHandler( action ) {
  return {
    'create-batch-job': createBatchJob,
    'next': nextItem,
    'previous': previousItem
  }[ action ];
}

/**
 * @typedef {Function} handleItemControlClick.call
 * @param {Event} evt
 */
module.exports = function handleItemControlClick( evt ) {
  var app_data;
  var button;
  var controlHandler;

  evt.preventDefault();
  app_data = evt.data;
  button = evt.target || evt.srcElement;
  controlHandler = getControlHandler( button.getAttribute( 'data-action' ) );

  if ( controlHandler instanceof Function ) {
    controlHandler( app_data );
  }
};