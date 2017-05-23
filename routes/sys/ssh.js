// core
var path = require('path')
var exec = require('child_process').exec
// libs
var _ = require('lodash')
// utils
var stdoutToJSon = require('../../utils/stdout-to-json')

// sys/ssh
// ============================================
console.log(stdoutToJSon)
module.exports = function (router, remove) {

  let endpoint = path.relative(process.cwd(), __filename).replace(remove, '').replace('.js', '')
  router.route(endpoint).get((req, res) => {
    // exec who
    let getSessions = new Promise((resolve, reject) => {
      let sessions = []
      exec('who', (err, stdout, stderr) => {
        if (err || stderr) {
          stderr ? reject(stderr) : reject(err)
          throw err
        }
        else {
          let template = ['user', 'terminal', 'date', 'time', 'ip']
          let sessions = stdoutToJSon(stdout, template)
          resolve(sessions)
        }
      })
    })
    let getTunnels = new Promise((resolve, reject) => {
      let tunnels = []
      exec("lsof -i -n | egrep '\\<ssh\\>'", (err, stdout, stderr) => {
        if (err || stderr) {
          stderr ? reject(stderr) : reject(err)
          throw err
        }
        else {
          let template = ['command', 'pid', 'user', 'boh', 'Ipv', 'bohv2', 'bohv3', 'protocol', 'tunnel', 'status']
          let tunnels = stdoutToJSon(stdout, template)
          tunnels = _.remove(tunnels, (o) => {
            return o.tunnel.indexOf('192.168.0.18') === -1 && o.tunnel.indexOf('*:ssh') === -1
          })
          resolve(tunnels)
        }
      })
    })
    Promise.all([getTunnels, getSessions]).then(values => {
      let results = {
        tunnels: values[0],
        sessions: values[1]
      }
      res.header('Content-Type', 'application/json')
      res.send(JSON.stringify(results, null, 2))
    })

  })
}
