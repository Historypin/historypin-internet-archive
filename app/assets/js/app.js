'use strict';

/**
 * module dependencies
 */
var batch_jobs = require( './pages/batch-jobs' );
var home = require( './pages/home' );
var lib = require( 'node-front-end-lib' );

module.exports = function init() {
  var page;

  if ( !lib.validateEnvironment() ) {
    return;
  }

  page = document.body.getAttribute( 'id' );

  home( page );
  batch_jobs( page );
}();
