import React, { useEffect, useState } from "react";
import api from "../api/client";
import type { Task, TaskStatus } from "../type";

interface TaskListProps {
  refreshTrigger?: number;
}

const TaskList: React.FC<TaskListProps> = ({ refreshTrigger }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = async () => {
    try {
      const res = await api.get<Task[]>("/tasks");
      setTasks(res.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to fetch tasks");
    }
  };

  useEffect(() => {
    loadTasks();
  }, [refreshTrigger]);

  const updateStatus = async (task: Task, status: TaskStatus) => {
    try {
      const res = await api.put<Task>(`/tasks/${task.id}`, { status });
      setTasks((prev) => prev.map((t) => (t.id === task.id ? res.data : t)));
    } catch (err: any) {
      alert(err.response?.data?.detail || "Failed to update task");
    }
  };

  return (
    <div className="card">
      <h3>My Tasks</h3>
      {error && <p className="error">{error}</p>}
      {tasks.length === 0 && (
        <div className="empty-state">
          <p>No tasks yet</p>
          <p>Create your first task above to get started!</p>
        </div>
      )}
      <ul className="task-list">
        {tasks.map((t) => (
          <li key={t.id}>
            <div>
              <strong>
                {t.title}
                <span className="category-badge">{t.category.name}</span>
              </strong>
              <small>
                Status: <span className={`status-${t.status.toLowerCase()}`}>{t.status}</span> | Due: {new Date(t.due_date).toLocaleString()}
              </small>
              {t.description && <p>{t.description}</p>}
            </div>
            <div className="task-actions">
              <select
                value={t.status}
                onChange={(e) => updateStatus(t, e.target.value as TaskStatus)}
              >
                <option value="Todo">Todo</option>
                <option value="Doing">Doing</option>
                <option value="Done">Done</option>
              </select>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
