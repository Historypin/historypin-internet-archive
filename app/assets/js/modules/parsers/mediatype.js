'use strict';

/**
 * @link https://internetarchive.readthedocs.io/en/latest/metadata.html#mediatype
 *
 * @param value
 * @returns {*}
 */
function getMediatype( value ) {
  return {
    'audio': 'audio',
    'collection': 'collection',
    'data': 'data',
    'etree': 'etree',
    'photo': 'image',
    'video': 'movies',
    'software': 'software',
    'web': 'web'
  }[ value ];
}

/**
 * attempts to find a match, but returns the original value if no match is found
 *
 * @param value
 * @returns {*}
 */
module.exports = function parseMediatype( value ) {
  var mediatype;

  mediatype = getMediatype( value );

  if ( typeof mediatype === 'undefined' ) {
    return value;
  }

  return mediatype;
};