'use strict';

const normalize = require('./normalize');

function getImage(response, key)
{
  const keyPos = response.indexOf(key) + key.length;

  const valueKey = 'Valeur=',
        valuePos = response.indexOf(valueKey, keyPos) + valueKey.length;

  return response.slice(valuePos, -5);
}

module.exports = (response) =>
{
  const get = (key) =>
    normalize(getImage(response, key));

  const img1 = get('img1'),
        img2 = get('img2');

  return {img1, img2};
};
