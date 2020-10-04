'use strict';

const cp       = require('child_process'),
      fs       = require('fs-extra'),
      path     = require('path'),
      assert   = require('assert'),
      crypto   = require('crypto'),
      Worker   = require('okanjo-conductor/ConductorWorker'),
      pngquant = require('pngquant-bin');

const Canvas = require('./canvas');

function makeFilename(circles, triangles, rectangles)
{
  const prefix =
  [
    typeof circles    === 'number' ? `c${circles}`    : false,
    typeof triangles  === 'number' ? `t${triangles}`  : false,
    typeof rectangles === 'number' ? `r${rectangles}` : false
  ].filter(Boolean);

  const suffix = crypto.randomBytes(32)
                       .toString('base64')
                       .replace(/\W/g, '')
                       .slice(0, 16)
                       .toLowerCase();

  if(!prefix.length)
  {
    return suffix;
  }

  return `${prefix.join('-')}-${suffix}`;
}

function toYoloLabels(labels, imageSize)
{
  assert(labels.length);
  assert(imageSize >= 1);

  const objectNames = Canvas.getObjectClasses();

  const result = [];

  for(const {name, x0, y0, x1, y1} of labels)
  {
    assert(name in objectNames);

    const x = ((x0 + x1) / 2) / imageSize,
          y = ((y0 + y1) / 2) / imageSize;

    const w = (x1 - x0) / imageSize,
          h = (y1 - y0) / imageSize;

    const row = [objectNames[name], x, y, w, h];

    result.push(row.join(' '));
  }

  return result.join('\n') + '\n';
}

function quantizePng(pngPath)
{
  const args =
  [
    '--force',
    '--ordered',
    '--speed=1',
    '--quality=50-90',
    '--ext=.png',
    pngPath
  ];

  try
  {
    cp.execFileSync(pngquant, args);
    return true;
  }

  catch(error)
  {
  }

  return false;
}

class CanvasWorker extends Worker
{
  constructor()
  {
    super({logging: false});
  }

  processJob(job)
  {
    const {type, dataDir, shapes, imageSize} = job;

    const imageDir = path.join(dataDir, `images/${type}`),
          labelDir = path.join(dataDir, `labels/${type}`);

    const canvas = new Canvas();

    canvas.add(...shapes);

    const filename  = makeFilename(...shapes),
          imagePath = path.join(imageDir, `${filename}.png`),
          labelPath = path.join(labelDir, `${filename}.txt`);

    const {labels, buffer} = canvas.serialize(imageSize);

    fs.outputFileSync(imagePath, buffer);
    fs.outputFileSync(labelPath, toYoloLabels(labels, imageSize));

    quantizePng(imagePath);

    this.sendRequestToMaster('tick', type);
    this.completeJob(null, job);
  }
}

new CanvasWorker().start();
