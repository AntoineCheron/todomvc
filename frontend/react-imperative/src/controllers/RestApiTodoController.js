import axios from 'axios'

import { TodoController } from './TodoController'
import Todo from '../models/todo'
import TodoList from '../models/todo-list'

export default class RestApiTodoController extends TodoController {
  constructor (baseApiUrl) {
    super()
    this.baseApiUrl = baseApiUrl
  }

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
    return await this.fetch()
  }

  _httpCaller () {
    return axios.create({
      baseURL: this.baseApiUrl
    })
  }
}
