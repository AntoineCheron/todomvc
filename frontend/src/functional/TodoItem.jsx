import React, { useCallback, useEffect, useState } from 'react'

import { onEnter as onEnterUtils } from '../commons/utils'
import WhenClickOutside from './WhenClickOutside'

// props: { todo, onDone, onDelete, onChange }
export default function TodoItem (props) {
  const [todo, setTodo] = useState(props.todo)
  const [isEditing, setEditing] = useState(false)

  useEffect(() => {
    setTodo(props.todo)
  }, [props.todo])

  const onEnter = useCallback(
    event =>
      onEnterUtils(event, () => {
        if (todo.title !== '') {
          setEditing(false)
        }
      }),
    [todo, setEditing]
  )

  return (
    <li
      onDoubleClick={() => setEditing(false)}
      className={`${isEditing ? 'editing' : ''} ${
        todo.completed ? 'completed' : ''
      }`}
    >
      <div className='view'>
        <input
          type='checkbox'
          className='toggle'
          checked={todo.completed}
          onChange={event => props.onDone(event)}
          autoFocus={true}
        />
        <label>{todo.title}</label>
        <button className='destroy' onClick={event => props.onDelete(event)} />
      </div>
      {isEditing && (
        <WhenClickOutside callback={() => setEditing(false)}>
          <input
            className='edit'
            value={todo.title}
            onChange={event => props.onChange(event.target.value)}
            onKeyPress={onEnter}
          />
        </WhenClickOutside>
      )}
    </li>
  )
}
