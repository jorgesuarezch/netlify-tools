import { KnownContext } from './constants'

export const getFormattedContext = (context: string): string => {
  const cleanContextName = context.replace(/[^a-zA-Z0-9_-]/, '-')

  return `__${cleanContextName.toUpperCase()}__`
}

/**
 * Concat the given context to the given name, then it is capitalized.
 * When context is production no suffix is added
 *
 * @example
 *
 * @param {string} name variable name
 * @param {string} context context name
 *
 * @return {string} formatted variable
 */
export const getFormattedName = (name: string, context?: string): string => {
  if (!context || context.toLowerCase() === KnownContext.Default) {
    return name
  }
  return `${name}${getFormattedContext(context)}`
}

export const getContextualizedVariables = (
  variables: Record<string, string>,
  context: string
): Record<string, string> => {
  const result: Record<string, string> = {}

  return Object.entries(variables).reduce((acc, [key, value]) => {
    acc[getFormattedName(key, context)] = value
    return acc
  }, result)
}

export const getVariablesByContext = (
  env: Record<string, string>,
  context: string
): Record<string, string> => {
  const entries = Object.entries(env)
  const formattedContext = getFormattedContext(context)

  return entries
    .filter(([key]) => key.endsWith(formattedContext))
    .reduce<Record<string, string>>((acc, [key, value]) => {
      const variable = key.replace(new RegExp(`${formattedContext}$`), '')
      acc[variable] = value
      return acc
    }, {})
}

/**
 * Group env variables by context
 * @param {object} env object with the variables definition
 *
 * @returns {object} grouped env variables
 */
export const groupVariablesByContext = (
  env: Record<string, string>
): Record<string, Record<string, string>> => {
  const entries = Object.entries(env)

  const result = entries.reduce<Record<string, Record<string, string>>>(
    (acc, [key, value]) => {
      const matches = key.match(/__[^_]+__$/)

      if (!matches) {
        acc[KnownContext.Default][key] = value
        return acc
      }

      const [context] = matches
      const variable = key.replace(new RegExp(`${context}$`), '')

      acc[context] = acc[context] ?? {}
      acc[context][variable] = value
      return acc
    },
    { [KnownContext.Default]: {} }
  )

  return result
}
