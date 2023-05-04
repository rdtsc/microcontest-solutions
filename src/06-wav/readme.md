# WAV?

**Multimedia – Problem #6**

`http://www.microcontest.com/contest.php?id=6&lang=en`


## Description

The goal of this challenge is to understand what a WAV container is, and the get
information from it on its audio content.

The wav file that you are going to download (variable `wav`) is a pure
sinusoidal sound at 440 Hz lasting 0.1 sec, but those information are not
important (they are not useful in the contest resolution): You have to get

- The number of channels (from 1 up to 6)
- The number of bits used to code the amplitude of the signal (8 / 16 / 32)
- The sampling frequency in Hertz: for the needs of the challenge, it can
  vary from 30 kHz up to 50 kHz, but in practice, standardized values exist.

Of course, a new sound with different features is generated for each try ;)


## I/O

### Inputs

| Variable Name | Type   | C Type | Description                                                                                                             |
| ------------- | ------ | ------ | ------------------------------------------------------------------------------------------------------------------------|
| **wav_b64**   | String | char*  | The wav sound, encoded in base64                                                                                        |
| **wav**       | String | char*  | WAV sound. Be careful: this buffer may contain null characters, use the provided length instead of the function strlen. |

### Outputs

| Variable Name             | Type    | C Type | Description                                             |
| ------------------------- | ------- | ------ | ------------------------------------------------------- |
| **nb_canaux**             | Integer | int    | Number of channels                                      |
| **nb_bits_echantillon**   | Integer | int    | Number of bits used to code the amplitude of the signal |
| **frequ_echantillonnage** | Integer | int    | Sampling frequency in Hz                                |
