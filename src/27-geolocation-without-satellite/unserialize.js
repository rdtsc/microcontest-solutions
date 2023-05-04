'use strict';

const assert = require('assert'),
      moment = require('moment-timezone');

function translate(args)
{
  const orientations =
  {
    'sud':  'south',
    'nord': 'north'
  };

  assert(args.orientation in orientations);

  const result =
  {
    time:         args.heure,
    dayMonth:     args.date,
    stickLength:  args.hauteur,
    shadowLength: args.ombre,
    orientation:  orientations[args.orientation]
  };

  return result;
}

function getDateTime(args, year = 2011, timezone = 'Europe/Paris')
{
  const dayMonth = args.dayMonth.split('/').map(Number);

  const day   = dayMonth[0],
        month = dayMonth[1] - 1;

  const hour   = args.time,
        minute = hour % 1 * 60,
        second = minute % 1 * 60;

  const result = moment.tz([year, month, day, hour, minute, second], timezone);

  assert(result.isValid());

  return result;
}

module.exports = (args) =>
{
  args = translate(args);

  args.dateTime = getDateTime(args);

  return args;
};
