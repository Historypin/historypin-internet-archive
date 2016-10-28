'use strict';

/**
 * @namespace
 */
var batch_job = {
  date: '',
  directory: {
    path: '',
    name: ''
  },
  filename: '',
  pins: {
    'all-pins-added': false,
    'all-metadata-jobs-queued': false,
    count: 0,
    ids: [],
    page: 0
  },
  project: '',
  state: {
    available: [],
    current: '',
    initial: '',
    play_pause_action: ''
  },
  timestamp: 0
};

module.exports = batch_job;
