'use strict';

/**
 * module dependencies
 */
var errorLogger = require( '../helpers/error-logger' );

/**
 * @param {Function} app
 * @param {Function} app.get
 * @param {Function} app.use
 *
 * @returns {undefined}
 */
function middleware( app ) {

  /**
   * catch 404 and forward to error handler
   */
  app.use(

    /**
     * @param {IncomingMessage} req
     * @param {ServerResponse} res
     * @param {Function} next
     *
     * @returns {undefined}
     */
    function ( req, res, next ) {
      var err = new Error( 'Not Found' );

      err.status = 404;
      next( err );
    }
  );

  /**
   * development error handler
   * will print stacktrace
   */
  if ( app.get( 'env' ) === 'development' ) {
    app.use(

      /**
       * @param {Error} err
       * @param {IncomingMessage} req
       *
       * @param {ServerResponse} res
       * @param {Function} res.status
       * @param {Function} res.render
       *
       * @returns {undefined}
       */
      function ( err, req, res ) {
        errorLogger( err, req );
        res.status( err.status || 500 );

        res.render(
          'error', {
            error: err,
            message: err.message
          }
        );
      }
    );
  }

  /**
   * production error handler
   * no stacktrace leaked to user
   */
  app.use(

    /**
     * @param {Error} err
     * @param {IncomingMessage} req
     *
     * @param {ServerResponse} res
     * @param {Function} res.status
     * @param {Function} res.render
     *
     * @returns {undefined}
     */
    function ( err, req, res ) {
      errorLogger( err, req );
      res.status( err.status || 500 );

      res.render(
        'error',
        {
          error: {},
          message: err.message
        }
      );
    }
  );
}

module.exports = middleware;
