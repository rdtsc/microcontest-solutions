# Data Compression I

**Miscellaneous – Problem #31**

`http://www.microcontest.com/contest.php?id=31&lang=en`


## Description

In this challenge, we are going to approach the vast field of data compression
(or source coding) with the implementation of one of the simplest algorithm, the
RLE algorithm (Run-length encoding).

We are going to use it to compress and decompress strings of characters. Here is
its principle:

The string to be compressed:

```text
donnees = "AAAGGBBBOPPTTTTTZZZZ"
```

The principle is to count the consecutive occurrences of each character and to
code it with the letter to represent the information. In this example, there are
`3 A`, so `AAA` is coded by `3A`, then `GG` by `2G`, etc.

So the final result is:

```text
donnees_compressees = "3A2G3B1O2P5T4Z"
```

So we obtain the same information, represented by a smaller number of letters.
Besides, we notice that there are some cases for which the compressed string is
longer than the initial one (`ABCD -> 1A1B1C1D`)!! In fact, it is possible to
demonstrate that it's true for every compression algorithm.

The challenge consists in 2 steps, one for the compression, and the second one
for the decompression.

You have to get the string to be compressed in the variable
`donnees_a_compresser`, and the one to be decompressed in
`donnees_a_decompresser`.

You must send back the result of the compression in `resulat_compression` and
the result of the decompression in `resultat_decompression`.

To sum up, if you get:

```text
donnees_a_compresser   = "AAAAZZPPPPPPPP"
donnees_a_decompresser = "3H7J1P3D"
```

you must send back:

```text
resultat_compression   = "4A2Z8P"
resultat_decompression = "HHHJJJJJJJPDDD"
```


## I/O

### Inputs

| Variable Name              | Type   | C Type | Description                                                                                                                                                  |
| -------------------------- | ------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **donnees_a_compresser**   | String | char*  | String you have to compress with RLE algorithm. You have to send back the result in the variable resultat_compression                                        |
| **donnees_a_decompresser** | String | char*  | String you have to decompress. It is the result of a compression with RLE algorithm. You have to send back the result in the variable resultat_decompression |

### Outputs

| Variable Name              | Type   | C Type | Description                                               |
| -------------------------- | ------ | ------ | --------------------------------------------------------- |
| **resultat_compression**   | String | char*  | Result of the RLE compression of donnees_a_compresser     |
| **resultat_decompression** | String | char*  | Result of the RLE decompression of donnees_a_decompresser |
