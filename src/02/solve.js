#!/usr/bin/env node

'use strict';

const solver = require('linear-quadratic-cubic-eq-solver');

const {solve} = require('~/lib/mc');

solve(2, ({a, b, c}) =>
{
  const [x1, x2] = solver.solveQuadraticEquation(a, b, c);

  return {x1, x2};
});
