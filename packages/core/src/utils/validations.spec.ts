import { expect } from 'chai'
import { isValidName, isDefaultContext, isValidContext } from './validations'
import { NetlifyContextSettings } from './netlify'

describe('isValidName', () => {
  it('should return true when the given name is valid', function () {
    expect(isValidName('ENV_VAR')).to.be.true
    expect(isValidName('foo')).to.be.true
    expect(isValidName('foo-bar')).to.be.true
    expect(isValidName('foo-bar__')).to.be.true
    expect(isValidName('__foo-bar')).to.be.true
  })
  it('should return false when the given name is not valid', function () {
    expect(isValidName('__ENV_VAR__')).to.be.false
    expect(isValidName('ENV__VAR__')).to.be.false
    expect(isValidName('ENV__VAR__')).to.be.false
  })
})

describe('isDefaultContext', () => {
  it('should return true it is the default context', function () {
    expect(isDefaultContext('default')).to.be.true
  })
  it('should return false it is not the default context', function () {
    expect(isDefaultContext('develop')).to.be.false
  })
})

describe('isValidContext', () => {
  const settings: NetlifyContextSettings = {
    variables: {},
    branches: ['develop', 'staging'],
  }
  it('should return true if the given context is valid', function () {
    expect(isValidContext('default', settings)).to.be.true
    expect(isValidContext('deploy-preview', settings)).to.be.true
    expect(isValidContext('branch-deploy', settings)).to.be.true
    expect(isValidContext('production', settings)).to.be.true
    // custom deploy context
    expect(isValidContext('develop', settings)).to.be.true
    expect(isValidContext('staging', settings)).to.be.true
  })

  it('should return false it is not a valid context', function () {
    expect(isValidContext('release', settings)).to.be.false
    expect(isValidContext('custom-branch', settings)).to.be.false
  })
})
