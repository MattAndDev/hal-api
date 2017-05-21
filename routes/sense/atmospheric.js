// core
var path = require('path')
var os = require('os')
// libs
var _ = require('lodash')
var PythonShell = require('python-shell')

// sense/atmospheric
// ============================================

module.exports = function (router, remove) {
  let endpoint = path.relative(process.cwd(), __filename).replace(remove, '').replace('.js', '')
  router.route(endpoint).get((req, res) => {

    res.header('Content-Type', 'application/json')

    PythonShell.run(
      '/atmospheric.py',
      { scriptPath: path.dirname(__filename) },
      (err, results) => {
        if (err) throw err
        console.log(__filename)
        res.send(JSON.stringify(results, null, 2))
      }
    )
  })
}
