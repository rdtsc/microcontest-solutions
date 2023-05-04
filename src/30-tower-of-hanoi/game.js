'use strict';

const assert  = require('assert'),
      isEqual = require('lodash.isequal'),
      flatten = require('lodash.flattendeep');

function getAllMoves(diskCount)
{
  assert(diskCount >= 1 && diskCount <= 20);

  const result = [],
        state  = [[...Array(diskCount).keys()], [], []];

  const generate = (val, lhs = 1, mid = 2, rhs = 3) =>
  {
    if(val)
    {
      generate(val - 1, lhs, rhs, mid);

      state[lhs - 1].shift();
      state[rhs - 1].unshift(val - 1);

      result.push
      ({
        val:   val - 1,
        src:   lhs,
        dst:   rhs,
        state: state.map(tower => [...tower])
      });

      generate(val - 1, mid, lhs, rhs);
    }

    return result;
  };

  return generate(diskCount);
}

function isValidState(state)
{
  const flatState =
    flatten(state).sort((a, b) => (a - b));

  const increasingSequence =
    [...Array(flatState.length).keys()];

  return isEqual(flatState, increasingSequence);
}

module.exports.getInstructionsFrom = (initialState) =>
{
  assert(isValidState(initialState));

  const diskCount =
    Math.max(...flatten(initialState)) + 1;

  const allMoves = getAllMoves(diskCount);

  const initialStateIndex = allMoves.findIndex((move) =>
  {
    return isEqual(move.state, initialState);
  });

  assert(initialStateIndex >= 0);

  const instructions = [];

  for(let i = initialStateIndex + 1; i < allMoves.length; ++i)
  {
    instructions.push(`${allMoves[i].src}>${allMoves[i].dst}`);
  }

  return instructions.join();
};
