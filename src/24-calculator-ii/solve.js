#!/usr/bin/env node

'use strict';

const exp     = require('./exp'),
      {solve} = require('~/lib/mc');

solve(24, ({expression1, expression2, expression3}) =>
{
  const result =
  {
    evaluation1: exp.eval(expression1),
    evaluation2: exp.eval(expression2),
    evaluation3: exp.eval(expression3)
  };

  return result;
});
