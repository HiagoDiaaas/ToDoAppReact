// src/components/List.tsx

import React from 'react';
import Item from '../Item/Item';

import { Task } from '../../App';

interface ListProps {
  tasks: Task[];
  deleteTask: (id: number) => void;
  toggleTask: (id: number) => void;
}

const List: React.FC<ListProps> = ({ tasks, deleteTask, toggleTask }) => {
  return (
    <ul className="todo-main">
      {tasks.map(task => (
        <Item
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
        />
      ))}
    </ul>
  );
};

export default List;
