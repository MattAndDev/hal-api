// core
var path = require('path')
var exec = require('child_process').exec
// libs
var _ = require('lodash')
// utils
var queryToArgs = require('utils/query-to-cli-args')
var wLog = require('utils/winston-logger')
// env
var env = require('.env')

// camera/image
// ============================================

module.exports = function (router, remove) {
  let endpoint = path.relative(process.cwd(), __filename).replace(remove, '').replace('.js', '')
  router.route(endpoint + '/:command').get((req, res) => {
    // if no command, throw error
    if (!req.params.command) wLog.log('error', `${endpoint} requires a parameter :command, none passed`, {err: err})
    let cmd = req.params.command
    // if (!_.isEmpty(req.query)) let query = queryToArgs(req.query)
  })
}
