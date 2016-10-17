'use strict';

var metadata_job = {
  pin_id: 0,
  project: '',
  states: {
    available: [ 'completed', 'errored', 'paused', 'processing', 'queued' ],
    create_in: 'queued',
    current: 'queued'
  }
};

module.exports = metadata_job;