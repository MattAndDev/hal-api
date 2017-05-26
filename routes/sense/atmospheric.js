// core
var path = require('path')
var os = require('os')
// libs
var _ = require('lodash')
var PythonShell = require('python-shell')
// utils
var wLog = require('utils/winston-logger')


// sense/atmospheric
// ============================================

module.exports = function (router, remove) {
  let endpoint = path.relative(process.cwd(), __filename).replace(remove, '').replace('.js', '')
  router.route(endpoint).get((req, res) => {

    PythonShell.run(
      '/python/atmospheric.py',
      { scriptPath: path.dirname(__filename) },
      (err, results) => {
        if (err) {
          res.header('Content-Type', 'text/plain')
          res.send(`${err}`)
          wLog.log('error', `${endpoint} produced an error`, {err: err})
        }
        else {
          res.header('Content-Type', 'application/json')
          res.send(JSON.stringify(JSON.parse(results), null, 2))
        }
      }
    )
  })
}
