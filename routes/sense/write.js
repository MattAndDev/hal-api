// core
var path = require('path')
var os = require('os')
// libs
var _ = require('lodash')
var PythonShell = require('python-shell')

// sense/write
// ============================================

module.exports = function (router, remove) {
  let endpoint = path.relative(process.cwd(), __filename).replace(remove, '').replace('.js', '')
  router.route(endpoint + '/:message').get((req, res) => {

    res.header('Content-Type', 'application/json')

    PythonShell.run(
      '/write.py',
      {
        scriptPath: path.dirname(__filename),
        args: [req.params.message]
      },
      (err, results) => {
        if (err) throw err
        res.send(JSON.stringify(JSON.parse(results), null, 2))
      }
    )
  })
}
