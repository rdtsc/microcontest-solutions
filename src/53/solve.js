#!/usr/bin/env node

'use strict';

const {solve} = require('~/lib/mc');

solve(53, ({mass, height, sex, age}) =>
{
  const bmi = mass / (height / 100) ** 2;

  const bfp = age < 16 ? (1.51 * bmi) - (0.70 * age) - (3.60 * sex) + 1.4 :
                         (1.20 * bmi) + (0.23 * age) - (10.8 * sex) - 5.4;

  return {bmi, bfp};
});
