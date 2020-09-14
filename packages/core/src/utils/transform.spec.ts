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
    expect(getFormattedContext('develop')).toBe('_DEVELOP')
    expect(getFormattedContext('feature/task-x')).toBe('_FEATURE_TASK_X')
    expect(getFormattedContext('release--dev')).toBe('_RELEASE__DEV')
  })
})

describe('getFormattedName', () => {
  it('Should format the variable name properly', async function () {
    expect(getFormattedName('ENV_VAR', 'develop')).toBe('ENV_VAR_DEVELOP')
    expect(getFormattedName('FOO', 'develop')).toBe('FOO_DEVELOP')
    expect(getFormattedName('bar', 'develop')).toBe('bar_DEVELOP')
    expect(getFormattedName('BaZ', 'develop')).toBe('BaZ_DEVELOP')
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
    ).toEqual({ ENV_VAR_1_DEVELOP: '1', ENV_VAR_2_DEVELOP: '1' })
  })
})

describe('getVariablesByContext', () => {
  it('Should get the env variables by context', () => {
    const env = {
      ENV_VAR_1_DEVELOP: '1',
      ENV_VAR_2_DEVELOP: '2',
      ENV_VAR_3_DEVELOP: '3',
      ENV_VAR_1_STAGING: '4',
      ENV_VAR_2_STAGING: '5',
      ENV_VAR_3_STAGING: '6',
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
      ENV_VAR_1_DEVELOP: '1',
      ENV_VAR_2_DEVELOP: '2',
      ENV_VAR_3_DEVELOP: '3',
      ENV_VAR_1_STAGING: '4',
      ENV_VAR_2_STAGING: '5',
      ENV_VAR_3_STAGING: '6',
    }

    const branches = ['develop', 'staging']

    expect(groupVariablesByContext(env, branches)).toEqual({
      default: {
        ENV_VAR_GLOBAL: 'ENV_VAR_GLOBAL',
      },
      _DEVELOP: {
        ENV_VAR_1: '1',
        ENV_VAR_2: '2',
        ENV_VAR_3: '3',
      },
      _STAGING: {
        ENV_VAR_1: '4',
        ENV_VAR_2: '5',
        ENV_VAR_3: '6',
      },
    })
  })
})

// 796867973
