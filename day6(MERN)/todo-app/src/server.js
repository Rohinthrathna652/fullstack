// Backend: server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const mongoURI = 'mongodb://127.0.0.1:27017/todo_app'; // Local MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Define the schema and model
const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  priority: { type: String, default: 'Medium' }, // High, Medium, Low
  category: { type: String, default: 'General' },
});

const Todo = mongoose.model('Todo', todoSchema);

// Routes
app.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post('/todos', async (req, res) => {
  const { text, priority, category } = req.body;
  const newTodo = new Todo({ text, priority, category });
  await newTodo.save();
  res.status(201).json(newTodo);
});

app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const updatedTodo = await Todo.findByIdAndUpdate(id, { completed }, { new: true });
  if (!updatedTodo) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  res.json({ message: 'Todo updated successfully', updatedTodo });
});

app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const deletedTodo = await Todo.findByIdAndDelete(id);
  if (!deletedTodo) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  res.json({ message: 'Todo deleted successfully' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
