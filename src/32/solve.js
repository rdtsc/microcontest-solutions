#!/usr/bin/env node

'use strict';

const {solve}       = require('~/lib/mc'),
      decrypt       = require('./decrypt'),
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
