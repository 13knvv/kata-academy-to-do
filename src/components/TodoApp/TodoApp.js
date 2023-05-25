import { useEffect, useState } from 'react';

import Footer from '../Footer/Footer';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';
import './TodoApp.css';

let nextId = 4;
const tasksInitial = [
  {
    id: 1,
    text: 'Completed',
    timer: 60,
    date: new Date(2010, 8, 10),
    isCompleted: true,
    editMode: false,
  },
  {
    id: 2,
    text: 'Editing task',
    timer: 125,
    date: new Date(2014, 1, 23),
    isCompleted: false,
    editMode: false,
  },
  {
    id: 3,
    text: 'Active task',
    timer: 11,
    date: new Date(2022, 1, 21),
    isCompleted: false,
    editMode: false,
  },
];

function TodoApp() {
  const [filter, setFilter] = useState('All');
  const [tasks, setTasks] = useState(tasksInitial);

  useEffect(() => {
    // удаление intervalIds из LS  при перезагрузки страницы
    const clearLS = localStorage.removeItem('intervalIds');
    window.addEventListener('beforeunload', clearLS);
    return window.removeEventListener('beforeunload', clearLS);
  }, []);

  const addTask = (text, timer) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: nextId++,
        text,
        timer,
        date: new Date(),
        isCompleted: false,
        editMode: false,
      },
    ]);
  };

  const changeTaskField = (id, field, value) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            [field]: value,
          };
        }
        return { ...task };
      })
    );
  };

  const minusTimer = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          if (task.timer === 0) {
            return { ...task, timer: 0 };
          }

          return {
            ...task,
            timer: task.timer - 1,
          };
        }

        return { ...task };
      })
    );
  };

  const changeTaskText = (id, text) => {
    changeTaskField(id, 'text', text);
  };

  const toggleTaskCompleted = (id, value) => {
    changeTaskField(id, 'isCompleted', value);
  };

  const toggleTaskEditMode = (id, value) => {
    changeTaskField(id, 'editMode', value);
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const deleteTasksCompleted = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.isCompleted));
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm addTask={addTask} />
      </header>
      <section className="main">
        <TaskList
          tasks={tasks}
          toggleTaskCompleted={toggleTaskCompleted}
          toggleTaskEditMode={toggleTaskEditMode}
          changeTaskText={changeTaskText}
          deleteTask={deleteTask}
          filter={filter}
          minusTimer={minusTimer}
        />
        <Footer setFilter={setFilter} filter={filter} deleteTasksCompleted={deleteTasksCompleted} tasks={tasks} />
      </section>
    </section>
  );
}

export default TodoApp;
