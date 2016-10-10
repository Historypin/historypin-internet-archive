'use strict';

/**
 * @param {Object} json
 * @param {Array} json.items
 * @returns {Array}
 */
function getPinsFromJSON( json ) {
  return json.items.reduce(
    function ( acc, item ) {
      acc.push( item[ 0 ] );
      return acc;
    },
    []
  );
}

module.exports = getPinsFromJSON;
