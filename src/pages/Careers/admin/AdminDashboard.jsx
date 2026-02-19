import React from 'react';

const AdminDashboard = () => {
  return (
    <>
      <div className="page-header">
        <h2>Dashboard</h2>
        <p>Welcome back! Here's an overview of your nurse registry</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon blue">
            <i className="fas fa-file-alt"></i>
          </div>
          <div className="stat-content">
            <h3>Total Applications</h3>
            <p className="stat-count">156</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-content">
            <h3>Total Applicants</h3>
            <p className="stat-count">89</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">
            <i className="fas fa-clock"></i>
          </div>
          <div className="stat-content">
            <h3>Pending Review</h3>
            <p className="stat-count">23</p>
          </div>
        </div>

        {/* Approved */}
        <div className="stat-card">
          <div className="stat-icon purple">
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="stat-content">
            <h3>Approved</h3>
            <p className="stat-count">67</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;