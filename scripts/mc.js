#!/usr/bin/env node

'use strict';

if(process.argv.length < 3)
{
  console.log('No command specified.');
  process.exit(1);
}

const getEditDistance = require('leven');

const commands = Object.freeze
({
  setup: './setup'
});

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

  process.stdout.write(`Command "${cmd}" is not defined.`);

  if(suggestions.length)
  {
    process.stdout.write(' ');

    if(suggestions.length === 1)
    {
      console.log(`Did you mean "${suggestions[0]}"?`);
    }

    else
    {
      console.log('Did you mean one of these?');
      console.log(suggestions.map(cmd => `  ${cmd}`).join('\n'));
    }
  }

  else
  {
    process.stdout.write('\n');
  }

  process.exit(1);
}

require(commands[cmd]);
