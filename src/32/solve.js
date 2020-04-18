#!/usr/bin/env node

'use strict';

const decrypt       = require('./decrypt'),
      {solve}       = require('~/lib/mc'),
      unserialize   = require('./unserialize'),
      getParameters = require('./parameters');

solve(32, async ({rawChallengeResponse}) =>
{
  const {sequence, sessionToken} =
    unserialize(rawChallengeResponse);

  const parameters =
    await getParameters(sessionToken);

  return {message_clair: decrypt(sequence, parameters)};
});
