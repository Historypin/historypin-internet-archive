'use strict';

/**
 * module variables
 */
var lib;

/**
 * module dependencies
 */
lib = require( 'node-front-end-lib' );

/**
 * @typedef {Function} handleKeyUp.call
 * @param {Event} evt
 */
module.exports = function handleKeyUp( evt ) {
  var app_data;

  app_data = evt.data;

  switch ( evt.keyCode ) {
    case 37:
      lib.triggerEvent( 'click', 'MouseEvent', app_data.item_control.previous );
      break;
    case 39:
      lib.triggerEvent( 'click', 'MouseEvent', app_data.item_control.next );
      break;
  }
};