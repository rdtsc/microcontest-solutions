#!/usr/bin/env node

'use strict';

const path   = require('path'),
      zero   = require('zero-fill'),
      {red}  = require('chalk'),
      mkdirp = require('mkdirp');

const mc   = require('~/lib/mc'),
      echo = require('./init/echo');

if(process.argv.length < 3 || !/^\d+$/i.test(process.argv[2]))
{
  console.log('Invalid problem ID.');
  process.exit(1);
}

(async (problemId = +process.argv[2]) =>
{
  try
  {
    const problem = await mc.getProblemStatement(problemId);

    const packageDir = path.dirname(require.resolve('~/package')),
          outputDir  = path.join(packageDir, `src/${zero(2, problemId)}`);

    mkdirp.sync(outputDir) && echo(outputDir);

    const init = (part, path) =>
      require(`./init/${part}`)(path, problem);

    const files =
    {
      meta:     'meta.yaml',
      readme:   'readme.md',
      solution: 'solve.js'
    };

    for(const [chunk, filename] of Object.entries(files))
    {
      await init(chunk, path.join(outputDir, filename));
    }
  }

  catch(error)
  {
    console.log(red(error.message));
    process.exit(1);
  }
})();
