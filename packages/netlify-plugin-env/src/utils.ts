import { getVariablesByContext } from '@netlify-tools/core/lib/utils/transform'

export const getVariables = (
  env: Record<string, string>,
  deployContext: string,
  branch: string
): Record<string, string> => {
  const contexts = [deployContext, branch, `${deployContext}-${branch}`]

  return contexts.reduce((acc, context) => {
    return {
      ...acc,
      ...getVariablesByContext(env as Record<string, string>, context),
    }
  }, {})
}
