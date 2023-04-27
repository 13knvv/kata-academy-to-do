import { formatDistanceToNow } from "date-fns";
import React from "react";

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.editFieldRef = React.createRef();
    this.state = {
      editiValue: this.props.task.text,
    };
  }

  onChangeEditiValue = (e) => {
    this.setState({
      editiValue: e.target.value,
    });
  };

  onBlurEditField = (e) => {
    this.props.toggleTaskEditMode(this.props.task.id);
    this.props.changeTaskText(this.props.task.id, this.state.editiValue);
  };

  onClickEdit = async (e) => {
    await this.props.toggleTaskEditMode(this.props.task.id);
    this.editFieldRef.current.focus();
  };

  render() {
    const { task, toggleTaskCompleted, deleteTask } = this.props;

    return (
      <>
        <div className='view'>
          <input
            className='toggle'
            type='checkbox'
            checked={task.isCompleted}
            onChange={() => toggleTaskCompleted(task.id)}
          />
          <label onClick={() => toggleTaskCompleted(task.id)}>
            <span className='description'>{task.text}</span>
            <span className='created'>
              created {formatDistanceToNow(task.date)} ago
            </span>
          </label>
          <button
            className='icon icon-edit'
            onClick={this.onClickEdit}
          ></button>
          <button
            className='icon icon-destroy'
            onClick={() => deleteTask(task.id)}
          ></button>
        </div>
        <input
          type='text'
          className='edit'
          ref={this.editFieldRef}
          value={this.state.editiValue}
          onChange={this.onChangeEditiValue}
          onBlur={this.onBlurEditField}
        ></input>
      </>
    );
  }
}

export default Task;
