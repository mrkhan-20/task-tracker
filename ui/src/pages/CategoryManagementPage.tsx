import React from "react";
import CategoryManager from "../components/CategoryManager";

const CategoryManagementPage: React.FC = () => {
  return (
    <div className="page-container">
      <div className="page-content">
        <h1 className="page-title">Category Management</h1>
        <CategoryManager />
      </div>
    </div>
  );
};

export default CategoryManagementPage;

