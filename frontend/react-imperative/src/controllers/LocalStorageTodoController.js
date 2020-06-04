import Todo from '../models/todo'
import TodoList from '../models/todo-list'
import { TodoController } from './TodoController'

export default class LocalStorageTodoController extends TodoController {
  constructor () {
    super(getTodosFromLocalStorage())
  }

  add (title) {
    return this._mapValuesAndSave(values => values.add(new Todo(title)))
  }

  updateTodo (id, newValue) {
    return this._mapValuesAndSave(values => values.updateTodo(id, newValue))
  }

  delete (id) {
    return this._mapValuesAndSave(values => values.delete(id))
  }

  completeAll () {
    return this._mapValuesAndSave(values => values.completeAll())
  }

  _mapValuesAndSave (mapper) {
    return Promise.resolve(mapper(this.todos)).map(todos => {
      localStorage.setItem('react-imperative-todos', JSON.stringify(todos))
      return todos
    })
  }
}

function getTodosFromLocalStorage () {
  const todos = JSON.parse(localStorage.getItem('todos') || '[]').map(
    untypedTodo =>
      new Todo(untypedTodo.title, untypedTodo.isDone, untypedTodo.id)
  )

  return new TodoList(todos)
}
