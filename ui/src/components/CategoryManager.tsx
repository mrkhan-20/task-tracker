import React, { useEffect, useState } from "react";
import api from "../api/client";
import type { Category } from "../type";

const CategoryManager: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newName, setNewName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const loadCategories = async () => {
    try {
      const res = await api.get<Category[]>("/categories");
      setCategories(res.data);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to fetch categories");
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const addCategory = async () => {
    setError(null);
    if (!newName.trim()) return;
    try {
      const res = await api.post<Category>("/categories", { name: newName.trim() });
      setCategories((prev) => [...prev, res.data]);
      setNewName("");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to create category");
    }
  };

  const deleteCategory = async (id: number) => {
    if (!confirm("Delete this category?")) return;
    try {
      await api.delete(`/categories/${id}`);
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (err: any) {
      alert(err.response?.data?.detail || "Failed to delete category");
    }
  };

  return (
    <div className="card">
      <h3>Category Management (Admin)</h3>
      {error && <p className="error">{error}</p>}
      <div className="inline-form">
        <input
          placeholder="New category name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button onClick={addCategory}>Add</button>
      </div>
      <ul>
        {categories.map((c) => (
          <li key={c.id}>
            {c.name}
            <button onClick={() => deleteCategory(c.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManager;
