import { useState } from "react";
import { useTranslation } from "react-i18next";
import FilterButton from "./ui/filterButtons";
import TodoItem from "./todoComponents/te";
import TodoInput from "./todoComponents/input";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Todo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [collapsed, setCollapsed] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const { t } = useTranslation(); 


  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), text: newTodo.trim(), completed: false },
      ]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  
    const clearCompleted = () => {
        setTodos(todos.filter((todo) => !todo.completed));
    };

    const filteredTodos = todos.filter((todo) => {
        if (filter === "active") return !todo.completed;
        if (filter === "completed") return todo.completed;
        return true; 
      });

  return (
    <div className="bg-white rounded-b shadow-lg">
        <TodoInput
            newTodo={newTodo}
            setNewTodo={setNewTodo}
            addTodo={addTodo}
            collapsed={collapsed}
            toggleCollapsed={() => setCollapsed(!collapsed)}
            />
        <div className={`transition-all duration-300 overflow-hidden ${collapsed ? "max-h-0 opacity-0" : "max-h-[1000px] opacity-100"}`}>
            <ul>
                {todos.map((todo) => {
                    const isVisible =
                    filter === "all" ||
                    (filter === "active" && !todo.completed) ||
                    (filter === "completed" && todo.completed);

                    return (
                        <TodoItem
                        key={todo.id}
                        todo={todo}
                        isVisible={isVisible}
                        toggleTodo={toggleTodo}
                      />
                    );
                })}
            </ul>
        </div>
        <div className="flex items-center border justify-between p-2 rounded-b ">
            <div className="text-sm text-gray-600">
                {filteredTodos.length} { t("items")}
            </div>
            <div className="flex space-x-2 text-sm">
                <FilterButton isActive={filter === "all"} onClick={() => setFilter("all")}>
                    {t("all")}
                </FilterButton>
                <FilterButton isActive={filter === "active"} onClick={() => setFilter("active")}>
                    {t("active")}
                </FilterButton>
                <FilterButton isActive={filter === "completed"} onClick={() => setFilter("completed")}>
                    {t("completed")}
                </FilterButton>
            </div>
            <button
                className="bg-white text-sm text-red-500 hover:underline"
                onClick={clearCompleted}
            >
                {t("clearCompleted")}
            </button>
        </div>
    </div>
  )
}
