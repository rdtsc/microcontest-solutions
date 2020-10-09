'use strict';

const assert = require('assert');

module.exports = (args) =>
{
  const get = (key) =>
  {
    assert(key in args);

    return args[key];
  };

  const metrics =
  {
    earthRadius:  6400,
    orbitRadius:  20200,
    speedOfLight: 299792
  };

  const satellites = [];

  for(let i = 1; i <= 3; ++i)
  {
    satellites.push
    ({
      altitude:  metrics.orbitRadius,
      latitude:  get(`sat${i}lat`),
      longitude: get(`sat${i}long`),
      timestamp: (get('date') - get(`date${i}`)) * 1000 + get(`msec${i}`),
    });
  }

  const receiver =
  {
    timestamp: get('msec')
  };

  return {metrics, satellites, receiver};
};
