'use strict';

const ask = require('prompt-sync')({sigint: true});

const header =
{
  shown: false,
  text:  'Mailbox Account Credentials'
};

function getEnv(variable)
{
  let result = process.env[variable];

  if(result)
  {
    result = result.trim();

    if(result.length)
    {
      return result;
    }
  }

  return undefined;
}

function get(prompt, envVariable = '', options = {})
{
  if(Object.prototype.toString.call(envVariable) === '[object Object]')
  {
    options = envVariable;
    envVariable = undefined;
  }

  const envResult = getEnv(envVariable);

  if(envResult !== undefined)
  {
    return envResult;
  }

  if(!header.shown)
  {
    header.shown = true;
    console.log(header.text);
    console.log('-'.repeat(header.text.length));
  }

  for(var value = ''; !value.length;)
  {
    value = ask(`${prompt}: `, options);

    if(!('echo' in options))
    {
      value = value.trim();
    }
  }

  return value;
}

module.exports = (() =>
{
  const result =
  {
    username: get('Username', 'MICROCONTEST_21_EMAIL_USERNAME'),
    password: get('Password', 'MICROCONTEST_21_EMAIL_PASSWORD', {echo: '*'})
  };

  if(header.shown)
  {
    console.log();
  }

  return result;
})();
