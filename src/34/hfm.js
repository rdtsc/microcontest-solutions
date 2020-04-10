'use strict';

const zf        = require('zero-fill'),
      assert    = require('assert'),
      invert    = require('lodash.invert'),
      mapValues = require('lodash.mapvalues');

const encoding        = require('./encoding'),
      reverseEncoding = mapValues(invert(encoding), Number);

module.exports.encode = (values) =>
{
  assert(Array.isArray(values) && values.length);
  assert(values.every(v => v in encoding));

  let result = values.map(v => encoding[v]).join('');

  const padding = result.length % 8;

  if(padding)
  {
    result += '0'.repeat(8 - padding);
  }

  result = result.match(/.{8}/g)
                 .map(bin => parseInt(bin, 2));

  return Buffer.from(result);
};

module.exports.decode = (bytes, padding) =>
{
  assert(Buffer.isBuffer(bytes));
  assert(padding >= 0 && padding < 8);

  let bits = [...bytes].map(byte => zf(8, byte.toString(2)))
                       .join('')
                       .split('');

  if(padding)
  {
    bits = bits.slice(0, -(8 - padding));
  }

  const result = [];

  const consumeBits = () =>
  {
    let key = '';

    for(let i = 0; i < 8; ++i)
    {
      key += bits.shift();

      if(key in reverseEncoding)
      {
        break;
      }
    }

    assert(key in reverseEncoding);

    return reverseEncoding[key];
  };

  while(bits.length)
  {
    result.push(consumeBits());
  }

  return result;
};
