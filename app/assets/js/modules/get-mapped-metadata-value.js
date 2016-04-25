'use strict';

/**
 * module variables
 */
var template;

function getValueMappedFromObject( hp_item, source_property ) {
  var i;
  var value;
  var search;
  var source_property_array;

  source_property_array = source_property.split( '.' );

  for ( i = 0; i < source_property_array.length; i += 1 ) {
    if ( typeof value === 'undefined' ) {
      value = hp_item[ source_property_array[ i ] ];
    } else {
      value = value[ source_property_array[ i ] ];
    }
  }

  if ( template ) {
    search = new RegExp( '%' + source_property + '%', 'g' );
    template = template.replace( search, value ) + ' ';
    value = template;
  } else {
    value += ' ';
  }

  return value;
}

function getValueMapped( hp_item, source_property ) {
  var i;
  var result;
  var search;

  result = '';

  if ( typeof hp_item[ source_property ] === 'undefined' ) {
    return result;
  }

  if ( typeof hp_item[ source_property ] === 'string' || typeof hp_item[ source_property ] === 'number' ) {
    if ( template ) {
      search = new RegExp( '%' + source_property + '%', 'g' );
      template = template.replace( search, hp_item[ source_property ] ) + ' ';
      result = template;
    } else {
      result += hp_item[ source_property ] + ' ';
    }
  }

  return result;
}

function setTemplate( ia_item ) {
  var i;
  var templates;

  template = undefined;

  if ( !( ia_item[ 'value-templates' ] instanceof Array ) ) {
    return;
  }

  templates = ia_item[ 'value-templates' ];

  for ( i = 0; i < templates.length; i += 1 ) {
    if ( typeof templates[ i ] !== 'string' ) {
      continue;
    }

    if ( typeof template === 'undefined' ) {
      template = templates[ i ];
    } else {
      template += ' ' + templates[ i ];
    }
  }
}

/**
 * @todo refine logic and handle expected formats
 *
 * @param {Object} hp_item
 * @param {Object} ia_item
 * @returns {string}
 */
module.exports = function getMappedMetadataValue( hp_item, ia_item ) {
  var i;
  var result;
  var source_property;

  result = '';

  if ( !( hp_item instanceof Object ) ) {
    return result;
  }

  if ( !( ia_item instanceof Object ) ) {
    return result;
  }

  setTemplate( ia_item );

  if ( typeof ia_item.value === 'string' ) {
    result = ia_item.value;
  } else if ( ia_item[ 'source-properties' ] instanceof Array ) {
    for ( i = 0; i < ia_item[ 'source-properties' ].length; i += 1 ) {
      source_property = ia_item[ 'source-properties' ][ i ];

      if ( typeof source_property !== 'string' ) {
        continue;
      }

      if ( source_property.indexOf( '.' ) !== -1 ) {
        if ( template ) {
          result = getValueMappedFromObject( hp_item, source_property );
        } else {
          result += getValueMappedFromObject( hp_item, source_property );
        }
      } else {
        if ( template ) {
          result = getValueMapped( hp_item, source_property );
        } else {
          result += getValueMapped( hp_item, source_property );
        }
      }
    }
  }

  return result.trim();
};