'use strict';

const qs      = require('querystring'),
      {parse} = require('ini');

function getBuffer(key, response)
{
  key = `[${key}]<br/>`;

  const valueKey = 'Valeur=',
        tailKey  = '<br/>';

  const keyPos   = response.indexOf(key) + key.length,
        valuePos = response.indexOf(valueKey, keyPos) + valueKey.length,
        tailPos  = response.indexOf(tailKey, valuePos);

  return response.slice(valuePos, tailPos);
}

function getPadding(response)
{
  const ini = parse(response.toString().replace(/<br\/>/g, '\n'));

  return +ini.Nb_Bits_Ajoutes.Valeur;
}

module.exports.unserialize = (response) =>
{
  const padding    = getPadding(response),
        compress   = getBuffer('txt_a_compresser', response).toString(),
        decompress = getBuffer('txt_a_decompresser', response);

  return {padding, compress, decompress};
};

module.exports.serialize = (deflated, inflated) =>
{
  const result =
  [
    `txt_compresse=${deflated}`,
    qs.stringify({txt_decompresse: inflated})
  ];

  return result.join('&');
};
