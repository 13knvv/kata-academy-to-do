import React from 'react';
import './NewTaskForm.css';

class NewTaskForm extends React.Component {
  constructor() {
    super();
    this.state = {
      valueTodo: '',
      min: '',
      sec: '',
    };
  }

  onChangeValue = (e) => {
    this.setState({
      valueTodo: e.target.value,
    });
  };

  onChangeMin = (e) => {
    this.setState({
      min: e.target.value,
    });
  };

  onChangeSec = (e) => {
    this.setState({
      sec: e.target.value,
    });
  };

  onSubmit = (e) => {
    const { valueTodo, min, sec } = this.state;
    const { addTask } = this.props;
    e.preventDefault();
    addTask(valueTodo, { min: +min, sec: +sec });
    this.setState({
      valueTodo: '',
      min: '',
      sec: '',
    });
  };

  render() {
    const { valueTodo, min, sec } = this.state;

    return (
      <form onSubmit={this.onSubmit} className="new-todo-form">
        <input className="new-todo" placeholder="Task" required value={valueTodo} onChange={this.onChangeValue} />
        <input
          className="new-todo-form__timer"
          type="number"
          required
          min={0}
          placeholder="Min"
          value={min}
          onChange={this.onChangeMin}
        />
        <input
          className="new-todo-form__timer"
          type="number"
          required
          min={0}
          placeholder="Sec"
          value={sec}
          onChange={this.onChangeSec}
        />
        <button type="submit" hidden>
          Add new task
        </button>
      </form>
    );
  }
}

export default NewTaskForm;
