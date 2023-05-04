'use strict';

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

module.exports = (response) =>
{
  const signal =
    getBuffer('signal_recu', response);

  const carrierFrequency =
    +getBuffer('freq_porteuse', response);

  return {signal, carrierFrequency};
};
