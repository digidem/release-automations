# Release Automations with Expo

Sandbox repo for getting https://github.com/digidem/release-automations to work with Expo App Services.

## Working locally

Ensure you have a [relevant NodeJS version](./.nvmrc) installed. After cloning the repo:

1. Run `npm run prebuild` to generate native directories.
2. Run `npm start` to start the development server
3. Run `npm run android` to build the dev client for running the Android application.

## Repository setup

Make sure you have the following set up for the GitHub repo:

- Add a [repository secret](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository) called `EXPO_TOKEN`. Refer to [Expo's docs](https://docs.expo.dev/build/building-on-ci/#provide-a-personal-access-token-to-authenticate-with-your-expo-account-on-ci) for generating the token.

- Add a [repository variable](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/store-information-in-variables#creating-configuration-variables-for-a-repository) called `EAS_PROJECT_URL`. This should point to the overview page for your project on Expo (something like `https://expo.dev/accounts/<account_name>/projects/<project_name>`). **It should NOT include the forward slash at the end (`/`)**.
