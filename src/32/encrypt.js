'use strict';

const axios  = require('axios'),
      assert = require('assert');

module.exports = async (message, sessionToken) =>
{
  assert(message.length === 5);

  const response = await axios
  ({
    method:  'get',
    url:     'http://www.microcontest.com/contests/32/crypt.php',
    params:  {PHPSESSID: sessionToken, m: message},
    headers: {'user-agent': ' '}
  });

  assert(response.status === 200);

  const sequence = response.data.split(';').map(Number);

  assert(sequence.length === message.length);

  return sequence;
};
