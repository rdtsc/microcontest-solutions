'use strict';

module.exports = (samples) =>
{
  const scale = Math.max(...samples.map(Math.abs));

  return samples.map(sample => sample / scale);
};
