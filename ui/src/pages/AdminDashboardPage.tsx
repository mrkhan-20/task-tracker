import React from "react";
import AdminDashboard from "../components/AdminDashboard";

const AdminDashboardPage: React.FC = () => {
  return (
    <div className="page-container">
      <div className="page-content">
        <h1 className="page-title">Admin Dashboard</h1>
        <AdminDashboard />
      </div>
    </div>
  );
};

export default AdminDashboardPage;

