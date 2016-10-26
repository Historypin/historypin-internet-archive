'use strict';

/**
 * module dependencies
 */
var path = require( 'path' );
var sass = require( 'node-sass-middleware' );

/**
 * @param {Function} app
 * @param {Function} app.use
 *
 * @returns {undefined}
 */
function middleware( app ) {
  var sass_config = {
    debug: false,
    dest: path.join( __dirname, '..', '..', '..', 'public', 'css' ),
    includePaths: [
      path.join( __dirname, '..', '..', '..', 'node_modules' )
    ],
    outputStyle: 'compressed',
    prefix: '/css',
    sourceMap: false,
    src: path.join( __dirname, '..', '..', 'assets', 'scss' )
  };

  app.use( sass( sass_config ) );
}

module.exports = middleware;
