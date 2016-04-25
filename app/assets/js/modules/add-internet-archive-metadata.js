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
  var custom_field;
  var custom_property;
  var fields;
  var html;
  var i;
  var ia_property;

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

    fields = app_data.mapping[ ia_property ];

    if ( fields instanceof Array ) {
      for ( i = 0; i < fields.length; i += 1 ) {
        custom_field = fields[ i ];
        custom_property = Object.keys( custom_field )[0];
        html += '<tr><td>' +  custom_property + '</td><td>' + getMappedMetadataValue( hp_item, custom_field[ custom_property ] ) + '</td></tr>';
      }

      continue;
    }

    html += '<tr><td>' + ia_property + '</td><td>' + getMappedMetadataValue( hp_item, app_data.mapping[ ia_property ] ) + '</td></tr>';
  }

  html += '</tbody>';
  app_data.metadata.internet_archive.innerHTML = html;
};