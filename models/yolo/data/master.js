'use strict';

const fs        = require('fs-extra'),
      ora       = require('ora'),
      path      = require('path'),
      Yaml      = require('json-to-pretty-yaml'),
      assert    = require('assert'),
      toTitle   = require('titlecase'),
      archiver  = require('archiver'),
      Progress  = require('progress'),
      Conductor = require('okanjo-conductor');

const Canvas = require('./canvas');

function writeMetadata(filepath, remoteImageDir)
{
  const objectClassList = Object.entries(Canvas.getObjectClasses())
                                .sort((lhs, rhs) => lhs[1] - rhs[1])
                                .map(category => category[0]);

  const unixPath = (type) =>
    path.join(remoteImageDir, type).replace(/\\/g, '/');

  const metadata =
  {
    train: unixPath('training'),
    val:   unixPath('validation'),
    nc:    objectClassList.length,
    names: objectClassList
  };

  fs.outputFileSync(filepath, Yaml.stringify(metadata));
}

function* shapeGenerator(sampleCount, minClassCount, maxClassCount)
{
  for(let i = minClassCount; i <= maxClassCount; ++i)
  for(let j = minClassCount; j <= maxClassCount; ++j)
  for(let k = minClassCount; k <= maxClassCount; ++k)
  {
    for(let n = 0; n < sampleCount; ++n)
    {
      yield [i, j, k];
    }
  }
}

function addCanvasJobs(conductor, type, dataDir, archive, dataset)
{
  const {imageSize, sampleCount: n, minClassCount: min, maxClassCount: max} =
    dataset;

  assert(n >= 1);
  assert(min >= 0);
  assert(max >= min);
  assert(imageSize && !(imageSize % 32));

  if(archive)
  {
    dataDir = path.resolve(path.join(dataDir, 'scratch'));
  }

  for(const shapes of shapeGenerator(n, min, max))
  {
    conductor.jobsQueue.push({type, dataDir, shapes, imageSize});
  }
}

async function makeArchive(filepath, scratchDir, zipLevel = 6)
{
  return new Promise((resolve, reject) =>
  {
    const stream  = fs.createWriteStream(filepath),
          archive = archiver('zip', {zlib: {level: zipLevel}});

    archive.once('error', reject);

    stream.once('close', resolve);

    archive.pipe(stream);

    archive.directory(scratchDir, false)
           .finalize();
  });
}

module.exports = async (config, workerLimit = 1) =>
{
  const {archive, remoteImageDir, dataDir, datasets} = config;

  assert(['training', 'validation'].every(type => type in datasets));

  fs.emptyDirSync(dataDir);

  const metadataPath =
    path.join(dataDir, (archive ? 'scratch' : ''), 'meta.yaml');

  writeMetadata(metadataPath, remoteImageDir);

  await new Promise((resolve) =>
  {
    const conductor = new Conductor({workerLimit, logging: false});

    for(const type of Object.keys(datasets))
    {
      addCanvasJobs(conductor, type, dataDir, archive, config.datasets[type]);
    }

    const progress = new Progress('Dataset :bar :percent @ :type - ETA :etas',
    {
      width: 30,
      clear: true,
      complete: '█',
      incomplete: '░',
      renderThrottle: 100,
      total: conductor.jobsQueue.length
    });

    conductor.onWorkerMessage = (id, {cmd, data}) =>
      cmd === 'tick' && progress.tick({type: toTitle(data)});

    conductor.once('end', resolve)
             .start();
  });

  if(archive)
  {
    const spinner = ora('Archiving...').start();

    const scratchDir = path.dirname(metadataPath);

    await makeArchive(path.join(dataDir, 'dataset.zip'), scratchDir);

    fs.removeSync(scratchDir);

    spinner.stop();
  }

  setTimeout(() => console.log('Saved in:', dataDir), 100);
};
