'use strict';

const zf  = require('zero-fill'),
      bwt = require('./bwt'),
      mtf = require('./mtf'),
      hfm = require('./hfm');

module.exports.deflate = (text, urlEncode = true) =>
{
  const b = bwt.encode,
        m = mtf.encode,
        h = hfm.encode;

  let result = h(m(b(text)));

  if(urlEncode)
  {
    const toBytes = (byte) =>
      '%' + zf(2, byte.toString(16));

    result = [...result].map(toBytes).join('');
  }

  return result;
};

module.exports.inflate = (bytes, padding) =>
{
  const b = bwt.decode,
        m = mtf.decode,
        h = hfm.decode;

  return b(m(h(bytes, padding)));
};
