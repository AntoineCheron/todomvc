import React, { useState, useCallback } from 'react'

import { onEnter } from '../commons/utils'

export default function TodoInput ({ onAddTodo }) {
  const [value, setValue] = useState('')

  const onKeyPress = useCallback(
    event => {
      onEnter(event, () => {
        if (value !== '') {
          onAddTodo(value)
          setValue('')
        }
      })
    },
    [onAddTodo, value, setValue]
  )

  return (
    <input
      className='new-todo'
      placeholder='What needs to be done?'
      onKeyPress={onKeyPress}
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  )
}
