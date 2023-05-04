# Formal Systems and Decision Procedures

**AI – Problem #49**

`http://www.microcontest.com/contest.php?id=49&lang=en`


## Description

This challenge is an introduction to the formal systems. It might be surprising
to see it in the Artificial Intelligence section, but these two fields can be
intimately linked.

The formal systems are basically a mathematical modelization of a language. This
is, in a way, an abstract model of a system. For example, programming languages
are formal systems. But a formal system can be used to model the mathematical
reasoning and that is what we are interested in here.

Formal systems in mathematics consist of the following elements:

- A finite set of symbols (i.e. the alphabet), that can be used for constructing
  formulas (i.e. finite strings of symbols).
- A grammar, which tells how well-formed formulas (abbreviated wff) are
  constructed out of the symbols in the alphabet. It is usually required that
  there be a decision procedure for deciding whether a formula is well formed or
  not. These wff can be called the theorems of the system.
- A set of axioms: each axiom must be a wff.
- A set of inference rules.

The system we are going to use in this challenge is the TQ system that Douglas
Hofstadter presents in his masterpiece: "Gödel, Escher, Bach: An Eternal Golden
Braid".

It is defined as follows:

- The symbols are: `t`, `q` and `-`.
- The grammar is voluntarily not given, but more about that later.
- The axiom set: If `x` is a string composed only by `-`, the string `xf-qx`
  is an axiom. You can see that there is an infinite number of axioms in this
  system.
- The inference rules set: There is only one inference rule -- if `x`, `y` and
  `z` are strings composed only by `'-'`, and if the string `xtyqz` is a theorem
  (i.e. a wff), then `xty-qzx` is also a theorem.

Let's take an example.

With `x = "--"`, according to the axiom rule,

(1) `--t-q--` is an axiom and therefor, a wff.

We can use it to produce new strings with the inference rule. Here, `x = "--"`,
`y = "-"` and `z = "--"`. We obtain:

(2) `--t--q----`

We have now a wff that is not an axiom (i.e. a theorem). But that's great, we
can use it to produce a new theorem with the inference rule:

(3) `--t---q------`

etc.

Now you understand that the axioms are the basic strings from which we are going
to "produce" other strings (the theorems) that will be well formed formulas of
our formal system. We can also imagine that some strings won't be ever produced,
whatever the axiom we choose to apply our inference rule. This is exactly the
point of this challenge: how to automatically determine, in a finite time, if a
given string is a theorem of our system or not? (see the link with the
artificial intelligence now...?). Such automatic procedure is called Decision
Procedure, and may not even exist.

But don't worry, in this case, it exists and is quite simple (actually several
exist).

You are going to be given 15 strings and your role will be to determine which
ones of them are theorems, i.e. the ones that can be produced from the axioms by
applying the inference rule.

The strings are given in the variable `string1`, `string2`, ..., `string15`.

You will send your answers in separate variables. If `string1` is a theorem,
then you will send `theorm1=1`, `theorm1=0` otherwise.

For example, if:

```text
string7 = "--t---q------"
```

then you should return:

```text
theorem7 = 1
```

But if

```text
string7 = "--t--q--"
```

then you should return:

```text
theorem7 = 0
```

Hint: There are two ways to solve this challenge, the brute-force way, and the
smart way...

Note 1: A string composed by `-` can be empty.

Note 2: An axiom counts as a theorem.


## I/O

### Inputs

| Variable Name | Type   | C Type | Description                                                                           |
| ------------- | ------ | ------ | ------------------------------------------------------------------------------------- |
| **string1**   | String | char*  | The first string for which you have to determine whether it is a theorem of TQ or not |
| **string2**   | String | char*  | The 2nd string for which you have to determine whether it is a theorem of TQ or not   |
| **string3**   | String | char*  | The 3rd string for which you have to determine whether it is a theorem of TQ or not   |
| **string4**   | String | char*  | The 4th string for which you have to determine whether it is a theorem of TQ or not   |
| **string5**   | String | char*  | The 5th string for which you have to determine whether it is a theorem of TQ or not   |
| **string6**   | String | char*  | The 6th string for which you have to determine whether it is a theorem of TQ or not   |
| **string7**   | String | char*  | The 7th string for which you have to determine whether it is a theorem of TQ or not   |
| **string8**   | String | char*  | The 8th string for which you have to determine whether it is a theorem of TQ or not   |
| **string9**   | String | char*  | The 9th string for which you have to determine whether it is a theorem of TQ or not   |
| **string10**  | String | char*  | The 10th string for which you have to determine whether it is a theorem of TQ or not  |
| **string11**  | String | char*  | The 11th string for which you have to determine whether it is a theorem of TQ or not  |
| **string12**  | String | char*  | The 12th string for which you have to determine whether it is a theorem of TQ or not  |
| **string13**  | String | char*  | The 13th string for which you have to determine whether it is a theorem of TQ or not  |
| **string14**  | String | char*  | The 14th string for which you have to determine whether it is a theorem of TQ or not  |
| **string15**  | String | char*  | The 15th string for which you have to determine whether it is a theorem of TQ or not  |

### Outputs

| Variable Name | Type    | C Type | Description                                      |
| ------------- | ------- | ------ | ------------------------------------------------ |
| **theorem1**  | Integer | int    | Is 1 if string1 is a theorem of TQ, 0 otherwise  |
| **theorem2**  | Integer | int    | Is 1 if string2 is a theorem of TQ, 0 otherwise  |
| **theorem3**  | Integer | int    | Is 1 if string3 is a theorem of TQ, 0 otherwise  |
| **theorem4**  | Integer | int    | Is 1 if string4 is a theorem of TQ, 0 otherwise  |
| **theorem5**  | Integer | int    | Is 1 if string5 is a theorem of TQ, 0 otherwise  |
| **theorem6**  | Integer | int    | Is 1 if string6 is a theorem of TQ, 0 otherwise  |
| **theorem7**  | Integer | int    | Is 1 if string7 is a theorem of TQ, 0 otherwise  |
| **theorem8**  | Integer | int    | Is 1 if string8 is a theorem of TQ, 0 otherwise  |
| **theorem9**  | Integer | int    | Is 1 if string9 is a theorem of TQ, 0 otherwise  |
| **theorem10** | Integer | int    | Is 1 if string10 is a theorem of TQ, 0 otherwise |
| **theorem11** | Integer | int    | Is 1 if string11 is a theorem of TQ, 0 otherwise |
| **theorem12** | Integer | int    | Is 1 if string12 is a theorem of TQ, 0 otherwise |
| **theorem13** | Integer | int    | Is 1 if string13 is a theorem of TQ, 0 otherwise |
| **theorem14** | Integer | int    | Is 1 if string14 is a theorem of TQ, 0 otherwise |
| **theorem15** | Integer | int    | Is 1 if string15 is a theorem of TQ, 0 otherwise |
