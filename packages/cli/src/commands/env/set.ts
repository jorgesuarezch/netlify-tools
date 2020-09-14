import { flags } from '@oclif/command'
import * as chalk from 'chalk'
import * as inquirer from 'inquirer'
import { isEqual } from 'lodash'

import { getFormattedName } from '@netlify-tools/core/lib/utils/transform'
import { KnownContext } from '@netlify-tools/core/lib/utils/constants'
import { isValidContext } from '@netlify-tools/core/lib/utils/validations'
import { BaseCommand } from '../../command'
import { NetlifyContextSettings } from '@netlify-tools/core/lib/utils/netlify'

const shouldCreateContext = async (context: string): Promise<boolean> => {
  const answers = await inquirer.prompt([
    {
      type: 'expand',
      message: `Context ${context} not found. Do you want to add it?`,
      name: 'create',
      default: 'no',
      choices: [
        {
          key: 'y',
          name: 'Yes',
          value: 'yes',
        },
        {
          key: 'n',
          name: 'No',
          value: 'no',
        },
      ],
    },
  ])
  return answers.create === 'yes'
}

export default class SetCommand extends BaseCommand {
  static strict = false

  static description = 'Set env variables by context'

  static examples = [
    `$ netlify-tools env:set FOO=foo BAR=bar`,
    `$ netlify-tools env:set -c default FOO=foo BAR=bar`,
    `$ netlify-tools env:set -c staging FOO=foo BAR=bar`,
  ]

  static flags = {
    ...BaseCommand.flags,
    help: flags.help({ char: 'h' }),
    context: flags.string({
      char: 'c',
      required: false,
      multiple: false,
      default: KnownContext.Default,
      description: 'Context',
    }),
  }

  static args = []

  /**
   * Transform a list of definitions like key=value into an object {key: value}
   * @param {Array<string>} definitions list of arguments
   * @param context
   */
  getVariables(definitions: string[], context: string) {
    return definitions.reduce<Record<string, string>>((acc, definition) => {
      const [key, value] = definition.split('=')
      const formattedName = getFormattedName(key, context)

      if (!value) {
        this.log(
          chalk.yellow`› warning: variable {yellow.bold ${key}} has an empty value. -- {yellow.bold skipped}`
        )
        return acc
      }

      this.log(
        chalk.white`› set {white.bold ${key}} into {white.bold ${context}}`
      )

      acc[formattedName] = value
      return acc
    }, {})
  }

  /**
   * Validate if the current context is valid or if it should be added as a branch deploy
   * @param context
   * @param settings
   */
  async getBranches(
    context: string,
    settings?: NetlifyContextSettings
  ): Promise<string[]> {
    const branches = settings?.branches ? [...settings?.branches] : []
    const missingContext = settings && !isValidContext(context, settings)

    if (missingContext) {
      const createContext = await shouldCreateContext(context)
      if (createContext) {
        branches.push(context)
      } else {
        this.error('Context does not exist', { exit: true } as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      }
    }

    return branches
  }

  async run() {
    const { argv, flags } = this.parse(SetCommand)

    if (argv.length === 0) {
      throw new Error('No arguments were given')
    }

    const settings = await this.netlify?.getContextSettings()
    const branches = await this.getBranches(flags.context, settings)
    const variables = this.getVariables(argv, flags.context)

    if (!isEqual({ variables, branches }, settings)) {
      await this.netlify?.updateContextSettings({
        variables: { ...settings?.variables, ...variables },
        branches,
      })
    }

    this.log(
      chalk.green`\n› {green.bold success:} configuration has been updated!'`
    )
  }
}
