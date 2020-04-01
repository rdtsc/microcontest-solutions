#!/usr/bin/env node

'use strict';

const {solve} = require('~/lib/mc');

solve(43, ({s}) => ({s_rev: s.split('').reverse().join('')}));
