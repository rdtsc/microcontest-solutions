#!/usr/bin/env node

'use strict';

const os      = require('os'),
      path    = require('path'),
      cluster = require('cluster');

if(cluster.isMaster)
{
  const datasetDefaults =
  {
    imageSize:     416,
    sampleCount:   1,
    minClassCount: 1,
    maxClassCount: 5
  };

  const config =
  {
    archive: true,

    remoteImageDir: '/content/dataset/images',

    dataDir: path.resolve(path.join(__dirname, 'export')),

    datasets:
    {
      training:   {...datasetDefaults, sampleCount: 80}, // 5^3 * 80 = 10,000
      validation: {...datasetDefaults, sampleCount: 16}  // 5^3 * 16 =  2,000
    }
  };

  const workerCount = os.cpus().length;

  require('./master')(config, workerCount);
}

else
{
  require('./worker');
}
