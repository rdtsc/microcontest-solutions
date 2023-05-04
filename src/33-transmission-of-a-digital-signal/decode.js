'use strict';

const assert = require('assert');

function getHalfWidth(samples)
{
  for(var i = 0; samples[i] < 0.005; ++i);

  for(;i < samples.length; ++i)
  {
    if(samples[i] < 0)
    {
      return i;
    }
  }

  assert(false);
}

module.exports = (samples) =>
{
  const result = [];

  const halfWidth = getHalfWidth(samples),
        width     = Math.ceil(halfWidth * 2 * 1.005);

  for(let i = 0; true; ++i)
  {
    const slice = samples.slice(i * width, i * width + width);

    if(slice.length < halfWidth) break;

    let tally = 0;

    for(let j = 0; j < halfWidth; ++j)
    {
      tally += slice[j];
    }

    result.push(tally / slice.length >= 0 ? 1 : 0);
  }

  return result.join('');
};
