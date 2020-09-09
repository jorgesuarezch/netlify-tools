import { KnownContext, RESERVED_CONTEXT_NAMES } from './constants'
import { NetlifyContextSettings } from '../netlify'

/**
 * Check if the given name is valid and it does not generate any conflict with context format
 * @param {string} name variable name
 *
 * @return {boolean} result
 */
export const isValidName = (name: string): boolean => !name.match(/__.*__/gi)

/**
 * Check if the given context name is the default one
 * @param {string} context context name
 *
 * @return {boolean} result
 */
export const isDefaultContext = (context: string): boolean =>
  context === KnownContext.Default

/**
 * Check if the given context is in the reserved contexts list
 * @param {string} context context name
 *
 * @returns {boolean} result
 */
export const isKnownContext = (context: string): boolean =>
  RESERVED_CONTEXT_NAMES.includes(context)

/**
 * Check if the given context is valid by checking branch names and known contexts.
 * @param {string} context context name
 * @param {NetlifyContextSettings} settings site setting
 *
 * @return {boolean} result
 */
export const isValidContext = (
  context: string,
  settings: NetlifyContextSettings
): boolean => isKnownContext(context) || settings.branches.includes(context)
