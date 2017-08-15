'use strict';

/**
 * module dependencies
 */
var getMappedMetadata = require( '../../../../helpers/metadata-mapping/get-mapped-metadata' );

/**
 * @param hp_item
 * @param app_data
 */
function addInternetArchiveMetadata( hp_item, app_data ) {
  var html;
  var mapped_metadata;

  html = '';

  if ( !( hp_item instanceof Object ) ) {
    return html;
  }

  if ( !( app_data instanceof Object ) ) {
    return html;
  }

  mapped_metadata = getMappedMetadata( app_data.mapping, hp_item );

  html = Object.keys( mapped_metadata ).reduce(
    function ( acc, ia_property ) {
      acc +=
        '<tr><td>%property</td><td>%value</td></tr>'
          .replace( '%property', ia_property )
          .replace( '%value', mapped_metadata[ ia_property ] );

      if ( ia_property === 'hp-media-url' ) {
        acc +=
          '<tr><td></td><td><a href="%value" target="_blank">' +
          '<img src="%value" width="300"/></a></td></tr>'
            .replace( /%value/g, mapped_metadata[ ia_property ] );
      }

      return acc;
    },
    '<tbody>'
  );

  html += '</tbody>';
  app_data.metadata.internet_archive.innerHTML = html;
}

module.exports = addInternetArchiveMetadata;
