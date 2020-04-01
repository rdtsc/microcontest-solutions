#!/usr/bin/env node

'use strict';

const {execSync} = require('child_process');

const {solve} = require('~/lib/mc');

const fn = (seed, output) =>
  execSync(`./brute.out ${seed} ${output}`).toString().trim();

solve(57, ({seed, output}) => ({input: fn(seed, output)}));
