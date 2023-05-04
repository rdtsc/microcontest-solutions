# Image Color

**Multimedia – Problem #56**

`http://www.microcontest.com/contest.php?id=56&lang=en`


## Description

**It is required to be able to solve the challenge base64 in order to solve this
challenge.**

This challenge is quite simple. We give you an image which contains only one
color in the variable `img_b64`.

You have to return the color of the image, more exactly the red, green and blue
parts respectively in the variables `r`, `g` and `b`.

For example, for this image:

<img src="./extra/00.png" alt="Image 0">

You should return

```text
r = 23
g = 119
b = 100
```


## I/O

### Inputs

| Variable Name | Type   | C Type | Description                          |
| ------------- | ------ | ------ | ------------------------------------ |
| **img_b64**   | String | char*  | The image, in png, encoded in base64 |

### Outputs

| Variable Name | Type    | C Type | Description                       |
| ------------- | ------- | ------ | --------------------------------- |
| **r**         | Integer | int    | The red part of the image color   |
| **g**         | Integer | int    | The green part of the image color |
| **b**         | Integer | int    | The blue part of the image color  |
