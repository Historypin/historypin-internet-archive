'use strict';

/**
 * @todo refine logic and handle expected formats
 *
 * @param {Object} hp_item
 * @param {Object} ia_item
 * @returns {string}
 */
module.exports = function getMappedMetadataValue( hp_item, ia_item ) {
  var i;
  var j;
  var result;
  var source_property;
  var templates;
  var template;
  var search;

  result = '';
  templates = [];

  if ( !( hp_item instanceof Object ) ) {
    return result;
  }

  if ( !( ia_item instanceof Object ) ) {
    return result;
  }

  if ( ia_item[ 'value-templates' ] instanceof Array ) {
    templates = ia_item[ 'value-templates' ];
  }

  if ( typeof ia_item.value === 'string' ) {
    result += ia_item.value;
  } else if ( ia_item[ 'source-properties' ] instanceof Array ) {
    for ( i = 0; i < ia_item[ 'source-properties' ].length; i += 1 ) {
      source_property = ia_item[ 'source-properties' ][ i ];

      if ( typeof source_property !== 'string' ) {
        continue;
      }

      if ( typeof hp_item[ source_property ] !== 'string' ) {
        continue;
      }

      if ( typeof template === 'undefined' ) {
        for ( j = 0; j < templates.length; j += 1 ) {
          if ( typeof templates[ j ] !== 'string' ) {
            continue;
          }

          if ( typeof template === 'undefined' ) {
            template = templates[ j ];
          } else {
            template += ' ' + templates[ j ];
          }
        }
      }

      if ( template ) {
        search = new RegExp( '%' + source_property + '%', 'g' );
        result = template = template.replace( search, hp_item[ source_property ] ) + ' ';
      } else {
        result += hp_item[ source_property ] + ' ';
      }
    }
  }

  return result.trim();
};