import { formatDistanceToNow } from 'date-fns';
import React from 'react';

class Task extends React.Component {
  constructor(props) {
    super(props);
    const { task } = props;
    this.editFieldRef = React.createRef();
    this.state = {
      editiValue: task.text,
    };
  }

  componentDidUpdate(prevProps) {
    const { task } = this.props;
    const { min, sec } = task.timer;
    const { task: prevTask } = prevProps;
    const { min: prevMin, sec: prevSec } = prevTask.timer;

    if (min !== prevMin || sec !== prevSec) {
      if (min <= 0 && sec <= 0) this.timerPause();
    }
  }

  onChangeEditiValue = (e) => {
    this.setState({
      editiValue: e.target.value,
    });
  };

  breakEditTask = () => {
    const { task, toggleTaskEditMode } = this.props;

    toggleTaskEditMode(task.id, false);
    this.setState({
      editiValue: task.text,
    });
  };

  onKey = (e) => {
    if (e.keyCode === 13) {
      const { task, changeTaskText, toggleTaskEditMode } = this.props;
      const { editiValue } = this.state;

      changeTaskText(task.id, editiValue);
      toggleTaskEditMode(task.id, false);
    }

    if (e.keyCode === 27) {
      this.breakEditTask();
    }
  };

  onClickEdit = async () => {
    const { task, toggleTaskEditMode } = this.props;

    await toggleTaskEditMode(task.id, true);
    this.editFieldRef.current.focus();
  };

  timerPlay = () => {
    const { minusTimer, task, setIntervalId } = this.props;
    const { min, sec, intervalId } = task.timer;

    if (!intervalId && !(min <= 0 && sec <= 0)) {
      const id = setInterval(() => minusTimer(task.id), 1000);
      setIntervalId(task.id, id);
    }
  };

  timerPause = () => {
    const { task, setIntervalId } = this.props;

    clearInterval(task.timer.intervalId);
    setIntervalId(task.id, null);
  };

  render() {
    const { task, toggleTaskCompleted, deleteTask } = this.props;
    const { editiValue } = this.state;
    const timerMin = task.timer.min;
    const timerSec = task.timer.sec < 10 ? `0${task.timer.sec}` : task.timer.sec;
    const createdAgo = formatDistanceToNow(task.date);

    return (
      <>
        <div className="view">
          <input
            name="task"
            className="toggle"
            type="checkbox"
            checked={task.isCompleted}
            onChange={() => toggleTaskCompleted(task.id, !task.isCompleted)}
          />
          <label htmlFor="task">
            <span className="title">{task.text}</span>
            <span className="description">
              <button className="icon icon-play" type="button" aria-label="timer play" onClick={this.timerPlay} />
              <button className="icon icon-pause" type="button" aria-label="timer pause" onClick={this.timerPause} />
              {timerMin} : {timerSec}
            </span>
            <span className="description">
              created
              {` ${createdAgo} `}
              ago
            </span>
          </label>
          <button type="button" className="icon icon-edit" onClick={this.onClickEdit} aria-label="Edit" />
          <button type="button" className="icon icon-destroy" onClick={() => deleteTask(task.id)} aria-label="Delete" />
        </div>
        <input
          type="text"
          className="edit"
          ref={this.editFieldRef}
          value={editiValue}
          onChange={this.onChangeEditiValue}
          onBlur={this.breakEditTask}
          onKeyDown={this.onKey}
        />
      </>
    );
  }
}

export default Task;
