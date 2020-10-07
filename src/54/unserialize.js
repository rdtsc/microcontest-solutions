'use strict';

module.exports = (args) =>
{
  const result =
  {
    cipher:
    {
      hi:   args.cypher_amplitude,
      lo:   args.cypher_min,
      data: args.cypher
    },

    kernel:
    {
      hi:   args.kernel_amplitude,
      lo:   args.kernel_min,
      data: args.kernel
    }
  };

  return result;
};
