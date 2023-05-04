# Vigenère I

**Cryptography – Problem #10**

`http://www.microcontest.com/contest.php?id=10&lang=en`


## Description

As well as the Ave Caesar contests, this one is divided in two: this version, in
which you have to decrypt a string given the key, and its more difficult version
for which the key is unknown.

The algorithm used to encrypt the original string is the Vigenère cipher.

The encrypted string is given in the variable `txt_crypte` and the key used for
the encryption in the variable `clef`. You have to send back the decrypted
string in the variable `txt_clair`.

**Important notice**: The plain text, which is in French, contains spaces:
Theses spaces are not modified by the algorithm and can be found in the
cypher.**

For instance, with the key "KEY":

```text
Plain text: MICROCONTEST IT S TOO EASY
Key:        KEYKEYKEYKEY KE Y KEY KEYK
Cypher:     WMABSAYRROWR SX Q DSM OEQI

```


## I/O

### Inputs

| Variable Name  | Type   | C Type | Description     |
| -------------- | ------ | ------ | --------------- |
| **txt_crypte** | String | char*  | Text to decrypt |
| **clef**       | String | char*  | Encryption key  |

### Outputs

| Variable Name | Type   | C Type | Description    |
| ------------- | ------ | ------ | -------------- |
| **txt_clair** | String | char*  | Decrypted text |
