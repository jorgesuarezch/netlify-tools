import { Command, flags } from '@oclif/command'
import { args, Input } from '@oclif/parser'
import { Netlify } from '@netlify-tools/core/lib/utils/netlify'

abstract class BaseCommand extends Command {
  static flags = {
    siteID: flags.string({
      required: true,
      description: 'Netlify Site ID',
      env: 'NETLIFY_ENV_SITE_ID',
    }),
    authToken: flags.string({
      required: true,
      description: 'Netlify OAuth Token',
      env: 'NETLIFY_ENV_AUTH_TOKEN',
    }),
  }

  static args: args.IArg[] = []

  protected netlify?: Netlify

  async init() {
    const { flags } = this.parse(
      this.constructor as Input<typeof BaseCommand.flags>
    )
    this.netlify = new Netlify({
      siteId: flags.siteID as any,
      accessToken: flags.authToken as any,
    })
  }
}

export { BaseCommand }
