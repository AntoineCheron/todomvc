import axios from 'axios'

import * as Config from '../config'
import { TodoController } from './TodoController'
import Todo from '../models/todo'
import TodoList from '../models/todo-list'

export default class RestApiTodoController extends TodoController {
  async fetch () {
    const response = await this._httpCaller().get('/todos')
    const untypedTodos = response.data
    const todos = untypedTodos.map(
      todo => new Todo(todo.title, todo.completed, todo.id)
    )
    return this._updateTodosState(new TodoList(todos))
  }

  async add (title) {
    const response = await this._httpCaller().post('/todo', { title })
    const todo = response.data

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
    await this._httpCaller().put(`/todo/${newValue.id}`, {
      title: newValue.title,
      completed: newValue.completed
    })

    return this._mapAndUpdateTodosState(todos => todos.updateTodo(newValue))
  }

  async delete (id) {
    await this._httpCaller().delete(`/todo/${id}`)
    return this._mapAndUpdateTodosState(todos => todos.delete(id))
  }

  // status must be 'all' or 'completed' or 'active'
  async deleteMany (status) {
    await this._httpCaller().delete(`/todos?status=${status}`)
    const newTodosState = await this.fetch()
    return this._updateTodosState(newTodosState)
  }

  async setStatusOfAll (complete) {
    const statusOfTodosToModify = complete ? 'active' : 'completed'
    const actionToPerformOnTodos = complete
      ? todo => todo.complete()
      : todo => todo.uncomplete()

    const todosToUpdate = this.getTodos().withStatus(statusOfTodosToModify)
    const apiCallsToCompleteTodos = todosToUpdate.map(todo =>
      this.updateTodo(actionToPerformOnTodos(todo))
    )

    const subsequentTodosState = await Promise.all(apiCallsToCompleteTodos)

    if (subsequentTodosState.length > 0) {
      const newTodosState =
        subsequentTodosState[subsequentTodosState.length - 1]
      return this._updateTodosState(newTodosState)
    } else {
      return this.getTodos()
    }
  }

  _mapAndUpdateTodosState (mapper) {
    const newTodosState = mapper(this.getTodos())
    return this._updateTodosState(newTodosState)
  }

  _updateTodosState (newTodosState) {
    this.todos = newTodosState
    return newTodosState
  }

  _httpCaller () {
    return axios.create({
      baseURL: Config.restApi.url
    })
  }
}
