import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import '../admin/styles.css';
import { useDispatch } from "react-redux";
import * as types from "../../../redux/type";

const AdminLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfileDropdown, setShowProfileDropdown] = React.useState(false);

  const isLoginPage = location.pathname === '/admin/login';

const handleLogout = () => {
  dispatch({ type: types.ADMIN_LOGOUT_REQUEST });
  navigate("/admin/login");
};

  if (isLoginPage) {
    return <Outlet />;
  }

  return (
    <div className="admin-layout">
      {/* Header */}
      <header className="admin-header">
        <div className="logo">
          <img src="/logo.png.png" alt="QualCare Logo" />
        </div>
        <div className="admin-header-right">
          <div className="admin-profile-dropdown">
            <button 
              className="profile-btn"
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            >
              <i className="fas fa-user-circle"></i>
              Admin <i className="fas fa-chevron-down"></i>
            </button>
            {showProfileDropdown && (
              <div className="dropdown-menu">
                <button onClick={() => navigate('/admin/settings')}>
                  <i className="fas fa-user-cog"></i> Profile
                </button>
                <button onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt"></i> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="admin-body">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          
          <ul className="sidebar-nav">
            <li 
              className={location.pathname === '/admin/dashboard' ? 'active' : ''}
              onClick={() => navigate('/admin/dashboard')}
            >
              <i className="fas fa-th-large"></i>
              <span>Dashboard</span>
            </li>
            <li 
              className={location.pathname === '/admin/applications' ? 'active' : ''}
              onClick={() => navigate('/admin/applications')}
            >
              <i className="fas fa-file-alt"></i>
              <span>Applications</span>
            </li>
            <li 
              className={location.pathname === '/admin/applicants' ? 'active' : ''}
              onClick={() => navigate('/admin/applicants')}
            >
              <i className="fas fa-users"></i>
              <span>Applicants</span>
            </li>
            <li 
  className={location.pathname === '/admin/status-logs' ? 'active' : ''}
  onClick={() => navigate('/admin/status-logs')}
>
  <i className="fas fa-history"></i>
  <span>Status Logs</span>
</li>
            <li 
              className={location.pathname === '/admin/settings' ? 'active' : ''}
              onClick={() => navigate('/admin/settings')}
            >
              <i className="fas fa-cog"></i>
              <span>Settings</span>
            </li>
          </ul>

          <ul className="sidebar-nav sidebar-nav-bottom">
            <li className="logout-item" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i>
              <span>Logout</span>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="admin-content">
          <div className="admin-content-inner">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="admin-footer">
        <div className="admin-footer-container">
          <div className="admin-footer-content text-center">
            <p>QUALCARE NURSE REGISTRY INC. © 2025. All Rights Reserved.</p>
            <p>State Licensed Nurse Registry Broward County License #NR30212051</p>
            <p>Powered by MISOL | <a href="#">Terms of Service</a> & <a href="#">Privacy Policy</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminLayout;