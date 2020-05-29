import Todo from './todo'

export default class TodoList {
  constructor (initialValues) {
    this.values = initialValues || getTodosFromLocalStorage()
    saveTodosInLocalStorage(this.values)
  }

  add (title) {
    return new TodoList(this.values.concat(new Todo(title)))
  }

  updateTodo (id, newValue) {
    const newTodos = [].concat(this.values)
    const indexOfTodo = this.values.indexOf(
      this.values.find(todo => todo.id === id)
    )
    newTodos[indexOfTodo] = newValue
    return new TodoList(newTodos)
  }

  delete (id) {
    const valuesCopy = [].concat(this.values)
    valuesCopy.splice(
      valuesCopy.indexOf(valuesCopy.find(todo => todo.id === id)),
      1
    )
    return new TodoList(valuesCopy)
  }

  completeAll () {
    return new TodoList(this.values.map(todo => todo.complete()))
  }

  /**
   *
   * @param {*} status: either 'active', 'completed', or 'all'
   */
  withStatus (status) {
    if (status === 'active') {
      return this.values.filter(todo => !todo.isDone)
    } else if (status === 'completed') {
      return this.values.filter(todo => todo.isDone)
    } else {
      return this.values
    }
  }

  static countTodosLeft (todos) {
    return todos.reduce((count, todo) => count + (todo.isDone ? 0 : 1), 0)
  }
}

function saveTodosInLocalStorage (todos) {
  localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodosFromLocalStorage () {
  return JSON.parse(localStorage.getItem('todos') || '[]').map(
    untypedTodo =>
      new Todo(untypedTodo.title, untypedTodo.isDone, untypedTodo.id)
  )
}
