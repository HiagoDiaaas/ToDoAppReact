import React from 'react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface FooterProps {
  tasks: Task[];
  toggleAllTasks: (completed: boolean) => void;
  deleteCompletedTasks: () => void;
}

const Footer: React.FC<FooterProps> = ({ tasks, toggleAllTasks, deleteCompletedTasks }) => {
  const total = tasks.length;
  const completedCount = tasks.filter(task => task.completed).length;
  const allChecked = completedCount === total && total !== 0;

  const handleToggleAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    toggleAllTasks(e.target.checked);
  };

  return (
    <div className="todo-footer">
      <label>
        <input
          type="checkbox"
          checked={allChecked}
          onChange={handleToggleAll}
        />
      </label>
      <span>
        <span>Finished {completedCount}</span> / total {total}
      </span>
      <button
        className="btn btn-danger"
        onClick={deleteCompletedTasks}
      >
        Delete Finished Tasks
      </button>
    </div>
  );
};

export default Footer;
