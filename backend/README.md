# TODOMVC Backends

Here I propose a Spring implementation of a REST API to enable the design of new versions of TODOMVC that use a backend.

I also added a [GraphQL](https://graphql.org/) implementation for those who would like to discover how to design frontends on top of GraphQL APIs.

When using this backend, both the REST API and GraphQL API are available by default and give an access to the very same data.

## How to start?

From the root directory of this repository:

```bash
cd backend
./gradlew bootRun
```

## How to use?

The default port of the server is 8080. This can be changed in the same manner as any Spring Boot project. Check Google for more information on that.

You can use the [OpenAPI documentation of the REST API](/openapi.yml) to discover how to use it. Its base URL is `http://localhost:8080/rest`.

The [schema of the GraphQL](schemas.gql) is also available in this directory, see `openapi.yml`. If you don't know [GraphQL](https://graphql.org/) you can discover how to use it on [their official website](https://graphql.org/). The GraphQL endpoint is located at `http://localhost:8080/graphql`.
