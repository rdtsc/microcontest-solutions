#!/usr/bin/env node

'use strict';

const {solve}     = require('~/lib/mc'),
      decrypt     = require('./decrypt'),
      unserialize = require('./unserialize');

solve(35, async ({rawChallengeResponse}) =>
{
  const {sequence, sessionToken} =
    unserialize(rawChallengeResponse);

  if(sequence.length < 75)
  {
    const ttlBegin  = Date.now(),
          decrypted = await decrypt(sequence, sessionToken);

    if(Date.now() - ttlBegin < 5000)
    {
      return {message_clair: decrypted};
    }
  }
});
