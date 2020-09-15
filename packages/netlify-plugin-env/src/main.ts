import * as chalk from 'chalk'
import { getVariables } from './utils'

export const onPreBuild = (): void => {
  const context: string = process.env.CONTEXT ?? ''
  const branch: string = process.env.BRANCH ?? ''

  console.info(chalk.white`{cyan ❯ Context:}\n   ${context}`)
  console.info(chalk.white`{cyan ❯ Branch:}\n   ${branch}`)

  const variables = getVariables(
    process.env as Record<string, string>,
    context,
    branch
  )

  const keys = Object.keys(variables)

  if (keys.length) {
    console.info(
      chalk.white`{cyan ❯ Variables to override:}\n   - ${keys.join('\n   - ')}`
    )

    keys.forEach((key) => {
      process.env[key] = variables[key]
    })
  } else {
    console.info('no variables to override')
  }
}
