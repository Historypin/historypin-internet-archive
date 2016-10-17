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
