#!/usr/bin/env node

'use strict';

const {solve}   = require('~/lib/mc'),
      integrate = require('./integrate');

solve(51, async ({l: length, theta_0: angle}) =>
{
  const result = await integrate('mc-51-solver:latest', {length, angle});

  const truncate = (n) => n.toFixed(6).slice(0, -1);

  const [theta, dtheta, ddtheta] =
    result.map(values => values.map(truncate).join(';'));

  return {theta, dtheta, ddtheta};
});
