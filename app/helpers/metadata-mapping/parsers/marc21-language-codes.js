'use strict';

/**
 * @link https://www.alsintl.com/blog/most-common-languages/
 * @link https://www.loc.gov/marc/languages/language_name.html
 *
 * @param value
 * @returns {*}
 */
function getMarc21LanguageCode( value ) {
  return {
    'ar': 'ara',
    'bn': 'ben',
    'en': 'eng',
    'es': 'spa',
    'de': 'ger',
    'fr': 'fre',
    'he': 'heb',
    'hi': 'hin',
    'it': 'ita',
    'ja': 'jpn',
    'nl': 'dut',
    'pa': 'pun',
    'pt': 'por',
    'ru': 'rus',
    'zh': 'chi'
  }[ value ];
}

/**
 * attempts to find a match, but returns the original value if no match is found
 *
 * @param {string} value
 */
module.exports = function parseMarc21LanguageCodes( value ) {
  var lang;

  lang = getMarc21LanguageCode( value );

  if ( typeof lang === 'undefined' ) {
    return value;
  }

  return lang;
};
