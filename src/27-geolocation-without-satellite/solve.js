#!/usr/bin/env node

'use strict';

const sun = require('suncalc');

const {solve}     = require('~/lib/mc'),
      unserialize = require('./unserialize');

function* positionGenerator(minLat, maxLat, minLng, maxLng)
{
  for(let lat = minLat; lat <= maxLat; ++lat)
  for(let lng = minLng; lng <= maxLng; ++lng)
  {
    yield [lat, lng];
  }
}

solve(27, (args) =>
{
  args = unserialize(args);

  const result =
  {
    latitude:  null,
    longitude: null
  };

  const computedSunAngle = Math.atan(args.stickLength / args.shadowLength);

  let minAngleDelta = Number.POSITIVE_INFINITY;

  for(const position of positionGenerator(-90, 90, -180, 180))
  {
    const {altitude: sunAngle} =
      sun.getPosition(args.dateTime, ...position);

    const angleDelta =
      Math.abs(sunAngle - computedSunAngle);

    if(angleDelta < minAngleDelta)
    {
      minAngleDelta    = angleDelta;
      result.latitude  = position[0];
      result.longitude = position[1];
    }
  }

  return result;
});
