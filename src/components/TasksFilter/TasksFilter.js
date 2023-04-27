import "./TasksFilter.css";

const TasksFilter = ({ setFilter, filter }) => {
  return (
    <ul className='filters'>
      <li>
        <button
          className={filter === "All" ? "selected" : ""}
          onClick={() => setFilter("All")}
        >
          All
        </button>
      </li>
      <li>
        <button
          className={filter === "Active" ? "selected" : ""}
          onClick={() => setFilter("Active")}
        >
          Active
        </button>
      </li>
      <li>
        <button
          className={filter === "Completed" ? "selected" : ""}
          onClick={() => setFilter("Completed")}
        >
          Completed
        </button>
      </li>
    </ul>
  );
};

export default TasksFilter;
