// libs
var _ = require('lodash')

// questy to options
// ============================================
// parses standard url query to exec command options
// optionally accepts a second parameter as query-merge
// NOTE: baseQuery will be merged within query (so query values win)
//
// @param query - object
// @param baseQuery - object

module.exports = function (query, baseQuery) {
  // first param is mandatory
  if (!query) throw new Error('Query needs to be provided')
  // if baseQUery merge in (assignIn)
  query = baseQuery && query ? _.assignIn(baseQuery, query) : query
  // preapare the args
  let args = ''
  // object to string
  _.each(query, (value, param) => {
    args = args + ` -${param} ${value}`
  })
  // ship it
  return args
}
