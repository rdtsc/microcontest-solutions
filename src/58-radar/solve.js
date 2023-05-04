#!/usr/bin/env node

'use strict';

const assert = require('assert'),
      fft    = require('fourier-transform');

const {solve}     = require('~/lib/mc'),
      unserialize = require('./unserialize');

function getSignature(samples,
                      sampleRate,
                      convertToLookupTable = false,
                      maxCount = 50)
{
  assert(maxCount >= 1);

  const result = fft(samples).map((value, index) => ({value, index}))
                             .sort((lhs, rhs) => (rhs.value - lhs.value))
                             .slice(0, maxCount);

  const toFrequency = (peak) =>
    Math.round(peak.index * sampleRate / samples.length);

  const toLookupTable = (result, peak) =>
    (result[toFrequency(peak)] = peak.value, result);

  if(convertToLookupTable)
  {
    return result.reduce(toLookupTable, {});
  }

  return result.map(toFrequency);
}

function getRxSampleScore(rxSamples, txSignature, sampleRate)
{
  const rxSignature = getSignature(rxSamples, sampleRate);

  let result = 0;

  for(const f of rxSignature)
  {
    result += f in txSignature;
  }

  return result;
}

solve(58, ({rawChallengeResponse}) =>
{
  const {tx, rx} = unserialize(rawChallengeResponse);

  const sampleRate = 27500,
        windowSize = 4096;

  assert(tx.length === sampleRate);
  assert(rx.length === sampleRate);

  const txSignature =
    getSignature(tx.slice(0, windowSize), sampleRate, true);

  const maxScore = {index: 0, value: 0};

  for(let i = 0, j = sampleRate - windowSize; i < j; i += 20)
  {
    const score =
      getRxSampleScore(rx.slice(i, windowSize + i), txSignature, sampleRate);

    if(score > maxScore.value)
    {
      maxScore.index = i;
      maxScore.value = score;
    }
  }

  const rtt = maxScore.index / sampleRate;

  return {distance: Math.round(rtt * 170)};
});
