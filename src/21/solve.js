#!/usr/bin/env node

'use strict';

require('dotenv').config();

const ora   = require('ora'),
      Imap  = require('mail-listener2'),
      chalk = require('chalk');

const auth    = require('./auth'),
      common  = require('./common'),
      config  = require('./config'),
      {solve} = require('~/lib/mc');

const provider = config.providers.gmail;

const spinner = ora(`Connecting to ${provider.host}...`).start();

const client = new Imap({...auth, ...provider});

client.on('error', (error) =>
{
  spinner.fail(error.toString());
  client.stop();
});

client.on('server:connected', () =>
{
  spinner.text = 'Connected.';

  const email = new Promise((resolve) =>
  {
    spinner.text = `Waiting for challenge message in "${provider.mailbox}"...`;

    client.on('mail', (email, sequenceNumber, {uid}) =>
    {
      if(common.isMicroContestMessage(email))
      {
        client.imap.addFlags(uid, '\\Seen', () =>
        {
          spinner.stop();
          client.stop();
          resolve(email.text);
        });
      }
    });
  });

  solve(21, async ({number: lhs}) =>
  {
    const timeout = setTimeout(() =>
    {
      spinner.fail(chalk.red('Challenge TTL exceeded.'));
      process.exit(1);
    }, config.challenge.ttl);

    const [rhs] = (await email).split(/\D/g)
                                .filter(s => s.length)
                                .map(Number);

    clearTimeout(timeout);

    return {sum: lhs + rhs};
  });
});

client.on('server:disconnected', () => spinner.stop());

client.start();
