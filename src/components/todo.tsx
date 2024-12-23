import { useState, useEffect } from "react";
import { TodoInput } from "./todoComponents/testInput";
import { TodoList } from "./todoComponents/testItem";
import { useTranslation } from "react-i18next";
import FilterButton from "./ui/filterButtons";

interface Todo {
    id: number;
    text: string;
    completed: boolean;
  }
  
  interface TodoList {
    id: number;
    title: string;
    todos: Todo[];
    newTodo: string;
    collapsed: boolean;
    filter: "all" | "active" | "completed";
  }
  
  export default function TodoLists() {
    const [lists, setLists] = useState<TodoList[]>(() => {
      const savedLists = localStorage.getItem('todoLists');
      return savedLists ? JSON.parse(savedLists) : [];
    });
    const [newListTitle, setNewListTitle] = useState<string>("");
    const { t } = useTranslation();
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
    
    useEffect(() => {
      localStorage.setItem('todoLists', JSON.stringify(lists));
    }, [lists]);
    
    const addList = () => {
      if (newListTitle.trim()) {
        setLists([
          ...lists,
          {
            id: Date.now(),
            title: newListTitle.trim(),
            todos: [],
            newTodo: "",
            collapsed: false,
            filter: "all",
          },
        ]);
        setNewListTitle("");
      }
    };
  
    const updateList = (listId: number, updatedList: Partial<TodoList>) => {
      setLists((prevLists) =>
        prevLists.map((list) =>
          list.id === listId ? { ...list, ...updatedList } : list
        )
      );
    };

    const clearCompleted = () => {
      setLists((prevLists) => {
        // Сначала фильтруем задачи в каждом списке
        const updatedLists = prevLists.map((list) => ({
          ...list,
          todos: list.todos.filter((todo) => !todo.completed),
        }));
        
        // Удаляем только те списки, где были задачи и все они были выполнены
        return updatedLists.filter((list) => {
          const originalList = prevLists.find(l => l.id === list.id);
          if (!originalList) return true;
          return !(originalList.todos.length > 0 && originalList.todos.every(todo => todo.completed));
        });
      });
    };
    
    const filteredTodos = lists.reduce((count, list) => {
      const filteredTodosInList = list.todos.filter((todo) => {
        if (filter === "active") return !todo.completed;
        if (filter === "completed") return todo.completed;
        return true;
      });
      return count + filteredTodosInList.length;
    }, 0);

    return (
      <div className="bg-white shadow-lg">
        <div className="flex items-center border">
          <input
            type="text"
            value={newListTitle}
            onChange={(e) => setNewListTitle(e.target.value)}
            placeholder={t("addnewTask")}
            className="flex-grow px-3 w-full py-2 text-sm text-black focus:outline-none"
          />
          <button
            onClick={addList}
            className="ml-2  text-gray-300 px-4 py-2"
          >
            {t("add")}
          </button>
        </div>
  
        {lists.map((list) => (
          <div key={list.id}>
            <TodoInput
              newTodo={list.newTodo}
              setNewTodo={(value) =>
                updateList(list.id, { newTodo: value })
              }
              addTodo={() => {
                if (list.newTodo.trim()) {
                  updateList(list.id, {
                    todos: [
                      ...list.todos,
                      {
                        id: Date.now(),
                        text: list.newTodo.trim(),
                        completed: false,
                      },
                    ],
                    newTodo: "",
                  });
                }
              }}
              collapsed={list.collapsed}
              toggleCollapse={() =>
                updateList(list.id, { collapsed: !list.collapsed })
              }
              title={list.title}
            />
  
            <TodoList
              todos={list.todos}
              filter={filter}
              toggleTodo={(todoId) => {
                updateList(list.id, {
                  todos: list.todos.map((todo) =>
                    todo.id === todoId
                      ? { ...todo, completed: !todo.completed }
                      : todo
                  ),
                });
              }}
              collapsed={list.collapsed}
              />
          </div>
        ))}
        <div className="flex items-center border justify-between p-2 rounded-b ">
          <div className="text-sm text-gray-600">
              {filteredTodos} { t("items")}
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
    );
  }