// core
var path = require('path')
var exec = require('child_process').exec;
// libs
var _ = require('lodash')

// sys/ssh
// ============================================

module.exports = function (router, remove) {
  let endpoint = path.relative(process.cwd(), __filename).replace(remove, '').replace('.js', '')
  router.route(endpoint).get((req, res) => {
    res.header('Content-Type', 'text/plain')
    exec('who', (err, stdout, stderr) => {
      if (err) throw err
      res.send(stdout)
    })
  })
}
