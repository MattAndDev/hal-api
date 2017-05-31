'use strict'
// relative paths
require('app-module-path').addPath(__dirname)
// libs
var Express = require('express')
var glob = require('glob')
var _ = require('lodash')
// utils
var wLog = require('utils/winston-logger')
// env
var env = require('.env')


module.exports = class Api {

  constructor () {
    this.api = new Express()
    this.router = Express.Router()
    this.api.use('/', this.router)
    this.routes = {}
    this.init()
  }

  init () {
    wLog.log('debug', 'hal-api initalised')

    this.api.get('/', (req, res) => {
      res.send('HAL Rasp-pi api.')
    })

    this.api.listen(env.port, () => {
      wLog.log('debug', `hal-api listening on port ${env.port}`)
    })

    this._buildRoutes('./routes/**/*.js', (err, routes) => {
      if (!err) {
        wLog.log('debug', 'mounted routes')
      }
    })
  }

  _buildRoutes (routes, cb) {
    glob(routes, (err, routes) => {
      if (!err) {
        _.each(routes, (route) => {
          this.routes[route] = require(route)
          this.routes[route](this.router, 'routes')
        })
        cb(null, this.routes)
      }
      else {
        wLog.log('debug', 'Api._buildRoutes failed building routes', {err: err})
        cb(err)
      }
    })
    return false
  }

}
