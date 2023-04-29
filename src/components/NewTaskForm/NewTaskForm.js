import React from 'react';
import './NewTaskForm.css';

class NewTaskForm extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
    };
  }

  onChangeValue = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addTask(this.state.value);
    this.setState({
      value: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={this.state.value}
          onChange={this.onChangeValue}
        />
      </form>
    );
  }
}

export default NewTaskForm;
