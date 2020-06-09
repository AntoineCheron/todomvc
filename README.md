# TODOMVC

Here, on the frontend, I propose to highlight the differences between using [React](https://github.com/facebook/react) with the imperative and functional paradigms. As [React](https://github.com/facebook/react) is a vue library, this difference is visible only in the vue layer.

Within the imperative paradigm, classes are used. On the ohter hand, within the functional paradigm, the React hooks are used.

In addition, I propose a REST API to enable the design of new versions of TODOMVC that use a backend.
In my opinion, it could be a nice addition to TODOMVC in order to help developers learn how to use a REST API within a MVC frontend.
I consider this as an interesting point as the design of frontends using a REST API became an industry standard.

I also added a [GraphQL](https://graphql.org/) implementation for those who would like to discover how to design frontends on top of GraphQL APIs.

## Project Structure

The two backends are shipped into a single Java Application, and the two versions of the frontend into a single application too. To know more about this, read the README of each one: [frontend](/frontend) and [backend](/backend).

If you're not familiar with this, the frontend and backend terms refers to the architecture used. These terms have been explained [here](https://www.geeksforgeeks.org/frontend-vs-backend/).

## Prerequisites

You need to have:

- A Java Development Kit (JDK) version 11 or later
- [Node JS](https://nodejs.org/en/)

## How to install?

Open a terminal, go to the folder where you want to save this project and then type:

```sh
git clone https://github.com/AntoineCheron/todomvc.git
cd todomvc

cd frontend
npm install
```

## How to run?

- Frontend: see the [README of the frontend directory](/frontend).
- Backend: see the [README of the backend directory](/backend).

## Contributing

Simply [open an issue](https://github.com/AntoineCheron/todomvc/issues/new/choose) to get in touch and propose your contribution.

## License

The [license of this project](./LICENSE.txt) is MIT. It lets people do almost anything they want with this project, like making and distributing closed source versions.
