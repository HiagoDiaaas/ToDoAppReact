import React, { useState, useEffect } from 'react';
import './index.css';
import Header from './components/Header/Header';
import List from './components/List/List';
import Footer from './components/Footer/Footer';

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Fetch initial tasks from the server
  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await fetch('http://localhost:3004/todos');
        const data: Task[] = await res.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }
    fetchTasks();
  }, []);

  // Add a new task
  const addTask = async (text: string) => {
    const newTask: Omit<Task, 'id'> = {
      text,
      completed: false,
    };

    try {
      const res = await fetch('http://localhost:3004/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      });
      const createdTask: Task = await res.json();
      setTasks([...tasks, createdTask]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // Delete a task
  const deleteTask = async (id: number) => {
    try {
      await fetch(`http://localhost:3004/todos/${id}`, {
        method: 'DELETE',
      });
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Toggle task completion
  const toggleTask = async (id: number) => {
    const taskToUpdate = tasks.find(task => task.id === id);
    if (taskToUpdate) {
      const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };
      try {
        await fetch(`http://localhost:3004/todos/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedTask),
        });
        setTasks(
          tasks.map(task =>
            task.id === id ? updatedTask : task
          )
        );
      } catch (error) {
        console.error('Error updating task:', error);
      }
    }
  };

  // Toggle all tasks
  const toggleAllTasks = async (completed: boolean) => {
    try {
      const updatedTasks = await Promise.all(
        tasks.map(async task => {
          const updatedTask = { ...task, completed };
          await fetch(`http://localhost:3004/todos/${task.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTask),
          });
          return updatedTask;
        })
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error toggling all tasks:', error);
    }
  };

  // Delete all completed tasks
  const deleteCompletedTasks = async () => {
    try {
      const completedTasks = tasks.filter(task => task.completed);
      await Promise.all(
        completedTasks.map(async task => {
          await fetch(`http://localhost:3004/todos/${task.id}`, {
            method: 'DELETE',
          });
        })
      );
      setTasks(tasks.filter(task => !task.completed));
    } catch (error) {
      console.error('Error deleting completed tasks:', error);
    }
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
