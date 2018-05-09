import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types'

import {TodoForm, TodoList, Footer} from './components/todo'
import {addTodo, generateId, findById, toggleTodo, updateTodo, removeTodo, filterTodos} from './lib/todoHelpers'
import {pipe, partial} from './lib/utils'
import {loadTodos, createTodo, saveTodo, deleteTodo} from './lib/todoService'

class App extends Component {
  state = {
    todos: [],
    currentTodo: ''
  }

  static contextTypes = {
    route: PropTypes.string
  }

  componentDidMount() {
    loadTodos()
      .then(todos => this.setState({todos}))
  }

   handleToggle = (id) => {
    const getToggledTodo = pipe(findById, toggleTodo)
    const updated = getToggledTodo(id, this.state.todos)
    const getUpdatedTodos = partial(updateTodo, this.state.todos)
    const updatedTodos = getUpdatedTodos(updated)
    this.setState({todos: updatedTodos})
    saveTodo(updated)
      .then(() => this.showTempMessage('Todo Updated'))
}

  handleSubmit = (evt) => {
    console.log(evt)
    evt.preventDefault()
    // prevents a GET that would refresh page

    const newId = generateId()
    // each todo needs a new id
    const newTodo = {name: this.state.currentTodo, isComplete: false, id: newId}
    // newTodo consists of value in text field, false complete, newId
    const updatedTodos = addTodo(this.state.todos, newTodo)
    // method to actually return the new todo Array

    this.setState({
      todos: updatedTodos,
      currentTodo: '',
      errorMessage: ''
    })
    // setting state and managing data

    createTodo(newTodo)
    // new method to send newTodo to JSON server and add this todo to the array of todo objects
      .then(() => {console.log(newTodo, "ADDED")}).then(() => this.showTempMessage('Successfully added todo!'))
  }
  
  handleRemove = (id, evt) => {
    evt.preventDefault()
    deleteTodo(id)
      .then(() => this.showTempMessage('Todo DELETED!'))
    const updatedTodos = removeTodo(this.state.todos, id)

    this.setState({
      todos: updatedTodos
    })
  }

  showTempMessage = (msg) => {
    this.setState({message: msg})
    setTimeout(() => this.setState({message: ''}), 1000)
  }

  handleEmptySubmit = (evt) => {
    evt.preventDefault()
    this.setState({
      errorMessage: "Please submit a todo name"
    })
  }

  handleInputChange = (evt) => {
    this.setState({
      currentTodo: evt.target.value
    })
  }
  render() {

    const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit
    const displayTodos = filterTodos(this.state.todos, this.context.route)

    return (
      <div className="Todo-App">
      {this.state.errorMessage && <span className='error'> {this.state.errorMessage} </span> }
      {this.state.message && <span className='success'> {this.state.message} </span> }

        <TodoForm handleInputChange={this.handleInputChange} 
          currentTodo={this.state.currentTodo} 
          handleSubmit={submitHandler}/>
        Input: {this.state.currentTodo}
        <TodoList handleRemove={this.handleRemove} 
          handleToggle={this.handleToggle} 
          todos={displayTodos}/>
        <Footer />
        
      </div>

    );
  }
}

export default App;
