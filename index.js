'use strict'
// relative paths
require('app-module-path').addPath(__dirname)
// libs
var Express = require('express')
var glob = require('glob')
var _ = require('lodash')
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
    this.api.get('/', function (req, res) {
      res.send('HAL Rasp-pi api.')
    })

    this.api.listen(env.port, function () {
      console.log('HAL Api listening at localhost:3000')
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
        console.log(`Api._buildRoutes failed with error: \n ${err}`)
      }
    })
  }
}

let api = new Api()
api.init()
