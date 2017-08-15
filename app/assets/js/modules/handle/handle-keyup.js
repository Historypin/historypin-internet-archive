'use strict';

/**
 * module dependencies
 */
var lib = require( 'node-front-end-lib' );

/**
 * @param {Event} evt
 */
function handleKeyUp( evt ) {
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
}

module.exports = handleKeyUp;
