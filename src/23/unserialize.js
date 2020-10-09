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

  const receiver =
  {
    timestamp: get('date') + (get('msec') / 1000)
  };

  const satellites = [];

  for(let i = 1; i <= 3; ++i)
  {
    const signalTimestamp = get(`date${i}`) + (get(`msec${i}`) / 1000);

    satellites.push
    ({
      latency:   receiver.timestamp - signalTimestamp,
      altitude:  metrics.orbitRadius,
      latitude:  get(`sat${i}lat`),
      longitude: get(`sat${i}long`)
    });
  }

  return {metrics, receiver, satellites};
};
