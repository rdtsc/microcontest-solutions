#!/usr/bin/env node

'use strict';

const {solve} = require('~/lib/mc');

const encode = (value) =>
  Buffer.from(value.toString()).toString('base64');

const decode = (value) =>
  Buffer.from(value, 'base64').toString('ascii');

solve(50, ({big_number: n}) => ({half_big_number: encode(+decode(n) / 2)}));
