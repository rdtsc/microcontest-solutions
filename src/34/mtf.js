'use strict';

const assert = require('assert');

const baseMapping = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');

module.exports.encode = (string) =>
{
  assert(typeof string === 'string' && string.length);
  assert(string.split('').every(c => baseMapping.includes(c)));

  const result  = [],
        mapping = [...baseMapping];

  for(const c of string.split(''))
  {
    let index = mapping.indexOf(c);

    result.push(index);

    [index] = mapping.splice(index, 1);

    mapping.unshift(index);
  }

  return result;
};

module.exports.decode = (values) =>
{
  assert(Array.isArray(values) && values.length);
  assert(values.every(v => v >= 0 && v < baseMapping.length));

  const result  = [],
        mapping = [...baseMapping];

  for(const v of values)
  {
    result.push(mapping[v]);

    const [index] = mapping.splice(v, 1);

    mapping.unshift(index);
  }

  return result.join('');
};
