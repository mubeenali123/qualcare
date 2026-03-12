import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import * as types from "../../redux/type";

const ProfileSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
useEffect(() => {
  // This runs when the component disappears (unmounts)
  return () => {
    dispatch({ type: types.CLEAR_AUTH_ERRORS }); // Make sure this type exists in your reducer
  };
}, [dispatch]);
  const handleLogout = () => {
    // We use the same logout request we set up earlier
    dispatch({ type: types.USER_LOGOUT_REQUEST });
    navigate('/login');
  };

  const menuItems = [
    { label: 'Account', path: '/profile' },
    { label: 'Applications', path: '/my-applications' },
    { label: 'Change Password', path: '/change-password' },
    { label: 'Expiration Checklist', path: '/expiration-checklist' },
  ];

  return (
    <aside className="sidebar-card">
      <ul className="sidebar-nav">
        {menuItems.map((item) => (
          <li key={item.path} className={location.pathname === item.path ? 'active' : ''}>
            <Link to={item.path}>{item.label}</Link>
          </li>
        ))}
        <li className="logout-item" onClick={handleLogout} style={{ cursor: 'pointer' }}>
          Logout
        </li>
      </ul>
    </aside>
  );
};

export default ProfileSidebar;