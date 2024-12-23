import React from "react";
import { useTranslation } from "react-i18next";

interface TodoInputProps {
  newTodo: string;
  setNewTodo: (value: string) => void;
  addTodo: () => void;
  collapsed: boolean;
  toggleCollapse: () => void;
  title: string;
}

export const TodoInput: React.FC<TodoInputProps> = ({
  newTodo,
  setNewTodo,
  addTodo,
  collapsed,
  toggleCollapse,
  title,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center border">
      <span
        className="px-3 text-gray-300 flex items-center cursor-pointer"
        onClick={toggleCollapse}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={`w-5 h-5 transition-transform ${
            collapsed ? "rotate-180" : ""
          }`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </span>
      <input
        type="text"
        className="flex-grow px-3 w-full py-2 text-sm text-black focus:outline-none overflow-ellipsis"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder={title}
      />
      <button
        onClick={addTodo}
        className="ml-2  text-gray-300 px-4 py-2"
      >
        {t("add")}
      </button>
    </div>
  );
};
