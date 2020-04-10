'use strict';

const assert = require('assert');

module.exports.encode = (string) =>
{
  assert(typeof string === 'string' && string.length);
  assert(/^[a-z ]/i.test(string));

  const rotations = [string];

  for(let i = 0; i < string.length - 1; i++)
  {
    const rhs = rotations[0].slice(-1),
          lhs = rotations[0].slice(0, -1);

    rotations.unshift(`${rhs}${lhs}`);
  }

  rotations.sort();

  const position   = rotations.findIndex(s => s === string),
        lastColumn = rotations.map(s => s.slice(-1));

  return position + lastColumn.join('');
};

module.exports.decode = (string) =>
{
  assert(typeof string === 'string' && string.length);
  assert(/^\d+[a-z ]/i.test(string));

  const [,position, payload] = string.match(/^(\d+)(\D+)/);

  const lhs = payload.split(''),
        rhs = [...lhs],
        map = [];

  for(const c of lhs.sort())
  {
    const row = rhs.indexOf(c);

    map.push(row);

    rhs[row] = '';
  }

  const result = [];

  let index = position;

  map.forEach(() =>
  {
    index = map[index];

    result.push(payload[index]);
  });

  return result.join('');
};
