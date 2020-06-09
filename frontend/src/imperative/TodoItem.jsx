import React from 'react'

import { onEnter } from '../commons/utils'
import WhenClickOutside from './WhenClickOutside'

export default class TodoItem extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      todo: props.todo,
      isEditing: false
    }
  }

  static getDerivedStateFromProps (props, state) {
    return { ...state, todo: props.todo }
  }

  onEnter (event) {
    onEnter(event, () => {
      if (this.state.todo.title !== '') {
        this.setEditing(false)
      }
    })
  }

  setEditing (isEditing) {
    this.setState({ ...this.state, isEditing })
  }

  handleViewClick (event) {
    this.setEditing(true)
  }

  render () {
    const { todo, isEditing } = this.state

    return (
      <li
        onDoubleClick={event => this.handleViewClick(event)}
        className={`${isEditing ? 'editing' : ''} ${
          todo.completed ? 'completed' : ''
        }`}
      >
        <div className='view'>
          <input
            type='checkbox'
            className='toggle'
            checked={todo.completed}
            onChange={event => this.props.onDone(event)}
            autoFocus={true}
          />
          <label>{todo.title}</label>
          <button
            className='destroy'
            onClick={event => this.props.onDelete(event)}
          />
        </div>
        {isEditing && (
          <WhenClickOutside callback={() => this.setEditing(false)}>
            <input
              className='edit'
              value={todo.title}
              onChange={event => this.props.onChange(event.target.value)}
              onKeyPress={event => this.onEnter(event)}
            />
          </WhenClickOutside>
        )}
      </li>
    )
  }
}
