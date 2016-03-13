'use strict';

/**
 * modeule variables
 */
var path;

/**
 * variable assignments
 */
path = require( 'path' );

/**
 * @param {Function} app
 * @param {Function} app.use
 */
module.exports = function ( app ) {
  app.use( require( 'node-sass-middleware' )( {
    debug: false,
    dest: path.join( __dirname, '..', '..', 'public', 'css' ),
    outputStyle: 'compressed',
    prefix: '/css',
    sourceMap: false,
    src: path.join( __dirname, '..', 'assets', 'scss' ),
    includePaths: [
      path.join( __dirname, '..', '..', 'node_modules' )
    ]
  } ) );
};