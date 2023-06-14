import { formatDistanceToNow } from 'date-fns';
import { useEffect, useRef, useState } from 'react';

function Task(props) {
  const { task, toggleTaskCompleted, toggleTaskEditMode, changeTaskText, deleteTask, minusTimer } = props;

  const { id, text, timer, date, isCompleted } = task;

  const [editiValue, setEditiValue] = useState(text);
  const editFieldRef = useRef();
  const intervalIdRef = useRef();

  useEffect(() => {
    /// в очередь после window.addEventListener('beforeunload', clearLS) in TodoApp.js
    setTimeout(() => {
      // значение сохраненно в LS если unmount
      const intervalIdsLS = JSON.parse(localStorage.getItem('intervalIds'));
      if (intervalIdsLS) {
        intervalIdRef.current = intervalIdsLS[id] || null;
      }
    });

    return () => {
      // сохраняем в LS intervalId на случай unmount.
      if (intervalIdRef.current) {
        const newIntervalIds = {
          ...JSON.parse(localStorage.getItem('intervalIds')),
          [id]: intervalIdRef.current,
        };
        localStorage.setItem('intervalIds', JSON.stringify(newIntervalIds));
      }
    };
  }, []);

  const timerPause = () => {
    clearInterval(intervalIdRef.current);
    intervalIdRef.current = null;

    // удаление intervalId так же и из LS
    const intervalIdsLS = JSON.parse(localStorage.getItem('intervalIds'));
    if (intervalIdsLS) {
      const intervalIdsArr = Object.entries(intervalIdsLS);
      const newIntervalIds = intervalIdsArr.filter((item) => item[0] !== `${id}`);
      const newIntervalIdsObj = Object.fromEntries(newIntervalIds);
      localStorage.setItem('intervalIds', JSON.stringify(newIntervalIdsObj));
    }
  };

  const timerPlay = () => {
    if (!intervalIdRef.current && timer >= 0) {
      const newIntervalId = setInterval(() => minusTimer(id), 1000);
      intervalIdRef.current = newIntervalId;
    }
  };

  useEffect(() => {
    if (timer <= 0) timerPause();
  }, [timer]);

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

  const min = Math.floor(timer / 60);
  const sec = timer % 60 < 10 ? `0${timer % 60}` : timer % 60;

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
            {min} : {sec}
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
