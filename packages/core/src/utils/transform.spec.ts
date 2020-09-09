import {
  getFormattedContext,
  getFormattedName,
  getContextualizedVariables,
  getVariablesByContext,
  groupVariablesByContext,
} from './transform'
import { KnownContext } from './constants'

describe('getFormattedContext', () => {
  it('Should format the context name properly', async function () {
    expect(getFormattedContext('develop')).toBe('__DEVELOP__')
    expect(getFormattedContext('feature/task-x')).toBe('__FEATURE-TASK-X__')
  })
})

describe('getFormattedName', () => {
  it('Should format the variable name properly', async function () {
    expect(getFormattedName('ENV_VAR', 'develop')).toBe('ENV_VAR__DEVELOP__')
    expect(getFormattedName('FOO', 'develop')).toBe('FOO__DEVELOP__')
    expect(getFormattedName('bar', 'develop')).toBe('bar__DEVELOP__')
    expect(getFormattedName('BaZ', 'develop')).toBe('BaZ__DEVELOP__')
  })

  it('Should ignore default context', async function () {
    expect(getFormattedName('ENV_VAR', KnownContext.Default)).toBe('ENV_VAR')
    expect(getFormattedName('BAz', KnownContext.Default)).toBe('BAz')
  })
})

describe('getContextualizedVariables', () => {
  it('Should return a new var objects with the keys formatted properly', async function () {
    expect(
      getContextualizedVariables({ ENV_VAR_1: '1', ENV_VAR_2: '1' }, 'develop')
    ).toEqual({ ENV_VAR_1__DEVELOP__: '1', ENV_VAR_2__DEVELOP__: '1' })
  })
})

describe('getVariablesByContext', () => {
  it('Should get the env variables by context', () => {
    const env = {
      ENV_VAR_1__DEVELOP__: '1',
      ENV_VAR_2__DEVELOP__: '2',
      ENV_VAR_3__DEVELOP__: '3',
      ENV_VAR_1__STAGING__: '4',
      ENV_VAR_2__STAGING__: '5',
      ENV_VAR_3__STAGING__: '6',
    }

    expect(getVariablesByContext(env, 'develop')).toEqual({
      ENV_VAR_1: '1',
      ENV_VAR_2: '2',
      ENV_VAR_3: '3',
    })
  })
})

describe('groupVariablesByContext', () => {
  it('Should group variables by context', () => {
    const env = {
      ENV_VAR_GLOBAL: 'ENV_VAR_GLOBAL',
      ENV_VAR_1__DEVELOP__: '1',
      ENV_VAR_2__DEVELOP__: '2',
      ENV_VAR_3__DEVELOP__: '3',
      ENV_VAR_1__STAGING__: '4',
      ENV_VAR_2__STAGING__: '5',
      ENV_VAR_3__STAGING__: '6',
    }

    expect(groupVariablesByContext(env)).toEqual({
      default: {
        ENV_VAR_GLOBAL: 'ENV_VAR_GLOBAL',
      },
      __DEVELOP__: {
        ENV_VAR_1: '1',
        ENV_VAR_2: '2',
        ENV_VAR_3: '3',
      },
      __STAGING__: {
        ENV_VAR_1: '4',
        ENV_VAR_2: '5',
        ENV_VAR_3: '6',
      },
    })
  })
})

// 796867973
