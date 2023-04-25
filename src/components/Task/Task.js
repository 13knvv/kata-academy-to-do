import { formatDistanceToNow } from "date-fns";

const Task = ({ task }) => {
  return (
    <>
      <div className='view'>
        <input className='toggle' type='checkbox' />
        <label>
          <span className='description'>{task.text}</span>
          <span className='created'>
            created {formatDistanceToNow(task.date)} ago
          </span>
        </label>
        <button className='icon icon-edit'></button>
        <button className='icon icon-destroy'></button>
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
