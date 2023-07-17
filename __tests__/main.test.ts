import { describe, expect, it } from '@jest/globals'
import { isPrerelease, getTags } from '../src/main'

describe('isPrerelease', () => {
  it('returns true for a version with a pre-release tag', () => {
    const version = '1.2.3-beta'
    expect(isPrerelease(version)).toBe(true)
  })

  it('returns false for a version without a pre-release tag', () => {
    const version = 'v1.2.3'
    expect(isPrerelease(version)).toBe(false)
  })
})

describe('getPrereleases', () => {
  it('returns an array of pre-release components for a version with a pre-release tag', () => {
    const version = '1.2.3-beta.3-test'
    expect(getTags(version)).toEqual(['1.2.3', 'beta.3', 'test'])
  })

  it('returns an array for a non pre-release version', () => {
    const version = '1.2.3'
    expect(getTags(version)).toEqual(['1', '1.2', '1.2.3'])
  })

  it('returns null for a version without a pre-release tag', () => {
    const version = 'a1.2.3'
    expect(getTags(version)).toBeNull()
  })
})
