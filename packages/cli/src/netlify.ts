const NetlifyAPI = require('netlify')

interface NetlifyConfiguration {
  siteId: string
  accessToken: string
}

export type NetlifyContextSettings = {
  variables: Record<string, string>
  branches: string[]
}

export type NetlifyContextSettingsPayload = {
  variables?: Record<string, string>
  branches?: string[]
}

export class Netlify {
  client: any

  constructor(private configuration: NetlifyConfiguration) {
    this.client = new NetlifyAPI(configuration.accessToken)
  }

  async getContextSettings(): Promise<NetlifyContextSettings> {
    const { build_settings: buildSettings } = await this.client.getSite({
      site_id: this.configuration.siteId,
    })

    return {
      variables: buildSettings.env ?? [],
      branches: buildSettings.allowed_branches ?? [],
    }
  }

  async updateContextSettings(
    payload: NetlifyContextSettingsPayload
  ): Promise<NetlifyContextSettings> {
    const buildSettings: {
      env?: Record<string, string>
      allowed_branches?: string[]
    } = {}

    if (payload.variables) {
      buildSettings.env = payload.variables
    }

    if (payload.branches) {
      buildSettings.allowed_branches = payload.branches
    }

    const {
      build_settings: updatedBuildSettings,
    } = await this.client.updateSite({
      site_id: this.configuration.siteId,
      body: {
        build_settings: buildSettings,
      },
    })

    return {
      variables: updatedBuildSettings.env,
      branches: updatedBuildSettings.allowed_branches,
    }
  }
}
