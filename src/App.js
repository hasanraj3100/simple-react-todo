import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);

  function addTask(task) {
    setTasks((t) => [...t, task]);
  }

  function deleteTask(id) {
    setTasks((t) => t.filter((task) => task.id !== id));
  }

  function markComplete(id) {
    setTasks((t) =>
      t.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  return (
    <TodoApp>
      <Form addTask={addTask} />
      <TaskList>
        {tasks.map((task) => (
          <Task task={task} mark={markComplete} del={deleteTask} />
        ))}
      </TaskList>
      <Stats tasks={tasks} />
    </TodoApp>
  );
}

function TodoApp({ children }) {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4">
        {children}
      </div>
    </div>
  );
}

function TaskList({ children }) {
  return <div>{children}</div>;
}

function Task({ task, mark, del }) {
  return (
    <div className="flex mb-4 items-center justify-between">
      <p className="w-1/3 text-grey-darkest">{task.name}</p>
      <span className={`text-sm ${task.completed ? 'text-green-400' : 'text-red-400'} w-1/4 font-medium`}>
        {task.completed ? "Completed" : "Pending"}
      </span>
      <button
        className="flex-no-shrink p-2 ml-4 border-2 rounded text-green-500 border-green-500 hover:text-white hover:bg-green-500"
        onClick={() => mark(task.id)}
      >
        {task.completed ? "Undo Complete" : "Complete"}
      </button>
      <button
        className="flex-no-shrink p-2 ml-2 border-2 rounded text-red-500 border-red-500 hover:text-white hover:bg-red-500"
        onClick={() => del(task.id)}
      >
        Delete
      </button>
    </div>
  );
}

function Form({ addTask }) {
  const [taskName, setTaskName] = useState("");

  function addNewTask() {
    if (taskName.trim().length < 1) return;
    const newTask = {
      id: Date.now(),
      name: taskName,
      completed: false,
    };

    addTask(newTask);
    setTaskName("");
  }
  return (
    <div className="mb-4">
      <h1 className="text-2xl text-emerald-600 text-center">Task Manager</h1>
      <div className="flex mt-4">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
          placeholder="Add a new task"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <button
          className="flex-no-shrink p-2 border-2 text-white rounded text-teal border-teal bg-cyan-700 hover:text-orange-400 hover:bg-teal"
          onClick={() => addNewTask()}
        >
          Add Task
        </button>
      </div>
    </div>
  );
}

function Stats({ tasks }) {
  const len = tasks ? tasks.length : 0;
  const done_count = tasks.reduce((count, task) => {
    return task.completed ? count + 1 : count;
  }, 0);
  return (
    <div class="mt-6 p-4 bg-gray-100 rounded-lg shadow-sm">
      <h2 class="text-lg font-semibold text-gray-700">Task Status:</h2>
      <p>
        {len - done_count > 0
          ? "There are tasks to complete."
          : "Hurrah! You don't have any task today"}
      </p>
      <p>
        <strong>Total Tasks:</strong> {len}
      </p>
      <p>
        <strong>Completed Tasks:</strong> {done_count}
      </p>
      <p>
        <strong>Incomplete Tasks:</strong> {len - done_count}
      </p>
    </div>
  );
}

export default App;
