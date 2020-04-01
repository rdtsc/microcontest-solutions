# Strange Function

**Miscellaneous – Problem #57**

`http://www.microcontest.com/contest.php?id=57&lang=en`


## Description

We are considering this C function:

```c
unsigned int function(unsigned int seed, unsigned int input)
{
   unsigned int out = 0;
   unsigned int c = seed % ((input & 32) + 1);

   out = seed & ~input;
   out ^= (input >> c) | (input << c);

   return out;
}
```

This function takes 2 parameters and return an integer.

For example, with

```text
seed  = 123456
input = 1212121212
```

we obtain

```text
1241485807
```

You will be given the seed and the output, and you have to find the
corresponding input (several values are valid).


## I/O

### Inputs

| Variable Name | Type    | C Type | Description           |
| ------------- | ------- | ------ | --------------------- |
| **seed**      | Integer | int    | N/A                   |
| **output**    | Integer | int    | The function's output |

### Outputs

| Variable Name | Type    | C Type | Description                                                                 |
| ------------- | ------- | ------ | --------------------------------------------------------------------------- |
| **input**     | Integer | int    | The input variable, which given to the function with seed, gives the output |
