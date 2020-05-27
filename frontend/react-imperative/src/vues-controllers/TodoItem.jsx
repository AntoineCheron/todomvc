import React from 'react'

import { onEnter } from '../utils'

// TODO: handle the click outside event (see: https://github.com/tastejs/todomvc/blob/master/examples/react-hooks/src/containers/TodoItem.js)

export default class TodoItem extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      todo: props.todo,
      isEditing: false
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.todo !== prevProps.todo) {
      this.setState({ ...this.state, todo: this.props.todo })
    }
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
    const isDoubleClick = true // TODO
    if (isDoubleClick) {
      this.setEditing(false)
    }
  }

  render () {
    const { todo, isEditing } = this.state

    return (
      <li
        onClick={this.handleViewClick.bind(this)}
        className={`${isEditing ? 'editing' : ''} ${
          todo.isDone ? 'completed' : ''
        }`}
      >
        <div className='view'>
          <input
            type='checkbox'
            className='toggle'
            checked={todo.isDone}
            onChange={this.props.onDone}
            autoFocus={true}
          />
          <label>{todo.title}</label>
          <button className='destroy' onClick={this.props.onDelete} />
        </div>
        {isEditing && (
          <input
            className='edit'
            value={todo.title}
            onChange={event => this.props.onChange(event.target.value)}
            onKeyPress={this.onEnter}
          />
        )}
      </li>
    )
  }
}
