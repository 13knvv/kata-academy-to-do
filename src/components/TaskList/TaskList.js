import Task from "../Task/Task";
import "./TaskList.css";

const TaskList = ({ tasks, onChangeCompleted, onDelete }) => {
  const tasksComponents = tasks.map((task) => {
    return (
      <li
        key={task.id}
        className={
          (task.isCompleted ? "completed" : "") +
          " " +
          (task.isEditing ? "editing" : "")
        }
      >
        <Task
          task={task}
          onChangeCompleted={onChangeCompleted}
          onDelete={onDelete}
        />
      </li>
    );
  });
  return <ul className='todo-list'>{tasksComponents}</ul>;
};

export default TaskList;
