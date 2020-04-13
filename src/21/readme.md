# Email

**Network – Problem #21**

`http://www.microcontest.com/contest.php?id=21&lang=en`


## Description

The objective of this challenge is to manipulate the protocols related to the
emails.

There is one variable to get, `number`.

When you connect to the challenge, the website sends an email to the address of
your account. This email contains a simple number in the body, which is always
different of course.

You must add it to `number` and send the sum in the variable `sum`.

The subject of the email will be `Epreuve 21` and the sender address will be
`no-reply@microcontest.com`. It is possible that your mail provider will mark it
as spam.

For this challenge, you get 20 seconds to send the solution.


## I/O

### Inputs

| Variable Name | Type    | C Type | Description |
| ------------- | ------- | ------ | ----------- |
| **number**    | Integer | int    | N/A         |

### Outputs

| Variable Name | Type    | C Type | Description                                                                                        |
| ------------- | ------- | ------ | -------------------------------------------------------------------------------------------------- |
| **sum**       | Integer | int    | The sum of `number` and the number sent by mail to your address, where the subject is "Epreuve 21" |
