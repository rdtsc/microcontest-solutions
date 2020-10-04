#!/usr/bin/env node

'use strict';

const fs         = require('fs-extra'),
      ask        = require('prompt-sync')({sigint: true}),
      path       = require('path'),
      chalk      = require('chalk'),
      shell      = require('shelljs'),
      assert     = require('assert'),
      crypto     = require('crypto'),
      {validate} = require('jsonschema');

const projectRootPath = path.dirname(require.resolve('~/package')),
      authTokenPath   = path.join(projectRootPath, 'auth.json'),
      authTokenSchema = require('~/schemas/auth');

const ok = (msg) => console.log(chalk.green(msg));

function skipGitWorktree(path)
{
  return !shell.exec(`git update-index --skip-worktree "${path}"`).code;
}

function makeAuthToken()
{
  const get = (prompt, options = {}) =>
  {
    for(var value = ''; !value.length;)
    {
      value = ask(`${prompt}: `, options);

      if(!('echo' in options))
      {
        value = value.trim();
      }
    }

    return value;
  };

  const sha1 = (value) =>
    crypto.createHash('sha1').update(value).digest('hex');

  const header = 'µContest Auth Token Setup';

  console.log(`\n${header}`);
  console.log('-'.repeat(header.length));

  const token =
  {
    username: get('Username'),
    password: get('Password', {echo: '*'})
  };

  token.password = sha1(token.password);

  return token;
}

try
{
  const token = require(authTokenPath);

  if(validate(token, authTokenSchema).errors.length)
  {
    throw new Error('Malformed auth token');
  }

  ok(`µContest auth token already exists for "${token.username}".`);
}

catch(error)
{
  fs.writeJsonSync(authTokenPath, makeAuthToken(), {spaces: 2});

  ok(`Saved in ${authTokenPath}\n`);

  assert(skipGitWorktree(authTokenPath));
}
