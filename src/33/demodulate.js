'use strict';

const wave       = require('@wpdas/wave-header'),
      oscillator = require('audio-oscillator/sin');

const lowPassFilter = require('./filter');

function getSamples(wav)
{
  const waveHeaderWidth = 44;

  const samples = wav.slice(waveHeaderWidth);

  const result = [];

  let maxY = Number.MIN_SAFE_INTEGER;

  for(let i = 0; i < samples.length; i += 2)
  {
    const sample = samples.readInt16LE(i);

    maxY = Math.max(maxY, sample);

    result.push(sample);
  }

  return result.map(sample => sample / maxY);
}

module.exports = (signal, carrierFrequency, filter = false) =>
{
  const samples = getSamples(signal),
        header  = wave.readHeader(signal);

  const carrier = oscillator(samples.length,
  {
    frequency:  carrierFrequency,
    sampleRate: header.sampleRate
  });

  const lowPass = lowPassFilter(carrierFrequency, header.sampleRate);

  for(let i = 0; i < samples.length; ++i)
  {
    let product = samples[i] * carrier[i];

    if(filter)
    {
      product = lowPass.filterNextSample(product);
    }

    samples[i] = product;
  }

  return samples;
};
