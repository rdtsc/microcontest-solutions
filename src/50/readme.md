# Base64

**Cryptography – Problem #50**

`http://www.microcontest.com/contest.php?id=50&lang=en`


## Description

This challenge is not really about cryptography, but encoding.

Its purpose is to make you master the base64 decoding/encoding, because we are
aiming at replacing all the binary exchanges with the website by base64 ascii
strings exchanges. This will prevent all the errors related to binary variables.

The challenge is simple.

You will receive a base64 string in the variable `big_number`.

This string, once decoded, represents an even number, in the range
`[1 000 000 000, 4 000 000 000]`.

You will have to divide it by 2 (it is an even number), encode the result in
base64 and send this string in `half_big_number`.

For example, if `big_number = MTU2ODE3ODM2Ng==`

you decode it, you obtain the number itself, which is `1568178366`.

You divide it by `2`, you obtain `784089183`.

You encode it in base64 ascii, you obtain `Nzg0MDg5MTgz`

So you should send back: `half_big_number = Nzg0MDg5MTgz`


## I/O

### Inputs

| Variable Name  | Type   | C Type | Description                                                      |
| -------------- | ------ | ------ | ---------------------------------------------------------------- |
| **big_number** | String | char*  | The string representing the integer to divide, encoded in base64 |

### Outputs

| Variable Name       | Type   | C Type | Description                                                             |
| ------------------- | ------ | ------ | ----------------------------------------------------------------------- |
| **half_big_number** | String | char*  | The base64 encoding of the half of the number represented by big_number |
