// core
var path = require('path')
var exec = require('child_process').exec
// libs
var _ = require('lodash')
// env
var env = require('.env')

// camera/image
// ============================================

module.exports = function (router, remove) {
  let endpoint = path.relative(process.cwd(), __filename).replace(remove, '').replace('.js', '')
  router.route(endpoint).get((req, res) => {
    // base command with output file and --no-preview
    let cmd = `raspistill -n -o ${env.tmpImage} `
    // add defaults
    let baseQuery = {
      w: '800',
      h: '600'
    }
    // if query
    if (req.query) {
      // merge with defaults
      let customQuery = _.assignIn(baseQuery, req.query)
      // extend the command
      _.each(customQuery, (value, param) => {
        cmd = cmd + ` -${param} ${value}`
      })
    }
    // execute
    exec(cmd, (err, stdout, stderr) => {
      // if any type of error
      if (err || stderr) {
        res.header('Content-Type', 'text/plain')
        res.send(`${err} \n ${stderr}`)
        throw err
      }
      // everything fine, shipping image
      else {
        res.header('Content-Type', 'image/jpg')
        res.sendFile(env.tmpImage)
      }
    })
  })
}
