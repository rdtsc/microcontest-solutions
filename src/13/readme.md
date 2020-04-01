# A Sorting Problem

**Miscellaneous – Problem #13**

`http://www.microcontest.com/contest.php?id=13&lang=en`


## Description

The principe of this challenge is the following:

You dispose of an array of integers of 1 byte (char in C/C++) that are not
sorted.

Your role is to sort the array in the ascending order if the variable
`ordre = 0`, or in the descending order if `ordre = 1`.

This array is given in the variable `tableau`.

You must send back the array sorted in the variable `tableau_classe`.


## I/O

### Inputs

| Variable Name | Type    | C Type | Description                                                                                                    |
| ------------- | ------- | ------ | -------------------------------------------------------------------------------------------------------------- |
| **tableau**   | String  | char*  | Array to sort                                                                                                  |
| **ordre**     | Integer | int    | Indicate whether the array has to be sorted in the ascending order (ordre = 0) or descending order (ordre = 1) |

### Outputs

| Variable Name      | Type   | C Type | Description  |
| ------------------ | ------ | ------ | ------------ |
| **tableau_classe** | String | char*  | Sorted array |
