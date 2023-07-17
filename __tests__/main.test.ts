import { describe, expect, it } from '@jest/globals'
import { isPrerelease, getPrereleases } from '../src/main'

describe('isPrerelease', () => {
  it('returns true for a version with a pre-release tag', () => {
    const version = '1.2.3-beta'
    expect(isPrerelease(version)).toBe(true)
  })

  it('returns false for a version without a pre-release tag', () => {
    const version = '1.2.3'
    expect(isPrerelease(version)).toBe(false)
  })
})

describe('getPrereleases', () => {
  it('returns an array of pre-release components for a version with a pre-release tag', () => {
    const version = '1.2.3-beta.3-test'
    expect(getPrereleases(version)).toEqual(['beta', '3-test'])
  })

  it('returns null for a version without a pre-release tag', () => {
    const version = '1.2.3'
    expect(getPrereleases(version)).toBeNull()
  })
})