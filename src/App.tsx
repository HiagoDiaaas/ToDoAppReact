import React, { useState } from 'react';
import './index.css';
import Header from './components/Header/Header';
import List from './components/List/List';
import Footer from './components/Footer/Footer';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Add a new task
  const addTask = (text: string) => {
    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  // Delete a task
  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Toggle task completion
  const toggleTask = (id: number) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Toggle all tasks
  const toggleAllTasks = (completed: boolean) => {
    setTasks(tasks.map(task => ({ ...task, completed })));
  };

  // Delete all completed tasks
  const deleteCompletedTasks = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  return (
    <div className="todo-container">
      <div className="todo-wrap">
        <Header addTask={addTask} />
        {tasks.length > 0 ? (
          <>
            <List
              tasks={tasks}
              deleteTask={deleteTask}
              toggleTask={toggleTask}
            />
            <Footer
              tasks={tasks}
              toggleAllTasks={toggleAllTasks}
              deleteCompletedTasks={deleteCompletedTasks}
            />
          </>
        ) : (
          <div className="todo-empty">No tasks. Please add some tasks.</div>
        )}
      </div>
    </div>
  );
};

export default App;
