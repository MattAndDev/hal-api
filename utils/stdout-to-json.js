// core
var path = require('path')
var exec = require('child_process').exec
// libs
var _ = require('lodash')

// stdout to json
// ============================================
// parses standard linux stdout to json array of objects
// as tempalte pass array of header row
// or pass true f the stdout contains a header row
//
// @param table - string
// @param template - array/boolean
//

module.exports = function (table, template) {
  // scaffolging
  let jsonTable = []
  // cleanup and first split
  table = table.toString().replace(/(\r\n|\r|\n)/g, '\n').split('\n')
  // if header row is in table manipulate vars
  if (typeof template === "boolean" && template === true) {
    template = table[0].split(/\s+/g)
    table = _.remove(table, (o, i) => { return i !== 0 })
  }
  // go trough the lines
  _.each(table, (line, mainIndex) => {
    // scaffolding
    let row = {}
    // create entries
    let entries = line.split(/\s+/g)
    // be sure to get something
    if (entries.length >= 2) {
      // map entry to template
      _.each(entries, (entry, index) => {
        row[template[index]] = entry
      })
      // push the row
      jsonTable.push(row)
    }
  })
  // return the object
  return jsonTable
}
