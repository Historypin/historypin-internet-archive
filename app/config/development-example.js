'use strict';

module.exports = {
  cookie: {
    expires: new Date( new Date().getTime() + ( 85 * 365 * 24 * 60 * 60 * 1000 ) ),
    keys: [ 'anykey', 'combinatie', 'werkt' ],
    maxAge: 85 * 365 * 24 * 60 * 60 * 1000
  },
  ip_address: process.env.NODE_IP_ADDRESS || '',
  morgan_debug: true,
  port: 8081,
  request: {
    agent: 'request/2.67.0 ( https://www.npmjs.com/package/request )',
    timeout: ( 3 * 1000 )
  },
  request_debug: true,
  ssl: {
    crt: process.env.SSL_CRT.toString(),
    key: process.env.SSL_KEY.toString()
  }
};