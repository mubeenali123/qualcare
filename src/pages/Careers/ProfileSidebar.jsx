import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import * as types from "../../redux/type";
import './ApplicationForm.css';

const ProfileSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get user info from Redux (if you have it stored)
  const user = useSelector(state => state.auth?.user);

  useEffect(() => {
    return () => {
      dispatch({ type: types.CLEAR_AUTH_ERRORS });
    };
  }, [dispatch]);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      dispatch({ type: types.USER_LOGOUT_REQUEST });
      navigate('/login');
    }
  };

  const menuItems = [
    { 
      label: 'Account', 
      path: '/profile', 
      icon: 'fas fa-user',
      description: 'View and edit your profile'
    },
    { 
      label: 'Applications', 
      path: '/my-applications', 
      icon: 'fas fa-file-alt',
      description: 'Track your applications'
    },
    { 
      label: 'Change Password', 
      path: '/change-password', 
      icon: 'fas fa-lock',
      description: 'Update your password'
    },
    { 
      label: 'Expiration Checklist', 
      path: '/expiration-checklist', 
      icon: 'fas fa-calendar-check',
      description: 'Manage document expiry'
    },
  ];

  return (
    <aside className="sidebar-card">
      {/* User Profile Section */}
      {user && (
        <div className="sidebar-profile">
          <div className="profile-avatar">
                {user?.first_name || user?.last_name 
      ? `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}`.toUpperCase() 
      : 'U'}
          </div>
          <h4 className="profile-name">
            {user.firstName} {user.lastName}
          </h4>
          <p className="profile-email">{user.email}</p>
        </div>
      )}

      {/* Navigation Menu */}
      <ul className="sidebar-nav-profile">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <li key={item.path} className={isActive ? 'active' : ''}>
              <Link to={item.path} className="sidebar-link">
                <div className="link-icon">
                  <i className={item.icon}></i>
                </div>
                <div className="link-content">
                  <span className="link-label">{item.label}</span>
                  <span className="link-description">{item.description}</span>
                </div>
                {isActive && (
                  <div className="active-indicator">
                    <i className="fas fa-chevron-right"></i>
                  </div>
                )}
              </Link>
            </li>
          );
        })}
        
        {/* Logout Button */}
        <li className="logout-item">
          <button onClick={handleLogout} className="sidebar-link logout-btn">
            <div className="link-icon">
              <i className="fas fa-sign-out-alt"></i>
            </div>
            <div className="link-content">
              <span className="link-label">Logout</span>
              <span className="link-description">Sign out of your account</span>
            </div>
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default ProfileSidebar;