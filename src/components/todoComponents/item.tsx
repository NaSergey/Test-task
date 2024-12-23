interface TodoItemProps {
    todo: {
      id: number;
      text: string;
      completed: boolean;
    };
    isVisible: boolean;
    toggleTodo: (id: number) => void;
  }
  
  export default function TodoItem({ todo, isVisible, toggleTodo }: TodoItemProps) {
    return (
      <li
        className={`flex items-center justify-between transition-all duration-300 overflow-hidden ${
          isVisible ? "max-h-20 opacity-100 p-2 border" : "max-h-0 opacity-0 p-0 border-0"
        }`}
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
          className={`flex-grow ml-4 cursor-pointer transition-colors duration-300 ${
            todo.completed ? "line-through text-gray-500" : "text-black"
          }`}
        >
          {todo.text}
        </span>
      </li>
    );
  }
  