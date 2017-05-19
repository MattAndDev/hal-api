// core
var path = require('path')
var os = require('os')
// libs
var _ = require('lodash')
var usb = require('usb')

// sys/data
// ============================================

module.exports = function (router, remove) {
  let endpoint = path.relative(process.cwd(), __filename).replace(remove, '').replace('.js', '')
  router.route(endpoint).get((req, res) => {
    res.header('Content-Type', 'application/json')
    let usbs = usb.getDeviceList()
    let external = _.filter(usbs, (usb) => { return usb.deviceAddress >= 4 })
    let internal = _.filter(usbs, (usb) => { return usb.deviceAddress <= 3 })
    let data = {
      external: external,
      internal: internal
    }
    res.send(JSON.stringify(data, null, 2))
  })
}
