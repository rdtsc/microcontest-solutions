#!/usr/bin/env node

'use strict';

const {parse}    = require('ini'),
      {Vigenere} = require('text-cryptography');

const {solve} = require('~/lib/mc');

function getRawMessageLength(rawResponse)
{
  const response = parse(rawResponse);

  return response.txt_crypte.Longueur;
}

solve(10, ({txt_crypte: msg, clef: key, rawChallengeResponse}) =>
{
  const cipher = new Vigenere(key);

  const expectedLength =
    getRawMessageLength(rawChallengeResponse);

  msg = cipher.decrypt(msg);

  return {txt_clair: msg + ' '.repeat(expectedLength - msg.length)};
});
