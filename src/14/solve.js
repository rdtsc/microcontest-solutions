#!/usr/bin/env node

'use strict';

const {solve} = require('~/lib/mc');

solve(14, ({naissance: yob, date_courante: now}) => ({age: now - yob}));
