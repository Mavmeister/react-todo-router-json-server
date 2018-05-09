import React from 'react'

export const TodoForm = (props) => (
  // must include props as parameter
  <form onSubmit={props.handleSubmit}>
    <input type="text" 
      onChange={props.handleInputChange} 
      value={props.currentTodo} />
  </form>
)

// TodoForm.propTypes = {
//   currentTodo: React.PropTypes.string
// }