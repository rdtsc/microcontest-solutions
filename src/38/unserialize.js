'use strict';

const {PNG} = require('pngjs');

function getImage(response, key = 'img')
{
  const keyPos = response.indexOf(key) + key.length;

  const valueKey = 'Valeur=',
        valuePos = response.indexOf(valueKey, keyPos) + valueKey.length;

  return response.slice(valuePos, -5);
}

module.exports = (response) =>
{
  return PNG.sync.read(getImage(response));
};
