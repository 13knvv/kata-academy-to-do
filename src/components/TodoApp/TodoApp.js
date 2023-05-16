import React from 'react';

import Footer from '../Footer/Footer';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';
import './TodoApp.css';

let nextId = 4;

class TodoApp extends React.Component {
  constructor() {
    super();
    this.state = {
      filter: 'All',
      tasks: [
        {
          id: 1,
          text: 'Completed',
          timer: {
            min: 7,
            sec: 5,
            intervalId: null,
          },
          date: new Date(),
          isCompleted: true,
          editMode: false,
        },
        {
          id: 2,
          text: 'Editing task',
          timer: {
            min: 1,
            sec: 0,
            intervalId: null,
          },
          date: new Date(),
          isCompleted: false,
          editMode: false,
        },
        {
          id: 3,
          text: 'Active task',
          timer: {
            min: 0,
            sec: 5,
            intervalId: null,
          },
          date: new Date(1999),
          isCompleted: false,
          editMode: false,
        },
      ],
    };
  }

  setFilter = (filter) => {
    this.setState({
      filter,
    });
  };

  addTask = (text, timer) => {
    this.setState(({ tasks }) => ({
      tasks: [
        ...tasks,
        {
          id: nextId++,
          text,
          timer,
          date: new Date(),
          isCompleted: false,
          editMode: false,
        },
      ],
    }));
  };

  changeTaskField = (id, field, value) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            [field]: value,
          };
        }
        return { ...task };
      }),
    }));
  };

  minusTimer = (id) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.map((task) => {
        if (task.id === id) {
          const { min, sec, intervalId } = task.timer;

          if (min === 0 && sec === 0) {
            clearInterval(intervalId);
            return { ...task, timer: { ...task.timer, intervalId: null } };
          }

          return {
            ...task,
            timer: {
              ...task.timer,
              min: sec ? min : min - 1,
              sec: sec ? sec - 1 : 59,
            },
          };
        }

        return { ...task };
      }),
    }));
  };

  setIntervalId = (idTask, intervalId) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.map((task) => {
        if (task.id === idTask) {
          return {
            ...task,
            timer: {
              ...task.timer,
              intervalId,
            },
          };
        }
        return { ...task };
      }),
    }));
  };

  changeTaskText = (id, text) => {
    this.changeTaskField(id, 'text', text);
  };

  toggleTaskCompleted = (id, value) => {
    this.changeTaskField(id, 'isCompleted', value);
  };

  toggleTaskEditMode = (id, value) => {
    this.changeTaskField(id, 'editMode', value);
  };

  deleteTask = (id) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.filter((task) => task.id !== id),
    }));
  };

  deleteTasksCompleted = () => {
    this.setState(({ tasks }) => ({
      tasks: tasks.filter((task) => !task.isCompleted),
    }));
  };

  render() {
    const { tasks, filter } = this.state;
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm addTask={this.addTask} />
        </header>
        <section className="main">
          <TaskList
            tasks={tasks}
            toggleTaskCompleted={this.toggleTaskCompleted}
            toggleTaskEditMode={this.toggleTaskEditMode}
            changeTaskText={this.changeTaskText}
            deleteTask={this.deleteTask}
            filter={filter}
            minusTimer={this.minusTimer}
            setIntervalId={this.setIntervalId}
          />
          <Footer
            setFilter={this.setFilter}
            filter={filter}
            deleteTasksCompleted={this.deleteTasksCompleted}
            tasks={tasks}
          />
        </section>
      </section>
    );
  }
}

export default TodoApp;
