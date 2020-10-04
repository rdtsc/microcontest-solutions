#!/usr/bin/env node

'use strict';

const {parse}    = require('ini'),
      {Vigenere} = require('text-cryptography');

const {solve} = require('~/lib/mc');

const commonFrenchWords = (() =>
{
  const removeAccents  = require('remove-accents'),
        {getWordsList} = require('most-common-words-by-language');

  let words = getWordsList('french');

  words = words.map(removeAccents)
               .map(word => word.replace(/[^a-z]/i, ''))
               .map(word => word.toUpperCase());

  const unique = {};

  for(let word of words)
  {
    unique[word] = true;
  }

  return unique;
})();

function decrypt(text, keyLength = 5)
{
  const candidateKeys =
    Object.keys(commonFrenchWords).filter(word => word.length === keyLength);

  const textSample = text.replace(/\s+/, ' ')
                         .split(' ')
                         .filter(word => word.length)
                         .slice(0, 512)
                         .join(' ');

  const cipher = new Vigenere();

  const bestKey = (() =>
  {
    const result = {key: null, score: 0};

    for(const key of candidateKeys)
    {
      cipher.keyword = key;

      const msg = cipher.decrypt(textSample).split(' ');

      let score = 0;

      for(const word of msg)
      {
        score += word in commonFrenchWords;
      }

      if(score > result.score)
      {
        result.key = key;
        result.score = score;
      }
    }

    return result;
  })();

  if(!bestKey.key)
  {
    return text;
  }

  cipher.keyword = bestKey.key;

  return cipher.decrypt(text);
}

function getRawMessageLength(rawResponse)
{
  const response = parse(rawResponse);

  return response.txt_crypte.Longueur;
}

solve(11, ({txt_crypte: msg, rawChallengeResponse}) =>
{
  const expectedLength = getRawMessageLength(rawChallengeResponse);

  return {txt_clair: decrypt(msg + ' '.repeat(expectedLength - msg.length))};
});
