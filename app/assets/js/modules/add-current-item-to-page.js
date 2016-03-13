'use strict';

/**
 * module variables
 */
var addFixedItemProperties;
var addHistorypinMetadata;
var addInternetArchiveMetadata;

/**
 * module dependencies
 */
addFixedItemProperties = require( './add-fixed-item-properties' );
addHistorypinMetadata = require( './add-historypin-metadata' );
addInternetArchiveMetadata = require( './add-internet-archive-metadata' );

/**
 * @param {Object} app_data
 */
module.exports = function addCurrentItemToPage( app_data ) {
  var hp_item;

  hp_item = app_data.items[ app_data.current_item_index ];
  addFixedItemProperties( hp_item );

  addHistorypinMetadata( hp_item, app_data );
  addInternetArchiveMetadata( hp_item, app_data );
};