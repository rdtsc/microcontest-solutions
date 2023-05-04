#!/usr/bin/env node

'use strict';

const math     = require('mathjs'),
      assert   = require('assert'),
      newGraph = require('ngraph.graph'),
      pageRank = require('ngraph.pagerank');

const {solve} = require('~/lib/mc');

function unserializeGraph(matrix)
{
  matrix = math.matrix(JSON.parse(matrix.replace(/\]\[/g, '],[')));

  assert(matrix.size().every((n, i, metrics) => n === metrics[0]));

  const graph = newGraph();

  matrix.forEach((hasEdge, [x, y]) =>
  {
    if(hasEdge)
    {
      graph.addLink(x, y);
    }
  });

  return graph;
}

solve(55, ({links}) =>
{
  const graph = unserializeGraph(links);

  const rank = Object.entries(pageRank(graph, 1))
                     .sort((lhs, rhs) => rhs[1] - lhs[1])
                     .map(destination => ++destination[0])
                     .join();

  return {rank};
});
