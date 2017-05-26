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
    // if param has Bang (!) interpet it as -- , else -
    args = param.indexOf('!') >= 0 ? args + ` --${param.replace('!', '')} ${value}` : args + ` -${param} ${value}`
  })
  // ship it
  return args
}
