# Matrices

**Mathematics – Problem #12**

`http://www.microcontest.com/contest.php?id=12&lang=en`


## Description

In this challenge, you will have to manipulate integers matrices.

You have to be able to perform these three operations: Transposition,
inversion, and matrix multiplication

Here is the challenge:

You have to get two matrices, contained in the variables `A` and `B`.

You have to multiply `A` with the transpose of `B`.

Finally, you have to send back the inverse of the previous result.

To sum up, you must send back <code>M = (A x <sup>t</sup>B)<sup>-1</sup></code>

The matrices are strings coded with `[` `]` and `,` to separate the elements of
a line. For example, the matrix:

```text
| 12  2  5  23 |
| -2  20  1  3 |
| -1  3  7  77 |
```

is coded:

```text
[[12,2,5,23][-2,20,1,3][-1,3,7,77]]
```

Therefore, if you get:

```text
A =
[
  [13,2,5,23]
  [-2,0,1,3]
  [-1,3,7,77]
]

B =
[
  [13,-2,1,7]
  [2,3,3,77]
  [99,13,0,777]
]
```

```text
transposed(B) =
[
  [13,2,99]
  [-2,3,13]
  [1,3,0]
  [7,77,777]
]

A*transposed(B) =
[
  [331,1818,19184]
  [-4,230,2133]
  [527,5957,59769]
]
```

To finish,

```text
inverse(A*transposed(B)) =
[
  [0.0258444,0.1395566,-0.0132757]
  [0.0338561,0.2402561,-0.0194409]
  [-0.0036022,-0.0251761,0.0020714]
]
```

You must send back

```text
M =
[
  [0.0258444,0.1395566,-0.0132757]
  [0.0338561,0.2402561,-0.0194409]
  [-0.0036022,-0.0251761,0.0020714]
]
```

Note that the coefficients of the matrices `A` and `B` are integers, but not
necessarily `M`'s.


## I/O

### Inputs

| Variable Name | Type   | C Type | Description                        |
| ------------- | ------ | ------ | ---------------------------------- |
| **A**         | String | char*  | Matrix A, coded as explained above |
| **B**         | String | char*  | Matrix B, coded as explained above |

### Outputs

| Variable Name | Type   | C Type | Description                        |
| ------------- | ------ | ------ | ---------------------------------- |
| **M**         | String | char*  | Matrix M, coded as explained above |
