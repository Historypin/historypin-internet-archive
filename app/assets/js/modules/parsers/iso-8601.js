'use strict';

/**
 * attempts to create a valid, ISO-8601 date, but returns the original value if it cannot
 *
 * @param {string} value
 * @returns {*}
 */
module.exports = function parseISO8601( value ) {
  var date;

  date = new Date( value + ' UTC' );

  if ( isNaN( date.getTime() ) ) {
    return value;
  }

  return date.toISOString();
};
