import React from 'react'

import { onEnter } from '../commons/utils'

export default class TodoInput extends React.Component {
  constructor (props) {
    super(props)

    this.state = { value: '' }
  }

  updateInputValue (newValue) {
    this.setState({ value: newValue })
  }

  onKeyPress (event) {
    onEnter(event, () => {
      if (this.state.value !== '') {
        this.props.onAddTodo(this.state.value)
        this.setState({ value: '' })
      }
    })
  }

  render () {
    return (
      <input
        className='new-todo'
        placeholder='What needs to be done?'
        onKeyPress={event => this.onKeyPress(event)}
        value={this.state.value}
        onChange={e => this.updateInputValue(e.target.value)}
      />
    )
  }
}
