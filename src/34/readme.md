# Data Compression II

**Miscellaneous – Problem #34**

`http://www.microcontest.com/contest.php?id=34&lang=en`


## Description

**If you use the µContest C/C++ library, you must use at least the version 2.1**

In this challenge, we are going to code a more complex and "smarter" compression
algorithm that the one used in Data Compression I
(`http://www.microcontest.com/contest.php?id=31`).

In the first challenge, we were hoping to find a lot of consecutive apparitions
of a letter. But in a text for instance, this happens rarely.

The idea is to reorganize the information, so the probability to find
consecutive letters is increased.

This is precisely the goal of the Burrows-Wheeler transform.

Once the text is transformed, we are going to apply the MTF (Move-To-Front)
algorithm, in order to transform the text again, so it is very adapted to the
compression algorithm itself, the Huffman algorithm.

We won't describe here how those three algorithms work. Lots of information
exists on the Internet.

This set of operations is the base of the algorithm bzip2, that gives one of the
best compression ratio on random files.

But here is a complete example, with the intermediary steps.

Let's take the plain text we want to compress:

```text
A TRAVERS LES CHAMPS DE BETTERAVES DEVANT LUI IL NE VOYAIT MEME PAS LE SOL NOIR ET IL N AVAIT LA SENSATION DE L IMMENSE HORIZON PLAT QUE PAR LES SOUFFLES DU VENT DE MARS
```

We start by applying the Burrows-Wheeler transform. It is your role to learn
about this algorithm. We will stock the initial string position in the sorted
matrix at the beginning of the output string, starting by `0` for the first
position by convention (if after the sorting the initial string is at the
position `5`, we will insert `4` at the beginning of the output string). We
obtain the following string:

```text
35NESSNTSSRETILETSSRTETLLLEENTAESAUELSVYHVPMPLS RR       DSDDUMLNMSMVTVLVLL BDUFC U   TOAAR IIO P  F   E MIA OO  EEEANSIZHSV   M IATEOEAEPEEARERNN   NEINIATA EDQOLAE AA OI
```

In this example the initial string was in the 36th position.

Then, we apply the Move-To-Front algorithm. Again, it's your role to get
information about MTF. By convention, we will take the initial array in the
following state (see the way how the algorithm work to understand the utility of
this array):

| Symbol | Index |
| :----: | :---: |
| Space  | 0     |
| A      | 1     |
| B      | 2     |
| C      | 3     |
| D      | 4     |
| E      | 5     |
| F      | 6     |
| G      | 7     |
| H      | 8     |
| I      | 9     |
| J      | 10    |
| K      | 11    |
| L      | 12    |
| M      | 13    |
| N      | 14    |
| O      | 15    |
| P      | 16    |
| Q      | 17    |
| R      | 18    |
| S      | 19    |
| T      | 20    |
| U      | 21    |
| V      | 22    |
| W      | 23    |
| X      | 24    |
| Y      | 25    |
| Z      | 26    |
| 0      | 27    |
| 1      | 28    |
| 2      | 29    |
| 3      | 30    |
| 4      | 31    |
| 5      | 32    |
| 6      | 33    |
| 7      | 34    |
| 8      | 35    |
| 9      | 36    |

Once MTF applied, we obtain a new sequence of symbols, represented by numbers.
To represent them, we separate them here by some commas. Here is the previous
string transformed by MTF:

```text
30,32,16,8,21,0,2,22,2,0,22,4,3,15,18,3,3,5,0,5,2,3,1,4,0,0,2,0,6,3,10,3,6,2,23,3,6,4,24,27,19,2,24,23,1,6,6,16,13,0,1,0,0,0,0,0,0,19,3,1,0,11,7,6,14,2,5,1,9,14,1,5,1,1,0,8,18,9,9,20,20,5,3,1,0,0,8,24,18,0,14,4,19,0,4,2,16,1,0,9,1,0,0,19,1,15,6,8,3,7,0,1,0,5,0,0,3,17,17,6,28,19,3,19,8,0,0,10,1,6,8,14,10,11,1,3,1,13,1,0,2,14,2,1,13,0,8,0,0,1,3,8,2,1,5,8,1,5,5,17,26,10,20,6,5,6,2,0,1,4,8
```

We see that the sequence, contrary to what we were expecting, does not contain a
lot of `0`. This comes from the fact that the text is too short, and that the
Burrows-Wheeler transform does not produce enough consecutive letters. However,
on the text given by the challenge, the number of `0` will be much more
important. The consequence of this will be the fact that the Huffman algorithm
will give a very good compression ratio.

The Huffman algorithm, as you may know, associates each symbol of the flow we
want to compress to a binary sequence, more or less long to represent it,
depending on its apparition frequency. The MTF transform produces a string with
a lot of `0`, which the apparition frequency is much more important than the
other symbols'. In order to avoid different coding, we have already built an
association table by following the algorithm (several coding are possible). Here
is the one you must use:

