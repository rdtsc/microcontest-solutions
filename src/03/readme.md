# Do You Know How to Count ?

**Miscellaneous – Problem #3**

`http://www.microcontest.com/contest.php?id=3&lang=en`


## Description

In this contest, you will have to count the number of occurrences of a word in a
text. At each try, the text (which is an extract from Zola's Germinal) and the
word to find change.

For example, in the following text:

```text
Dans la plaine rase, sous la nuit sans étoiles, d’une
obscurité et d’une épaisseur d’encre, un homme suivait seul la
grande route de Marchiennes à Montsou dix kilomètres de pavé
coupant tout droit, à travers les champs de betteraves. Devant
lui, il ne voyait même pas le sol noir, et il n’avait la sensation de
l’immense horizon plat que par les souffles du vent de mars, des
rafales larges comme sur une mer, glacées d’avoir balayé des
lieues de marais et de terres nues. Aucune ombre d’arbre ne
tachait le ciel, le pavé se déroulait avec la rectitude d’une jetée,
au milieu de l’embrun aveuglant des ténèbres.
```

the word `la` appears 5 times.

The text to analyse is in the variable `texte` and the word which you have to
count the occurrences is in the variable `mot`.

You have to return the number of occurrences found in the variable `occ`.


## I/O

### Inputs

| Variable Name | Type   | C Type | Description |
| ------------- | ------ | ------ | ----------- |
| **texte**     | String | char*  | N/A         |
| **mot**       | String | char*  | N/A         |

### Outputs

| Variable Name | Type    | C Type | Description                               |
| ------------- | ------- | ------ | ----------------------------------------- |
| **occ**       | Integer | int    | Number of occurrences of `mot` in `texte` |
