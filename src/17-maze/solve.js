#!/usr/bin/env node

'use strict';

const maze    = require('./maze'),
      {solve} = require('~/lib/mc');

solve(17, ({laby:            cells,
            nb_colonnes:     cols,
            colonne_depart:  x0,
            ligne_depart:    y0,
            colonne_arrivee: x1,
            ligne_arrivee:   y1}) =>
{
  const cellId = (x, y) =>
    ((y - 1) * cols + (x - 1));

  const src = cellId(x0, y0),
        dst = cellId(x1, y1);

  return {chemin: maze.getMoves(cells, cols, src, dst)};
});
