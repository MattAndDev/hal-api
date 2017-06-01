// core
var path = require('path')
// libs
var _ = require('lodash')
var winston = require('winston')
// env
var env
try { env = require('.env') }
catch (ex) { env = require('.env.example') }


// winston logger magic
// ============================================

module.exports = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({
      name: 'debug',
      filename: path.resolve(env.logs.debug),
      level: 'debug'
    }),
    new (winston.transports.File)({
      name: 'error',
      handleExceptions: true,
      filename: path.resolve(env.logs.error),
      level: 'error'
    }),
    new (winston.transports.Console)({
      name: 'debug-console',
      colorize: true,
      level: 'debug'
    })
  ],
  exitOnError: false
})
