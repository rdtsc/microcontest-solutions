'use strict';

const fs      = require('fs-extra'),
      url     = require('url'),
      path    = require('path'),
      zero    = require('zero-fill'),
      axios   = require('axios'),
      assert  = require('assert'),
      cheerio = require('cheerio');

const platformBaseUrl = 'http://www.microcontest.com/';

const getProblemUrl = (id) =>
  url.resolve(platformBaseUrl, `contest.php?id=${id}&lang=en`);

function request(config, cookie = '')
{
  const client = axios.create
  ({
    headers:
    {
      cookie,
      'user-agent': ' '
    }
  });

  return client.request(config);
}

async function getProblemStatementHtml(problemId)
{
  const response = await request
  ({
    method: 'get',
    url:    getProblemUrl(problemId)
  });

  assert(response.status === 200);

  return response.data;
}

function getProblemName($)
{
  const pageTitle = $('title').text();

  return pageTitle.substring(pageTitle.indexOf('-') + 1).trim();
}

function getProblemCategory($)
{
  return $('.mc_box h3 a:nth-child(2)').text().trim();
}

function getProblemDescription($)
{
  $ = cheerio.load($.html(), {decodeEntities: false});

  const containerSelector = '.mc_contest_view_text';

  const purge =
  [
    '#mc_summary',
    '#mc_whovalidated',
    '#mc_vars_table',
    'h3:contains("Variables")',
    'h3:contains("Description")'
  ];

  for(const selector of purge)
  {
    $(selector).remove();
  }

  $(`${containerSelector} br`).replaceWith('\n');

  $(`${containerSelector} a`).each(function()
  {
    const $this = $(this);

    $this.replaceWith($this.html());
  });

  return $(containerSelector).html()
                             .trim()
                             .replace(/\n{3,}/g, '\n\n')
                             .split(/\n/)
                             .map(line => line.trim())
                             .join('\n');
}

function getProblemIo($)
{
  const extract = ($rows) => $rows.map(function()
  {
    const $this = $(this);

    const value = (i) =>
      $this.find(`.vt${i}`).text().replace(/\s+/g, ' ').trim();

    const result =
    {
      name:        value(1),
      type:        value(2),
      cType:       value(3),
      description: value(4)
    };

    return result;
  }).get();

  const result =
  {
    inputs:  extract($('.mc_vars_type').eq(0).nextUntil('.mc_vars_type')),
    outputs: extract($('.mc_vars_type').eq(1).nextUntil())
  };

  return result;
}

module.exports.getProblemStatement = async (problemId) =>
{
  const $ = cheerio.load(await getProblemStatementHtml(problemId));

  if($('h3:contains("Error")').length)
  {
    throw new Error('Problem not available.');
  }

  const result =
  {
    id:          problemId,
    io:          getProblemIo($),
    url:         getProblemUrl(problemId),
    name:        getProblemName($),
    category:    getProblemCategory($),
    description: getProblemDescription($)
  };

  return result;
};

module.exports.downloadImage = async (target, outputPath, id) =>
{
  if(!/^https?:\/\//i.test(target))
  {
    target = url.resolve(platformBaseUrl, target);
  }

  const isLatex   = target.includes('latex.codecogs.com'),
        extension = isLatex ? '.png' : path.parse(url.parse(target).path).ext;

  const result =
  {
    alt:      `Image ${id}`,
    filename: `${zero(2, id)}${extension}`
  };

  if(isLatex)
  {
    result.alt = decodeURIComponent(url.parse(target).search);

    if(result.alt.startsWith('?'))
    {
      result.alt = result.alt.substr(1);
    }
  }

  const response = await request
  ({
    method:       'get',
    url:          target,
    responseType: 'arraybuffer'
  });

  assert(response.status === 200);

  fs.writeFileSync(path.join(outputPath, result.filename), response.data);

  return result;
};
