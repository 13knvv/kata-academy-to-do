import Footer from "../Footer/Footer";
import NewTaskForm from "../NewTaskForm/NewTaskForm";
import TaskList from "../TaskList/TaskList";
import "./TodoApp.css";

function TodoApp() {
  return (
    <section class='todoapp'>
      <header class='header'>
        <h1>todos</h1>
        <NewTaskForm />
      </header>
      <section class='main'>
        <TaskList />
        <Footer />
      </section>
    </section>
  );
}

export default TodoApp;
