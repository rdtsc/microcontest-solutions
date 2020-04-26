'use strict';

const assert  = require('assert'),
      BigNum  = require('bn.js'),
      {parse} = require('ini');

module.exports = (response) =>
{
  response = parse(response);

  const hasValue = (key) =>
    key in response && 'Valeur' in response[key];

  assert(hasValue('a') && hasValue('b'));

  const a = new BigNum(response.a.Valeur),
        b = new BigNum(response.b.Valeur);

  return {a, b};
};
