// core
var path = require('path')
var os = require('os')
// env
var env = require('./../../.env')
// libs
var _ = require('lodash')
var PythonShell = require('python-shell')

// sense/write
// ============================================

module.exports = function (router, remove) {
  let endpoint = path.relative(process.cwd(), __filename).replace(remove, '').replace('.js', '')
  router.route(endpoint).get((req, res) => {

    res.header('Content-Type', 'image/jpg')

    PythonShell.run(
      '/python/image.py',
      {
        scriptPath: path.dirname(__filename),
        args: [env.tmpImage]
      },
      (err) => {
        if (err) throw err
        res.sendFile(env.tmpImage)
      }
    )
  })
}
