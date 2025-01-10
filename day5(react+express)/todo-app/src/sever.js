const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let todos = [];

// Routes
app.get('/todos', (req, res) => {
  res.json(todos);
});

app.post('/todos', (req, res) => {
  const { text } = req.body;
  const newTodo = { id: Date.now(), text, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  const todoExists = todos.some(todo => todo.id === parseInt(id));
  if (!todoExists) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  todos = todos.map(todo =>
    todo.id === parseInt(id) ? { ...todo, completed } : todo
  );
  res.json({ message: 'Todo updated successfully' });
});

app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter(todo => todo.id !== parseInt(id));
  res.json({ message: 'Todo deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});