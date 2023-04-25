import Footer from "../Footer/Footer";
import NewTaskForm from "../NewTaskForm/NewTaskForm";
import TaskList from "../TaskList/TaskList";
import "./TodoApp.css";

function TodoApp() {
  const tasks = [
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
  ];

  return (
    <section className='todoapp'>
      <header className='header'>
        <h1>todos</h1>
        <NewTaskForm />
      </header>
      <section className='main'>
        <TaskList tasks={tasks} />
        <Footer />
      </section>
    </section>
  );
}

export default TodoApp;
