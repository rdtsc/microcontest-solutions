# Satellite Geolocation

**Physics – Problem #23**

`http://www.microcontest.com/contest.php?id=23&lang=en`


## Description

In this test, you will have to code an algorithm equivalent to that of a GPS
receiver. The objective is to calculate the position of the receiver from the
ephemeris of three satellites.

These send signals to receivers containing several pieces of information. In
particular their position as well as the time of sending of the signal. From
this you need to calculate the latitude and longitude of the receiver.

Note that latitudes and longitudes can be negative. In addition, we made the
following approximations: we considered an ideal model without Earth's
atmosphere, so no correction is necessary.

The following constants are to be used for all calculations:

```text
Earth's radius = 6,400 km
Satellite orbital altitude = 20,200 km
Speed ​​of light in a vacuum = 299,792 km/s
```

**Example**:

```text
sat1lat = 28.3
sat1long = 154
sat2lat = -8.4
sat2long = 140.4
sat3lat = -0.7
sat3long = 95.2
date = 1401007898
msec = 695
date1 = 1401007898
date2 = 1401007898
date3 = 1401007898
msec1 = 617.62972257172
msec2 = 606.70336331039
msec3 = 611.95074071993

latitude = 67.1
longitude = 96
```


## I/O

### Inputs

| Variable Name | Type    | C Type | Description                                              |
| ------------- | ------- | ------ | -------------------------------------------------------- |
| **sat1lat**   | Real    | float  | Latitude of satellite 1 in degrees                       |
| **sat1long**  | Real    | float  | Longitude of satellite 1 in degrees                      |
| **date1**     | Integer | int    | Signal timestamp (seconds portion) from satellite 1      |
| **msec1**     | Real    | float  | Signal timestamp (milliseconds portion) from satellite 1 |
| **sat2lat**   | Real    | float  | Latitude of satellite 2 in degrees                       |
| **sat2long**  | Real    | float  | Longitude of satellite 2 in degrees                      |
| **date2**     | Integer | int    | Signal timestamp (seconds portion) from satellite 2      |
| **msec2**     | Real    | float  | Signal timestamp (milliseconds portion) from satellite 2 |
| **sat3lat**   | Real    | float  | Latitude of satellite 3 in degrees                       |
| **sat3long**  | Real    | float  | Longitude of satellite 3 in degrees                      |
| **date3**     | Integer | int    | Signal timestamp (seconds portion) from satellite 3      |
| **msec3**     | Real    | float  | Signal timestamp (milliseconds portion) from satellite 3 |
| **date**      | Integer | int    | Receiver timestamp (seconds portion)                     |
| **msec**      | Real    | float  | Receiver timestamp (milliseconds portion)                |

### Outputs

| Variable Name | Type | C Type | Description                   |
| ------------- | ---- | ------ | ----------------------------- |
| **latitude**  | Real | float  | Receiver latitude in degrees  |
| **longitude** | Real | float  | Receiver longitude in degrees |
