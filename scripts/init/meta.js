'use strict';

const fs = require('fs-extra');

const echo   = require('./echo'),
      render = require('./render');

function humanizeDescription(ioRow)
{
  ioRow.description = ioRow.description.length ? ioRow.description : 'N/A';

  return ioRow;
}

module.exports = (metaPath, problem) =>
{
  if(!fs.existsSync(metaPath))
  {
    const view =
    {
      id:       problem.id,
      name:     problem.name,
      category: problem.category,
      url:      problem.url,
      inputs:   problem.io.inputs.map(humanizeDescription),
      outputs:  problem.io.outputs.map(humanizeDescription)
    };

    fs.writeFileSync(metaPath, render.meta(view));

    echo(metaPath);

    return true;
  }

  return false;
};
