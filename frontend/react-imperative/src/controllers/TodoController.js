import TodoList from '../models/todo-list'

const NOT_IMPLEMENTED_ERROR_MESSAGE =
  'Not implemented method. Please use a class that extends TodoController'

export class TodoController {
  constructor () {
    this.todos = new TodoList()
  }

  getTodos () {
    return this.todos
  }

  async add (title) {
    throw new Error(NOT_IMPLEMENTED_ERROR_MESSAGE)
  }

  async updateTodo (id, newValue) {
    throw new Error(NOT_IMPLEMENTED_ERROR_MESSAGE)
  }

  async delete (id) {
    throw new Error(NOT_IMPLEMENTED_ERROR_MESSAGE)
  }

  // status must be 'all' or 'completed' or 'active'
  async deleteMany (status) {
    throw new Error(NOT_IMPLEMENTED_ERROR_MESSAGE)
  }

  async switchStatusOfAllTodos () {
    const areAllCompleted = this.todos
      .withStatus('all')
      .every(todo => todo.completed)
    return await this.setStatusOfAll(!areAllCompleted)
  }

  async setStatusOfAll (completed) {
    throw new Error(NOT_IMPLEMENTED_ERROR_MESSAGE)
  }
}
