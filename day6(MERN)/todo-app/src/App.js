import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [category, setCategory] = useState('General');

  useEffect(() => {
    axios.get('http://localhost:5000/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error(error));
  }, []);

  const addTodo = () => {
    if (!newTodo.trim()) {
      alert('Todo cannot be empty');
      return;
    }
    axios.post('http://localhost:5000/todos', { text: newTodo, priority, category })
      .then(response => {
        setTodos([...todos, response.data]);
        setNewTodo('');
        setPriority('Medium');
        setCategory('General');
      })
      .catch(error => console.error(error));
  };

  const toggleTodo = (id, completed) => {
    axios.put(`http://localhost:5000/todos/${id}`, { completed: !completed })
      .then(response => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !completed } : todo));
      })
      .catch(error => console.error(error));
  };

  const deleteTodo = (id) => {
    axios.delete(`http://localhost:5000/todos/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id));
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Todo App</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new todo"
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              onClick={() => toggleTodo(todo._id, todo.completed)}
            >
              {todo.text} - {todo.priority} - {todo.category}
            </span>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
