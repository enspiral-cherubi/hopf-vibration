var THREE = require('three')
var hexStringFromSphericalCoords = require('./../services/hex-string-from-spherical-coords')
var hopfMap = require('./../services/hopf-map')

// TODO: give to world
var generateFiberGeometry = function (sphericalCoords) {

  //this generates a tube geometry with 520 vertices
  var fiber = new THREE.Curve()

  fiber.getPoint = function (t) {
    return hopfMap(sphericalCoords,t)
  }

  // returns 'fiber' geometry corresponding to the point on the 2-sphere with spherical coordinates phi, eta
  var tubeGeometry = new THREE.TubeGeometry(
    fiber,  // path
    64,     // segments
    0.01,   // radius
    8,      // radiusSegments
    false   // closed
  )
  // TODO: make color xyz to rgb
  var hexString = hexStringFromSphericalCoords(sphericalCoords).replace('#', '0x')
  var hex = parseInt(hexString)
  //wireframes are cool here
  var material = new THREE.MeshNormalMaterial({color: hex, wireframe:true})
  tubeGeometry.mesh = new THREE.Mesh(tubeGeometry,material)
  tubeGeometry.sphericalCoords = sphericalCoords
  tubeGeometry.dynamic = true
  return tubeGeometry
}

module.exports = generateFiberGeometry
