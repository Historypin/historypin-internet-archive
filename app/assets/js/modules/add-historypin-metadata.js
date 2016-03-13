'use strict';

/**
 * module variables
 */
var augmentItemMetadata;

/**
 * module dependencies
 */
augmentItemMetadata = require( './augment-item-metadata' );

/**
 * @param {Object} hp_item
 * @param {Object} app_data
 */
module.exports = function addHistorypinMetadata( hp_item, app_data ) {
  var html;
  var property;
  var sub_property;
  var content;

  html = '';

  if ( !( hp_item instanceof Object ) ) {
    return html;
  }

  if ( !( app_data instanceof Object ) ) {
    return html;
  }

  html = '<tbody>';

  for ( property in hp_item ) {
    if ( !hp_item.hasOwnProperty( property ) ) {
      continue;
    }

    augmentItemMetadata( property, hp_item );

    content = '<tr><td>' + property + '</td><td>' + hp_item[ property ] + '</td></tr>';

    if ( hp_item[ property ] instanceof Object ) {
      content = '';

      for ( sub_property in hp_item[ property ] ) {
        if ( !hp_item[ property ].hasOwnProperty( sub_property ) ) {
          continue;
        }

        content += '<tr><td>' + property + '.' + sub_property + '</td><td>' + hp_item[ property ][ sub_property ] + '</td></tr>';
      }
    }

    html += content;
  }

  html += '</tbody>';
  app_data.metadata.historypin.innerHTML = html;
};