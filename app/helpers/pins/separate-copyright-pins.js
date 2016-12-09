'use strict';

/**
 * module dependencies
 */
var Promise = require( 'bluebird' );

/**
 * assumes that if a license_key does not contain the value copyright it’s public domain
 *
 * @param {Array.<[{ pin:{} }]>|undefined} pin_details
 * @returns {Promise.<{ pins:{ copyright: [{pin:{}}], public_domain: [{pin:{}}] } }>}
 */
function separateCopyrightPins( pin_details ) {
  return new Promise(
    /**
     * @param {Function} resolve
     */
    function ( resolve ) {
      var public_domain = [];
      var copyright = [];

      pin_details.reduce(
        function ( acc, pin ) {
          if ( pin.license_key === 'copyright' ) {
            copyright.push( pin );
            return acc;
          }

          public_domain.push( pin );

          return acc;
        },
        ''
      );

      resolve( {
        copyright: copyright,
        public_domain: public_domain
      } );
    }
  );
}

module.exports = separateCopyrightPins;
