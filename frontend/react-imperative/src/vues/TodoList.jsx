import React from 'react'
import { NavLink } from 'react-router-dom'

import TodoList from '../models/todo-list'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import getTodoController from '../controllers/getTodoController'

export default class TodoListComponent extends React.Component {
  constructor (props) {
    super(props)

    this.todoController = getTodoController()
    this.state = this.getInitialState(props)
  }

  componentDidMount () {
    this.todoController.fetch().then(todos => this.updateTodos(todos))
  }

  componentDidUpdate (prevProps) {
    if (this.props.match.params.filter !== prevProps.match.params.filter) {
      this.setState({ ...this.state, filter: this.props.match.params.filter })
    }
  }

  getInitialState (props) {
    return {
      todos: this.todoController.getTodos(),
      filter: props.match.params.filter
    }
  }

  getTodosToDisplay () {
    return this.state.todos.withStatus(this.state.filter)
  }

  async createTodo (title) {
    const { allTodos } = await this.todoController.add(title)
    this.updateTodos(allTodos)
  }

  async updateTodoTitle (todo, newTitle) {
    const newValue = todo.updateTitle(newTitle)
    const todos = await this.todoController.updateTodo(newValue)
    this.updateTodos(todos)
  }

  async switchTodoCompletedStatus (todo) {
    const newValue =
      todo.completed === true ? todo.uncomplete() : todo.complete()
    const todos = await this.todoController.updateTodo(newValue)
    this.updateTodos(todos)
  }

  async deleteTodo (id) {
    const todos = await this.todoController.delete(id)
    this.updateTodos(todos)
  }

  updateTodos (newTodos) {
    this.setState({ ...this.state, todos: newTodos })
  }

  async clearCompletedTodos () {
    const newTodos = await this.todoController.deleteMany('completed')
    this.updateTodos(newTodos)
  }

  async switchStatusOfAllTodos () {
    const todos = await this.todoController.switchStatusOfAllTodos()
    this.updateTodos(todos)
  }

  render () {
    const todosToDisplay = this.getTodosToDisplay()

    const left = TodoList.countTodosLeft(todosToDisplay)
    const isAnyDone = left < todosToDisplay.length
    const areAllDone = left === todosToDisplay.length

    return (
      <React.Fragment>
        <header className='header'>
          <h1>todos</h1>
          <TodoInput onAddTodo={title => this.createTodo(title)} />
        </header>

        <section className='main'>
          <input
            id='toggle-all'
            type='checkbox'
            className='toggle-all'
            checked={areAllDone}
            onChange={() => this.switchStatusOfAllTodos()}
          />
          <label htmlFor='toggle-all' />
          <ul className='todo-list'>
            {todosToDisplay.map(todo => {
              return (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onChange={newTitle => this.updateTodoTitle(todo, newTitle)}
                  onDelete={() => this.deleteTodo(todo.id)}
                  onDone={() => this.switchTodoCompletedStatus(todo)}
                />
              )
            })}
          </ul>
        </section>

        <footer className='footer'>
          <span className='todo-count'>
            <strong>{left}</strong> items left
          </span>
          <ul className='filters'>
            <li>
              <NavLink exact={true} to='/' activeClassName='selected'>
                All
              </NavLink>
            </li>
            <li>
              <NavLink to='/active' activeClassName='selected'>
                Active
              </NavLink>
            </li>
            <li>
              <NavLink to='/completed' activeClassName='selected'>
                Completed
              </NavLink>
            </li>
          </ul>
          {isAnyDone && (
            <button
              className='clear-completed'
              onClick={() => this.clearCompletedTodos()}
            >
              Clear completed
            </button>
          )}
        </footer>
      </React.Fragment>
    )
  }
}
