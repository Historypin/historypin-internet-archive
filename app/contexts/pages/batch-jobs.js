'use strict';

/**
 * module dependencies
 */
var path = require( 'path' );

/**
 * @param {Object} context
 * @returns {*}
 */
module.exports = function getBatchJobsPageContext( context ) {
  context.partials[ 'batch-jobs' ] = path.join( __dirname, '..', '..', 'views', 'batch-jobs' );

  context.body = { id: 'batch-jobs' };
  context.template = context.partials[ 'batch-jobs' ];

  return context;
};
