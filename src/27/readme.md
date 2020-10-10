# Geolocation Without Satellite

**Physics – Problem #27**

`http://www.microcontest.com/contest.php?id=27&lang=en`


## Description

GPS can be very practical for geolocation, but you may have to part with it,
following a shipwreck, for example. You must then find another method to know
your position.

You plant a stick in the ground vertically and observe its shadow. When the
shadow is at its shortest, you measure it, as well as the length of the stick,
and at the same time look at your watch, set to French time. Among the things
you have, a compass allows you to roughly determine whether the Sun is north or
south.

From then on, with all this information, all you have to do is calculate the
latitude and longitude of your current location.

**Example**:

```text
date        (date)        = 12/11
hauteur     (height)      = 0.6
ombre       (shadow)      = 0.0069118095530443
orientation (orientation) = sud (south)
heure       (hour)        = 21.601666666667
```

**Result**:

```text
latitude  = -17
longitude = -133
```


## I/O

### Inputs

| Variable Name   | Type   | C Type | Description                                                                                                       |
| --------------- | ------ | ------ | ----------------------------------------------------------------------------------------------------------------- |
| **date**        | String | char*  | Current date in `dd/mm` (day/month) format                                                                        |
| **hauteur**     | Real   | float  | Length of your stick                                                                                              |
| **ombre**       | Real   | float  | Length of the stick's shadow when it is shortest                                                                  |
| **orientation** | String | char*  | String that can contain either `nord` (north) or `sud` (south) and corresponds to the direction of the Sun        |
| **heure**       | Real   | float  | Time on your watch when the shadow is the shortest (for example if `heure = 14.5`, it is `2:30 PM` on your watch) |

### Outputs

| Variable Name | Type | C Type | Description                                                             |
| ------------- | ---- | ------ | ----------------------------------------------------------------------- |
| **latitude**  | Real | float  | Latitude of your location in degrees (counted positively towards north) |
| **longitude** | Real | float  | Longitude of your position in degrees (counted positively towards east) |
