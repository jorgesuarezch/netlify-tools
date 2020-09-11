import { isDefaultContext, isValidContext } from './validations'
import { NetlifyContextSettings } from './netlify'

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
