import { getVariables, onPreBuild } from './main'

const defaultEnv = {
  FOOBAR: 'foobar',
  FOOBAR__PRODUCTION__: 'foobar-production',
  'FOOBAR__DEPLOY-PREVIEW__': 'foobar-deploy-preview',
  'FOOBAR__BRANCH-DEPLOY__': 'foobar-branch-deploy',
  FOOBAR__STAGING__: 'foobar-staging',
}

describe('getVariables helper', () => {
  it('should return deploy context variables', () => {
    expect(getVariables(defaultEnv, 'production', 'bugfix/branch')).toEqual({
      FOOBAR: 'foobar-production',
    })
    expect(getVariables(defaultEnv, 'deploy-preview', 'bugfix/branch')).toEqual(
      {
        FOOBAR: 'foobar-deploy-preview',
      }
    )
    expect(getVariables(defaultEnv, 'branch-deploy', 'bugfix/branch')).toEqual({
      FOOBAR: 'foobar-branch-deploy',
    })
  })

  it('should return branch variables instead of deploy context ones', () => {
    expect(getVariables(defaultEnv, 'production', 'staging')).toEqual({
      FOOBAR: 'foobar-staging',
    })
    expect(getVariables(defaultEnv, 'deploy-preview', 'staging')).toEqual({
      FOOBAR: 'foobar-staging',
    })
    expect(getVariables(defaultEnv, 'branch-deploy', 'staging')).toEqual({
      FOOBAR: 'foobar-staging',
    })
  })

  it('should return the variables that has {context}-{branch} structure', () => {
    const deployPreviewForSpecificBranchEnv = {
      'FOOBAR__DEPLOY-PREVIEW-STAGING__': 'foobar-deploy-preview-staging-value',
    }
    const newEnv = { ...defaultEnv, ...deployPreviewForSpecificBranchEnv }

    expect(getVariables(newEnv, 'deploy-preview', 'staging')).toEqual({
      FOOBAR: 'foobar-deploy-preview-staging-value',
    })
  })
})

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

  it('should set values properly in process.env for the production context', () => {
    process.env.CONTEXT = 'production'
    process.env.BRANCH = 'staging'
    process.env.CMS_TOKEN = 'token'
    process.env.CMS_TOKEN__PRODUCTION__ = 'token-production'

    onPreBuild()

    expect(process.env.CMS_TOKEN).toEqual(process.env.CMS_TOKEN__PRODUCTION__)
  })
})