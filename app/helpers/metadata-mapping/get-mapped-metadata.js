'use strict';

/**
 * module dependencies
 */
var getMappedMetadataValue = require( './get-mapped-metadata-value' );

/**
 * @param {Object} mapping
 * @param {Object} pin_detail
 * @returns {Object}
 */
function getMappedMetadata( mapping, pin_detail ) {
  var custom_field;
  var custom_property;
  var fields;
  var i;
  var mapped_metadata_value;

  return Object.keys( mapping ).reduce(
    /**
     * @param {Object} acc
     * @param {Object} ia_property
     * @returns {Object}
     */
    function ( acc, ia_property ) {
      mapped_metadata_value = '';

      fields = mapping[ ia_property ];

      if ( Array.isArray( fields ) ) {
        for ( i = 0; i < fields.length; i += 1 ) {
          custom_field = fields[ i ];
          custom_property = Object.keys( custom_field )[ 0 ];
          mapped_metadata_value = getMappedMetadataValue( pin_detail, custom_field[ custom_property ] );
          acc[ custom_property ] = mapped_metadata_value;
        }

        return acc;
      }

      acc[ ia_property ] = getMappedMetadataValue( pin_detail, mapping[ ia_property ] );
      return acc;
    },
    {}
  );
}

module.exports = getMappedMetadata;
