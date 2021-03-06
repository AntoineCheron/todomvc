# TODOMVC Frontends

Here I propose to highlight the differences between using [React](https://github.com/facebook/react) with the imperative and functional paradigms. As [React](https://github.com/facebook/react) is a vue library, this difference is visible only in the vue layer.

Within the imperative paradigm, classes are used. On the ohter hand, within the functional paradigm, the React hooks are used.

So, in the [src](/src) directory you can find three folders:

- [functional](/src/react-functional) that contains the implementation of the view with React hooks and functional components
- [imperative](/src/react-imperative) that uses the implementation of the view with React classes
- [commons](/src/commons) that contains all the code that is common to both version, which includes controllers and models

## How to use and configure

You can configure this frontend application in the [src/config.js](/src/config.js) file. Options are:

First, you can configure whether to use the imperative or functional version by setting the `featureToggle.app` variable.

Second, you can choose how to persist the data. The first option is `in-memory` which stores the todos in the local storage of the browser. If you choose this option, you won't have to use any the backend proposed in this repository. The two other options are `rest-api` and `graphql`. Their name is explicit, they require to configure the base url of the service. An example is already given in the config file.

When you're all set with the configuration, use the scripts below to start the app. The easiest way to get started is to set `featureToggle.persistence` to `in-memory` and start the app locally typing `yarn start` in the terminal.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
