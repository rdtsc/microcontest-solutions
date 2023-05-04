'use strict';

const each     = require('each-cons'),
      chunk    = require('lodash.chunk'),
      assert   = require('assert'),
      dijkstra = require('dijkstrajs');

function getRows(maze, cols)
{
  // [O]uverts/[F]ermés -> Open/Closed
  assert(!/[^OF-]/.test(maze));

  const cells = maze.split('-')
                    .map((cell, id) => ({id, walls: cell}));

  assert(cells.every(cell => cell.walls.length === 4));

  return chunk(cells, cols);
}

function unserialize(maze, cols)
{
  const rows = getRows(maze, cols);

  const graph = {},
        moves = {};

  const addPair = (cell, nextCell, direction) =>
  {
    graph[cell.id][nextCell.id] = 1;

    if(!(cell.id in moves))
    {
      moves[cell.id] = {};
    }

    moves[cell.id][nextCell.id] = direction;
  };

  for(let y = 0; y < rows.length; ++y)
  for(let x = 0; x < cols; ++x)
  {
    const cell = rows[y][x];

    graph[cell.id] = {};

    const neighbors =
    [
      {index: 0, y: y - 1, x: x + 0, direction: /* Up    */ 'U'},
      {index: 1, y: y + 0, x: x - 1, direction: /* Left  */ 'L'},
      {index: 2, y: y + 1, x: x + 0, direction: /* Down  */ 'D'},
      {index: 3, y: y + 0, x: x + 1, direction: /* Right */ 'R'}
    ];

    for(const neighbor of neighbors)
    {
      if(cell.walls[neighbor.index] === /* Open */ 'O')
      {
        const nextCell = rows[neighbor.y][neighbor.x];

        addPair(cell, nextCell, neighbor.direction);
      }
    }
  }

  return {graph, moves};
}

module.exports.getMoves = (maze, cols, from, to) =>
{
  maze = unserialize(maze, cols);

  const solution =
    dijkstra.find_path(maze.graph, from, to);

  const path = [];

  for(const [src, dst] of each(solution, 2))
  {
    path.push(maze.moves[src][dst]);
  }

  const translate =
  {
    /* Up    */ 'U': 'H', // [H]aut
    /* Left  */ 'L': 'G', // [G]auche
    /* Down  */ 'D': 'B', // [B]as
    /* Right */ 'R': 'D'  // [D]roite
  };

  return path.map(direction => translate[direction]).join('');
};
