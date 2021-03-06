import { flags } from '@oclif/command'
import * as chalk from 'chalk'
import { isEqual } from 'lodash'

import { BaseCommand } from '../../command'
import { getFormattedName } from '@netlify-tools/core/lib/utils/transform'
import { KnownContext } from '@netlify-tools/core/lib/utils/constants'

export default class DeleteCommand extends BaseCommand {
  static strict = false

  static description = 'Delete env variables from a specific context'

  static examples = [
    `$ netlify-tools env:delete FOO BAR BAZ # delete variables from default context`,
    `$ netlify-tools env:delete -c default FOO BAR BAZ`,
    `$ netlify-tools env:delete -c production FOO BAR BAZ`,
  ]

  static flags = {
    ...BaseCommand.flags,
    help: flags.help({ char: 'h' }),
    context: flags.string({
      char: 'c',
      required: false,
      multiple: false,
      default: KnownContext.Default,
      description: 'context to be modified',
    }),
  }

  static args = []

  async run() {
    const { argv, flags } = this.parse(DeleteCommand)

    if (argv.length === 0) {
      throw new Error('No arguments were given')
    }

    const settings = await this.netlify?.getContextSettings()
    const variables: Record<string, string> = { ...settings?.variables }

    argv.forEach((arg) => {
      const name = getFormattedName(arg, flags.context)

      if (Object.prototype.hasOwnProperty.call(variables, name)) {
        this.log(
          chalk.white`› deleting {white.bold ${arg}} from ${flags.context}`
        )
        delete variables[name]
      } else {
        this.log(
          chalk.yellow`› warning: variable {yellow.bold ${arg}} was not found in {yellow.bold ${flags.context}} context`
        )
      }
    })

    if (!isEqual(variables, settings?.variables)) {
      await this.netlify?.updateContextSettings({
        variables,
      })
    }

    this.log(
      chalk.green`\n› {green.bold success:} configuration has been updated!'`
    )
  }
}
