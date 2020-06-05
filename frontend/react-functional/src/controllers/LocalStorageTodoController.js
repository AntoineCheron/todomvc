import Todo from '../models/todo'
import TodoList from '../models/todo-list'
import { TodoController } from './TodoController'

const LOCAL_STORAGE_KEY = 'react-imperative-todos'

export default class LocalStorageTodoController extends TodoController {
  async fetch () {
    const todos = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) || '[]'
    ).map(
      untypedTodo =>
        new Todo(untypedTodo.title, untypedTodo.completed, untypedTodo.id)
    )

    const todoList = new TodoList(todos)
    this.todos = todoList
    return todoList
  }

  async add (title) {
    const todo = new Todo(title)
    const newTodosState = this._mapAndUpdateTodosState(todos => todos.add(todo))
    return {
      allTodos: newTodosState,
      createdTodo: todo
    }
  }

  async updateTodo (newValue) {
    return this._mapAndUpdateTodosState(todos => todos.updateTodo(newValue))
  }

  async delete (id) {
    return this._mapAndUpdateTodosState(todos => todos.delete(id))
  }

  // status must be 'all' or 'completed' or 'active'
  async deleteMany (status) {
    return this._mapAndUpdateTodosState(todos => todos.deleteMany(status))
  }

  _updateTodosState (newTodosState) {
    this.todos = newTodosState

    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(newTodosState.values)
    )

    return newTodosState
  }
}
