import React, { useRef, useState, useEffect } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  filter: "all" | "active" | "completed";
  toggleTodo: (id: number) => void;
  collapsed: boolean;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  filter,
  toggleTodo,
  collapsed,
}) => {
  const listRef = useRef<HTMLUListElement>(null);

  const [maxHeight, setMaxHeight] = useState<number>(0);

  useEffect(() => {
    if (listRef.current) {
      setMaxHeight(listRef.current.scrollHeight);
    }
  }, [todos, filter]);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <ul
      ref={listRef}
      className="transition-all duration-300 ease-in-out overflow-hidden"
      style={{ maxHeight: collapsed ? 0 : maxHeight }}
    >
      {filteredTodos.map((todo) => (
        <li
          key={todo.id}
          className="flex items-center justify-between p-2 border transition-all duration-300"
        >
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="hidden"
            />
            <span
              className={`w-5 h-5 flex items-center justify-center border-2 rounded-full transition-all ${
                todo.completed
                  ? "border-green-500 text-green-500"
                  : "border-gray-300 bg-white"
              }`}
            >
              {todo.completed && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </span>
          </label>
          <span
            onClick={() => toggleTodo(todo.id)}
            className={`flex-grow ml-4 cursor-pointer transition-colors duration-300 whitespace-pre-wrap break-all overflow-wrap-anywhere ${
              todo.completed ? "line-through text-gray-500" : "text-black"
            }`}
          >
            {todo.text}
          </span>
        </li>
      ))}
    </ul>
  );
};
