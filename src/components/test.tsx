import React, { useState } from 'react';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<{ id: number; title: string; tasks: string[]; expanded: boolean }[]>([]);
  const [title, setTitle] = useState('');

  // Добавление нового todo
  const handleAddTodo = () => {
    if (title.trim() === '') return;
    setTodos([
      ...todos,
      { id: Date.now(), title, tasks: [], expanded: false },
    ]);
    setTitle('');
  };

  // Обновление состояния раскрытия
  const toggleExpand = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, expanded: !todo.expanded } : todo
      )
    );
  };

  // Добавление новой задачи в todo
  const addTask = (id: number, task: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, tasks: [...todo.tasks, task] }
          : todo
      )
    );
  };

  return (
    <div className="w-full h-full p-4">
      <div className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Введите заголовок"
          className="border p-2 rounded mr-2"
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Добавить
        </button>
      </div>
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="w-full border rounded-lg mb-4 p-4"
        >
          <div
            onClick={() => toggleExpand(todo.id)}
            className="flex justify-between items-center cursor-pointer"
          >
            <p className="text-black font-bold">{todo.title}</p>
            <span className="text-gray-500">
              {todo.expanded ? '▲' : '▼'}
            </span>
          </div>
          {todo.expanded && (
            <div className="mt-4">
              <TaskList
                tasks={todo.tasks}
                onAddTask={(task) => addTask(todo.id, task)}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const TaskList: React.FC<{
  tasks: string[];
  onAddTask: (task: string) => void;
}> = ({ tasks, onAddTask }) => {
  const [task, setTask] = useState('');

  const handleAddTask = () => {
    if (task.trim() === '') return;
    onAddTask(task);
    setTask('');
  };

  return (
    <div>
      <ul>
        {tasks.map((t, index) => (
          <li key={index} className="text-gray-700">
            - {t}
          </li>
        ))}
      </ul>
      <div className="flex mt-2">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Введите задачу"
          className="border p-2 rounded mr-2 flex-1"
        />
        <button
          onClick={handleAddTask}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Добавить задачу
        </button>
      </div>
    </div>
  );
};

export default TodoList;
