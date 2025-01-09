import React, { useState } from 'react';
import './App.css';

function App() {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);

    const addTask = (e) => {
        e.preventDefault();
        if (task.trim()) {
            setTasks([...tasks, task]);
            setTask('');
        }
    };

    const completeTask = (index) => {
        const newTasks = [...tasks];
        const completedTask = newTasks.splice(index, 1);
        setTasks(newTasks);
        setCompletedTasks([...completedTasks, ...completedTask]);
    };

    const removeTask = (index) => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    };

    return (
        <div className="App">
            <h1>A Simple ToDo List App</h1>
            <form onSubmit={addTask}>
                <input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Add new task"
                />
                <button type="submit">Add Task</button>
            </form>

            <h2>Added Task</h2>
            <ul>
                {tasks.map((t, index) => (
                    <li key={index}>
                        <input
                            type="checkbox"
                            onChange={() => completeTask(index)}
                        />{' '}
                        {t}{' '}
                        <button onClick={() => removeTask(index)}>Remove</button>
                    </li>
                ))}
            </ul>

            <h2>Completed Task</h2>
            <ul>
                {completedTasks.map((t, index) => (
                    <li key={index}>
                        <strike>{t}</strike>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
