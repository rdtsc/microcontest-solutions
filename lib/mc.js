'use strict';

const fs          = require('fs-extra'),
      qs          = require('querystring'),
      ini         = require('ini'),
      url         = require('url'),
      path        = require('path'),
      zero        = require('zero-fill'),
      axios       = require('axios'),
      chalk       = require('chalk'),
      assert      = require('assert'),
      cheerio     = require('cheerio'),
      parseHeader = require('parse-http-header');

const platform = Object.freeze
({
  baseUrl:  'http://www.microcontest.com/',
  protocol: '2.2'
});

const mcUrl = (relative) =>
  url.resolve(platform.baseUrl, relative);

const getProblemUrl = (id) =>
  mcUrl(`contest.php?id=${id}&lang=en`);

const bail = (msg) =>
{
  console.log(chalk.red(msg));
  process.exit(1);
};

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

async function getCurrentPlatformApiVersion()
{
  const response = await request
  ({
    method:       'get',
    url:          mcUrl(`/version.php?lib=c&lang=en`),
    responseType: 'text'
  });

  assert(response.status === 200);

  return response.data.toString().trim();
}

async function enforcePlatformApiVersion(expected = platform.protocol)
{
  const remote = await getCurrentPlatformApiVersion();

  if(remote !== expected)
  {
    const helpUrl = mcUrl('/interface.php?lang=en');

    bail(`Platform API version mismatch: ${expected} vs ${remote}\n` +
         `Check documentation for updates at: ${helpUrl}`);
  }
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

  const emptyRow = (row) => (row.name !== '');

  const inputs  = extract($('.mc_vars_type').eq(0).nextUntil('.mc_vars_type')),
        outputs = extract($('.mc_vars_type').eq(1).nextUntil());

  const result =
  {
    inputs:  inputs.filter(emptyRow),
    outputs: outputs.filter(emptyRow)
  };

  return result;
}

function getChallengeAuthToken(problemId)
{
  const {username, password} = require('~/auth');

  const authToken =
  {
    username,
    password,

    id:           problemId,
    version:      2,
    contestlogin: 1
  };

  return qs.stringify(authToken);
}

function parseChallengeInitialResponse(response, responseType)
{
  const originalResponse = response;

  if(responseType === 'arraybuffer')
  {
    response = response.toString();
  }

  assert(typeof response === 'string');

  response = response.trim();

  if(!response.length)
  {
    bail('Empty server response.');
  }

  if(/^erreur\s*authentification\s*:\s*c/i.test(response))
  {
    bail('Unknown username.');
  }

  if(/^erreur\s*authentification\s*:\s*v/i.test(response))
  {
    bail('Account not activated.');
  }

  if(/^erreur\s*authentification\s*:\s*m/i.test(response))
  {
    bail('Incorrect password.');
  }

  if(/^erreur/i.test(response) && /bruteforce.*second/i.test(response))
  {
    const matches = /minimum\s*(\d+)\s*/i.exec(response);

    assert(matches.length === 2);

    bail(`Request throttled. API instructed to wait ${matches[1]} seconds.`);
  }

  if(!/nombre_variables/i.test(response))
  {
    bail('Unexpected server response.');
  }

  if(responseType === 'arraybuffer')
  {
    return {response: originalResponse};
  }

  const rawResponse = response.replace(/<br\/>/g, '\n');

  response = ini.parse(rawResponse);

  assert(response.Nombre_variables == Object.keys(response).length - 1);

  delete response.Nombre_variables;

  const result = {};

  for(const key of Object.keys(response))
  {
    assert('Valeur' in response[key]);

    const isStringLike = 'Longueur' in response[key];

    const value =
      isStringLike ? response[key].Valeur : +response[key].Valeur;

    result[key] = value;
  }

  result.rawChallengeResponse = rawResponse;

  return result;
}

function parseChallengeResultResponse(response)
{
  assert(typeof response === 'string');

  const toPairs = (str) =>
  {
    assert(str.includes(':'));

    const colonPos = str.indexOf(':');

    const result =
    {
      key: str.substring(0, colonPos).trim(),
      val: str.substring(colonPos + 1).trim()
    };

    return result;
  };

  response = response.trim()
                     .split(/\r|\n/)
                     .filter(line => line.length)
                     .map(toPairs);

  const result =
  {
    success: 0,
    timeout: 0,
    already: 0,
    points:  0,
    error:   null
  };

  for(const line of response)
  {
    assert(line.key in result);

    result[line.key] = line.key === 'error' ? line.val : +line.val;
  }

  if(result.error === null)
  {
    delete result.error;
  }

  return result;
}

async function beginChallenge(problemId, responseType = 'document')
{
  const response = await request
  ({
    responseType,

    method: 'post',
    url:    mcUrl(`/contests/${problemId}/contest.php`),
    data:   getChallengeAuthToken(problemId)
  });

  assert(response.status === 200);
  assert('set-cookie' in response.headers);
  assert(response.headers['set-cookie'].length);

  let sessionCookie = null;

  for(const cmd of response.headers['set-cookie'])
  {
    const cookie = parseHeader(cmd);

    if('PHPSESSID' in cookie)
    {
      sessionCookie = `PHPSESSID=${cookie.PHPSESSID}`;
      break;
    }
  }

  assert(sessionCookie !== null);

  const result =
  {
    id:     problemId,
    cookie: sessionCookie,
    inputs: parseChallengeInitialResponse(response.data, responseType),
  };

  return result;
}

async function endChallenge(challenge, solution)
{
  const response = await request
  ({
    method: 'post',
    url:    mcUrl(`/contests/${challenge.id}/validation.php`),
    data:   typeof solution === 'string' ? solution : qs.stringify(solution)
  }, challenge.cookie);

  assert(response.status === 200);

  return parseChallengeResultResponse(response.data);
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
    target = mcUrl(target);
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

module.exports.solve = async (problemId, responseType, solve) =>
{
  if(responseType instanceof Function)
  {
    solve = responseType;
    responseType = 'document';
  }

  assert(typeof responseType === 'string');

  responseType = responseType.toLowerCase().trim();

  if(responseType === 'raw')
  {
    responseType = 'arraybuffer';
  }

  assert(/^(?:string|number)$/.test(typeof problemId));
  assert(solve instanceof Function);

  await enforcePlatformApiVersion();

  const challenge = await beginChallenge(problemId, responseType),
        solution  = await solve(challenge.inputs);

  if(typeof solution  === 'undefined')
  {
    bail('No solution to send.');
  }

  const result = await endChallenge(challenge, solution);

  if('error' in result)
  {
    bail(result.error);
  }

  if(result.timeout)
  {
    bail('Time limit exceeded.');
  }

  const msg = [result.success ? 'Correct!' : chalk.red('Incorrect!')];

  result.already && msg.push('Already validated.');
  result.points  && msg.push(`Awarded ${result.points} points.`);

  console.log(chalk.green(msg.join(' ')));
};
