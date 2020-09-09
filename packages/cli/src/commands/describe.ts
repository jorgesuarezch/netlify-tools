import { flags } from '@oclif/command'
import * as chalk from 'chalk'
import { orderBy, has } from 'lodash'

import { BaseCommand } from '../command'
import { KnownContext } from '../utils/constants'
import {
  getFormattedContext,
  groupVariablesByContext,
  getFormattedName,
} from '../utils/transform'
import { NetlifyContextSettings } from '../netlify'

export default class DescribeCommand extends BaseCommand {
  static strict = false

  static description = 'Describe env variables for a context'

  static examples = [
    `$ nfy env:describe -c production -c develop
  # values for production
  FOO=foo-prod
  BAR=bar-prod

  # values for develop
  FOO=foo-develop
  BAR=bar-develop
  `,
  ]

  static flags = {
    ...BaseCommand.flags,
    help: flags.help({ char: 'h' }),
    context: flags.string({
      char: 'c',
      required: false,
      multiple: true,
      description: 'Context to describe',
    }),
    all: flags.boolean({
      default: false,
      description: 'describe all the available contexts',
    }),
  }

  static args = []

  private printDescription(
    context: string,
    variables: Record<string, string>,
    branches: string[],
    settings?: NetlifyContextSettings
  ) {
    const entries = orderBy(Object.entries(variables), [0])
    const b =
      branches.length > 0
        ? chalk.gray.bold(branches.join(', '))
        : chalk.yellow('<none>')

    this.log(chalk`\n# > describe context {white.bold ${context}}`)
    this.log(`# deploy branches: ${b}`)
    this.log(`# variables:`)
    entries.forEach(([key, value]) => {
      const rawVariableName = getFormattedName(key, context)

      if (
        key !== rawVariableName &&
        has(settings?.variables, rawVariableName)
      ) {
        this.log(
          chalk`{white.bold ${key}}={white.bold ${value}} {gray # contextualized variable} {gray.bold ${rawVariableName}}`
        )
      } else {
        this.log(
          chalk`{white.bold ${key}}={white.bold ${value}} {gray # default}`
        )
      }
    })
    this.log('')
  }

  async run() {
    const { flags } = this.parse(DescribeCommand)
    const settings = await this.netlify?.getContextSettings()

    const variablesByContext = groupVariablesByContext(
      settings?.variables ?? {}
    )

    const contexts = flags.all ? settings?.branches : flags.context

    contexts?.forEach((c) => {
      const formattedContext =
        c === KnownContext.Default ? c : getFormattedContext(c)
      const variables = {
        ...variablesByContext[KnownContext.Default],
        ...variablesByContext[formattedContext],
      }
      const branches =
        settings?.branches.filter(
          (branch) => getFormattedContext(branch) === formattedContext
        ) ?? []

      this.printDescription(c, variables, branches, settings)
    })
  }
}
