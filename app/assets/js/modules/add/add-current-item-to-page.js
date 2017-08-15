'use strict';

/**
 * module dependencies
 */
var addFixedItemProperties = require( './add-fixed-item-properties' );
var addHistorypinMetadata = require( './add-historypin-metadata' );
var addInternetArchiveMetadata = require( './add-internet-archive-metadata' );

/**
 * @param {Object} app_data
 */
function addCurrentItemToPage( app_data ) {
  var hp_item;

  if ( !app_data.items[ app_data.current_item_index ] ) {
    console.warn( 'addCurrentItemToPage(): app_data.items[ app_data.current_item_index ] does not exist' );
    return;
  }

  if ( !( app_data.items[ app_data.current_item_index ].details instanceof Object ) ) {
    console.warn( 'addCurrentItemToPage(): app_data.items[ app_data.current_item_index ].details not provided as an Object' );
    return;
  }

  hp_item = app_data.items[ app_data.current_item_index ].details;

  addFixedItemProperties( hp_item );
  addHistorypinMetadata( hp_item, app_data );
  addInternetArchiveMetadata( hp_item, app_data );
}

module.exports = addCurrentItemToPage;
