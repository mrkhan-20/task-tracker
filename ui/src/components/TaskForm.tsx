import React, { useEffect, useState } from "react";
import api from "../api/client";
import type { Category, Task, TaskStatus } from "../type";

interface TaskFormProps {
  onTaskCreated: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>("Todo");
  const [dueDate, setDueDate] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // normal users cannot create categories, but can list them via admin-only endpoint;
    // if you want non-admin read access, expose another endpoint. For now we call /admin/categories? or /categories with admin token.
    const fetchCategories = async () => {
      try {
        const res = await api.get<Category[]>("/categories"); // requires admin token now
        setCategories(res.data);
      } catch (_) {
        // if user is not admin, maybe you expose a /public-categories or change backend
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!categoryId) {
      setError("Please select a category");
      return;
    }
    try {
      const res = await api.post<Task>("/tasks", {
        title,
        description,
        status,
        due_date: new Date(dueDate).toISOString(),
        category_id: categoryId,
      });
      onTaskCreated(res.data);
      setTitle("");
      setDescription("");
      setStatus("Todo");
      setDueDate("");
      setCategoryId("");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to create task");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>Create Task</h3>
      {error && <p className="error">{error}</p>}
      <label>
        Title
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <label>
        Description
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <label>
        Status
        <select value={status} onChange={(e) => setStatus(e.target.value as TaskStatus)}>
          <option value="Todo">Todo</option>
          <option value="Doing">Doing</option>
          <option value="Done">Done</option>
        </select>
      </label>
      <label>
        Due Date
        <input
          type="datetime-local"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </label>
      <label>
        Category
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value))}
          required
        >
          <option value="">Select...</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
