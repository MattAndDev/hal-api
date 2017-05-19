'use strict'
// libs
var Express = require('express')
var glob = require('glob')
var _ = require('lodash')
// env
var env = require('./.env')


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
      console.log('Example app listening on port 3000!')
    })

    this._buildRoutes()
  }

  _buildRoutes () {
    glob('./routes/**/*.js', (err, routes) => {
      if (!err) {
        _.each(routes, (route) => {
          console.log(route)
          this.routes[route] = require(route)
          this.routes[route](this.router, 'routes')
        })
      }
    })
  }
}

let api = new Api()
api.init()
