import * as Config from '../config'
import LocalStorageTodoController from './LocalStorageTodoController'
import RestApiTodoController from './RestApiTodoController'

export default function getTodoController () {
  switch (Config.featureToggle.persistance) {
    case 'rest-api':
      return new RestApiTodoController()
    case 'graphql':
      return null
    case 'in-memory':
      return new LocalStorageTodoController()
    default:
      throw new Error(
        'Invalid featureToggle.persistence configuration. Please use rest-api or graphql or in-memory'
      )
  }
}
