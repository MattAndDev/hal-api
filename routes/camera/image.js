// core
var path = require('path')
var os = require('os')
// env
var env = require('./../../.env')
// libs
var Raspistill = require('node-raspistill').Raspistill
var camera = new Raspistill()

var _ = require('lodash')

// sense/atmospheric
// ============================================

module.exports = function (router, remove) {
  let endpoint = path.relative(process.cwd(), __filename).replace(remove, '').replace('.js', '')
  router.route(endpoint).get((req, res) => {

    res.header('Content-Type', 'application/json')
    camera.takePhoto().then((photo) => {
      console.log(photo)
      res.send(JSON.stringify({done: true}, null, 2))
    })
  })
}
