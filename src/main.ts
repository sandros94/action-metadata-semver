import * as core from '@actions/core'
import * as semver from 'semver'

const version: string = core.getInput('version')
const enableLatest: boolean = core.getInput('enableLatest') === 'true'

export function isPrerelease(arg: string): boolean {
  const prerelease = semver.prerelease(arg)
  return prerelease !== null
}

export function getTags(arg: string, optionLatest: boolean): string[] | null {
  const versionObj = semver.parse(arg)
  if (versionObj === null || semver.valid(arg) === null) {
    return null
  }
  const major = versionObj.major
  const minor = versionObj.minor
  const patch = versionObj.patch
  const latest = optionLatest ? 'latest' : ''

  if (!isPrerelease(arg)) {
    // TODO: add check for latest tag from available tags published to the repo (or should it be from the registry?).
    return [
      `${major}`,
      `${major}.${minor}`,
      `${major}.${minor}.${patch}`,
      latest
    ].filter(Boolean)
  } else {
    const result = `${major}.${minor}.${patch}`
    const prereleases = versionObj.version.replace(result, '').trim()
    const prereleaseArray = prereleases.split('-').filter(Boolean)

    // TODO: add check for general priority of prerelease tags (alpha, beta, rc, etc.), much like latest tag.
    return [versionObj.version, ...prereleaseArray]
  }
}

core.setOutput('isPreRelease', isPrerelease(version))
core.setOutput('tags', getTags(version, enableLatest))
