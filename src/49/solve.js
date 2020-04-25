#!/usr/bin/env node

'use strict';

const vm = require('vm');

const {solve} = require('~/lib/mc');

function decode(expression)
{
  const result = [];

  let accumulator = 0;

  for(const c of expression)
  {
    if(c === '-')
    {
      ++accumulator;
    }

    else
    {
      result.push(accumulator);
      result.push(c === 't' ? '*' : '===');
      accumulator = 0;
    }
  }

  result.push(accumulator);

  return result.join('');
}

solve(49, (args) =>
{
  const isTheorem = (expression) =>
    +vm.runInNewContext(decode(expression));

  const result = {};

  for(let i = 1; i <= 15; ++i)
  {
    result[`theorem${i}`] =
      isTheorem(args[`string${i}`]);
  }

  return result;
});
