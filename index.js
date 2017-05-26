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


class Api {

  constructor () {
    this.api = new Express()
    this.router = Express.Router()
    this.api.use('/', this.router)
    this.routes = {}
  }

  init () {
    wLog.log('debug', 'hal-api initalised')

    this.api.get('/', function (req, res) {
      res.send('HAL Rasp-pi api.')
    })

    this.api.listen(env.port, function () {
      wLog.log('debug', `hal-api listening on port ${env.port}`)
    })

    this._buildRoutes()
  }

  _buildRoutes () {
    glob('./routes/**/*.js', (err, routes) => {
      if (!err) {
        _.each(routes, (route) => {
          this.routes[route] = require(route)
          this.routes[route](this.router, 'routes')
        })
      }
      else {
        wLog.log('debug', 'Api._buildRoutes failed building routes', {err: err})
      }
    })
  }
}

let api = new Api()
api.init()
