import { getVariables } from './utils'

const defaultEnv = {
  FOOBAR: 'foobar',
  FOOBAR_PRODUCTION: 'foobar-production',
  FOOBAR_DEPLOY_PREVIEW: 'foobar-deploy-preview',
  FOOBAR_BRANCH_DEPLOY: 'foobar-branch-deploy',
  FOOBAR_STAGING: 'foobar-staging',
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
      FOOBAR_DEPLOY_PREVIEW_STAGING: 'foobar-deploy-preview-staging-value',
    }
    const newEnv = { ...defaultEnv, ...deployPreviewForSpecificBranchEnv }
    const result = getVariables(newEnv, 'deploy-preview', 'staging')

    expect(result).toHaveProperty('FOOBAR')
    expect(result.FOOBAR).toBe(
      deployPreviewForSpecificBranchEnv.FOOBAR_DEPLOY_PREVIEW_STAGING
    )
  })
})
