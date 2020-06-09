import axios from 'axios'
import { TodoController } from './TodoController'
import Todo from '../models/todo'
import TodoList from '../models/todo-list'

const GRAPHQL_QUERIES = {
  LIST: '{ todos { id, title, completed }}',
  CREATE: title =>
    `mutation { createTodo(title: "${title}") { id, title, completed }}`,
  UPDATE: (id, title, completed) =>
    `mutation { updateTodo(id: "${id}", title: "${title}", completed: ${completed})}`,
  DELETE: id => `mutation { deleteTodo(id: "${id}")}`,
  DELETE_MANY: status =>
    `mutation { deleteTodos(status: ${status.toUpperCase()})}`
}

export default class GraphQLTodoController extends TodoController {
  constructor (graphQLEndpointUrl) {
    super()
    this.graphQLEndpointUrl = graphQLEndpointUrl
  }

  async fetch () {
    const response = await this._executeQuery(GRAPHQL_QUERIES.LIST)
    const untypedTodos = response.data.todos
    const todos = untypedTodos.map(
      todo => new Todo(todo.title, todo.completed, todo.id)
    )
    return this._updateTodosState(new TodoList(todos))
  }

  async add (title) {
    const response = await this._executeQuery(GRAPHQL_QUERIES.CREATE(title))
    const todo = response.data.createTodo

    const newTodosState = this.todos.add(
      new Todo(todo.title, todo.completed, todo.id)
    )

    this._updateTodosState(newTodosState)

    return {
      allTodos: newTodosState,
      createdTodo: todo
    }
  }

  async updateTodo (newValue) {
    await this._executeQuery(
      GRAPHQL_QUERIES.UPDATE(newValue.id, newValue.title, newValue.completed)
    )

    return this._mapAndUpdateTodosState(todos => todos.updateTodo(newValue))
  }

  async delete (id) {
    await this._executeQuery(GRAPHQL_QUERIES.DELETE(id))

    return this._mapAndUpdateTodosState(todos => todos.delete(id))
  }

  // status must be 'all' or 'completed' or 'active'
  async deleteMany (status) {
    await this._executeQuery(GRAPHQL_QUERIES.DELETE_MANY(status))
    return await this.fetch()
  }

  async _executeQuery (query) {
    const response = await axios.post(this.graphQLEndpointUrl, query, {
      headers: {
        'Content-Type': 'text/plain'
      }
    })
    return response.data
  }
}
