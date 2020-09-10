import { Netlify } from './netlify'
jest.mock('netlify', () => {
  return class NetlifyMock {
    updateSite = jest.fn()
    getSite = jest.fn()
  }
})

describe('Netlify', () => {
  const defaultResponse = {
    id: 'uuid',
    site_id: 'uuid',
    build_settings: {
      env: { API_TOKEN: 'secret' },
      allowed_branches: ['master'],
    },
  }
  let api: any = null

  beforeEach(() => {
    jest.resetModules()
    api = new Netlify({
      accessToken: 'oauth-token',
      siteId: 'uuid',
    })
    api.client.getSite.mockReturnValueOnce(defaultResponse)
    api.client.updateSite.mockReturnValueOnce(defaultResponse)
  })

  it('Should return context settings', async function () {
    api.client.getSite.mockReturnValueOnce(defaultResponse)

    const response = await api.getContextSettings()

    expect(api.client.getSite).toHaveBeenCalledTimes(1)
    expect(api.client.getSite).toHaveBeenCalledWith({
      site_id: 'uuid',
    })
    expect(response).toHaveProperty('variables')
    expect(response.variables).toBeInstanceOf(Object)

    expect(response).toHaveProperty('branches')
    expect(response.branches).toBeInstanceOf(Array)
  })

  it('Should update context settings', async function () {
    const response = await api.updateContextSettings({
      variables: {
        FOO: 'foo',
        BAR: 'bar',
        BAZ: 'baz',
      },
      branches: ['master', 'develop'],
    })

    expect(api.client.updateSite).toHaveBeenCalledTimes(1)
    expect(api.client.updateSite).toHaveBeenCalledWith({
      body: {
        build_settings: {
          allowed_branches: ['master', 'develop'],
          env: {
            FOO: 'foo',
            BAR: 'bar',
            BAZ: 'baz',
          },
        },
      },
      site_id: 'uuid',
    })

    expect(response).toHaveProperty('variables')
    expect(response).toHaveProperty('branches')
  })

  it('Should update only variables', async function () {
    const response = await api.updateContextSettings({
      variables: {
        FOO: 'bar',
      },
    })

    expect(api.client.updateSite).toHaveBeenCalledTimes(1)
    expect(api.client.updateSite).toHaveBeenCalledWith({
      body: {
        build_settings: {
          env: {
            FOO: 'bar',
          },
        },
      },
      site_id: 'uuid',
    })

    expect(response).toHaveProperty('variables')
    expect(response).toHaveProperty('branches')
  })

  it('Should update only branches', async function () {
    const response = await api.updateContextSettings({
      branches: ['foo'],
    })

    expect(api.client.updateSite).toHaveBeenCalledTimes(1)
    expect(api.client.updateSite).toHaveBeenCalledWith({
      body: {
        build_settings: {
          allowed_branches: ['foo'],
        },
      },
      site_id: 'uuid',
    })

    expect(response).toHaveProperty('variables')
    expect(response).toHaveProperty('branches')
  })
})
