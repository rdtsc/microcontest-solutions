# Timestamp

**Mathematics – Problem #18**

`http://www.microcontest.com/contest.php?id=18&lang=en`


## Description

The objective is to calculate the current UNIX timestamp, i.e. the number of
seconds that passed since the 1<sup>st</sup> of January, 1970, 00:00:00.

The only variable needed is the current date, which is a string which the form
is:

`dd/mm/yyyy hh:mm:ss (day/month/year hours:minutes:seconds)`


## I/O

### Inputs

| Variable Name | Type   | C Type | Description                                                                    |
| ------------- | ------ | ------ | -------------------------------------------------------------------------------|
| **date**      | String | char*  | Current date. Be careful: it is given for France, i.e. GMT+1 (GMT+2 in summer) |

### Outputs

| Variable Name | Type    | C Type | Description                                                            |
| ------------- | ------- | ------ | ---------------------------------------------------------------------- |
| **timestamp** | Integer | int    | Number of seconds that passed since the 1st of January, 1970, 00:00:00 |
