# Musical Note

**Multimedia – Problem #7**

`http://www.microcontest.com/contest.php?id=7&lang=en`


## Description

In this challenge, you are going to need to analyse the content of a WAV file.
This sound is constituted by a pure sinusoidal sound, that corresponds to a
musical note.

You must return two integers, the note and its octave, and a number, the
duration of the sound (with a maximal error of `0.01 sec`).

For the note, here is the corresponding table:

| Note | Integer |
| :--: | :-----: |
| C    | 0       |
| D    | 1       |
| E    | 2       |
| F    | 3       |
| G    | 4       |
| A    | 5       |
| B    | 6       |

Concerning the octave, this integer takes its value between `0` (fundamental)
and `7`.

To finish, the durations can have values from `0.20 sec` up to `0.60 sec`.

So, if the `0.45 sec` sound is a sinusoid with the frequency of `196 Hz`, for
example, it corresponds to the note `G` and the octave `2`.

In this example, you should return

```text
note   = 4
octave = 2
duree  = 0.45
```


## I/O

### Inputs

| Variable Name | Type   | C Type | Description                                                                                                                                                                                           |
| ------------- | ------ | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **wav**       | String | char*  | The WAV sound. If you save this content in a wav file, you will be able to listen to it. Be careful: this buffer may contain null characters, use the provided length instead of the function strlen. |

### Outputs

| Variable Name | Type    | C Type | Description                                          |
| ------------- | ------- | ------ | ---------------------------------------------------- |
| **note**      | Integer | int    | The code of the note                                 |
| **octave**    | Integer | int    | The octave of the note                               |
| **duree**     | Real    | float  | The sound duration, with a maximum error of 0.01 sec |
