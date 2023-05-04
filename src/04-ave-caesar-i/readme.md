# Ave Caesar I

**Cryptography – Problem #4**

`http://www.microcontest.com/contest.php?id=4&lang=en`


## Description

In this contest, you have to decry

In this version of the contest, this key is given in the variable `key`.

Concretely, here are some examples of crypted text with a **key of 3**:

```text
Plain text: ABCDEFGHIJKLMNOPQRSTUVWXYZ
Cypher:     DEFGHIJKLMNOPQRSTUVWXYZABC
```

```text
Plain text: MICROCONTESTITSTOOEASY
Cypher:     PLFURFRQWHVWLWVWRRHDVB
```

In order to simplify the problem, the encrypted text provided will always be
constituted with uppercase characters only, without space, as on the second
example.

To decrypt, you just have to do the shifting in the other sens, of the number
indicated by the key. For the extreme letters of the alphabet, the method is to
continue from the other extremity, like if the alphabet was circular, as the
example 1.

If you are successful, here is a second version of this contest, in which the
key value is unknown: Ave Caesar II
(`http://www.microcontest.com/contest.php?id=5`)


## I/O

### Inputs

| Variable Name  | Type    | C Type | Description     |
| -------------- | ------- | ------ | --------------- |
| **txt_crypte** | String  | char*  | Text to decrypt |
| **key**        | Integer | int    | Encryption key  |

### Outputs

| Variable Name | Type   | C Type | Description    |
| ------------- | ------ | ------ | -------------- |
| **txt_clair** | String | char*  | Decrypted text |
