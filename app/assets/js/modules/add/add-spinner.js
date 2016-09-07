'use strict';

module.exports = function addSpinner( app_data ) {
  app_data.metadata.row.innerHTML =
    '<h2>creating batch job</h2>' +
    '<div class="spinner">' +
    '<div class="bounce1"></div>' +
    '<div class="bounce2"></div>' +
    '<div class="bounce3"></div>' +
    '</div>';
};
