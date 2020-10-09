'use strict';

const assert = require('assert');

module.exports = (args) =>
{
  const cos = (value) => Math.cos(value * Math.PI / 180),
        sin = (value) => Math.sin(value * Math.PI / 180);

  const radius = args.metrics.earthRadius + args.metrics.orbitRadius;

  for(const satellite of args.satellites)
  {
    const timeOfFlight = args.receiver.timestamp - satellite.timestamp;

    assert(timeOfFlight > 0);

    satellite.r = timeOfFlight / 1000 * args.metrics.speedOfLight;
    satellite.x = radius * cos(satellite.latitude) * cos(satellite.longitude);
    satellite.y = radius * cos(satellite.latitude) * sin(satellite.longitude);
    satellite.z = radius * sin(satellite.latitude);
  }

  return args;
};
