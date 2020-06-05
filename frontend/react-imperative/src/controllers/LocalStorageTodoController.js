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
    const newTodosState = this._mapTodosAndSave(todos => todos.add(todo))
    return {
      allTodos: newTodosState,
      createdTodo: todo
    }
  }

  async updateTodo (newValue) {
    return this._mapTodosAndSave(todos => todos.updateTodo(newValue))
  }

  async delete (id) {
    return this._mapTodosAndSave(todos => todos.delete(id))
  }

  // status must be 'all' or 'completed' or 'active'
  async deleteMany (status) {
    return this._mapTodosAndSave(todos => todos.deleteMany(status))
  }

  async setStatusOfAll (complete) {
    return this._mapTodosAndSave(todos => {
      if (complete) {
        return todos.completeAll()
      } else {
        return todos.uncompleteAll()
      }
    })
  }

  _mapTodosAndSave (mapper) {
    const newTodosState = mapper(this.todos)

    this.todos = newTodosState

    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(newTodosState.values)
    )

    return newTodosState
  }
}
