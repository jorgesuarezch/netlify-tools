# CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@netlify-tools/cli.svg)](https://npmjs.org/package/@netlify-tools/cli)
[![Downloads/week](https://img.shields.io/npm/dw/@netlify-tools/cli.svg)](https://npmjs.org/package/@netlify-tools/cli)
[![License](https://img.shields.io/npm/l/@netlify-tools/cli.svg)](https://github.com/jorgesuarezch/@netlify-tools/cli/blob/master/package.json)

<!-- toc -->
* [CLI](#cli)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g @netlify-tools/cli
$ netlify-tools COMMAND
running command...
$ netlify-tools (-v|--version|version)
@netlify-tools/cli/0.0.1 darwin-x64 node-v12.18.0
$ netlify-tools --help [COMMAND]
USAGE
  $ netlify-tools COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`netlify-tools env:delete`](#netlify-tools-envdelete)
* [`netlify-tools env:describe`](#netlify-tools-envdescribe)
* [`netlify-tools env:set`](#netlify-tools-envset)
* [`netlify-tools help [COMMAND]`](#netlify-tools-help-command)

## `netlify-tools env:delete`

Delete env variables from a specific context

```
USAGE
  $ netlify-tools env:delete

OPTIONS
  -c, --context=context  context to be modified
  -h, --help             show CLI help
  --authToken=authToken  (required) Netlify OAuth Token
  --siteID=siteID        (required) Netlify Site ID

EXAMPLE
  $ netlify-tools env:delete -c production FOO BAR BAZ
```

_See code: [src/commands/env/delete.ts](https://github.com/jorgesuarezch/neltify-tools/blob/v0.0.1/src/commands/env/delete.ts)_

## `netlify-tools env:describe`

Describe env variables for a context

```
USAGE
  $ netlify-tools env:describe

OPTIONS
  -c, --context=context  Context to describe
  -h, --help             show CLI help
  --all                  describe all the available contexts
  --authToken=authToken  (required) Netlify OAuth Token
  --siteID=siteID        (required) Netlify Site ID

EXAMPLE
  $ netlify-tools env:describe -c production -c develop
```

_See code: [src/commands/env/describe.ts](https://github.com/jorgesuarezch/neltify-tools/blob/v0.0.1/src/commands/env/describe.ts)_

## `netlify-tools env:set`

Set env variables by context

```
USAGE
  $ netlify-tools env:set

OPTIONS
  -c, --context=context  [default: default] Context
  -h, --help             show CLI help
  --authToken=authToken  (required) Netlify OAuth Token
  --siteID=siteID        (required) Netlify Site ID

EXAMPLE
  $ netlify-tools env:set -c staging FOO=foo BAR=bar
```

_See code: [src/commands/env/set.ts](https://github.com/jorgesuarezch/neltify-tools/blob/v0.0.1/src/commands/env/set.ts)_

## `netlify-tools help [COMMAND]`

display help for netlify-tools

```
USAGE
  $ netlify-tools help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_
<!-- commandsstop -->
