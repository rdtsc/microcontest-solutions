'use strict';

const fs = require('fs-extra');

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
      args:    get('inputs'),
      results: get('outputs')
    };

    fs.writeFileSync(solutionPath, render.solution(view), {mode: 0o775});

    echo(solutionPath);

    return true;
  }

  return false;
};
