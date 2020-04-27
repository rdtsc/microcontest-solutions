'use strict';

const {iir} = require('oregondsp').com.oregondsp.signalProcessing.filter;

function lowPassFilter(frequency, sampleRate, order = 8)
{
  const delta = 1 / sampleRate;

  const Butterworth = iir.Butterworth,
        type        = iir.PassbandType.LOWPASS;

  return new Butterworth(order, type, frequency, frequency, delta);
}

module.exports = (frequency, sampleRate) =>
{
  return lowPassFilter(frequency, sampleRate);
};
