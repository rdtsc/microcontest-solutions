# Tower of Hanoï

**Miscellaneous – Problem #30**

`http://www.microcontest.com/contest.php?id=30&lang=en`


## Description

Here is a classical problem in algorithmic, you have to move disks from a tower
to another, except that in this case, initially, the disks are not stacked on
one only tower but distributed on the 3 ones.

The rules are the following:

- Each disk has a different size, represented by an integer; `0` for the
  smallest.
- You can move only one disk each time.
- You can't stack a disk on another smaller one.

Here is an example with 4 disks to move on tower 3:

Initial position:

<img src="./extra/00.png" alt="Image 0">

<img src="./extra/01.png" alt="Image 1">

<img src="./extra/02.png" alt="Image 2">

<img src="./extra/03.png" alt="Image 3">

<img src="./extra/04.png" alt="Image 4">

The number of initial disks and the target tower vary, to be recovered in the
variables `nb_disques` and `tour_cible`.

Each disk is represented by an integer, `0` for the smallest, `1` for the 2nd
smallest, etc.

The initial situation is provided to you in three variables `tour1`, `tour2` and
`tour3`. These are character strings, encoding the disks on the tower in
question. In the example, the variables would be:

```text
char tour1[] = "1,0";
char tour2[] = "2";
char tour3[] = "3";
```

The disks are separated by commas, going from the largest disk (the base of the
tower), to the smallest.

It only remains for you to return the chain of movements allowing to arrive at
the final situation, i.e., all the disks on the `tour_cible`. To do this, you
must return a solution character string formatted as follows:

```text
from>to,from>to,...
```

by replacing `from` and `to` with the corresponding tower numbers for each
movement.

The towers are represented by integers from `1` to `3`. In the example, you
should return solution such as:

```text
char solution[] = "2>3,1>2,1>3,2>3";
```


## I/O

### Inputs

| Variable Name  | Type    | C Type | Description                                                                                   |
| -------------- | ------- | ------ | --------------------------------------------------------------------------------------------- |
| **nb_disques** | Integer | int    | Number of disks distributed over the three towers                                             |
| **tour_cible** | Integer | int    | Tower on which the disks must be moved. Values ​​1 for tower 1, 2 for tower 2 and 3 for tower 3 |
| **tour1**      | String  | char*  | Character string coding the disks initially placed on tower 1, as explained in the text.      |
| **tour2**      | String  | char*  | Character string coding the disks initially placed on tower 2, as explained in the text.      |
| **tour3**      | String  | char*  | Character string coding the disks initially placed on tower 3, as explained in the text.      |

### Outputs

| Variable Name | Type   | C Type | Description                                                                                                                                  |
| ------------- | ------ | ------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **solution**  | String | char*  | Character string coding the movements to be made so that all the disks are on the `target_tower`, following the rules explained in the text. |
