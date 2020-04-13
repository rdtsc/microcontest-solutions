'use strict';

const config = require('./config');

module.exports.isMicroContestMessage = (email) =>
{
  const expectedSubjectPattern =
    new RegExp(config.challenge.expectedSubjectPattern, 'i');

  const isExpectedSubject =
    expectedSubjectPattern.test(email.subject.trim());

  const isFromMicroContest = (entity) =>
    entity.address === config.challenge.expectedFromAddress;

  return isExpectedSubject && email.from.some(isFromMicroContest);
};
