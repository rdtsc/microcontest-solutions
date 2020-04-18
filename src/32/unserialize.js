'use strict';

const assert  = require('assert'),
      {parse} = require('ini');

module.exports = (response) =>
{
  const ini = parse(response.replace(/;/g, ','));

  const value = (key) =>
  {
    assert(key in ini && 'Valeur' in ini[key]);

    return ini[key].Valeur;
  };

  const sequence     = value('message_chiffre').split(',').map(Number),
        sessionToken = value('phpsessid');

  return {sequence, sessionToken};
};
