#!/usr/bin/env node

'use strict';

const axios   = require('axios'),
      assert  = require('assert'),
      cheerio = require('cheerio');

const {solve} = require('~/lib/mc');

solve(44, async ({username}) =>
{
  const response = await axios
  ({
    method:  'get',
    url:     `http://www.wechall.net/en/profile/${username}`,
    headers: {'user-agent': ' '}
  });

  assert(response.status === 200);

  const $ = cheerio.load(response.data);

  const getValue = (title) =>
    $(`th:contains("${title}")`).first().nextAll('td').text().trim();

  const result =
  {
    score:         getValue('Score'),
    rank:          getValue('Global Rank'),
    register_date: getValue('Register Date'),
    last_activity: getValue('Last Activity')
  };

  return result;
});
