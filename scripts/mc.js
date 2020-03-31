#!/usr/bin/env node

'use strict';

const {red, yellow}   = require('chalk'),
      getEditDistance = require('leven');

const commands = Object.freeze
({
  setup: './setup',
  init : './init'
});

if(process.argv.length < 3)
{
  console.log('No command specified. Available commands:');
  console.log(Object.keys(commands).map(cmd => `  ${yellow(cmd)}`).join('\n'));

  process.exit(1);
}

function getCommandSuggestions(cmd, maxEditDistance = 3)
{
  const results = [];

  for(const candidate of Object.keys(commands))
  {
    const distance = getEditDistance(cmd, candidate);

    if(distance < maxEditDistance || cmd.startsWith(candidate))
    {
      results.push({candidate, distance});
    }
  }

  results.sort((lhs, rhs) =>
  {
    if(lhs.distance === rhs.distance)
    {
      return lhs.candidate.localeCompare(rhs.candidate);
    }

    return lhs.distance - rhs.distance;
  });

  return results.map(suggestion => suggestion.candidate);
}

const cmd = process.argv[2].toLowerCase().trim();

if(!(cmd in commands))
{
  const suggestions = getCommandSuggestions(cmd);

  process.stdout.write(`Command "${red(cmd)}" is not defined.`);

  if(suggestions.length)
  {
    process.stdout.write(' ');

    if(suggestions.length === 1)
    {
      console.log(`Did you mean "${yellow(suggestions[0])}"?`);
    }

    else
    {
      console.log('Did you mean one of these?');
      console.log(suggestions.map(cmd => `  ${yellow(cmd)}`).join('\n'));
    }
  }

  else
  {
    process.stdout.write('\n');
  }

  process.exit(1);
}

process.argv[1] = require.resolve(commands[cmd]);

process.argv.splice(2, 1);

require(commands[cmd]);
