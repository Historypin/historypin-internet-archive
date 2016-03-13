'use strict';

/**
 * module variables
 */
var getMappedMetadataValue;

/**
 * module dependencies
 */
getMappedMetadataValue = require( './get-mapped-metadata-value' );

/**
 * @param hp_item
 * @param app_data
 */
module.exports = function addInternetArchiveMetadata( hp_item, app_data ) {
  var html;
  var ia_property;
  var content;

  html = '';

  if ( !( hp_item instanceof Object ) ) {
    return html;
  }

  if ( !( app_data instanceof Object ) ) {
    return html;
  }

  html = '<tbody>';

  for ( ia_property in app_data.mapping ) {
    if ( !app_data.mapping.hasOwnProperty( ia_property ) ) {
      continue;
    }

    if ( ia_property === 'custom-fields' ) {
      continue;
    }

    content = '<tr><td>' + ia_property + '</td><td>' + getMappedMetadataValue( hp_item, app_data.mapping[ ia_property ] ) + '</td></tr>';
    html += content;
  }

  html += '</tbody>';
  app_data.metadata.internet_archive.innerHTML = html;
};