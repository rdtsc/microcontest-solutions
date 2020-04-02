# HTML Parsing

**Network – Problem #44**

`http://www.microcontest.com/contest.php?id=44&lang=en`


## Description

This contest is the occasion to get to know (if you don't already)
`www.wechall.net`.

You will receive a username in `username` (not very original I know).

Your role is to go to the page `http://www.wechall.net/en/profile/‹username›`
and retrieve the following information:

- his score: you have to return it in the variable `score`
- his global rank: you have to return it in the variable `rank`
- his register date: you have to return it in the variable `register_date`
- his last activity date: you have to return it in the variable `last_activity`

For example, if `username = maslen` then you have to visit
`http://www.wechall.net/en/profile/maslen` and send back (at the time I'm
writing this contest):

```text
score = 301
rank = 2253
register_date = Jun 25, 2012 - 01:17:56
last_activity = Apr 24, 2013 - 23:58:19
```


## I/O

### Inputs

| Variable Name | Type   | C Type | Description                            |
| ------------- | ------ | ------ | -------------------------------------- |
| **username**  | String | char*  | The username of the profile to analyze |

### Outputs

| Variable Name     | Type    | C Type | Description                                                                             |
| ----------------- | ------- | ------ | --------------------------------------------------------------------------------------- |
| **score**         | Integer | int    | The score of ‹username› on http://www.wechall.net/en/profile/‹username›                 |
| **rank**          | Integer | int    | The rank of ‹username› on http://www.wechall.net/en/profile/‹username›                  |
| **register_date** | String  | char*  | The register date of ‹username› on http://www.wechall.net/en/profile/‹username›         |
| **last_activity** | String  | char*  | The date of last activity of ‹username› on http://www.wechall.net/en/profile/‹username› |
