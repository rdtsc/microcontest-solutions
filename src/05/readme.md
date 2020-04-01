# Ave Caesar II

**Cryptography – Problem #5**

`http://www.microcontest.com/contest.php?id=5&lang=en`


## Description

In this second version of the contest Ave Caesar I
(`http://www.microcontest.com/contest.php?id=4`), you have to decrypt the
provided text as well, but the key used to encrypt it is not given!

As in the contest 1, the plain text is a long sentence in French, which the
spaces and the punctuation have been removed ;). In order to avoid the
bruteforce method, you have to decrypt 3 texts instead of 1.


## I/O

### Inputs

| Variable Name   | Type   | C Type | Description       |
| --------------- | ------ | ------ | ----------------- |
| **txt_crypte1** | String | char*  | Text 1 to decrypt |
| **txt_crypte2** | String | char*  | Text 2 to decrypt |
| **txt_crypte3** | String | char*  | Text 3 to decrypt |

### Outputs

| Variable Name  | Type   | C Type | Description      |
| -------------- | ------ | ------ | ---------------- |
| **txt_clair1** | String | char*  | Decrypted text 1 |
| **txt_clair2** | String | char*  | Decrypted text 2 |
| **txt_clair3** | String | char*  | Decrypted text 3 |
