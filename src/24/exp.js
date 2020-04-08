'use strict';

const mexp = require('math-expression-evaluator');

mexp.math.isDegree = false;

const alias = (value, token) =>
  ({type: 0, token, value});

const extensions =
[
  alias(x => -x,    '_'),
  alias(x => x % 1, 'D'),
  alias(Math.round, 'E'),
  alias(Math.abs,   'abs'),
  alias(Math.exp,   'exp'),
  alias(Math.sqrt,  'sqrt'),
  alias(Math.tanh,  'tanh'),
  alias(Math.acosh, 'argch'),
  alias(Math.asinh, 'argsh'),
  alias(Math.atanh, 'argth'),
  alias(Math.acos,  'arccos'),
  alias(Math.asin,  'arcsin'),
  alias(Math.atan,  'arctan')
];

mexp.addToken(extensions);

module.exports = mexp;
