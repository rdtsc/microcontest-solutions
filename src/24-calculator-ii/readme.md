# Calculator II

**Mathematics – Problem #24**

`http://www.microcontest.com/contest.php?id=24&lang=en`


## Description

In this version more sophisticated of Calculator I
(`http://www.microcontest.com/contest.php?id=19`), you will have to evaluate
three expressions, composed of numbers and the four basic operators, but also of
brackets and functions.

**These expressions are formatted so the following conditions are respected:**

- The expression is written in conventional infix notation, in which the
  operators are written between the operands, for instance `2 + ( 5 - 3 )`.
- The negative numbers are preceded by the sign `_` instead of `-`, to be well
  differentiated. Thus, `-2` will be written `_2`.
- The result of the asked evaluation of each expression is always contained in
  the interval `[-1000; 1000]`.
- The functions are always written in lowercase, and their unique parameter
  follows them between brackets. Here is the list of the function that can
  appear in the expressions:

| Symbol | Corresponding Function     | Description                             |
| ------ | ----------------------     | --------------------------------------- |
| cos    | Cosine                     | cos(0.3) = 0.9553365...                 |
| sin    | Sine                       | sin(0.5) = 0.4794255...                 |
| tan    | Tangent                    | tan(4) = 1.1578212...                   |
| arccos | Arc Cosine                 | arccos(0.7) = 0.7953988...              |
| arcsin | Arc Sine                   | arcsin(0.7) = 0.77539749...             |
| arctan | Arc Tangent                | arctan(10) = 1.4711276...               |
| cosh   | Hyperbolic Cosine          | cosh(4) = 27.308232...                  |
| sinh   | Hyperbolic Sine            | sinh(3) = 10.017874...                  |
| tanh   | Hyperbolic Tangent         | tanh(0.7) = 0.60436777...               |
| argch  | Inverse Hyperbolic Cosine  | argch(10) = 2.9932228...                |
| argsh  | Inverse Hyperbolic Sine    | argsh(5) = 2.3124383...                 |
| argth  | Inverse Hyperbolic Tangent | argth(0.5) = 0.5493061...               |
| exp    | Base e Exponent            | exp(3) = 20.085536...                   |
| ln     | Natural Logarithm          | ln(7) = 1.9459101...                    |
| log    | Common Logarithm           | log(153) = 2.1846914...                 |
| sqrt   | Square Root                | sqrt(77) = 8.7749643...                 |
| E      | Integer Part               | E(1.357) = 1, E(-3.56) = -4             |
| D      | Fractional Part            | D(1.357) = 0.357, D(-3.56) = -0.56      |
| abs    | Absolute Value             | abs(13.357) = 13.357, abs(-3.56) = 3.56 |

An example of expression you can obtain is:

```text
_151.57+((ln(46.23)*1.71)/(2.22-E(((((0.19-_0.03)*(0.19/113.55))+(argsh(_0.11)+arcsin(0.02)))+(sqrt(0.38)*(0.17-_0.15))))))
```

You should in this case send back `evaluation=-148.617070`.

To finish, your evaluation must approach the real result to about `0.01`.


## I/O

### Inputs

| Variable Name   | Type   | C Type | Description              |
| --------------- | ------ | ------ | ------------------------ |
| **expression1** | String | char*  | Expression 1 to evaluate |
| **expression2** | String | char*  | Expression 2 to evaluate |
| **expression3** | String | char*  | Expression 3 to evaluate |

### Outputs

| Variable Name   | Type | C Type | Description                            |
| --------------- | ---- | ------ | -------------------------------------- |
| **evaluation1** | Real | float  | Evaluation of expression `expression1` |
| **evaluation2** | Real | float  | Evaluation of expression `expression2` |
| **evaluation3** | Real | float  | Evaluation of expression `expression3` |
