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

    const complete = !areAllCompleted

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
}
