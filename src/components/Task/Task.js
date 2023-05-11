import { formatDistanceToNow } from 'date-fns';
import React from 'react';

class Task extends React.Component {
  constructor(props) {
    super(props);
    const { task } = props;
    this.editFieldRef = React.createRef();
    this.state = {
      editiValue: task.text,
      intervalId: null,
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

  componentWillUnmount() {
    this.timerPause();
  }

  onChangeEditiValue = (e) => {
    this.setState({
      editiValue: e.target.value,
    });
  };

  onBlurEditField = () => {
    const { task, toggleTaskEditMode, changeTaskText } = this.props;
    const { editiValue } = this.state;

    toggleTaskEditMode(task.id);
    changeTaskText(task.id, editiValue);
  };

  onClickEdit = async () => {
    const { task, toggleTaskEditMode } = this.props;

    await toggleTaskEditMode(task.id);
    this.editFieldRef.current.focus();
  };

  timerPlay = () => {
    const { intervalId } = this.state;
    const { minusTimer, task } = this.props;
    const { min, sec } = task.timer;

    if (!intervalId && !(min <= 0 && sec <= 0)) {
      const id = setInterval(() => minusTimer(task.id), 1000);

      this.setState({
        intervalId: id,
      });
    }
  };

  timerPause = () => {
    const { intervalId } = this.state;

    clearInterval(intervalId);
    this.setState({
      intervalId: null,
    });
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
            onChange={() => toggleTaskCompleted(task.id)}
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
          onBlur={this.onBlurEditField}
        />
      </>
    );
  }
}

export default Task;
