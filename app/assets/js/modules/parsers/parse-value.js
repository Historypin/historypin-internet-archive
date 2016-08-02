'use strict';

/**
 * module variables
 */
var iso8601;
var licenseurl;
var marc21LanguageCodes;
var mediatype;

/**
 * module dependencies
 */
iso8601 = require( './iso-8601' );
licenseurl = require( './creative-commons-url' );
marc21LanguageCodes = require( './marc21-language-codes' );
mediatype = require( './mediatype' );

/**
 * @param {string} format
 * @returns {*}
 */
function getParser( format ) {
  return {
    'creative-commons-url': licenseurl,
    'ISO-8601': iso8601,
    'MARC21-language-codes': marc21LanguageCodes,
    'mediatype': mediatype
  }[ format ];
}

/**
 * attempts to find a parser if formats-expected exists, but returns the original value if it cannot
 *
 * @param {string} value
 * @param {Object} ia_item
 * @returns {string}
 */
module.exports = function parseValue( value, ia_item ) {
  var format;
  var i;
  var parse;

  if ( !( ia_item[ 'formats-expected' ] instanceof Array) ) {
    return value;
  }

  for ( i = 0; i < ia_item[ 'formats-expected' ].length; i += 1 ) {
    format = ia_item[ 'formats-expected' ][ i ];
    parse = getParser( format );

    if ( !( parse instanceof Function ) ) {
      continue;
    }

    value = parse( value );
  }

  return value;
};
