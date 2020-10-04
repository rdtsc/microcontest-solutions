'use strict';

const clamp          = require('lodash.clamp'),
      assert         = require('assert'),
      random         = require('lodash.random'),
      {createCanvas} = require('canvas');

module.exports = class Canvas
{
  constructor(width = random(500, 1000), height = random(500, 1000))
  {
    this.width      = width;
    this.height     = height;
    this.canvas     = createCanvas(width, height);
    this.context    = this.canvas.getContext('2d');
    this.labels     = [];
    this.circles    = 0;
    this.triangles  = 0;
    this.rectangles = 0;

    this.render(() =>
    {
      this.context.fillStyle = 'white';
      this.context.fillRect(0, 0, this.width, this.height);
    });
  }

  static getObjectClasses()
  {
    const result =
    {
      'circle':    0,
      'triangle':  1,
      'rectangle': 2
    };

    return result;
  }

  isEmpty()
  {
    return !(this.circles + this.triangles + this.rectangles);
  }

  getBuffer(size)
  {
    if(typeof size === 'undefined')
    {
      return this.canvas.toBuffer();
    }

    assert(size >= 4);

    const scale = Math.min(size / this.width,
                           size / this.height);

    const w0 = this.width,
          w1 = this.width * scale,
          h0 = this.height,
          h1 = this.height * scale;

    const newCanvas  = createCanvas(size, size),
          newContext = newCanvas.getContext('2d');

    newContext.fillStyle      = 'white';
    newContext.patternQuality = 'best';

    newContext.fillRect(0, 0, size, size);
    newContext.drawImage(this.canvas, 0, 0, w0, h0, 0, 0, w1, h1);

    return newCanvas.toBuffer();
  }

  getLabels(size, padding)
  {
    if(typeof size === 'undefined')
    {
      return this.labels;
    }

    if(typeof padding === 'undefined')
    {
      padding = 0;
    }

    assert(size >= 4);
    assert(padding >= 0 && padding <= size);

    const scale = Math.min(size / this.width,
                           size / this.height);

    const adjust = (value, padding) =>
      Math.round(clamp((value * scale) + padding, 0, size));

    return this.labels.map((item) =>
    {
      item.x0 = adjust(item.x0, -padding);
      item.y0 = adjust(item.y0, -padding);
      item.x1 = adjust(item.x1, +padding);
      item.y1 = adjust(item.y1, +padding);

      return item;
    });
  }

  serialize(size, labelPadding = 4)
  {
    const result =
    {
      buffer: this.getBuffer(size),
      labels: this.getLabels(size, labelPadding)
    };

    return result;
  }

  add(circleCount = 0, triangleCount = 0, rectangleCount = 0)
  {
    this.addCircles(circleCount);
    this.addTriangles(triangleCount);
    this.addRectangles(rectangleCount);
  }

  addCircles(count = 1)
  {
    this.circles += count;

    this.render(count, () =>
    {
      const r = random(5, ~~(this.width * 0.8)),
            x = random(-(r >> 1), this.width  - (r >> 1)),
            y = random(-(r >> 1), this.height - (r >> 1));

      this.context.lineWidth = random(1, 2);
      this.context.arc(x, y, r, 0, 2 * Math.PI);

      const x0 = clamp(x - r, 0, this.width),
            y0 = clamp(y - r, 0, this.height);

      const x1 = clamp(x + r, 0, this.width),
            y1 = clamp(y + r, 0, this.height);

      this.addLabel('circle', x0, y0, x1, y1);
    });
  }

  addTriangles(count = 1)
  {
    this.triangles += count;

    this.render(count, () =>
    {
      const p = [];

      for(let i = 0; i < 3; ++i)
      {
        const x = random(-5, this.width  + 5),
              y = random(-5, this.height + 5);

        p.push([x, y]);
      }

      this.context.lineWidth = random(1, 3);

      this.context.moveTo(...p[0]);
      this.context.lineTo(...p[1]);
      this.context.lineTo(...p[2]);
      this.context.lineTo(...p[0]);

      const x = p.map(point => clamp(point[0], 0, this.width)),
            y = p.map(point => clamp(point[1], 0, this.height));

      const x0 = Math.min(...x),
            y0 = Math.min(...y);

      const x1 = clamp(Math.max(...x), 0, this.width),
            y1 = clamp(Math.max(...y), 0, this.height);

      this.addLabel('triangle', x0, y0, x1, y1);
    });
  }

  addRectangles(count = 1)
  {
    this.rectangles += count;

    this.render(count, () =>
    {
      const x = random(-5, this.width  - 5),
            y = random(-5, this.height - 5);

      const w = random(10, ~~(this.width  * 0.8)),
            h = random(10, ~~(this.height * 0.8));

      this.context.rect(x, y, w, h);

      const isHeavy = !!random(0, 1);

      if(isHeavy)
      {
        this.context.rect(x - 1, y + 0, w, h);
        this.context.rect(x + 1, y + 0, w, h);
        this.context.rect(x - 1, y + 1, w, h);
        this.context.rect(x + 1, y + 1, w, h);
      }

      const x0 = clamp(x, 0, this.width),
            y0 = clamp(y, 0, this.height);

      const x1 = clamp(x + w, 0, this.width),
            y1 = clamp(y + h, 0, this.height);

      this.addLabel('rectangle', x0, y0, x1, y1);
    });
  }

  addLabel(name, x0, y0, x1, y1)
  {
    this.labels.push({name, x0, y0, x1, y1});
  }

  render(count, method)
  {
    if(typeof count === 'function')
    {
      method = count;
      count  = 1;
    }

    this.context.save();
    this.context.antialias   = 'none';
    this.context.strokeStyle = 'black';

    for(let i = 0; i < count; ++i)
    {
      this.context.beginPath();
      method(i);
      this.context.stroke();
    }

    this.context.restore();
  }
};
