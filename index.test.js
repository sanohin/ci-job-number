'use strict'

const ciJobNumber = require('./')

beforeEach(() => {
  delete process.env.TRAVIS
  delete process.env.APPVEYOR
})

it('returns 1 when run without CI', () => {
  expect(ciJobNumber()).toEqual(1)
})

it('supports Travis CI', () => {
  process.env.TRAVIS = '1'
  process.env.TRAVIS_JOB_NUMBER = '207.2'
  expect(ciJobNumber()).toEqual(2)
})

it('supports AppVeyor', () => {
  process.env.APPVEYOR = '1'
  process.env.APPVEYOR_JOB_NUMBER = '3'
  expect(ciJobNumber()).toEqual(3)
})

it('supports CircleCI', () => {
  process.env.CIRCLECI = 'true'
  process.env.CIRCLE_NODE_INDEX = '2'
  expect(ciJobNumber()).toEqual(3)
})

it('supports Semaphore', () => {
  process.env.SEMAPHORE = 'true'
  process.env.SEMAPHORE_CURRENT_THREAD = '3'
  expect(ciJobNumber()).toEqual(3)
})
