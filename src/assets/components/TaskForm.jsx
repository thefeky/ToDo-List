import "./taskform.css";
import { useState } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

const TaskForm = ({ setTasks }) => {
  const [taskData, setTaskData] = useState({
    id: "",
    task: "",
    status: "todo",
  });
  const handleTaskChange = (event) => {
    const { name, value } = event.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTasks((prev) => [...prev, { ...taskData, id: uuidv4() }]);
  };

  return (
    <div>
      <header className="app_header">
        <form onSubmit={handleSubmit}>
          <div className="task_form">
            <input
              type="text"
              value={taskData.task}
              placeholder="Enter your task"
              className="task_input"
              name="task"
              id="task"
              onChange={handleTaskChange}
            ></input>
            <div>
              <select
                name="status"
                id="status"
                value={taskData.status}
                className="task_status"
                onChange={handleTaskChange}
              >
                <option value="todo">To do</option>
                <option value="doing">In Progress</option>
                <option value="done">Done</option>
              </select>
              <button className="submit" type="submit">
                + Add Task
              </button>
            </div>
          </div>
        </form>
      </header>
    </div>
  );
};

TaskForm.propTypes = {
  setTasks: PropTypes.func.isRequired,
};

export default TaskForm;
