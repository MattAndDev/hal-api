// core
var path = require('path')
var exec = require('child_process').exec
// libs
var _ = require('lodash')
// utils
var stdoutToJSon = require('utils/stdout-to-json')

// sys/storage
// ============================================

module.exports = function (router, remove) {
  let endpoint = path.relative(process.cwd(), __filename).replace(remove, '').replace('.js', '')
  router.route(endpoint).get((req, res) => {
    res.header('Content-Type', 'application/json')
    exec('df -Bm', (err, stdout, stderr) => {
      if (err) throw err
      let results = stdoutToJSon(stdout, true)
      res.send(JSON.stringify(results, null, 2))
    })
  })
}
