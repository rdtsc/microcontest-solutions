# HTTP

**Network – Problem #15**

`http://www.microcontest.com/contest.php?id=15&lang=en`


## Description

The goal of this challenge is to get you accustomed to the HTTP protocol (if it
is not the case yet).

You have to connect to `www.microcontest.com` in your program and get the
following page: `http://www.microcontest.com/contests/15/nombre.php`

You have to pass the value contained in the variable `x` to the page
`nombre.php` by adding `?x=77` after `nombre.php` in the URL. Here, `77` is an
example, you must put the value contained in `x`.

For instance, if `x = 250`, you must get the page:
`http://www.microcontest.com/contests/15/nombre.php?x=250`

By visiting this page, you obtain a real number, that depends on the value of
`x`. You must send back this number in the variable `y` to complete the contest.

In the case of the example (`x = 250`), you have to send `y = 767.48196232174`.

You have 3 seconds.

Note:

The library does not contain any function helping you to connect to
`nombre.php`. It is your job to code the function of connection (otherwise, the
challenge has no point!).


## I/O

### Inputs

| Variable Name | Type    | C Type | Description                                                                                               |
| ------------- | ------- | ------ | --------------------------------------------------------------------------------------------------------- |
| **x**         | Integer | int    | Integer to pass to the page `http://www.microcontest.com/contests/15/nombre.php`, as described previously |

### Outputs

| Variable Name | Type | C Type | Description                                                            |
| ------------- | ---- | ------ | ---------------------------------------------------------------------- |
| **y**         | Real | float  | Real displayed on `http://www.microcontest.com/contests/15/nombre.php` |
