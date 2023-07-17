import * as core from '@actions/core'
import * as semver from 'semver'

const version: string = core.getInput('version')

export function isPrerelease(arg: string): boolean {
  const prerelease = semver.prerelease(arg)
  return prerelease !== null
}

export function getTags(arg: string): string[] | null {
  const versionObj = semver.parse(arg)
  if (versionObj === null) {
    return null
  }
  const major = versionObj.major
  const minor = versionObj.minor
  const patch = versionObj.patch

  if (!isPrerelease(arg)) {
    // TODO: add check for latest tag from available tags published to the repo (or should it be from the registry?).
    return [`${major}`, `${major}.${minor}`, `${major}.${minor}.${patch}`]
  } else {
    const result = `${major}.${minor}.${patch}`
    const prereleases = versionObj.version.replace(result, '').trim()
    const prereleaseArray = prereleases.split('-').filter(Boolean)

    // TODO: add check for general priority of prerelease tags (alpha, beta, rc, etc.), much like latest tag.
    return [result, ...prereleaseArray]
  }
}

core.setOutput('isPreRelease', isPrerelease(version))
core.setOutput('tags', getTags(version))
