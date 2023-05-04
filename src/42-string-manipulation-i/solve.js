#!/usr/bin/env node

'use strict';

const {solve} = require('~/lib/mc');

solve(42, ({s1, s2}) => ({s3: s1 + s2}));
