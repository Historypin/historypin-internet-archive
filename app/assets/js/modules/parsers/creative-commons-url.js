'use strict';

/**
 * @param {string} value
 * @returns {*}
 */
function getLicense( value ) {
  return {
    'copyright': 'Copyright (c) all rights reserved',
    'no-copyright': 'https://creativecommons.org/publicdomain/mark/1.0/',
    'public-domain': 'https://creativecommons.org/publicdomain/mark/1.0/'
  }[ value ];
}

/**
 * @param {string} value
 * @returns {string}
 */
module.exports = function parseLicense( value ) {
  var licenseurl;

  licenseurl = getLicense( value );

  if ( typeof licenseurl === 'undefined' ) {
    return value;
  }

  return licenseurl;
};
