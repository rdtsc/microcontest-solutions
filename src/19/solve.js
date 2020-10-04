#!/usr/bin/env node

'use strict';

const exp = require('math-expression-evaluator');

const {solve} = require('~/lib/mc');

solve(19, ({expr}) => ({result: Math.round(exp.eval(expr))}));
