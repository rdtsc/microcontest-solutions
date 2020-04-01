#!/usr/bin/env node

'use strict';

const {solve} = require('~/lib/mc');

solve(16, ({chaine: str}) => ({nombre: /(\d+\.?\d+)/.exec(str)[1]}));
