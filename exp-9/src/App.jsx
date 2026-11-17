import React, { useState } from 'react';
import './App.css'; // <-- Import the CSS file here

export default function App() {
  
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Learn React basics', completed: true },
    { id: 2, text: 'Build a simple To-Do app', completed: false },
    { id: 3, text: 'Practice CSS styling', completed: false }
  ]);

  const [inputValue, setInputValue] = useState('');

  const handleAddTask = (event) => {
    event.preventDefault();

    const trimmedText = inputValue.trim();

    if (trimmedText === '') {
      return;
    }

    const newTask = {
      id: Date.now(), // Uses the current timestamp as a quick, unique ID
      text: trimmedText,
      completed: false
    };

    
    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  const handleToggleTask = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    const remainingTasks = tasks.filter((task) => task.id !== taskId);

    setTasks(remainingTasks);
  };

  return (
    
    <div className="page-wrapper">

      <div className="todo-card">
        <h1 className="app-title">My To-Do List</h1>

        <form className="input-form" onSubmit={handleAddTask}>
          <input
            type="text"
            className="task-input"
            placeholder="Add a new task..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className="add-button">
            Add
          </button>
        </form>

        {tasks.length === 0 ? (
          <p className="empty-message">No tasks yet! Add one above to get started.</p>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task.id} className="task-item">
                <div
                  className="task-content"
                  onClick={() => handleToggleTask(task.id)}
                >
                  <input
                    type="checkbox"
                    className="task-checkbox"
                    checked={task.completed}
                    onChange={() => { }} // Handled by parent div onClick
                  />
                  <span className={`task-text ${task.completed ? 'completed' : ''}`}>
                    {task.text}
                  </span>
                </div>

                {/* Button to remove this specific task */}
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
