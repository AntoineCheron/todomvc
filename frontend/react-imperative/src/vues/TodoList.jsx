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
    // TODO : fetch data
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

  createTodo (title) {
    this.todoController.add(title).then(todos => this.updateTodos(todos))
  }

  updateTodoTitle (todo, newTitle) {
    const newValue = todo.updateTitle(newTitle)
    this.todoController
      .updateTodo(todo.id, newValue)
      .then(todos => this.updateTodos(todos))
  }

  switchTodoIsDoneStatus (todo) {
    const newValue = todo.isDone === true ? todo.uncomplete() : todo.complete()
    this.todoController
      .updateTodo(todo.id, newValue)
      .then(todos => this.updateTodos(todos))
  }

  deleteTodo (id) {
    this.todoController.delete(id).then(todos => this.updateTodos(todos))
  }

  updateTodos (newTodos) {
    this.setState({ ...this.state, todos: newTodos })
  }

  clearCompletedTodos () {
    const newTodos = this.getTodosToDisplay()
      .filter(todo => todo.isDone)
      .reduce((todoList, todo) => todoList.delete(todo), this.state.todos)

    this.updateTodos(newTodos)
  }

  completeAll () {
    this.updateTodos(this.state.todos.completeAll())
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
            onChange={() => this.completeAll()}
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
                  onDone={() => this.switchTodoIsDoneStatus(todo)}
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
