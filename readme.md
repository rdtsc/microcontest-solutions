# µContest Solutions

This repository houses my personal solutions to
[µContest's programming challenges][challenges].

It is strongly encouraged that you do not view my solutions unless you've
already solved the relevant problems yourself.


## Development Notes

### Local Environment

- Linux
- Node.js ~v12
- Yarn ~v1

### Initial Setup

```text
$ git clone https://github.com/rdtsc/microcontest-solutions
$ cd microcontest-solutions
$ yarn
$ yarn mc setup

µContest Auth Token Setup
-------------------------
Username: user
Password: ********
Saved in /home/user/microcontest-solutions/auth.json
```

### Workflow

To keep things consistent, the following tasks are provided for automating
initial setup and solution boilerplate creation:

- [mc setup](#task-mc-setup)
- [mc init](#task-mc-init)

#### Task: `mc setup`

The `mc setup` task is responsible for generating a µContest authentication
token and should only be executed upon initial setup or when site account
credentials change.

The generated token is stored in `./auth.json` and is automatically removed
from Git's working tree upon successful creation.

:warning: **Warning!**

*Note that as per the platform's specifications, part of the token
contains a plain SHA-1 hash of the site's account password. µContest
**does not** currently implement HTTPS so all communication is in plain-text!*

Usage:

```text
$ yarn mc setup

µContest Auth Token Setup
-------------------------
Username: user
Password: ********
Saved in /home/user/microcontest-solutions/auth.json
```

Subsequent invocations will result in a no-op:

```text
$ yarn mc setup

µContest auth token already exists for "user".
```

If the authentication token needs to be regenerated, destroy the `./auth.json`
file and execute `mc setup` again.

#### Task: `mc init`

The `mc init` task is responsible for creating solution boilerplate files which
currently include the following actions:

- Solution directory creation in `./src` based on the problem's ID.
- Creation of an initial Markdown readme with the problem's HTML description
  and parsed I/O. (`readme.md`)
- Mirroring of referenced images in the generated readme, if any. (`extra/*`)
- Creation of the problem's metadata in YAML for future use. (`meta.yaml`)
- Creation of a skeleton solution file with the required I/O arguments
  in JS. (`solve.js`)

This task requires a single command-line argument to be passed in the form of
the problem's µContest ID. For example:

```text
$ yarn mc init 20

Created /home/user/microcontest-solutions/src/20
Created /home/user/microcontest-solutions/src/20/meta.yaml
Created /home/user/microcontest-solutions/src/20/extra
Created /home/user/microcontest-solutions/src/20/extra/00.png
Created /home/user/microcontest-solutions/src/20/readme.md
Created /home/user/microcontest-solutions/src/20/solve.js
```

```text
$ cat src/20/meta.yaml

id: 20
name: Optical Character Recognition I
category: AI
url: 'http://www.microcontest.com/contest.php?id=20&lang=en'
inputs:
  - name: img
    type: String
    cType: char*
    description: >-
      PNG image. Be careful : this buffer may contain null characters, use the
      provided length instead of the function strlen.
outputs:
  - name: text
    type: String
    cType: char*
    description: Text in the image
```

```text
$ head src/20/readme.md | cut -c1-66

# Optical Character Recognition I

**AI – Problem #20**

`http://www.microcontest.com/contest.php?id=20&lang=en`


## Description

In this challenge, the goal is to recognise a word within an image...
```

```text
$ cat src/20/solve.js

#!/usr/bin/env node

'use strict';

const {solve} = require('~/lib/mc');

solve(20, ({img}) =>
{
  const result =
  {
    text: null
  };

  // ...

  return result;
});
```

If a problem is down for maintenance or doesn't exist, the `mc init` task will
fail:

```text
$ yarn mc init 999999

Problem not available.
```


## License and Copyright

All original code is released under the [MIT license][mit], unless otherwise
specified.

All referenced product names, trademarks, logos, and images are property of
their respective owners.


[challenges]: http://www.microcontest.com/contests.php
              "µContest"

[mit]: http://opensource.org/licenses/MIT/
       "The MIT License (MIT)"
