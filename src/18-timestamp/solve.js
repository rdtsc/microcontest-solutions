#!/usr/bin/env node

'use strict';

const moment = require('moment');

const {solve} = require('~/lib/mc');

solve(18, () => ({timestamp: moment().unix()}));
