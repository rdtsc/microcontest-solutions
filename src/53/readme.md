# BMI & BFP

**Mathematics – Problem #53**

`http://www.microcontest.com/contest.php?id=53&lang=en`


## Description

In order to attract females on µContest, we decided to open to the dietetic
world !!! Ahah

In this challange, you will have to compute the Body Mass Index, and the Body
Fat Percentage of a person for which we give you several characteristics :

- The mass, in kg, in the variable `mass`
- The height, in cm, in the variable `height`
- The sex, 0 if the person is a female, 1 otherwise, in the variable `sex`
- The age, in the variable `age`

The formulas and the interpretations are easy to find on the Internet, and do
not hesitate to use them on you :) !!

Here is an example:

```text
mass = 76
height = 168
sex = 0
age = 26
```

gives you:

```text
bmi = 26.927
bfp = 32.893
```


## I/O

### Inputs

| Variable Name | Type    | C Type | Description                              |
| ------------- | ------- | ------ | ---------------------------------------- |
| **mass**      | Integer | int    | The person's mass, in kg                 |
| **height**    | Integer | int    | The person's height in cm                |
| **sex**       | Integer | int    | 0 if the person is a female, 1 otherwise |
| **age**       | Integer | int    | The person's age                         |

### Outputs

| Variable Name | Type | C Type | Description                            |
| ------------- | ---- | ------ | -------------------------------------- |
| **bmi**       | Real | float  | The person's body mass index           |
| **bfp**       | Real | float  | The person's body fat percentage, in % |
