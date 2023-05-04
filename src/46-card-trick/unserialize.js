'use strict';

const assert  = require('assert'),
      {parse} = require('ini');

module.exports = (response) =>
{
  const ini = parse(response.replace(/;/g, ','));

  const hasValue = (key) =>
    key in ini && 'Valeur' in ini[key];

  assert(hasValue('cards_passed'));
  assert(hasValue('final_sequence'));

  const sequence =
    ini.final_sequence.Valeur.split(',');

  assert(sequence.every(card => card.trim().length));

  const numbers =
    ini.cards_passed.Valeur.split(',').map(Number);

  assert(numbers.every(n => n >= 1 && n <= 3));

  return {sequence, numbers};
};
