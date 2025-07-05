import React, { useState } from 'react';
import './App.css';

const priorityOrder = { High: 3, Medium: 2, Low: 1 };

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const addTask = () => {
    const trimmed = title.trim();
    if (!trimmed) return;
    const newTask = {
      id: Date.now(),
      title: trimmed,
      priority,
      completed: false,
    };
    const updatedTasks = [...tasks, newTask].sort(
      (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
    );
    setTasks(updatedTasks);
    setTitle('');
    setPriority('Medium');
  };

  const toggleComplete = (id) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updated);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks
    .filter((task) =>
      filterPriority === 'All' ? true : task.priority === filterPriority
    )
    .filter((task) =>
      filterStatus === 'All'
        ? true
        : filterStatus === 'Completed'
        ? task.completed
        : !task.completed
    );

  return (
    <div className="App">
      <h2>Advanced Task Manager</h2>

      {/* Add Task */}
      <div className="input-section">
        <input
          type="text"
          value={title}
          placeholder="Enter task title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <button onClick={addTask}>Add Task</button>
      </div>

      {/* Filters */}
      <div className="filters">
        <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
          <option value="All">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="All">All Tasks</option>
          <option value="Completed">Completed</option>
          <option value="Incomplete">Incomplete</option>
        </select>
      </div>

      {/* Task List */}
      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className={`task ${task.completed ? 'completed' : ''} ${task.priority === 'High' ? 'high-priority' : ''}`}
          >
            <span onClick={() => toggleComplete(task.id)}>
              {task.title} ({task.priority})
            </span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
