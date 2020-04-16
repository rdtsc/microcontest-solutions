'use strict';

const assert  = require('assert'),
      {parse} = require('ini');

module.exports = (response) =>
{
  const ini = parse(response.replace(/;/g, ','));

  const hasValue = (key) =>
    key in ini && 'Valeur' in ini[key];

  const nonEmpty = (value) =>
    value.trim().length;

  assert(hasValue('message_chiffre'));
  assert(hasValue('m0'));
  assert(hasValue('m1'));

  let clear  = [ini.m0.Valeur, ini.m1.Valeur],
      signal = ini.message_chiffre.Valeur.split(',');

  assert(clear.every(nonEmpty));
  assert(signal.every(nonEmpty));

  clear  = clear.map(Number);
  signal = signal.map(Number);

  return {signal, clear};
};
