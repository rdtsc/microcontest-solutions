#!/usr/bin/env node

'use strict';

const axios   = require('axios'),
      assert  = require('assert'),
      cheerio = require('cheerio');

const {solve} = require('~/lib/mc');

solve(15, async ({x}) =>
{
  const response = await axios
  ({
    method:  'get',
    url:     'http://www.microcontest.com/contests/15/nombre.php',
    params:  {x},
    headers: {'user-agent': ' '}
  });

  assert(response.status === 200);

  const $ = cheerio.load(response.data);

  return {y: $('p').text().trim()};
});
