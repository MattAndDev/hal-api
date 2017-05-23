// core
var path = require('path')
var exec = require('child_process').exec
// libs
var _ = require('lodash')

// stdout to json
// ============================================

module.exports = function (table, template) {
  let jsonTable = []
  table = table.toString().replace(/(\r\n|\r|\n)/g, '\n').split('\n')
  if (typeof template === "boolean" && template === true) {
    template = table[0].split(/\s+/g)
    table = _.remove(table, (o, i) => { return i !== 0 })
  }
  _.each(table, (line, mainIndex) => {
    let entries = line.split(/\s+/g)
    let row = {}
    if (entries.length >= 2) {
      _.each(entries, (entry, index) => {
        row[template[index]] = entry
      })
      jsonTable.push(row)
    }
  })
  return jsonTable
}
