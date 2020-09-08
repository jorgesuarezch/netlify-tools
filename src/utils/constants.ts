//
/**
 * These constants are defined based on netlify documentation (https://docs.netlify.com/site-deploys/overview/#deploy-contexts)
 */
export enum KnownContext {
  Default = 'default',
  BranchDeploy = 'branch-deploy',
  DeployPreview = 'deploy-preview',
  Production = 'production',
}

export const RESERVED_CONTEXT_NAMES: string[] = [
  KnownContext.Default,
  KnownContext.BranchDeploy,
  KnownContext.DeployPreview,
  KnownContext.Production,
]
