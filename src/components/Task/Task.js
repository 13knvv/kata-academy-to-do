import { formatDistanceToNow } from "date-fns";

const Task = ({ task, onChangeCompleted, onDelete }) => {
  return (
    <>
      <div className='view'>
        <input
          className='toggle'
          type='checkbox'
          checked={task.isCompleted}
          onChange={() => onChangeCompleted(task.id)}
        />
        <label onClick={() => onChangeCompleted(task.id)}>
          <span className='description'>{task.text}</span>
          <span className='created'>
            created {formatDistanceToNow(task.date)} ago
          </span>
        </label>
        <button className='icon icon-edit'></button>
        <button
          className='icon icon-destroy'
          onClick={() => onDelete(task.id)}
        ></button>
      </div>
      <input
        type='text'
        className='edit'
        value={task.text}
        onChange={() => 1}
      ></input>
    </>
  );
};

export default Task;
