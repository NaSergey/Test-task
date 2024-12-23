import { useTranslation } from "react-i18next";

interface TodoInputProps {
  newTodo: string;
  setNewTodo: (value: string) => void;
  addTodo: () => void;
  collapsed: boolean;
  toggleCollapsed: () => void;
}

export default function TodoInput({
  newTodo,
  setNewTodo,
  addTodo,
  collapsed,
  toggleCollapsed,
}: TodoInputProps) {
  const { t } = useTranslation()

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
          className={`w-5 h-5 transition-transform ${
            collapsed ? "rotate-180" : ""
          }`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </span>

      <input
        type="text"
        className="flex-grow px-3 w-full bg-white py-2 text-sm text-black focus:outline-none"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new task"
      />

      <button
        onClick={addTodo}
        className="ml-2 bg-white text-gray-300 px-4 py-2"
      >
        {t("add")}
      </button>
    </div>
  )
}
