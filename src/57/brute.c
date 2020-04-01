#include <limits.h>
#include <stdio.h>
#include <stdlib.h>

static unsigned fn(const unsigned seed, const unsigned input)
{
   unsigned out = 0,
            val = seed % ((input & 32) + 1);

   out = seed & ~input;
   out ^= (input >> val) | (input << val);

   return out;
}

int main(const int argc, const char* const argv[])
{
  if(argc != 3)
  {
    return EXIT_FAILURE;
  }

  const unsigned seed   = atoll(argv[1]),
                 output = atoll(argv[2]);

  for(unsigned input = 5e8; input < UINT_MAX; ++input)
  {
    if(fn(seed, input) == output)
    {
      printf("%u\n", input);

      return EXIT_SUCCESS;
    }
  }

  return EXIT_FAILURE;
}
