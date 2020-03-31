'use strict';

const fs      = require('fs-extra'),
      url     = require('url'),
      path    = require('path'),
      mkdirp  = require('mkdirp'),
      cheerio = require('cheerio');

const mc     = require('~/lib/mc'),
      echo   = require('./echo'),
      render = require('./render');

async function mirrorAssets(html, absoluteOutputDir, relativeOutputDir)
{
  const $ = cheerio.load(html, {decodeEntities: false});

  const $images = $('img');

  if(!$images.length)
  {
    return html;
  }

  mkdirp.sync(absoluteOutputDir) && echo(absoluteOutputDir);

  for(let i = 0; i < $images.length; ++i)
  {
    const $img = $($images[i]);

    const mirror =
      await mc.downloadImage($img.attr('src'), absoluteOutputDir, i);

    echo(path.join(absoluteOutputDir, mirror.filename));

    const relativeCopyPath =
      `./${url.resolve(relativeOutputDir, mirror.filename)}`;

    $img.attr('alt', mirror.alt);
    $img.attr('src', relativeCopyPath);
  }

  return $('body').html();
}

module.exports = async (readmePath, problem) =>
{
  if(!fs.existsSync(readmePath))
  {
    const outputDir = path.dirname(readmePath);

    const description = await mirrorAssets(problem.description,
                                           path.join(outputDir, 'extra'),
                                           './extra/');

    const view =
    {
      description,

      id:       problem.id,
      url:      problem.url,
      name:     problem.name,
      category: problem.category,
      inputs:   render.markdownIoTable(problem.io.inputs),
      outputs:  render.markdownIoTable(problem.io.outputs)
    };

    fs.writeFileSync(readmePath, render.readme(view));

    echo(readmePath);

    return true;
  }

  return false;
};
