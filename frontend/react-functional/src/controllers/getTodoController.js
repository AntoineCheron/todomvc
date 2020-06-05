import * as Config from '../config'
import LocalStorageTodoController from './LocalStorageTodoController'
import GraphQLTodoController from './GraphQLTodoController'
import RestApiTodoController from './RestApiTodoController'

export default function getTodoController () {
  switch (Config.featureToggle.persistance) {
    case 'rest-api':
      return new RestApiTodoController(Config.restApi.url)
    case 'graphql':
      return new GraphQLTodoController(Config.graphqlApi.url)
    case 'in-memory':
      return new LocalStorageTodoController()
    default:
      throw new Error(
        'Invalid featureToggle.persistence configuration. Please use rest-api or graphql or in-memory'
      )
  }
}
