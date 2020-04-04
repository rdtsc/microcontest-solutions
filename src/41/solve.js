#!/usr/bin/env node

'use strict';

const assert  = require('assert'),
      {Chess} = require('chess.js');

const {solve} = require('~/lib/mc');

function getWinningMove(pgn)
{
  const game = new Chess();

  game.load_pgn(pgn);

  for(const move of game.moves())
  {
    game.move(move);

    if(game.game_over())
    {
      return move;
    }

    game.undo();
  }

  assert(false);
}

solve(41, ({game}) => ({last: getWinningMove(game)}));
