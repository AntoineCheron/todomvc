# TODOMVC Frontends

Here I will propose two implementations of [TODOMVC](https://github.com/tastejs/todomvc/) for [React](https://github.com/facebook/react).
One will be designed with an imperative paradigm (using classes) and the other one with the functional paradigm (hooks and functional components).
The goal is to ease the understanding of the differences between using React with classes or with hooks and functional components.

So, in this directory you can find three folders:

- [react-functional](/react-functional) that contains the implementation with React hooks and functional components
- [react-imperative](/react-imperative) that uses the implementation with React classes
- [commons](/commons) that contains all the code that is common to both version

## Design decisions

- The state of the applications (data) is managed with [React contexts](https://reactjs.org/docs/context.html).
