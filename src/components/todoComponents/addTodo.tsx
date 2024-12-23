// todoComponents/input.tsx

import React from "react";

interface TodoInputProps {
  newTodo: string;
  setNewTodo: React.Dispatch<React.SetStateAction<string>>;
  addTodo: () => void;
  collapsed: boolean;
  toggleCollapsed: () => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ newTodo, setNewTodo, addTodo, collapsed, toggleCollapsed }) => {
  return (
    <div className="flex items-center border">
      <span
        className="px-3 text-gray-300 flex items-center cursor-pointer"
        onClick={toggleCollapsed}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={`w-5 h-5 transition-transform ${collapsed ? "rotate-180" : ""}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </span>

      <input
        type="text"
        className="flex-grow px-3 w-full bg-white py-2 text-sm text-black focus:outline-none"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new todo"
      />

      <button
        onClick={addTodo}
        className="ml-2 bg-white text-gray-300 px-4 py-2"
      >
        Add
      </button>
    </div>
  );
};

export default TodoInput;
