'use strict';

/**
 * module variables
 */
var template;
var parseValue;

/**
 * module dependencies
 */
parseValue = require( './parsers/parse-value' );

function getValueFromTag( hp_item, source_property ) {
  var i;
  var result;
  var tag;

  result = '';

  if ( !( hp_item[ source_property ] instanceof Array ) ) {
    return result;
  }

  for ( i = 0; i < hp_item[ source_property ].length; i += 1 ) {
    tag = hp_item[ source_property ][ i ];

    if ( typeof tag.text === 'string' ) {
      result += tag.text + ', ';
    }
  }

  return result.trim().slice( 0, -1 );
}

/**
 * @param {Object} hp_item
 * @param {Object} ia_item
 * @param {string} source_property
 * @returns {string}
 */
function getValueMappedFromObject( hp_item, ia_item, source_property ) {
  var i;
  var search;
  var source_property_array;
  var value;

  source_property_array = source_property.split( '.' );

  for ( i = 0; i < source_property_array.length; i += 1 ) {
    if ( typeof value === 'undefined' ) {
      value = hp_item[ source_property_array[ i ] ];
    } else {
      value = value[ source_property_array[ i ] ];
    }
  }

  value = parseValue( value, ia_item );

  if ( template ) {
    search = new RegExp( '%' + source_property + '%', 'g' );
    template = template.replace( search, value ) + ' ';
    value = template;
  } else {
    value += ' ';
  }

  return value;
}

/**
 * @param {Object} hp_item
 * @param {Object} ia_item
 * @param {string} source_property
 * @returns {string}
 */
function getValueMapped( hp_item, ia_item, source_property ) {
  var i;
  var result;
  var search;
  var value;

  result = '';
  value = hp_item[ source_property ];

  if ( typeof value === 'undefined' ) {
    return result;
  }

  if ( typeof value === 'string' || typeof value === 'number' ) {

    value = parseValue( value, ia_item );

    if ( template ) {
      search = new RegExp( '%' + source_property + '%', 'g' );
      template = template.replace( search, value ) + ' ';
      result = template;
    } else {
      result += value + ' ';
    }
  }

  return result;
}

/**
 * @param {Object} ia_item
 */
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

  // value represents a static value that will be used
  if ( typeof ia_item.value === 'string' ) {
    result = ia_item.value;

    // value may be dynamic
  } else if ( ia_item[ 'source-properties' ] instanceof Array ) {
    for ( i = 0; i < ia_item[ 'source-properties' ].length; i += 1 ) {
      source_property = ia_item[ 'source-properties' ][ i ];

      if ( typeof source_property !== 'string' ) {
        continue;
      }

      if ( source_property === 'tags' ) {
        return getValueFromTag( hp_item, source_property );
      }

      if ( source_property.indexOf( '.' ) !== -1 ) {
        if ( template ) {
          result = getValueMappedFromObject( hp_item, ia_item, source_property );
        } else {
          result += getValueMappedFromObject( hp_item, ia_item, source_property );
        }
      } else {
        if ( template ) {
          result = getValueMapped( hp_item, ia_item, source_property );
        } else {
          result += getValueMapped( hp_item, ia_item, source_property );
        }
      }
    }
  }

  return result.trim();
};
