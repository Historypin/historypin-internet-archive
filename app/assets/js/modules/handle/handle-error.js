'use strict';

/**
 * @param {Error} err
 * @param {app_data} app_data
 */
function handleError( err, app_data ) {
  if ( err.message.indexOf( 'Unexpected token S in JSON' ) !== -1 ) {
    app_data.message_to_user.innerHTML = 'project slug not found';
  } else {
    app_data.message_to_user.innerHTML = 'an unknown error has been returned by histroypin’s api';
  }

  app_data.message_to_user.className = 'error';
}

module.exports = handleError;
