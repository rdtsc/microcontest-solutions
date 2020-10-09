'use strict';

const trilaterate = require('trilateration');

module.exports = (sphere1, sphere2, sphere3) =>
{
  const result = trilaterate(sphere1, sphere2, sphere3, false);

  if(result !== null && !Array.isArray(result))
  {
    return [result];
  }

  return result;
};
