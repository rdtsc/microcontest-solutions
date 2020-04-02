#!/usr/bin/env node

'use strict';

const assert = require('assert');

const {solve} = require('~/lib/mc');

function play(tape, machine = require('./machine'), maxIterations = 1000)
{
  if(typeof tape === 'string')
  {
    tape = tape.split(' ');
  }

  tape = tape.map(cell => +cell);

  let state    = machine.initialState,
      position = machine.initialPosition;

  assert(state in machine.states);
  assert(position >= 0 && position < tape.length);

  for(let i = 0; i < maxIterations && (state in machine.states); ++i)
  {
    if(position === -1)
    {
      ++position;
      tape.unshift(0);
    }

    else if(position === tape.length)
    {
      tape.push(0);
    }

    const instruction =
      machine.states[state][tape[position]];

    assert([0, 1].includes(tape[position]));
    assert([0, 1].includes(instruction.write));
    assert(['left', 'right'].includes(instruction.move));

    state           = instruction.next;
    tape[position]  = instruction.write;
    position       += instruction.move === 'right' ? 1 : -1;
  }

  return tape.join(' ');
}

solve(45, ({tape}) => ({final_tape_state: play(tape)}));
