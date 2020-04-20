#!/usr/bin/env node

'use strict';

const chalk = require('chalk');

const {solve}     = require('~/lib/mc'),
      decrypt     = require('./decrypt'),
      unserialize = require('./unserialize');

solve(35, async ({rawChallengeResponse}) =>
{
  const {sequence, sessionToken} =
    unserialize(rawChallengeResponse);

  const ttlBegin  = Date.now(),
        decrypted = await decrypt(sequence, sessionToken);

  if(Date.now() - ttlBegin >= 5000)
  {
    console.log(chalk.red('Challenge TTL exceeded.'));
    process.exit(1);
  }

  return {message_clair: decrypted};
});
