// core
var path = require('path')
var exec = require('child_process').exec
// libs
var _ = require('lodash')

// sys/ssh
// ============================================

module.exports = function (router, remove) {
  let endpoint = path.relative(process.cwd(), __filename).replace(remove, '').replace('.js', '')
  router.route(endpoint).get((req, res) => {
    exec('who', (err, stdout, stderr) => {
      if (err || stderr) {
        res.header('Content-Type', 'text/plain')
        res.send(`${err} \n ${stderr}`)
        throw err
      }
      else {
        res.header('Content-Type', 'application/json')
        let stoudArray = stdout.toString().split('\n')
        let template = ['user', 'terminal', 'date', 'time', 'ip']
        let results = []
        _.each(stoudArray, (line, mainIndex) => {
          let entries = line.split(/\s+/g)
          let row = {}
          if (entries.length >= 2) {
            _.each(entries, (entry, index) => {
              row[template[index]] = entry
            })
            results.push(row)
          }
        })
        res.send(JSON.stringify(results, null, 2))
      }
    })
  })
}
