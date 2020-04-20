'use strict';

const chunk   = require('lodash.chunk'),
      assert  = require('assert'),
      flatten = require('lodash.flattendeep'),
      isEqual = require('lodash.isequal');

const {request} = require('~/lib/mc');

async function getNextChar(message, suffixes, sessionToken)
{
  const payload = [];

  for(const suffix of suffixes)
  {
    payload.push(`${message}${suffix}`);
  }

  const response = await request
  ({
    method: 'get',
    url:    'http://www.microcontest.com/contests/35/crypt.php',
    params: {PHPSESSID: sessionToken, m: payload}
  });

  assert(response.status === 200);

  const toMessage = (line, length) => line.split(';')
                                          .map(Number)
                                          .slice(-length);

  const toResult = (line, index) =>
  {
    const result =
    {
      suffix:  suffixes[index],
      message: toMessage(line, suffixes[index].length)
    };

    return result;
  };

  return response.data
                 .split(/\s/)
                 .filter(line => line.length)
                 .map(toResult);
}

function getSuffixes()
{
  const result = [];

  for(let a = 0; a < 4; ++a)
  for(let b = 0; b < 4; ++b)
  {
    result.push(`${a}${b}`);
  }

  return chunk(result, 5);
}

module.exports = async (sequence, sessionToken) =>
{
  const suffixes = getSuffixes();

  let decrypted = '';

  for(const sequenceChunk of chunk(sequence, 2))
  {
    const requests = [];

    for(const suffix of suffixes)
    {
      requests.push(getNextChar(decrypted, suffix, sessionToken));
    }

    const results = flatten(await Promise.all(requests));

    for(let {suffix, message} of results)
    {
      if(message.length !== sequenceChunk.length)
      {
        const overflow =
          -(message.length - sequenceChunk.length);

        suffix  = suffix.slice(0, overflow);
        message = message.slice(0, overflow);
      }

      if(isEqual(message, sequenceChunk))
      {
        decrypted += suffix;
        break;
      }
    }
  }

  return decrypted;
};
