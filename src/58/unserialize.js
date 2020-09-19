'use strict';

const assert  = require('assert'),
      {parse} = require('ini');

const normalize = require('./normalize');

module.exports = (response) =>
{
  const ini = parse(response.replace(/;/g, ','));

  const hasValue = (key) =>
    key in ini && 'Valeur' in ini[key];

  const nonEmpty = (value) =>
    value.trim().length;

  assert(hasValue('tx'));
  assert(hasValue('rx'));

  let tx = ini.tx.Valeur.split(','),
      rx = ini.rx.Valeur.split(',');

  assert(tx.every(nonEmpty));
  assert(rx.every(nonEmpty));

  tx = normalize(tx.map(Number));
  rx = normalize(rx.map(Number));

  return {tx, rx};
};
