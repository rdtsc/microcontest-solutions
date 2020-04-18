'use strict';

const assert  = require('assert'),
      {solve} = require('linear-solve'),
      encrypt = require('./encrypt');

function deriveParameters(sequence)
{
  assert(sequence.length >= 4);

  const lhs = [],
        rhs = [];

  for(let i = 0; i < 2; ++i)
  {
    const x     = sequence[i + 1],
          xPrev = sequence[i + 0],
          xNext = sequence[i + 2];

    rhs.push(xNext - 1);
    lhs.push([-(x ** 2), xPrev]);
  }

  const [a, b] = solve(lhs, rhs);

  return {a, b, sequence};
}

module.exports = async (sessionToken) =>
{
  const derive = async (char) =>
    deriveParameters(await encrypt(char.repeat(5), sessionToken));

  return await Promise.all
  ([
    derive('0'),
    derive('1'),
    derive('2')
  ]);
};