| Symbol | Binary Code |
| :----: | :---------: |
| 0      | 0           |
| 1      | 100000      |
| 2      | 100001      |
| 3      | 100010      |
| 4      | 100011      |
| 5      | 100100      |
| 6      | 100101      |
| 7      | 100110      |
| 8      | 100111      |
| 9      | 101000      |
| 10     | 101001      |
| 11     | 101010      |
| 12     | 101011      |
| 13     | 101100      |
| 14     | 101101      |
| 15     | 101110      |
| 16     | 101111      |
| 17     | 110000      |
| 18     | 110001      |
| 19     | 110010      |
| 20     | 110011      |
| 21     | 110100      |
| 22     | 110101      |
| 23     | 110110      |
| 24     | 110111      |
| 25     | 1110000     |
| 26     | 1110001     |
| 27     | 1110010     |
| 28     | 1110011     |
| 29     | 1110100     |
| 30     | 1110101     |
| 31     | 1110110     |
| 32     | 1110111     |
| 33     | 111100      |
| 34     | 111101      |
| 35     | 111110      |
| 36     | 111111      |

After the Huffman coding applied to our example, we should obtain the following
BINARY sequence (The last six `0` are added at the end to complete the last
character, you have to complete your result by several `0` as well if the number
of bits obtained is not a multiple of `8`):

```text
11101011 11011110 11111001 11110100 01000011 10101100 00101101 01100011
10001010 11101100 01100010 10001010 01000100 10010000 11000101 00000100
01100100 00101001 01100010 10100110 00101001 01100001 11011010 00101001
01100011 11011111 10010110 01010000 11101111 10110100 00010010 11001011
01111101 10001000 00000000 11001010 00101000 00010101 01001101 00101101
10110000 11001001 00000101 00010110 11000001 00100100 00010000 00100111
11000110 10001010 00110011 11001110 01001000 10100000 00100111 11011111
00010101 10110001 11100100 10001110 00011011 11100000 01010001 00000001
10010100 00010111 01001011 00111100 01010011 00100000 01001000 01000101
10000110 00010010 11110011 11001010 00101100 10100111 00101001 10000010
01011001 11101101 10100110 10101000 00100010 10000010 11001000 00010000
11011011 00001100 00010110 00100111 00100000 10001010 01111000 01100000
10010010 01111000 00100100 10010011 00001110 00110100 11100111 00101100
10010010 11000010 10000010 00111001 11000000
                                      ^^^^^^
```

So the result is constituted of `109 bytes`, against `169 bytes` initially,
which gives a compression ratio of ~36%. This ratio will be more important with
the texts provided (~45%).

Here are the complementary/summarized information needed to solve the challenge.
There are two steps.

**Compression:**

- You have to get the string to be compressed in `txt_a_compresser`. This text
  will be composed by uppercase letters and spaces only.
- You have to apply successively the 3 algorithms described here, with the
  conventions imposed.
- The result is a sequence of bits, which the number is not automatically (in
  fact rarely) a multiple of `8`, **you must complete the sequence by null
  bits**.
- You have to send back the result string in `txt_compresse`, with the first `8`
  bits of your result constituting the first character, the next `8` the second,
  and so on.

**Decompression:**

- You have to get the string to be decompressed in `txt_a_decompresser`. This
  text will be constituted of characters representing the bit sequences produced
  by the Huffman coding.
- The variable `Nb_Bits_Ajoutes` will contain the number of null bits added at
  the end the sequence obtained by the compression.
- You have to apply successively the inverse of the algorithms described here,
  with the conventions imposed.
- The result will be a text. This text will be composed of uppercase letters and
  spaces only.
- You have to send back the result string in `txt_decompresse`.


## I/O

### Inputs

| Variable Name          | Type    | C Type | Description                                                                                                                                        |
| ---------------------- | ------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **txt_a_compresser**   | String  | char*  | The text to be compressed                                                                                                                          |
| **txt_a_decompresser** | String  | char*  | The bytes sequence to be decompressed. Be careful: this buffer may contain null characters, use the provided length instead of the function strlen |
| **Nb_Bits_Ajoutes**    | Integer | int    | The number of null bits added to the result of the compression in order to obtain a number of bits multiple of 8, giving `txt_a_decompresser`      |

### Outputs

| Variable Name       | Type   | C Type | Description                                                                                    |
| ------------------- | ------ | ------ | ---------------------------------------------------------------------------------------------- |
| **txt_compresse**   | String | char*  | Result of the compression of `txt_a_compresser`, with the conventions given in the description |
| **txt_decompresse** | String | char*  | Result of the decompression of `txt_a_decompresser`                                            |
