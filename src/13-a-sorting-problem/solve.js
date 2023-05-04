#!/usr/bin/env node

'use strict';

const {solve} = require('~/lib/mc');

solve(13, ({tableau: str, ordre: order}) =>
{
  str = str.split('').sort((lhs, rhs) =>
  {
    const a = lhs.charCodeAt(),
          b = rhs.charCodeAt();

    return order ? b - a : a - b;
  }).join('');

  return {tableau_classe: str};
});
