import React from "react";
import Footer from "../Footer/Footer";
import NewTaskForm from "../NewTaskForm/NewTaskForm";
import TaskList from "../TaskList/TaskList";
import "./TodoApp.css";

class TodoApp extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks: [
        {
          id: 1,
          text: "Completed task",
          date: new Date(),
          isCompleted: true,
          isEditing: false,
        },
        {
          id: 2,
          text: "Editing task",
          date: new Date(),
          isCompleted: false,
          isEditing: true,
        },
        {
          id: 3,
          text: "Active task",
          date: new Date(1999),
          isCompleted: false,
          isEditing: false,
        },
      ],
    };
  }

  onChangeCompleted = (id) => {
    this.setState(({ tasks }) => {
      return {
        tasks: tasks.map((task) => {
          if (task.id === id) {
            task.isCompleted = !task.isCompleted;
          }
          return task;
        }),
      };
    });
  };

  onDelete = (id) => {
    this.setState(({ tasks }) => {
      return {
        tasks: tasks.filter((task) => task.id !== id),
      };
    });
  };

  render() {
    return (
      <section className='todoapp'>
        <header className='header'>
          <h1>todos</h1>
          <NewTaskForm />
        </header>
        <section className='main'>
          <TaskList
            tasks={this.state.tasks}
            onChangeCompleted={this.onChangeCompleted}
            onDelete={this.onDelete}
          />
          <Footer />
        </section>
      </section>
    );
  }
}

export default TodoApp;
