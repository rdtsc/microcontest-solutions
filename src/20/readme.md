# Optical Character Recognition I

**AI – Problem #20**

`http://www.microcontest.com/contest.php?id=20&lang=en`


## Description

In this challenge, the goal is to recognize a word within an image.
Let's take an example:

<img src="./extra/00.png" alt="Image 0">

In this case, you should send back `ckJqCuP` to validate the challenge. Of
course, the word, the colors, the text position, its size as well as the image
dimension change every time.

The image is contained in the variable `img` and its format is PNG.

You must send back the text in the variable `text`.


## I/O

### Inputs

| Variable Name | Type   | C Type | Description                                                                                                             |
| ------------- | ------ | ------ | ----------------------------------------------------------------------------------------------------------------------- |
| **img**       | String | char*  | PNG image. Be careful: this buffer may contain null characters, use the provided length instead of the function strlen. |

### Outputs

| Variable Name | Type   | C Type | Description       |
| ------------- | ------ | ------ | ----------------- |
| **text**      | String | char*  | Text in the image |
