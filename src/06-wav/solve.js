#!/usr/bin/env node

'use strict';

const wave = require('@wpdas/wave-header');

const {solve} = require('~/lib/mc');

solve(6, ({wav_b64}) =>
{
  const wav = wave.readHeader(Buffer.from(wav_b64, 'base64'));

  const result =
  {
    nb_canaux:             wav.channels,
    nb_bits_echantillon:   wav.bitDepth,
    frequ_echantillonnage: wav.sampleRate
  };

  return result;
});
