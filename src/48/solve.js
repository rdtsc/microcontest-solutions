#!/usr/bin/env node

'use strict';

const chunk  = require('lodash.chunk'),
      assert = require('assert');

const Puzzle  = require('~/lib/nps'),
      {solve} = require('~/lib/mc');

function unserializePuzzle(response)
{
  const valueKey = 'Valeur=',
        valuePos = response.indexOf(valueKey) + valueKey.length;

  const tiles = response.slice(valuePos)
                        .split(/[;,]/)
                        .map(cell => cell.startsWith('X') ? '' : +cell);

  assert(tiles.length === 16);

  const emptyPosition = tiles.indexOf('');

  assert(emptyPosition >= 0);

  return chunk(tiles, 4);
}

function getMoves(board)
{
  const puzzle = new Puzzle(board);

  const moves = puzzle.solve().map((move) =>
  {
    const {x: x1, y: y1} = move.empty,
          {x: x2, y: y2} = move.piece;

    if(x1 > x2) return 'R';
    if(x1 < x2) return 'L';
    if(y1 > y2) return 'D';
    if(y1 < y2) return 'U';

    assert(false);
  });

  return moves.join('');
}

solve(48, ({rawChallengeResponse}) =>
{
  const puzzle = unserializePuzzle(rawChallengeResponse);

  return {moves: getMoves(puzzle)};
});
