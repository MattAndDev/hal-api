// core
var path = require('path')
var exec = require('child_process').exec
// libs
var _ = require('lodash')
// utils
var queryToArgs = require('utils/query-to-cli-args')
var wLog = require('utils/winston-logger')

// camera/image
// ============================================

module.exports = function (router, remove) {
  let endpoint = path.relative(process.cwd(), __filename).replace(remove, '').replace('.js', '')
  router.route(endpoint + '/:command').get((req, res) => {
    // if no command, throw error
    if (!req.params.command) wLog.log('error', `${endpoint} requires a parameter :command, none passed`, {err: err})
    // get commang
    let cmd = req.params.command
    // parse query
    let query = !_.isEmpty(req.query) ? queryToArgs(req.query) : ''
    // execute and return
    exec(cmd + query, (err, stdout, stderr) => {
      if (err) {
        res.header('Content-Type', 'text/plain')
        res.send(`${err}`)
        wLog.log('error', `${endpoint} produced an error`, {err: err})
      }
      else {
        res.header('Content-Type', 'text/plain')
        res.send(stdout)
      }
    })
  })
}
