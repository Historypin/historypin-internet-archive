'use strict';

/**
 * module dependencies
 */
var pin = require( './pin' );

/**
 * @namespace
 */
var metadata_job = {
  pin: pin,
  project: '',
  states: {
    available: [ 'completed', 'errored', 'processing', 'queued' ],
    create_in: 'queued',
    current: 'queued'
  }
};

module.exports = metadata_job;
