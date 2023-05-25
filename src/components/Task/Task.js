import { formatDistanceToNow } from 'date-fns';
import { useEffect, useRef, useState } from 'react';

function Task(props) {
  const { task, toggleTaskCompleted, toggleTaskEditMode, changeTaskText, deleteTask, minusTimer, setIntervalId } =
    props;

  const {
    id,
    text,
    timer: { min, sec, intervalId },
    date,
    isCompleted,
  } = task;

  const [editiValue, setEditiValue] = useState();
  const editFieldRef = useRef();

  const timerPause = () => {
    clearInterval(intervalId);
    setIntervalId(id, null);
  };

  const timerPlay = () => {
    if (!intervalId && !(min <= 0 && sec <= 0)) {
      const newIntervalId = setInterval(() => minusTimer(id), 1000);
      setIntervalId(id, newIntervalId);
    }
  };

  useEffect(() => {
    if (min <= 0 && sec <= 0) timerPause();
  }, [min, sec]);

  const breakEditTask = () => {
    toggleTaskEditMode(id, false);
    setEditiValue(text);
  };

  const onKey = (e) => {
    if (e.keyCode === 13) {
      changeTaskText(id, editiValue);
      toggleTaskEditMode(id, false);
    }

    if (e.keyCode === 27) {
      breakEditTask();
    }
  };

  const onClickEdit = async () => {
    await toggleTaskEditMode(id, true);
    editFieldRef.current.focus();
  };

  const timerSec = sec < 10 ? `0${sec}` : sec;
  const createdAgo = formatDistanceToNow(date);

  return (
    <>
      <div className="view">
        <input
          name="task"
          className="toggle"
          type="checkbox"
          checked={isCompleted}
          onChange={() => toggleTaskCompleted(id, !isCompleted)}
        />
        <label htmlFor="task">
          <span className="title">{text}</span>
          <span className="description">
            <button className="icon icon-play" type="button" aria-label="timer play" onClick={timerPlay} />
            <button className="icon icon-pause" type="button" aria-label="timer pause" onClick={timerPause} />
            {min} : {timerSec}
          </span>
          <span className="description">
            created
            {` ${createdAgo} `}
            ago
          </span>
        </label>
        <button type="button" className="icon icon-edit" onClick={onClickEdit} aria-label="Edit" />
        <button type="button" className="icon icon-destroy" onClick={() => deleteTask(id)} aria-label="Delete" />
      </div>
      <input
        type="text"
        className="edit"
        ref={editFieldRef}
        value={editiValue}
        onChange={(e) => setEditiValue(e.target.value)}
        onBlur={breakEditTask}
        onKeyDown={onKey}
      />
    </>
  );
}

export default Task;
