import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import NavigationBar from "./components/NavigationBar";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import TasksPage from "./pages/TasksPage";
import CategoryManagementPage from "./pages/CategoryManagementPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";

import "./index.css";

const App: React.FC = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <div className="app">
        <NavigationBar />
        <Routes>
          <Route
            path="/login"
            element={user ? <Navigate to="/tasks" replace /> : <LoginPage />}
          />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <TasksPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <ProtectedRoute requiredRole="admin">
                <CategoryManagementPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to={user ? "/tasks" : "/login"} replace />} />
          <Route path="*" element={<Navigate to={user ? "/tasks" : "/login"} replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
