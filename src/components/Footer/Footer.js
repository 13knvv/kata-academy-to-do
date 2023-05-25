import './Footer.css';

function Footer({ setFilter, filter, deleteTasksCompleted, tasks }) {
  const countTasksLeft = tasks.filter((task) => !task.isCompleted).length;

  return (
    <footer className="footer">
      <span className="todo-count">
        {countTasksLeft}
        items left
      </span>
      <ul className="filters">
        <li>
          <button type="button" className={filter === 'All' ? 'selected' : ''} onClick={() => setFilter('All')}>
            All
          </button>
        </li>
        <li>
          <button type="button" className={filter === 'Active' ? 'selected' : ''} onClick={() => setFilter('Active')}>
            Active
          </button>
        </li>
        <li>
          <button
            type="button"
            className={filter === 'Completed' ? 'selected' : ''}
            onClick={() => setFilter('Completed')}
          >
            Completed
          </button>
        </li>
      </ul>
      <button type="button" className="clear-completed" onClick={deleteTasksCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

export default Footer;
