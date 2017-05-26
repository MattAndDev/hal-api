// core
var path = require('path')
var exec = require('child_process').exec
// libs
var _ = require('lodash')
// utils
var queryToArgs = require('utils/query-to-cli-args')
var wLog = require('utils/winston-logger')
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

    // parse query params to args (if any, else pass only baseQuery)
    let args = !_.isEmpty(req.query) ? queryToArgs(req.query, baseQuery) : queryToArgs(baseQuery)

    // chain command and args
    cmd = cmd + args

    // execute
    exec(cmd, (err, stdout, stderr) => {
      // if any type of error
      console.log(stderr);
      if (err || stderr) {
        res.header('Content-Type', 'text/plain')
        res.send(`${err} \n ${stderr}`)
        wLog.log('error', `${endpoint} produced an error`, {err: err}, {stderr: stderr})
      }
      // everything fine, shipping image
      else {
        res.header('Content-Type', 'image/jpg')
        res.sendFile(env.tmpImage)
      }
    })
  })
}
