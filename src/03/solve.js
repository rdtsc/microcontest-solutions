#!/usr/bin/env node

'use strict';

const removePunctuation = require('remove-punctuation');

const {solve} = require('~/lib/mc');

function getIo(response)
{
  const wordKey  = '[mot]',
        valueKey = 'Valeur=';

  const textBegin = response.indexOf(valueKey) + valueKey.length,
        textEnd   = response.indexOf(wordKey),
        wordBegin = response.indexOf(valueKey, textEnd) + valueKey.length;

  const text = response.substring(textBegin, textEnd),
        word = response.substring(wordBegin).trim();

  return {text, word};
}

solve(3, ({rawChallengeResponse}) =>
{
  let {text, word} = getIo(rawChallengeResponse);

  text = removePunctuation(text).split(/\s/);

  const matchCount =
    text.reduce((total, test) => (total += test === word), 0);

  return {occ: matchCount};
});
