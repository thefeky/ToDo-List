import "./App.css";
import TaskColumn from "./assets/components/TaskColumn";
import TaskForm from "./assets/components/TaskForm";
import ToDo from "./assets/images/todo.png";
import InProgress from "./assets/images/inprogress.png";
import Done from "./assets/images/done.png";
import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";

const oldTasks = localStorage.getItem("tasks");
console.log(oldTasks);
const App = () => {
  const [tasks, setTasks] = useState(JSON.parse(oldTasks) || []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDelete = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };
  const handleStatusChange = (id, status) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, status };
      }
      return task;
    });
    setTasks(newTasks);
  };
  const onDragEnd = (result) => {
    const { source, destination } = result;
    console.log(source, destination);
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    const [movedTask] = tasks.filter((task) => task.id === result.draggableId);

    const filteredTasks = tasks.filter(
      (task) => task.id !== result.draggableId
    );

    movedTask.status = destination.droppableId;

    const updatedTasks = [
      ...filteredTasks.slice(0, destination.index),
      movedTask,
      ...filteredTasks.slice(destination.index),
    ];
    setTasks(updatedTasks);
  };
  console.log(tasks);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="app">
        <TaskForm setTasks={setTasks} />

        <main className="app-main">
          <TaskColumn
            title="To do"
            taskIcon={ToDo}
            tasks={tasks}
            status="todo"
            handleDelete={handleDelete}
            handleStatusChange={handleStatusChange}
          />
          <TaskColumn
            title="In Progress"
            taskIcon={InProgress}
            tasks={tasks}
            status="doing"
            handleDelete={handleDelete}
            handleStatusChange={handleStatusChange}
          />
          <TaskColumn
            title="Done"
            taskIcon={Done}
            tasks={tasks}
            status="done"
            handleDelete={handleDelete}
            handleStatusChange={handleStatusChange}
          />
        </main>
      </div>
    </DragDropContext>
  );
};

export default App;
