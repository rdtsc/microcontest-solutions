#!/usr/bin/env node

'use strict';

const LanguageDetect = require('languagedetect');

const {solve} = require('~/lib/mc');

const locales =
{
  danish:     'da',
  dutch:      'du',
  english:    'en',
  finnish:    'fi',
  french:     'fr',
  german:     'de',
  italian:    'it',
  portuguese: 'po',
  spanish:    'es',
  swedish:    'sw'
};

function detect(specimen)
{
  const detector = new LanguageDetect();

  for(const [lang, confidence] of detector.detect(specimen))
  {
    if(lang in locales)
    {
      return locales[lang];
    }
  }

  return null;
}

solve(37, ({txt1, txt2, txt3, txt4}) =>
{
  const result =
  {
    lang1: detect(txt1),
    lang2: detect(txt2),
    lang3: detect(txt3),
    lang4: detect(txt4)
  };

  return result;
});
