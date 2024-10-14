import React, { useState } from 'react';

interface HeaderProps {
  addTask: (text: string) => void;
}

const Header: React.FC<HeaderProps> = ({ addTask }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTask(text.trim());
      setText('');
    }
  };

  return (
    <div className="todo-header">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter task name"
          value={text}
          onChange={e => setText(e.target.value)}
        />
      </form>
    </div>
  );
};

export default Header;
