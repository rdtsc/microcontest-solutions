'use strict';

const trilaterate = require('~/lib/trilaterate');

module.exports = (satellites, earthRadius) =>
{
  const receiverPositions =
    trilaterate(satellites[0], satellites[1], satellites[2]);

  if(receiverPositions === null)
  {
    return undefined;
  }

  const toLongitude = (point) =>
  {
    const offset = (point.x > 0) ? (0) : (point.y > 0) ? (180) : (-180);

    return Math.atan(point.y / point.x) * (180 / Math.PI) + offset;
  };

  const toLatitude = (point) =>
    Math.asin(point.z / earthRadius) * (180 / Math.PI);

  for(const position of receiverPositions)
  {
    const latitude  = toLatitude(position),
          longitude = toLongitude(position);

    if(!Number.isNaN(latitude) && !Number.isNaN(longitude))
    {
      const result =
      {
        latitude:  +latitude.toFixed(2),
        longitude: +longitude.toFixed(2)
      };

      return result;
    }
  }

  return undefined;
};
