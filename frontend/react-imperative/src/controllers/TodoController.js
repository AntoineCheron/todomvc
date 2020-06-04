const NOT_IMPLEMENTED_ERROR_MESSAGE =
  'Not implemented method. Please use a class extending TodoController'

export class TodoController {
  constructor (todos) {
    this.todos = todos
  }

  getTodos () {
    return this.todos
  }

  add (title) {
    throw new Error(NOT_IMPLEMENTED_ERROR_MESSAGE)
  }

  updateTodo (id, newValue) {
    throw new Error(NOT_IMPLEMENTED_ERROR_MESSAGE)
  }

  delete (id) {
    throw new Error(NOT_IMPLEMENTED_ERROR_MESSAGE)
  }

  completeAll () {
    throw new Error(NOT_IMPLEMENTED_ERROR_MESSAGE)
  }
}
