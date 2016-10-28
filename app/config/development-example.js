'use strict';

var path = require( 'path' );

var config = {
  batch_job: {
    directory: {
      path: path.join( __dirname, '..', '..', 'batch-jobs' )
    },
    filename: 'batch-job.json',
    state: {
      available: [ 'completed', 'paused', 'processing', 'queued' ],
      current: 'queued',
      initial: 'queued',
      play_pause_action: 'pause'
    }
  },
  cookie: {
    expires: new Date( new Date().getTime() + ( 60 * 1000 ) ),
    keys: [ 'anykey', 'combinatie', 'werkt' ],
    maxAge: 60 * 1000
  },
  cron: {
    schedules: {
      addpins: '*/11 * * * *',
      metadata_jobs: '*/3 * * * *',
      rotate_queued: '*/15 * * * *'
    }
  },
  ip_address: process.env.NODE_IP_ADDRESS || '',
  lang: {
    default: 'en'
  },
  metadata_job: {
    creation_throttle: 50,
    state: {
      available: [ 'completed', 'errored', 'processing', 'queued' ],
      current: 'queued',
      initial: 'queued'
    }
  },
  morgan_debug: false,
  port: 8081,
  request: {
    agent: 'request/2.74.0 ( https://www.npmjs.com/package/request )',
    timeout: ( 3 * 1000 )
  },
  request_debug: true,
  s3: {
    access: '<your-ia-s3-key>',
    secret: '<your-ia-secret-key>'
  },
  ssl: {
    crt: process.env.SSL_CRT.toString(),
    key: process.env.SSL_KEY.toString()
  },
  timezone: 'Europe/Amsterdam'
};

module.exports = config;
