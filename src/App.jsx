import React, { Component } from 'react';
import axios from 'axios'
import Todo from './Todos'
import AddTodo from './AddTodo'
import './App.css';

class App extends Component {
  state={
    todos: [
    ],
  }


  componentDidMount() {
    axios.get('http://localhost:3000/todos')
      .then((res) => {
        const todos = res.data
        this.setState({ todos })
        console.log(todos)
      })
  }


  deleteTodo = (id) => {
    const todos = this.state.todos.filter(todo => todo.id !== id)
    this.setState({ todos })
    const url = `${'http://localhost:3000/todos' + '/'}${id}`
    axios.delete(url);
    // axios({ url, method: 'DELETE' }).then(res => res.json().then(json => json))
  }

  addTodo = (todo) => {
    todo.id = Math.random();
    const todos = [...this.state.todos, todo]
    this.setState({ todos })
    const url = 'http://localhost:3000/todos'
    const data = todo
    axios({
      url,
      method: 'POST',
      data,
      config: {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    }).then(response => console.log('succes', data)).catch(error => console.error('error:', error))
  }

  updateTodo = (id) => {
    const todo = this.state.todos.find(todo => todo.id === id)
    todo.content = prompt('Content', todo.content)
    this.setState({ todo })
    const url = `${'http://localhost:3000/todos' + '/'}${id}`
    const data = todo
    axios({
      url,
      method: 'PUT',
      data,
      config: {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
      body: JSON.stringify(data),
    }).then(response => console.log('succes', data)).catch(error => console.error('error:', error))
  }

  render() {
    console.log(this.state.todos)
    return (
      <div className="todo-app container">
        <h1 className="center blue-text">Todo's</h1>
        <Todo todos={this.state.todos} deleteTodo={this.deleteTodo} updateTodo={this.updateTodo} />
        <AddTodo addTodo={this.addTodo} />
      </div>
    );
  }
}

export default App
