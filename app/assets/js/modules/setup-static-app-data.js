'use strict';

/**
 * module variables
 */
var getMapping;
var handleItemControlClick;
var handleKeyUp;
var handleSubmit;
var lib;

/**
 * module dependencies
 */
getMapping = require( './get-mapping' );
handleItemControlClick = require( './handle-item-control-click' );
handleKeyUp = require( './handle-keyup' );
handleSubmit = require( './handle-submit' );
lib = require( 'node-front-end-lib' );

/**
 * @param {Object} app_data
 */
module.exports = function setupStaticAppData( app_data ) {
  // form
    app_data.form = document.getElementById( 'form-search' );
    app_data.search = lib.getFieldByName( 'search' );

  // item control
    app_data.item_control = {};
    app_data.item_control.buttons = document.getElementsByTagName( 'button' );
    app_data.item_control.previous = app_data.item_control.buttons[ 0 ];
    app_data.item_control.next = app_data.item_control.buttons[ 1 ];
    app_data.item_control.current_item = document.getElementById( 'current-item' );
    app_data.item_control.current_page = document.getElementById( 'current-page' );
    app_data.item_control.total_items = document.getElementById( 'total-items' );
    app_data.item_control.items_per_page_limit = document.getElementById( 'items-per-page-limit' );
    app_data.item_control.project = document.getElementById( 'project' );

  // mapping
    getMapping( app_data );

  // metadata
    app_data.metadata = {};
    app_data.metadata.historypin = document.getElementById( 'historypin-metadata' );
    app_data.metadata.internet_archive = document.getElementById( 'internet-archive-metadata' );

  // event listeners
    document.addEventListener( 'keyup', function bindData( evt ) {
      evt.data = app_data;
      handleKeyUp.call( this, evt );
    } );

    app_data.form.addEventListener( 'submit', function bindData( evt ) {
      evt.data = app_data;
      handleSubmit.call( this, evt );
    } );

    app_data.item_control.previous.addEventListener( 'click', function bindData( evt ) {
      evt.data = app_data;
      handleItemControlClick.call( this, evt );
    } );

    app_data.item_control.next.addEventListener( 'click', function bindData( evt ) {
      evt.data = app_data;
      handleItemControlClick.call( this, evt );
    } );
};