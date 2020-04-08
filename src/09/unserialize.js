'use strict';

const {parse} = require('ini');

function getImage(response, key = 'img')
{
  const keyPos = response.indexOf(key) + key.length;

  const valueKey = 'Valeur=',
        valuePos = response.indexOf(valueKey, keyPos) + valueKey.length;

  return response.slice(valuePos, -5);
}

module.exports = (response) =>
{
  const ini = parse(response.toString().replace(/<br\/>/g, '\n'));

  const result =
  {
    rows: +ini.nb_lignes.Valeur,
    cols: +ini.nb_colonnes.Valeur,
    img:  getImage(response)
  };

  return result;
};
