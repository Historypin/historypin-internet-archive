'use strict';

/**
 * @param {Array} collection
 * @returns {*}
 */
function removeKeep( collection ) {
  var index;

  if ( collection.length < 1 ) {
    return collection;
  }

  index = collection.indexOf( '.keep' );

  if ( index > -1 ) {
    collection.splice( index, 1 );
  }

  return collection;
}

module.exports = removeKeep;
