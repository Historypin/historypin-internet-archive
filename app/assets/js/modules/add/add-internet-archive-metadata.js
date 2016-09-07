'use strict';

/**
 * module variables
 */
var getMappedMetadataValue;

/**
 * module dependencies
 */
getMappedMetadataValue = require( './../get/get-mapped-metadata-value' );

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
  var mapped_metadata_value;

  html = '';

  if ( !( hp_item instanceof Object ) ) {
    return html;
  }

  if ( !( app_data instanceof Object ) ) {
    return html;
  }

  html = '<tbody>';

  for ( ia_property in app_data.mapping ) {
    mapped_metadata_value = '';

    if ( !app_data.mapping.hasOwnProperty( ia_property ) ) {
      continue;
    }

    fields = app_data.mapping[ ia_property ];

    if ( fields instanceof Array ) {
      for ( i = 0; i < fields.length; i += 1 ) {
        custom_field = fields[ i ];
        custom_property = Object.keys( custom_field )[ 0 ];
        mapped_metadata_value = getMappedMetadataValue( hp_item, custom_field[ custom_property ] );
        html += '<tr><td>' + custom_property + '</td><td>' + mapped_metadata_value + '</td></tr>';

        if ( custom_property === 'hp-media-url' ) {
          html += '<tr><td></td><td><a href="' + mapped_metadata_value + '" target="_blank"><img src="' + mapped_metadata_value + '" width="300"/></a></td></tr>';
        }
      }

      continue;
    }

    mapped_metadata_value = getMappedMetadataValue( hp_item, app_data.mapping[ ia_property ] );
    html += '<tr><td>' + ia_property + '</td><td>' + mapped_metadata_value + '</td></tr>';
  }

  html += '</tbody>';
  app_data.metadata.internet_archive.innerHTML = html;
};