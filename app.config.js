// @ts-check

const { execSync } = require('node:child_process')
const packageJson = require('./package.json')

/** @import {ConfigContext, ExpoConfig} from 'expo/config' */

module.exports = dynamicConfig

/**
 * @param {ConfigContext} configContext
 * @returns {Partial<ExpoConfig>}
 */
function dynamicConfig(configContext) {
	const appVariant = process.env.APP_VARIANT || 'development'

	const version = getVersion(packageJson.version, appVariant)
	const name = getDisplayedName(appVariant)
	const appId = getAppId(appVariant)

	const result = {
		...configContext.config,
		version,
		name,
		android: {
			...configContext.config.android,
			package: appId,
		},
		ios: {
			...configContext.config.ios,
			bundleIdentifier: appId,
		},
	}

	return result
}

/**
 * @param {string} packageJsonVersion
 * @param {string} variant
 *
 * @returns {string}
 */
function getVersion(packageJsonVersion, variant) {
	const base = packageJsonVersion.replace(/-.*/, '')

	let suffix = ''

	switch (variant) {
		case 'development': {
			suffix = '-dev'
			break
		}
		case 'releaseCandidate': {
			suffix = '-rc'
			break
		}
		case 'production': {
			break
		}
		default: {
			throw new Error(`Invalid variant: ${variant}`)
		}
	}

	if (variant !== 'production') {
		try {
			// SHA of commit this version was built from
			const commitSha =
				process.env.EAS_BUILD_GIT_COMMIT_HASH ||
				execSync('git rev-parse HEAD').toString().trim()
			const commitShaShort = commitSha.slice(0, 7)
			suffix += `+${commitShaShort}`
		} catch (e) {
			// Expo-doctor runs in a temp directory which is not a git repo, so this command will fail.
		}
	}

	return base + suffix
}

/**
 * @param {string} variant
 * @returns {string}
 */
function getDisplayedName(variant) {
	let base = 'Release Automations Example'

	switch (variant) {
		case 'development': {
			return `${base} (Dev)`
		}
		case 'releaseCandidate': {
			return `${base} (RC)`
		}
		case 'production': {
			return base
		}
		default: {
			throw new Error(`Invalid variant: ${variant}`)
		}
	}
}

/**
 * @param {string} variant
 * @returns {string}
 */
function getAppId(variant) {
	let base = 'com.andrewchou.releaseautomationsexample'

	switch (variant) {
		case 'development': {
			return `${base}.dev`
		}
		case 'releaseCandidate': {
			return `${base}.rc`
		}
		case 'production': {
			return base
		}
		default: {
			throw new Error(`Invalid variant: ${variant}`)
		}
	}
}
