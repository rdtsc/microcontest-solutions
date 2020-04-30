'use strict';

const assert = require('assert'),
      crypto = require('crypto');

const sha1 = (data) =>
  crypto.createHash('sha1').update(data).digest('hex');

module.exports = (args) =>
{
  const decode = (data) =>
    Buffer.from(data, 'base64');

  const hash = (data) =>
    sha1(data).slice(-8);

  const result = {};

  for(let i = 1; i <= 3; ++i)
  {
    const key = `img${i}_b64`;

    assert(key in args);

    const data = decode(args[key]),
          id   = hash(data);

    result[`img${i}`] = {id, data};
  }

  return result;
};
