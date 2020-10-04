#!/usr/bin/env node

'use strict';

const {solve} = require('~/lib/mc');

solve(8, (args) =>
{
  const initialHeight   = args.h,
        targetHeight    = args.H,
        targetDistance  = args.D,
        initialVelocity = args.v0,
        launchAngle     = args.theta;

  const v =
  {
    x: initialVelocity * Math.cos(launchAngle),
    y: initialVelocity * Math.sin(launchAngle)
  };

  const g = 9.81,
        t = targetDistance / v.x,
        y = initialHeight + v.y * t - g * t ** 2 / 2;

  return {e: y - targetHeight, duree: t};
});
