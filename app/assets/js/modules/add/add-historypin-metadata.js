'use strict';

/**
 * @param {string} property
 * @param {Object} hp_item
 * @returns {string}
 */
function getContentFromObject( property, hp_item ) {
  var result;
  var i;

  result = '';

  for ( i in hp_item[ property ] ) {
    if ( !hp_item[ property ].hasOwnProperty( i ) ) {
      continue;
    }

    // if ( hp_item[ property ][ i ] instanceof Object ) {
    //   console.log( property, hp_item[ property ][ i ] );
    // }

    result += '<tr><td>' + property + '.' + i + '</td><td>' + hp_item[ property ][ i ] + '</td></tr>';
  }

  return result;
}

/**
 * @param {Object} hp_item
 * @param {Object} app_data
 */
function addHistorypinMetadata( hp_item, app_data ) {
  var html;
  var property;
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

    content = '';

    if ( typeof hp_item[ property ] === 'string' || typeof hp_item[ property ] === 'number' ) {
      content = '<tr><td>' + property + '</td><td>' + hp_item[ property ] + '</td></tr>';
    } else if ( hp_item[ property ] instanceof Object ) {
      content = getContentFromObject( property, hp_item );
    }

    html += content;
  }

  html += '</tbody>';
  app_data.metadata.historypin.innerHTML = html;
}

module.exports = addHistorypinMetadata;
