#!/usr/bin/env node

'use strict';

const {solve} = require('~/lib/mc');

const commonFrenchWords = (() =>
{
  const removeAccents  = require('remove-accents'),
        {getWordsList} = require('most-common-words-by-language');

  let words = getWordsList('french', 256);

  words = words.map(removeAccents)
               .map(word => word.replace(/[^a-z]/i, ''))
               .filter(word => word.length > 3)
               .map(word => word.toUpperCase());

  const unique = {};

  for(let word of words)
  {
    unique[word] = true;
  }

  return Object.keys(unique).sort((lhs, rhs) =>
  {
    if(lhs.length !== rhs.length)
    {
      return rhs.length - lhs.length;
    }

    return lhs.localeCompare(rhs);
  });
})();

function decrypt(text)
{
  const shift = (key) =>
  {
    const A = 'A'.charCodeAt(0);

    const result = text.split('')
                       .map(c => ((c.charCodeAt(0) - A - key + 26) % 26) + A);

    return String.fromCharCode(...result);
  };

  const key = (() =>
  {
    for(let i = 1; i < 26; ++i)
    {
      const attempt = shift(i);

      for(const test of commonFrenchWords)
      {
        if(attempt.includes(test))
        {
          return i;
        }
      }
    }

    return 0;
  })();

  return shift(key);
}

solve(5, ({txt_crypte1, txt_crypte2, txt_crypte3}) =>
{
  const result =
  {
    txt_clair1: decrypt(txt_crypte1),
    txt_clair2: decrypt(txt_crypte2),
    txt_clair3: decrypt(txt_crypte3)
  };

  return result;
});
