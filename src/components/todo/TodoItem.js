import React from 'react'
import {partial} from '../../lib/utils'

export const TodoItem = (props) => {
  const handleToggle = partial(props.handleToggle, props.id)
  const handleRemove = partial(props.handleRemove, props.id)

  return (
    <li>
      <input type="checkbox" onChange={handleToggle} checked={props.isComplete} />
      {props.name}
      <span className="delete-item"><a href="#" onClick={handleRemove}> delete </a></span>
  </li>
  )
}