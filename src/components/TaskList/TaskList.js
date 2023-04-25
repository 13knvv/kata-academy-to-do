import Task from "../Task/Task";
import './TaskList.css'

const TaskList = () => {
  return (
    <ul class='todo-list'>
      <li class='completed'>
        <Task />
      </li>
      <li class='editing'>
        <Task />
      </li>
      <li>
        <Task />
      </li>
    </ul>
  );
};

export default TaskList;
