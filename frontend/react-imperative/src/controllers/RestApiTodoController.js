import axios from 'axios'

import * as Config from '../config'
import { TodoController } from './TodoController'

export default class RestApiTodoController extends TodoController {
  constructor () {
    super([])
  }

  fetch () {
    this._httpCaller()
      .get('/todos')
      .then(response => response.data)
  }

  add (title) {
    return this._httpCaller()
      .post('/todo', { title })
      .then(response => response.data)
      .then(todo => {
        return {
          allTodos: this.todos.add(todo),
          createdTodo: todo
        }
      })
  }

  updateTodo (id, newValue) {
    return this._httpCaller()
      .put(`/todo/${id}`, {
        title: newValue.title,
        completed: newValue.completed
      })
      .then(_ => this.todos.updateTodo(id, newValue))
  }

  delete (id) {
    return this._httpCaller()
      .delete(`/todo/${id}`)
      .then(_ => this.todos.delete(id))
  }

  completeAll () {
    // TODO
    return this._mapValuesAndSave(values => values.completeAll())
  }

  _httpCaller () {
    return axios.create({
      baseURL: Config.restApi.url
    })
  }
}
