import React, { useState } from 'react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface ItemProps {
  task: Task;
  deleteTask: (id: number) => void;
  toggleTask: (id: number) => void;
}

const Item: React.FC<ItemProps> = ({ task, deleteTask, toggleTask }) => {
  const [hover, setHover] = useState(false);

  return (
    <li
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
        />
        <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
          {task.text}
        </span>
      </label>
      <button
        className="btn btn-danger"
        style={{ display: hover ? 'block' : 'none' }}
        onClick={() => deleteTask(task.id)}
      >
        Delete
      </button>
    </li>
  );
};

export default Item;
