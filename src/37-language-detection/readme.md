# Language Detection

**AI – Problem #37**

`http://www.microcontest.com/contest.php?id=37&lang=en`


## Description

In this challenge, the goal is to detect automatically the language of 4 texts.

These texts can be written in 10 different languages. Here is the list of the
possible languages, and their associated code:

| Language   | Code |
| ---------- | ---- |
| French     | fr   |
| English    | en   |
| Italian    | it   |
| German     | de   |
| Swedish    | sw   |
| Spanish    | es   |
| Portuguese | po   |
| Finnish    | fi   |
| Dutch      | du   |
| Danish     | da   |

You have to send back the language of each text (contained in the variables
`txt1`, `txt2`, `txt3` and `txt4`) in the variable `lang1`, `lang2`, `lang3`,
and `lang4`. Fill these variables with the code associated with each language.

For example, if the text 3 is written in spanish, `lang3` must contain `es`.


## I/O

### Inputs

| Variable Name | Type   | C Type | Description |
| ------------- | ------ | ------ | ----------- |
| **txt1**      | String | char*  | The text 1  |
| **txt2**      | String | char*  | The text 2  |
| **txt3**      | String | char*  | The text 3  |
| **txt4**      | String | char*  | The text 4  |

### Outputs

| Variable Name | Type   | C Type | Description                            |
| ------------- | ------ | ------ | -------------------------------------- |
| **lang1**     | String | char*  | The code of the language of the text 1 |
| **lang2**     | String | char*  | The code of the language of the text 2 |
| **lang3**     | String | char*  | The code of the language of the text 3 |
| **lang4**     | String | char*  | The code of the language of the text 4 |
