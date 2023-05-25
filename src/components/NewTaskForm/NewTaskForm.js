import { useState } from 'react';
import './NewTaskForm.css';

function NewTaskForm({ addTask }) {
  const [valueTodo, setValueTodo] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    const timer = +min * 60 + +sec;
    addTask(valueTodo, timer);
    setValueTodo('');
    setMin('');
    setSec('');
  };

  return (
    <form onSubmit={onSubmit} className="new-todo-form">
      <input
        className="new-todo"
        placeholder="Task"
        required
        value={valueTodo}
        onChange={(e) => setValueTodo(e.target.value)}
      />
      <input
        className="new-todo-form__timer"
        type="number"
        required
        min={0}
        max={59}
        placeholder="Min"
        value={min}
        onChange={(e) => setMin(e.target.value)}
      />
      <input
        className="new-todo-form__timer"
        type="number"
        required
        min={0}
        max={59}
        placeholder="Sec"
        value={sec}
        onChange={(e) => setSec(e.target.value)}
      />
      <button type="submit" hidden>
        Add new task
      </button>
    </form>
  );
}

export default NewTaskForm;
