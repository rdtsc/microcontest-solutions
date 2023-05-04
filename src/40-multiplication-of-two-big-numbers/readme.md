# Multiplication of Two (Big) Numbers

**Mathematics – Problem #40**

`http://www.microcontest.com/contest.php?id=40&lang=en`


## Description

This challenge is no more difficult than Sum of Two Numbers
(`http://www.microcontest.com/contest.php?id=1`), except that:

- You must multiply instead of adding.
- The numbers you need to multiply are large (>10<sup>10</sup>). This means
  that the variables you use in your code (`int` in C/C++ for example) may be
  too small to store these numbers. You have to find a solution to this.

You must retrieve the variables `a` and `b`, multiply them together, and return
the result in `c`.

For example, you can get:

```text
a = 13630173291241841819
b = 6227528191987228993
```

You should return in this case:

```text
c = 84882288432879925579313398647436658267
```

**Important**: Note that the variables `a`, `b` and `c` can be interpreted
either as integers (if your language is suitable), or as a character string.
You can choose the solution you want in your program.


## I/O

### Inputs

| Variable Name | Type    | C Type | Description |
| ------------- | ------- | ------ | ----------- |
| **a**         | String  | char*  | Big number  |
| **b**         | String  | char*  | Big number  |

### Outputs

| Variable Name | Type    | C Type | Description            |
| ------------- | ------- | ------ | ---------------------- |
| **c**         | String  | char*  | Product of `a` and `b` |
