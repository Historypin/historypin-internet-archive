'use strict';

/**
 * @param {string} property
 * @param {Object} hp_item
 */
module.exports = function augmentItemMetadata( property, hp_item ) {
  // <a href=\"%profile_url%\" title=\"%username%\">%username%</a>
  if ( property === 'user' ) {
    if ( typeof hp_item.profile_url === 'undefined' ) {
      if ( hp_item.user.id ) {
        hp_item.profile_url = 'http://www.historypin.org/channels/view/' + hp_item.user.id;
      }
    }

    if ( typeof hp_item.username === 'undefined' ) {
      if ( hp_item.user.name ) {
        hp_item.username = hp_item.user.name;
      }
    }
  }

};