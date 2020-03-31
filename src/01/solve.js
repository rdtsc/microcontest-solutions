#!/usr/bin/env node

'use strict';

const {solve} = require('~/lib/mc');

solve(1, ({a, b}) =>
{
  return {s: a + b};
});
