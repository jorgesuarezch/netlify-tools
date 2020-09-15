import { onPreBuild } from './main'

describe('onPrebuild event handler', () => {
  const processEnvCopy = { ...process.env }

  afterEach(() => {
    // reset process env
    process.env = { ...processEnvCopy }
  })

  it('should not break if CONTEXT or BRANCH variables are not defined', () => {
    expect(process.env.CONTEXT).toBeUndefined()
    expect(process.env.BRANCH).toBeUndefined()
    expect(onPreBuild()).toBeUndefined()
  })

  it('should override values properly in process.env for the production context', () => {
    process.env.CONTEXT = 'production'
    process.env.BRANCH = 'staging'
    process.env.CMS_TOKEN = 'token'
    process.env.CMS_TOKEN_PRODUCTION = 'token-production'
    onPreBuild()
    expect(process.env.CMS_TOKEN).toEqual(process.env.CMS_TOKEN_PRODUCTION)
  })

  it('should not change process.env if no contextual variables', () => {
    process.env.CONTEXT = 'production'
    process.env.BRANCH = 'staging'
    process.env.CMS_TOKEN = 'token'

    const expectedEnv = { ...process.env }
    onPreBuild()
    expect(process.env).toEqual(expectedEnv)
  })
})
