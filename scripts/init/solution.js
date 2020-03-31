'use strict';

const fs      = require('fs-extra'),
      toCamel = require('camelcase');

const echo   = require('./echo'),
      render = require('./render');

module.exports = (solutionPath, problem) =>
{
  if(!fs.existsSync(solutionPath))
  {
    const get = (feature) =>
      problem.io[feature].map(item => item.name);

    const view =
    {
      id:      problem.id,
      args:    get('inputs').map(toCamel),
      results: get('outputs'),
    };

    fs.writeFileSync(solutionPath, render.solution(view));

    echo(solutionPath);

    return true;
  }

  return false;
};
