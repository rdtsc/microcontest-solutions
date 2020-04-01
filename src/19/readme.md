# Calculator I

**Mathematics – Problem #19**

`http://www.microcontest.com/contest.php?id=19&lang=en`


## Description

In this challenge, you have to evaluate a simple mathematical expression. This
expression contain only integer numbers and the classic operators
`(+, -, *, /)`.

Here is an example:

`67+87*33*88/54+34/87/6+14-53+8-14-43-9*70*12-86+86/4`

This expression is contained in the variable `expr`.

You must send back the result in the variable `result`, rounding it to the
nearest whole number.

For instance, the result of the previous expression is about `-2966.7682`.

You should have sent back `-2967` in this case.


## I/O

### Inputs

| Variable Name | Type   | C Type | Description             |
| ------------- | ------ | ------ | ----------------------- |
| **expr**      | String | char*  | Mathematical expression |

### Outputs

| Variable Name | Type | C Type | Description              |
| ------------- | ---- | ------ | ------------------------ |
| **result**    | Real | float  | Result of the evaluation |
