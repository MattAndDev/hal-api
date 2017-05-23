// core
var path = require('path')
var exec = require('child_process').exec
// libs
var _ = require('lodash')
// utils
var stdoutToJSon = require('../../utils/stdout-to-json')

// sys/ssh
// ============================================

module.exports = function (router, remove) {
  let endpoint = path.relative(process.cwd(), __filename).replace(remove, '').replace('.js', '')
  router.route(endpoint).get((req, res) => {

    // exec who as promise
    let getSessions = new Promise((resolve, reject) => {
      exec('who', (err, stdout, stderr) => {
        // catch errors
        if (err || stderr) {
          stderr ? reject(stderr) : reject(err)
          throw err
        }
        else {
          // table template
          let template = ['user', 'terminal', 'date', 'time', 'ip']
          // transform to json
          let sessions = stdoutToJSon(stdout, template)
          resolve(sessions)
        }
      })
    })

    // exec lsof -i -n | egrep '\<ssh\>' as promise
    let getTunnels = new Promise((resolve, reject) => {
      exec("lsof -i -n | egrep '\\<ssh\\>'", (err, stdout, stderr) => {
        // catch errors
        if (err || stderr) {
          stderr ? reject(stderr) : reject(err)
          throw err
        }
        else {
          // table template
          let template = ['command', 'pid', 'user', 'boh', 'Ipv', 'bohv2', 'bohv3', 'protocol', 'tunnel', 'status']
          // transform to json
          let tunnels = stdoutToJSon(stdout, template)
          // remove local ips and trash
          tunnels = _.remove(tunnels, (o) => {
            return o.tunnel.indexOf('192.168.0.18') === -1 && o.tunnel.indexOf('*:ssh') === -1
          })
          resolve(tunnels)
        }
      })
    })

    // promise tunnels and sessions
    Promise.all([getTunnels, getSessions]).then(values => {
      // map results
      let results = {
        tunnels: values[0],
        sessions: values[1]
      }
      // ship it
      res.header('Content-Type', 'application/json')
      res.send(JSON.stringify(results, null, 2))
    })

  })
}
