# CoMapeo Apps Release automations

This repository contains example/template workflows for automating the release of CoMapeo apps. These are currently in the early stages of development and are intended to verify some proposals for our release strategy, and at the same time facilitate the release process in the meantime.

## Workflows

### [Start Feature Release](.github/workflows/feature-release.yml)

#### Triggers

- Manually triggered by the team when they want to start a new feature release. This marks the the feature-freeze of the current release cycle, and starts a new release cycle on the `develop` branch.

#### Effects

1. Creates a new release branch from `develop` named `release/v${next_version}.x`
2. Creates a new release candidate branch from `develop` named `rc/v${next_version}.0` and bump the `package.json` version to the target version.
3. Creates a new pull request from `rc/v${next_version}.0` to `release/v${next_version}.x` with the changes in `rc/v${next_version}.0`.

A release candidate build will be triggered by the creation of the PR (see [below](#build-release-candidate)).

### [Build Release Candidate](.github/workflows/build-rc.yml)

#### Triggers

1. Opening a PR that targets a base branch that matches `release/**`
2. Commenting on a PR that targets a base branch that matches `release/**` with the `/build-rc` command.

#### Effects

1. Triggers a Release Candidate build on EAS
2. Creates a comment on the Release Candidate PR with a link to the EAS build process.

### [Build Release](.github/workflows/build-release.yml)

#### Triggers

1. Merging a PR that targets a base branch that matches `release/**`

#### Effects

1. Triggers a Release build on EAS
2. Creates a comment on the (merged) Release Candidate PR with a link to the EAS build process.

### [Post Release Check](.github/workflows/post-release-check.yml)

#### Triggers

1. Merging a PR that targets a base branch that matches `release/**`

#### Effects

1. Checks for any commits made to the release candidate since branching from `develop` that were not cherry-picked from `develop`.
2. Creates an issue to manually check any non-cherry-picked commits and add them to `develop` if necessary.

### [Start Hotfix Release](.github/workflows/hotfix-release.yml)

#### Triggers

- Manually triggered by the team when they want to start a new hotfix release. User must enter the release version to hotfix.

#### Effects

1. Creates a new release canddiate branch from the target release branch (e.g. `release/v4.x`) named `rc/v${release_version}.${hotfix_version}`.
2. Creates a new pull request from `rc/v${release_version}.${hotfix_version}` to `release/v${release_version}.x`.

A release candidate build will be triggered by the creation of the PR (see [above](#build-release-candidate)).

### [Check Release Branch](.github/workflows/check-release-branch.yml)

#### Triggers

- Opening, syncing or reopening a PR that targets a base branch that matches `release/**`

#### Effects

1. Checks there are no commits made to the release branch while a release candidate PR is open.

This check is important to ensure that the release candidate (and release) do not include unexpected code which has been pushed to the release branch after the release candidate branch was created.

### [Build Bot](.github/workflows/build-bot.yml)

#### Triggers

- Commenting on a PR with the `/buildrc` command.

#### Effects

1. Triggers the [Build Release Candidate](#build-release-candidate) workflow.
