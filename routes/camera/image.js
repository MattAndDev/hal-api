// core
var path = require('path')
var exec = require('child_process').exec
var _ = require('lodash')
// env
var env = require('./../../.env')

// camera/image
// ============================================

module.exports = function (router, remove) {
  let endpoint = path.relative(process.cwd(), __filename).replace(remove, '').replace('.js', '')
  router.route(endpoint).get((req, res) => {
    let cmd = `raspistill -o ${env.tmpImage} `
    let baseQuery = {
      w: '800',
      h: '600'
    }
    if (req.query) {
      let customQuery = _.assignIn(baseQuery, req.query)
      _.each(customQuery, (value, param) => {
        cmd = cmd + ` -${param} ${value}`
      })
    }
    exec(cmd, (err, stdout, stderr) => {
      if (err || stderr) {
        res.header('Content-Type', 'text/plain')
        res.send(`${err} \n ${stderr}`)
        throw err
      }
      else {
        res.header('Content-Type', 'image/jpg')
        res.sendFile(env.tmpImage)
      }
    })
  })
}
