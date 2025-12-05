import React, { useEffect, useState } from "react";
import api from "../api/client";
import type { AdminTask } from "../type";

const AdminDashboard: React.FC = () => {
  const [tasks, setTasks] = useState<AdminTask[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");

  const loadTasks = async () => {
    const params: any = {};
    if (userId) params.user_id = userId;
    if (status) params.status = status;
    if (from) params.due_date_from = new Date(from).toISOString();
    if (to) params.due_date_to = new Date(to).toISOString();

    const res = await api.get<AdminTask[]>("/admin/tasks", { params });
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    loadTasks();
  };

  return (
    <div className="card">
      <h3>Admin Dashboard</h3>
      <form className="filter-form" onSubmit={handleFilter}>
        <input
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All statuses</option>
          <option value="Todo">Todo</option>
          <option value="Doing">Doing</option>
          <option value="Done">Done</option>
        </select>
        <label>
          From
          <input
            type="datetime-local"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </label>
        <label>
          To
          <input
            type="datetime-local"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </label>
        <button type="submit">Filter</button>
      </form>

      <table className="tasks-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Task</th>
            <th>Category</th>
            <th>Status</th>
            <th>Due</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>
                {t.owner_name} ({t.owner_email})
              </td>
              <td>{t.title}</td>
              <td>{t.category.name}</td>
              <td>{t.status}</td>
              <td>{new Date(t.due_date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
