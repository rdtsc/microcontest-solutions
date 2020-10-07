'use strict';

const fs      = require('fs-extra'),
      path    = require('path'),
      temp    = require('temp'),
      assert  = require('assert'),
      Docker  = require('dockerode'),
      countBy = require('lodash.countby');

temp.track();

async function isDockerAvailable(docker)
{
  try
  {
    await docker.ping();
    return true;
  }

  catch(error)
  {
    console.error(error);
  }

  return false;
}

async function getDocker()
{
  const docker   = new Docker(),
        dockerOk = await isDockerAvailable(docker);

  assert(dockerOk);

  return docker;
}

async function runContainer(docker, imageTagName, inputDir, outputDir)
{
  const packageDir = path.dirname(require.resolve('~/package')),
        coreDir    = path.resolve(path.join(packageDir, 'models/yolo/core'));

  const hostConfig =
  {
    autoRemove: true,

    binds:
    [
      `${coreDir}:/app/core:ro`,
      `${inputDir}:/app/input:ro`,
      `${outputDir}:/app/output`
    ]
  };

  try
  {
    await docker.run(imageTagName, null, null, {hostConfig});
    return true;
  }

  catch(error)
  {
    console.error(error);
  }

  return false;
}

function getTempPaths()
{
  const tempDir   = path.resolve(temp.mkdirSync('mc-')),
        inputDir  = path.resolve(path.join(tempDir, 'input')),
        outputDir = path.resolve(path.join(tempDir, 'output'));

  fs.ensureDirSync(tempDir);
  fs.ensureDirSync(inputDir);
  fs.ensureDirSync(outputDir);

  return {tempDir, inputDir, outputDir};
}

function getModelClassMap(repositoryPath = '~/models/yolo/core/classes.json')
{
  const classes = require(repositoryPath);

  assert(Array.isArray(classes));
  assert(new Set(classes).size === classes.length);

  return {...classes};
}

function decodeModelResult(rawYoloDetections)
{
  if(typeof rawYoloDetections !== 'string')
  {
    rawYoloDetections = '';
  }

  const modelClassMap = getModelClassMap();

  const toFirstNumericColumn = (line) =>
    +line.trim().split(/\s/)[0];

  const detectedIds = rawYoloDetections.split('\n')
                                       .filter(line => line.length)
                                       .map(toFirstNumericColumn);

  const idHistogram = countBy(detectedIds);

  const result = {};

  for(const id of Object.keys(modelClassMap).sort())
  {
    const className = modelClassMap[id];

    result[className] = id in idHistogram ? idHistogram[id] : 0;
  }

  return result;
}

module.exports = async (dockerImageTagName, ...pngs) =>
{
  const result = [];

  if(!pngs.length)
  {
    return result;
  }

  assert(pngs.every(Buffer.isBuffer));

  const docker = await getDocker();

  const {inputDir, outputDir} = getTempPaths();

  for(let i = 0; i < pngs.length; ++i)
  {
    fs.writeFileSync(path.join(inputDir, `${i}.png`), pngs[i]);
  }

  const containerOk =
    await runContainer(docker, dockerImageTagName, inputDir, outputDir);

  assert(containerOk);

  for(let i = 0; i < pngs.length; ++i)
  {
    const detectionsFilePath = path.join(outputDir, `${i}.txt`);

    let rawDetections = null;

    if(fs.existsSync(detectionsFilePath))
    {
      rawDetections = fs.readFileSync(detectionsFilePath, 'utf8');
    }

    result.push(decodeModelResult(rawDetections));
  }

  return result;
};
