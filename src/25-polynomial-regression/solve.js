#!/usr/bin/env node

'use strict';

const PolynomialRegression = require('ml-regression-polynomial');

const {solve} = require('~/lib/mc');

solve(25, (args) =>
{
  const degree = 5, x = [], y = [];

  for(const key of Object.keys(args))
  {
    if(key.startsWith('x'))
    {
      x.push(args[key]);
    }

    else if(key.startsWith('y'))
    {
      y.push(args[key]);
    }
  }

  const regression   = new PolynomialRegression(x, y, degree),
        coefficients = regression.coefficients.map(n => n.toFixed(10));

  const result = {degre: degree};

  for(let i = 0; i < coefficients.length; ++i)
  {
    result[`a${i}`] = coefficients[i];
  }

  return result;
});
