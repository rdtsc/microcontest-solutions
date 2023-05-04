# Turing Machine I

**Miscellaneous – Problem #45**

`http://www.microcontest.com/contest.php?id=45&lang=en`


## Description

This first (long description but easy) challenge's point is to discover the
bases of the Turing Machines.

To quote Wikipedia:

> A Turing machine is a hypothetical device that manipulates symbols on a strip
> of tape according to a table of rules. Despite its simplicity, a Turing
> machine can be adapted to simulate the logic of any computer algorithm, and is
> particularly useful in explaining the functions of a CPU inside a computer.

I let you do some digging about this.

The goal here is simply to implement a Turing Machine, and run it on a provided
tape, in order to understand how it works before the next challenge.

Basically and to sum up (Wikipedia explains it very well), a Turing Machine is
an enhanced state machine, with a tape on which it can write or read symbols.

It is composed of:

- A finite set of states. Among them, there are an initial state, and one or
  more STOP states.
- A transition table, that will indicate, depending on the current internal
  state and the current symbol read from the tape:
  - the symbol the machine should write on the tape to replace the current
    symbol (it can be the same).
  - if the reading head should be moved to the right or the left on the tape.
  - the next internal state.

In fact, there are an infinity of Turing Machines (with 2 internal states, or 3,
or 4, or 7562, ..., and that manipulate 2 symbols, or 3, or 10, ...). Plus, for
every kind of TM, we can imagine a lot of different transition tables.

In this challenge, we are going to manipulate a single Turing Machine, that has:

- 6 internal states: `A`, `B`, `C`, `D`, `E`, `F`. The initial state is `A`,
  and `F` is the only final state.
- only two symbols, `0` and `1`.
- a transition table we provide you:

| Current State | Current Symbol | Symbol to Write | Move Head | Next State |
| :-----------: | :------------: | :-------------: | :-------: | :--------: |
| A             | 0              | 1               | RIGHT     | B          |
| A             | 1              | 1               | LEFT      | C          |
| B             | 0              | 1               | RIGHT     | C          |
| B             | 1              | 1               | RIGHT     | B          |
| C             | 0              | 1               | RIGHT     | D          |
| C             | 1              | 0               | LEFT      | E          |
| D             | 0              | 1               | LEFT      | A          |
| D             | 1              | 1               | LEFT      | D          |
| E             | 0              | 1               | RIGHT     | F          |
| E             | 1              | 0               | LEFT      | A          |

This is actually not random, but a remarkable Turing Machine (it's the current
best contender for the 5-state, 2-symbol busy beaver for those who are
interested).

Now, in order to run it, we just need a tape and an initial position on it.
Let's take an example.

On the tape, there are an infinite number of `0`, and maybe some `1`. The tape
can be initially blank, or not. We will provide you a tape which already
contains several `1`.

Let's take this initial tape:

```text
...0 0 0 0 0 0 0 1 1 0 1 0 0 0 0...
               | <- Position of the reading and writing head
```

The initial state is `A`, and we read the symbol `0`. The transition table tells
us we should write `1`, move to the `RIGHT`, and set the internal state to `B`.

Here is the new tape state:

```text
...0 0 0 0 0 0 1 1 1 0 1 0 0 0 0...
                 |
```

Now, since the current state is `B` and the current symbol is `1`, we should
write `1` (so we don't change it), move to the `RIGHT`, and stay in the same
state.

Now the tape looks like the same but the head has moved:

```text
...0 0 0 0 0 0 1 1 1 0 1 0 0 0 0...
                   |
```

And we keep going like this, until we reach the final state. Actually, this can
take a long time (in this case, 47176870 steps if the tape is initially blank!).
So you will just have to return the state of the tape after the 1000th step (if
the final state is reached before the 1000th step, return the tape of the final
state of course).

The initial tape is given in the variable `tape`. The starting position will
always be the first symbol of the tape we provide you. In this example, you
would get the variable:

```text
tape = "0 1 1 0 1"
```

Keep in mind that the tape is infinite and is full of zeros everywhere else.

The complete execution of our Turing Machine on our example is given in
[this](./extra/sample.txt) file.

As you can see, it reaches the final state in 35 iterations.

In this case, you should return:

```text
final_tape_state = "1 0 1 0 0 1 0 0 1 1"
```

Note that there are zeros on the right and on the left, so the answer:

```text
final_tape_state = "0 0 0 0 1 0 1 0 0 1 0 0 1 1 0 0"
```

is also valid for example.


## I/O

### Inputs

| Variable Name | Type   | C Type | Description                                                                                  |
| ------------- | ------ | ------ | ---------------------------------------------------------------------------------------------|
| **tape**      | String | char*  | The initial tape. The reading and writing head is initially on the first symbol of the tape. |

### Outputs

| Variable Name        | Type   | C Type | Description                                                                                                                       |
| -------------------- | ------ | ------ | --------------------------------------------------------------------------------------------------------------------------------- |
| **final_tape_state** | String | char*  | The final tape state. If the final state is not reached before the 1000th iteration, return the tape after this 1000th iteration. |
