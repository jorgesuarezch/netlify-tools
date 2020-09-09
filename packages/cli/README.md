neltify-env-cli
===============

Define your env variable with confidence

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/neltify-env-cli.svg)](https://npmjs.org/package/neltify-env-cli)
[![CircleCI](https://circleci.com/gh/jorgesuarezch/neltify-env-cli/tree/master.svg?style=shield)](https://circleci.com/gh/jorgesuarezch/neltify-env-cli/tree/master)
[![Downloads/week](https://img.shields.io/npm/dw/neltify-env-cli.svg)](https://npmjs.org/package/neltify-env-cli)
[![License](https://img.shields.io/npm/l/neltify-env-cli.svg)](https://github.com/jorgesuarezch/neltify-env-cli/blob/master/package.json)

<!-- toc -->
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
@netlify-tools/cli/0.0.0 darwin-x64 node-v12.18.0
$ netlify-tools --help [COMMAND]
USAGE
  $ netlify-tools COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`netlify-tools delete`](#netlify-tools-delete)
* [`netlify-tools describe`](#netlify-tools-describe)
* [`netlify-tools help [COMMAND]`](#netlify-tools-help-command)
* [`netlify-tools set`](#netlify-tools-set)

## `netlify-tools delete`

Delete env variables from a specific context

```
USAGE
  $ netlify-tools delete

OPTIONS
  -c, --context=context  context to be modified
  -h, --help             show CLI help
  --authToken=authToken  (required) Netlify OAuth Token
  --siteID=siteID        (required) Netlify Site ID

EXAMPLE
  $ nfy env:delete -c production FOO BAR BAZ
```

_See code: [src/commands/delete.ts](https://github.com/jorgesuarezch/neltify-tools/blob/v0.0.0/src/commands/delete.ts)_

## `netlify-tools describe`

Describe env variables for a context

```
USAGE
  $ netlify-tools describe

OPTIONS
  -c, --context=context  Context to describe
  -h, --help             show CLI help
  --all                  describe all the available contexts
  --authToken=authToken  (required) Netlify OAuth Token
  --siteID=siteID        (required) Netlify Site ID

EXAMPLE
  $ nfy env:describe -c production -c develop
     # values for production
     FOO=foo-prod
     BAR=bar-prod

     # values for develop
     FOO=foo-develop
     BAR=bar-develop
```

_See code: [src/commands/describe.ts](https://github.com/jorgesuarezch/neltify-tools/blob/v0.0.0/src/commands/describe.ts)_

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

## `netlify-tools set`

Set env variables by context

```
USAGE
  $ netlify-tools set

OPTIONS
  -c, --context=context  [default: default] Context
  -h, --help             show CLI help
  --authToken=authToken  (required) Netlify OAuth Token
  --siteID=siteID        (required) Netlify Site ID

EXAMPLE
  $ nfy env:set -c staging FOO=foo BAR=bar
```

_See code: [src/commands/set.ts](https://github.com/jorgesuarezch/neltify-tools/blob/v0.0.0/src/commands/set.ts)_
<!-- commandsstop -->
