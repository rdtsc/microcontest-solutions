'use strict';

const fs         = require('fs-extra'),
      yaml       = require('js-yaml'),
      assert     = require('assert'),
      indent     = require('indent-string'),
      mdTable    = require('markdown-table'),
      toTitle    = require('titlecase'),
      Mustache   = require('mustache'),
      {validate} = require('jsonschema');

function validateView(schemaPath, viewBag)
{
  const schema = require(schemaPath);

  assert(!validate(viewBag, schema).errors.length);
}

function getTemplateText(templatePath)
{
  templatePath = require.resolve(templatePath);

  return fs.readFileSync(templatePath, 'utf8');
}

function render(templatePath, viewBag)
{
  const template = getTemplateText(templatePath);

  return Mustache.render(template, viewBag);
}

function renderResultList(resultList)
{
  let results = {};

  for(const key of resultList)
  {
    results[key] = null;
  }

  results = JSON.stringify(results, null, 2)
                .replace(/"([^"]+)":/g, '$1:');

  results = indent(`\n${results}`, 2).split(/\r?\n/);

  let maxColonOffset = -1;

  for(const line of results)
  {
    maxColonOffset = Math.max(maxColonOffset, line.indexOf(':'));
  }

  results = results.map((line) =>
  {
    const colonOffset = line.indexOf(':');

    if(colonOffset < 0 || colonOffset === maxColonOffset) return line;

    line = line.replace(/: /, `: ${' '.repeat(maxColonOffset - colonOffset)}`);

    return line;
  });

  return results.join('\n');
}

module.exports.markdownIoTable = (rows) =>
{
  const result =
  [
    ['Variable Name', 'Type', 'C Type', 'Description']
  ];

  for(const row of rows)
  {
    const description = row.description.length ? row.description : 'N/A';

    result.push([`**${row.name}**`, row.type, row.cType, description]);
  }

  return mdTable(result);
};

module.exports.meta = (viewBag,
                       schemaPath = '~/schemas/meta.json') =>
{
  validateView(schemaPath, viewBag);

  viewBag.name = toTitle(viewBag.name);

  return yaml.safeDump(viewBag);
};

module.exports.readme = (viewBag,
                         templatePath = '~/templates/readme.md',
                         schemaPath   = '~/schemas/readme.json') =>
{
  validateView(schemaPath, viewBag);

  viewBag.name = toTitle(viewBag.name);

  return render(templatePath, viewBag);
};

module.exports.solution = (viewBag,
                           templatePath = '~/templates/solve.js',
                           schemaPath   = '~/schemas/solve.json') =>
{
  validateView(schemaPath, viewBag);

  viewBag.args = viewBag.args.join(', ');

  viewBag.results = renderResultList(viewBag.results);

  return render(templatePath, viewBag).replace(/ +$/gm, '')
                                      .replace(/^(\s+)@/gm, '$1');
};
