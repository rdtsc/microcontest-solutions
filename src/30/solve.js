#!/usr/bin/env node

'use strict';

const assert = require('assert');

const game    = require('./game'),
      {solve} = require('~/lib/mc');

solve(30, ({tour_cible: targetTower,
            tour1:      tower1,
            tour2:      tower2,
            tour3:      tower3}) =>
{
  const unserialize = (tower) =>
    tower.split(',').map(Number).reverse();

  assert(targetTower === 3, 'Unimplemented');

  const state =
  [
    unserialize(tower1),
    unserialize(tower2),
    unserialize(tower3)
  ];

  return {solution: game.getInstructionsFrom(state)};
});
