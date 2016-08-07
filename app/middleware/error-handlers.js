'use strict';

/**
 * module dependencies
 */
var errorLogger = require( 'node-error-logger' );

/**
 * @param {Function} app
 * @param {Function} app.get
 * @param {Function} app.use
 */
module.exports = function ( app ) {
  // catch 404 and forward to error handler
  app.use( function ( req, res, next ) {
    var err = new Error( 'Not Found' );
    err.status = 404;
    next( err );
  } );

  // development error handler
  // will print stacktrace
  if ( app.get( 'env' ) === 'development' ) {
    app.use( function ( err, req, res ) {
      errorLogger( err, req );
      res.status( err.status || 500 );

      res.render( 'error', {
        message: err.message,
        error: err
      } );
    } );
  }

  // production error handler
  // no stacktraces leaked to user
  app.use( function ( err, req, res ) {
    errorLogger( err, req );
    res.status( err.status || 500 );

    res.render( 'error', {
      message: err.message,
      error: {}
    } );
  } );
};
