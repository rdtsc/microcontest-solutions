'use strict';

const clone = require('lodash.clonedeep'),
      minBy = require('lodash.minby');

function appendNextTerm({sequence, a, b})
{
  const x     = sequence[sequence.length - 1],
        xPrev = sequence[sequence.length - 2];

  sequence.push(1 - a * x ** 2 + b * xPrev);
}

function expand(parameters, sequence)
{
  const finalSequenceWidth =
    sequence.length - parameters[0].sequence.length;

  for(let i = 0; i < finalSequenceWidth; ++i)
  {
    appendNextTerm(parameters[0]);
    appendNextTerm(parameters[1]);
    appendNextTerm(parameters[2]);
  }
}

module.exports = (sequence, parameters) =>
{
  parameters = clone(parameters);

  expand(parameters, sequence);

  const result = [];

  for(let i = 0; i < sequence.length; ++i)
  {
    const terms =
    [
      {char: '0', value: parameters[0].sequence[i]},
      {char: '1', value: parameters[1].sequence[i]},
      {char: '2', value: parameters[2].sequence[i]}
    ];

    const {char} =
      minBy(terms, term => Math.abs(term.value - sequence[i]));

    result.push(char);
  }

  return result.join('');
};
