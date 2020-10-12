'use strict';

const fs     = require('fs-extra'),
      path   = require('path'),
      temp   = require('temp'),
      assert = require('assert'),
      Docker = require('dockerode');

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
  const coreDir = path.resolve(path.join(__dirname, 'core'));

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

module.exports = async (dockerImageTagName, payload) =>
{
  const docker = await getDocker();

  const {inputDir, outputDir} = getTempPaths();

  fs.outputJsonSync(path.join(inputDir, 'payload.json'), payload);

  const containerOk =
    await runContainer(docker, dockerImageTagName, inputDir, outputDir);

  assert(containerOk);

  return fs.readJsonSync(path.join(outputDir, 'result.json'));
};
