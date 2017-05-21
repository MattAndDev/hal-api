// core
var path = require('path')
var os = require('os')
// env
var env = require('./../../.env')
// libs
var RaspiCam = require('raspicam')

var camera = new RaspiCam({
  mode: 'photo',
  output: '../data/image.jpg',
  encoding: 'jpg',
  timeout: 100
})

// sense/write
// ============================================

module.exports = function (router, remove) {
  let endpoint = path.relative(process.cwd(), __filename).replace(remove, '').replace('.js', '')
  router.route(endpoint).get((req, res) => {

    res.header('Content-Type', 'image/jpg')

    camera.on('started', function (err, timestamp) {
      if (err) throw err
      console.log('photo started at ' + timestamp)
    })


    camera.on('read', function (err, timestamp, filename) {
      if (err) throw err
      console.log('photo image captured with filename: ' + filename)
    })

    camera.on('exit', function (timestamp) {
      console.log('photo child process has exited at ' + timestamp)
    })

    camera.start()
  })
}
