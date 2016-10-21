'use strict';

/**
 * @namespace
 */
var metadata_job = {
  pin: {},
  project: '',
  states: {
    available: [ 'completed', 'errored', 'processing', 'queued' ],
    create_in: 'queued',
    current: 'queued'
  }
};

module.exports = metadata_job;