import TaskCard from "./TaskCard";
import "./taskcolumn.css";
import { Droppable, Draggable } from "react-beautiful-dnd";

const TaskColumn = (props) => {
  const { title, taskIcon, tasks, status, handleDelete, handleStatusChange } =
    props || "";
  console.log(tasks);
  return (
    <Droppable droppableId={status} type="task">
      {(provided) => (
        <section
          className="task_column"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h2 className="task_column_heading">
            <img src={taskIcon} alt="" className="task_column_icon" /> {title}
          </h2>
          {tasks
            .filter((task) => task.status === status)
            .map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskCard
                      key={task.id}
                      task={task}
                      status={status}
                      handleDelete={handleDelete}
                      handleStatusChange={handleStatusChange}
                      index={index}
                    />
                  </div>
                )}
              </Draggable>
            ))}

          {provided.placeholder}
        </section>
      )}
    </Droppable>
  );
};

export default TaskColumn;
