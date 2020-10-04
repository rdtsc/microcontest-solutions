#!/usr/bin/env node

'use strict';

const tn     = require('tonal-note'),
      fft    = require('fourier-transform'),
      wave   = require('@wpdas/wave-header'),
      assert = require('assert');

const {solve} = require('~/lib/mc');

function unserialize(response, key = 'wav')
{
  const keyPos = response.indexOf(key) + key.length;

  const valueKey = 'Valeur=',
        valuePos = response.indexOf(valueKey, keyPos) + valueKey.length;

  return response.slice(valuePos, -5);
}

function getSamples(wav)
{
  const waveHeaderWidth = 44;

  let samples = wav.slice(waveHeaderWidth);

  samples = samples.slice(0, 2 ** ~~Math.log2(samples.length));

  const result = [];

  for(let i = 0; i < samples.length; i += 2)
  {
    result.push(samples.readInt16LE(i));
  }

  return result;
}

function decode(wav)
{
  const header = wave.readHeader(wav);

  assert(header.formatLength === 16);

  const samples  = getSamples(wav),
        spectrum = fft(samples);

  const maxFrequencyPos =
    spectrum.indexOf(Math.max(...spectrum));

  const frequency = maxFrequencyPos *
    (header.byteRate / (samples.length * 2));

  const duration =
    header.dataLength / header.byteRate;

  return {samples, spectrum, frequency, duration};
}

function distill(specimen)
{
  const noteMap = {C: 0, D: 1, E: 2, F: 3, G: 4, A: 5, B: 6};

  const midi      = tn.freqToMidi(specimen.frequency, true),
        humanized = tn.fromMidi(midi);

  const key = humanized[0].toUpperCase();

  assert(key in noteMap);

  const note   = noteMap[key],
        octave = tn.oct(humanized) - 1;

  return {note, octave};
}

solve(7, 'raw', ({response}) =>
{
  const specimen = decode(unserialize(response));

  return {...distill(specimen), duree: specimen.duration};
});
