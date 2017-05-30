var expect = require('chai').expect
var Hal = require('../index')


describe('Api', () => {
  describe('_routeBuilder', () => {
    let hal = new Hal()
    it('routes built', (done) => {
      let routes = hal._buildRoutes('./routes/**/*.js', (err, routes) => {
        expect(routes).to.be.an.instanceof(Object)
        expect(err).to.equal(null)
        done()
      })
    })
    it('has endpoints', () => {
      expect(hal.router.stack).to.be.an.instanceof(Array)
    })
  })
})
