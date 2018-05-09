export const addTodo = (list, item) => [...list, item]

export const generateId = () => Math.floor(Math.random()*10000)

export const findById = (id, list) => list.find(item => item.id === id)

export const toggleTodo = (todo) => ({...todo, isComplete: !todo.isComplete})

export const updateTodo = (list, todo) => {
  const updatedIndex = list.findIndex(item => item.id === todo.id)
  return [
    // returns a new array
    ...list.slice(0, updatedIndex),
    // slices from 0 index to updatedIndex..
    todo,
    //inserts todo..
    ...list.slice(updatedIndex + 1)
    // inserts everything after that index back into the new array from list
  ]
}

export const removeTodo = (list, id) => {
  const targetedTodo = findById(id, list)
  const todoIndex = list.findIndex(item => item.id === id)
  console.log(targetedTodo, "DELETED")
  return [
    ...list.slice(0, todoIndex),
    ...list.slice(todoIndex+1)
  ]
}

export const filterTodos = (list, route) => {
  switch(route){
    case '/active':
      return list.filter(item => !item.isComplete)
    case '/complete':
      return list.filter(item => item.isComplete)
    default:
    return list
  }
}