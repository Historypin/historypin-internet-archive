'use strict';

/**
 * module dependencies
 */
var lib = require( 'node-front-end-lib' );

function getRowsFromResponse( response ) {
  var html;
  var i;

  html = '';

  if ( !( response instanceof Array ) ) {
    return html;
  }

  for ( i = 0; i < response.length; i += 1 ) {
    html += '<tr>';
    html += '<td>' + response[ i ] + '</td>';
    html += '</tr>';
  }

  return html;
}

module.exports = function getBatchJobRows( app_data ) {
  var response;

  lib.ajax.get( '/ajax/get-batch-job-rows' )
    .then(
      function ( xhr ) {
        response = lib.extractXhrResponse( xhr );
        response = JSON.parse( response );
        app_data.batch_job_rows.innerHTML = getRowsFromResponse( response );
      }
    )
    .catch(
      function ( err ) {
        console.log( err );
      }
    );
};
