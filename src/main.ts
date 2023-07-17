import * as core from '@actions/core'
import * as semver from 'semver'

const version: string = core.getInput('version')

export function isPrerelease(arg: string): boolean {
  const prerelease = semver.prerelease(arg)
  return prerelease !== null
}

export function getPrereleases(arg: string): (string | number)[] | null {
  const prerelease = semver.prerelease(arg)
  if (prerelease !== null) {
    return Array.from(prerelease)
  } else {
    return null
  }
}

core.setOutput('isPreRelease', isPrerelease(version))
core.setOutput('tags', getPrereleases(version))
