import { isValidName, isDefaultContext, isValidContext } from './validations'
import { NetlifyContextSettings } from './netlify'

describe('isValidName', () => {
  it('should return true when the given name is valid', function () {
    expect(isValidName('ENV_VAR')).toBeTruthy()
    expect(isValidName('foo')).toBeTruthy()
    expect(isValidName('foo-bar')).toBeTruthy()
    expect(isValidName('foo-bar__')).toBeTruthy()
    expect(isValidName('__foo-bar')).toBeTruthy()
  })
  it('should return false when the given name is not valid', function () {
    expect(isValidName('__ENV_VAR__')).toBeFalsy()
    expect(isValidName('ENV__VAR__')).toBeFalsy()
    expect(isValidName('ENV__VAR__')).toBeFalsy()
  })
})

describe('isDefaultContext', () => {
  it('should return true it is the default context', function () {
    expect(isDefaultContext('default')).toBeTruthy()
  })
  it('should return false it is not the default context', function () {
    expect(isDefaultContext('develop')).toBeFalsy()
  })
})

describe('isValidContext', () => {
  const settings: NetlifyContextSettings = {
    variables: {},
    branches: ['develop', 'staging'],
  }
  it('should return true if the given context is valid', function () {
    expect(isValidContext('default', settings)).toBeTruthy()
    expect(isValidContext('deploy-preview', settings)).toBeTruthy()
    expect(isValidContext('branch-deploy', settings)).toBeTruthy()
    expect(isValidContext('production', settings)).toBeTruthy()
    // custom deploy context
    expect(isValidContext('develop', settings)).toBeTruthy()
    expect(isValidContext('staging', settings)).toBeTruthy()
  })

  it('should return false it is not a valid context', function () {
    expect(isValidContext('release', settings)).toBeFalsy()
    expect(isValidContext('custom-branch', settings)).toBeFalsy()
  })
})
