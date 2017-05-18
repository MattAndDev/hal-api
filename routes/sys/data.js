// core
var path = require('path')
var os = require('os')
var _ = require('lodash')

// sys/data
// ============================================

module.exports = function (router, remove) {
  let endpoint = path.relative(process.cwd(), __filename).replace(remove, '').replace('.js', '')
  router.route(endpoint).get((req, res) => {
    res.header("Content-Type",'application/json');
    let data = {}
    _.each(os, (property) => {
      if (typeof property === 'function') data[property.name] = property()
    })
    res.send(JSON.stringify(data, null, 2));
  })
}
