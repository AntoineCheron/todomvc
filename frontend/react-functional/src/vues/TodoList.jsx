import React, { useMemo, useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'

import TodoList from '../models/todo-list'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import getTodoController from '../controllers/getTodoController'

export default function TodoListComponent () {
  const [todoController] = useState(getTodoController())

  const [todos, setTodos] = useState(todoController.getTodos())
  const { filter } = useParams()

  const todosToDisplay = useMemo(() => todos.withStatus(filter), [
    todos,
    filter
  ])

  const left = TodoList.countTodosLeft(todosToDisplay)
  const isAnyDone = left < todosToDisplay.length
  const areAllDone = left === todosToDisplay.length

  useEffect(() => todoController.fetch().then(setTodos), [])

  const createTodo = useCallback(title =>
    todoController.add(title).then(setTodos)
  )
  const deleteTodo = useCallback(id => todoController.delete(id).then(setTodos))
  const clearCompletedTodos = useCallback(() =>
    todoController.deleteMany('completed').then(setTodos)
  )
  const switchStatusOfAllTodos = useCallback(() =>
    todoController.switchStatusOfAllTodos().then(setTodos)
  )
  const updateTodoTitle = useCallback((todo, newTitle) => {
    const newValue = todo.updateTitle(newTitle)
    todoController.updateTodo(newValue).then(setTodos)
  })
  const switchTodoCompletedStatus = useCallback(todo => {
    const newValue =
      todo.completed === true ? todo.uncomplete() : todo.complete()
    todoController.updateTodo(newValue).then(setTodos)
  })

  return (
    <React.Fragment>
      <header className='header'>
        <h1>todos</h1>
        <TodoInput onAddTodo={createTodo} />
      </header>

      <section className='main'>
        <input
          id='toggle-all'
          type='checkbox'
          className='toggle-all'
          checked={areAllDone}
          onChange={switchStatusOfAllTodos}
        />
        <label htmlFor='toggle-all' />
        <ul className='todo-list'>
          {todosToDisplay.map(todo => {
            return (
              <TodoItem
                key={todo.id}
                todo={todo}
                onChange={newTitle => updateTodoTitle(todo, newTitle)}
                onDelete={() => deleteTodo(todo.id)}
                onDone={() => switchTodoCompletedStatus(todo)}
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
          <button className='clear-completed' onClick={clearCompletedTodos}>
            Clear completed
          </button>
        )}
      </footer>
    </React.Fragment>
  )
}
