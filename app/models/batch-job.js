'use strict';

/**
 * @class
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
    count: 0,
    ids: [],
    page: 0
  },
  project: '',
  state: {
    available: [],
    current: ''
  },
  timestamp: 0
};

module.exports = batch_job;
