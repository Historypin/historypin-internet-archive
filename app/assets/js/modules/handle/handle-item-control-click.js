'use strict';

/**
 * module dependencies
 */
var createBatchJob = require( './../create/create-batch-job' );
var nextItem = require( './../items/next-item' );
var previousItem = require( './../items/previous-item' );

/**
 * module variables
 */
var item_handlers = {
  'create-batch-job': createBatchJob,
  'next': nextItem,
  'previous': previousItem
};

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
  controlHandler = item_handlers[ button.getAttribute( 'data-action' ) ];

  if ( controlHandler instanceof Function ) {
    controlHandler( app_data );
  }
};
