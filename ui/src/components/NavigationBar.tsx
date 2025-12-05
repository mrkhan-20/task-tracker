import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavigationBar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  if (!user) {
    return null;
  }

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="top-navbar">
      <div className="navbar-container">
        <Link to="/tasks" className="navbar-brand">
          Task Tracker Lite
        </Link>
        <div className="navbar-menu">
          <Link
            to="/tasks"
            className={`navbar-link ${isActive("/tasks") ? "active" : ""}`}
          >
            Tasks
          </Link>
          {user.role === "admin" && (
            <>
              <Link
                to="/admin/categories"
                className={`navbar-link ${isActive("/admin/categories") ? "active" : ""}`}
              >
                Categories
              </Link>
              <Link
                to="/admin/dashboard"
                className={`navbar-link ${isActive("/admin/dashboard") ? "active" : ""}`}
              >
                Dashboard
              </Link>
            </>
          )}
        </div>
        <div className="navbar-user">
          <span className="navbar-user-info">
            {user.name} ({user.role})
          </span>
          <button onClick={handleLogout} className="navbar-logout-btn">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;

