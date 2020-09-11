import { flags } from '@oclif/command'
import * as chalk from 'chalk'
import { isEqual } from 'lodash'

import { getFormattedName } from '@netlify-tools/core/lib/utils/transform'
import { KnownContext } from '@netlify-tools/core/lib/utils/constants'
import { BaseCommand } from '../../command'

export default class SetCommand extends BaseCommand {
  static strict = false

  static description = 'Set env variables by context'

  static examples = [`$ netlify-tools env:set -c staging FOO=foo BAR=bar`]

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

  async run() {
    const { argv, flags } = this.parse(SetCommand)

    if (argv.length === 0) {
      throw new Error('No arguments were given')
    }

    const settings = await this.netlify?.getContextSettings()

    const variables = argv.reduce<Record<string, string>>((acc, definition) => {
      const [key, value] = definition.split('=')
      const formattedName = getFormattedName(key, flags.context)

      if (!value) {
        this.log(
          chalk.yellow`› warning: variable {yellow.bold ${key}} has an empty value. -- {yellow.bold skipped}`
        )
        return acc
      }

      this.log(
        chalk.white`› set {white.bold ${key}} into {white.bold ${flags.context}}`
      )

      acc[formattedName] = value
      return acc
    }, {})

    if (!isEqual(variables, settings?.variables)) {
      await this.netlify?.updateContextSettings({
        variables: { ...settings?.variables, ...variables },
      })
    }

    this.log(
      chalk.green`\n› {green.bold success:} configuration has been updated!'`
    )
  }
}
