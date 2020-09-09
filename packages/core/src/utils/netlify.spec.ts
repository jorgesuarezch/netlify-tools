import * as nock from 'nock'
import { Netlify } from './netlify'

describe('Netlify', () => {
  it('Should retrieve context settings', async function () {
    nock('https://api.netlify.com', {
      encodedQueryParams: true,
    })
      .get(/\/api\/v1\/sites\/.*/)
      .reply(200, {
        id: 'uuid',
        site_id: 'uuid',
        build_settings: {
          env: { API_TOKEN: 'qwerty' },
          allowed_branches: ['master'],
        },
      })
    const client = new Netlify({
      accessToken: 'id',
      siteId: 'uuid',
    })
    const response = await client.getContextSettings()
    console.log('response', response)
    expect(response).toHaveProperty('variables')
    expect(response).toHaveProperty('branches')
    expect(response.variables).toEqual({ API_TOKEN: 'qwerty' })
    expect(response.branches).toEqual(['master'])
  })

  it('Should update context settings', async function () {
    const expectedResponse = {
      id: 'uuid',
      site_id: 'uuid',
      build_settings: {
        env: {
          ENV_VAR_1: 'env-var-1',
          ENV_VAR_2: 'env-var-2',
          ENV_VAR_3: 'env-var-3',
        },
        allowed_branches: ['master', 'develop'],
      },
    }
    // nock.recorder.rec()
    nock('https://api.netlify.com', {
      encodedQueryParams: true,
    })
      .patch(/\/api\/v1\/sites\/.*/)
      .reply(200, expectedResponse)

    const client = new Netlify({
      accessToken: 'oauth-token',
      siteId: 'uuid',
    })
    const response = await client.updateContextSettings({
      variables: {
        ENV_VAR_1: 'env-var-1',
        ENV_VAR_2: 'env-var-2',
        ENV_VAR_3: 'env-var-3',
      },
      branches: ['master', 'develop'],
    })

    expect(response).toHaveProperty('variables')
    expect(response).toHaveProperty('branches')
    expect(response.variables).toEqual(expectedResponse.build_settings.env)
    expect(response.branches).toEqual(
      expectedResponse.build_settings.allowed_branches
    )
  })
})
