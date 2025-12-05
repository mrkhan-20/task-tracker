import React from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import type { Task } from "../type";

const TasksPage: React.FC = () => {
  const [refreshTrigger, setRefreshTrigger] = React.useState(0);

  const handleTaskCreated = (task: Task) => {
    // Trigger refresh of TaskList
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="page-container">
      <div className="page-content">
        <h1 className="page-title">My Tasks</h1>
        <TaskForm onTaskCreated={handleTaskCreated} />
        <TaskList refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
};

export default TasksPage;

