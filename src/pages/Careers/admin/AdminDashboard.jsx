import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as types from '../../../redux/type';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const dashboardStats = useSelector(state => state.applicationReducer?.dashboardStats);
  const loading = useSelector(state => state.applicationReducer?.loading);

  useEffect(() => {
    dispatch({ type: types.FETCH_DASHBOARD_STATS_REQUEST });
  }, [dispatch]);

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return 'fas fa-check-circle';
      case 'rejected':
        return 'fas fa-times-circle';
      case 'pending':
        return 'fas fa-clock';
      default:
        return 'fas fa-circle';
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return '#10b981';
      case 'rejected':
        return '#ef4444';
      case 'pending':
        return '#f59e0b';
      default:
        return '#6b7280';
    }
  };

  const getIssueIcon = (status) => {
    switch (status) {
      case 'expired':
        return { icon: 'fas fa-exclamation-circle', color: '#ef4444' };
      case 'expiring_soon':
        return { icon: 'fas fa-exclamation-triangle', color: '#f59e0b' };
      case 'missing':
        return { icon: 'fas fa-times-circle', color: '#ef4444' };
      default:
        return { icon: 'fas fa-info-circle', color: '#6b7280' };
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <i className="fas fa-spinner fa-spin"></i>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <>
      <div className="page-header">
        <h2>Dashboard</h2>
        <p>Welcome back! Here's an overview of your nurse registry</p>
      </div>

      {/* Stats Cards */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon blue">
            <i className="fas fa-file-alt"></i>
          </div>
          <div className="stat-content">
            <h3>Total Applications</h3>
            <p className="stat-count">{dashboardStats?.stats?.totalApplications || 0}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-content">
            <h3>Total Applicants</h3>
            <p className="stat-count">{dashboardStats?.stats?.totalApplicants || 0}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">
            <i className="fas fa-clock"></i>
          </div>
          <div className="stat-content">
            <h3>Pending Review</h3>
            <p className="stat-count">{dashboardStats?.stats?.pendingReview || 0}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple">
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="stat-content">
            <h3>Approved</h3>
            <p className="stat-count">{dashboardStats?.stats?.approved || 0}</p>
          </div>
        </div>
      </div>

      {/* Dashboard Content - Two Columns */}
      <div className="dashboard-content">
        {/* Recent Status Logs */}
        <div className="dashboard-section">
          <div className="section-header">
            <h3>
              <i className="fas fa-history"></i> Recent Status Changes
            </h3>
            <button 
              className="btn-view-all"
              onClick={() => navigate('/admin/status-logs')}
            >
              View All <i className="fas fa-arrow-right"></i>
            </button>
          </div>
          
          <div className="status-logs-list">
            {dashboardStats?.recentStatusLogs?.length > 0 ? (
              dashboardStats.recentStatusLogs.map((log) => (
                <div key={log.id} className="status-log-item">
                  <div className="log-icon" style={{ color: getStatusColor(log.to_status) }}>
                    <i className={getStatusIcon(log.to_status)}></i>
                  </div>
                  <div className="log-details">
                    <p className="log-text">
                      <strong>App #{log.application_id}</strong> changed to{' '}
                      <span className="log-status" style={{ color: getStatusColor(log.to_status) }}>
                        {log.to_status}
                      </span>
                    </p>
                    <p className="log-meta">
                      <span className="log-user">
                        <i className="fas fa-user"></i> {log.changed_by || 'Admin'}
                      </span>
                      <span className="log-time">
                        <i className="fas fa-clock"></i> {new Date(log.created_at).toLocaleString()}
                      </span>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-data">
                <i className="fas fa-inbox"></i>
                <p>No recent status changes</p>
              </div>
            )}
          </div>
        </div>

        {/* Missing/Expired Documents */}
        <div className="dashboard-section">
          <div className="section-header">
            <h3>
              <i className="fas fa-exclamation-triangle"></i> Document Issues
            </h3>
          </div>
          
          <div className="document-issues-list">
            {dashboardStats?.applicantsWithIssues?.length > 0 ? (
              dashboardStats.applicantsWithIssues.map((applicant) => (
                <div key={applicant.id} className="issue-card">
                  <div className="issue-header">
                    <h4>{applicant.name}</h4>
                    <span className="reference-badge">#{applicant.reference_id}</span>
                  </div>
                  <div className="issue-list">
                    {applicant.issues.slice(0, 3).map((issue, idx) => {
                      const issueInfo = getIssueIcon(issue.status);
                      return (
                        <div key={idx} className="issue-item">
                          <i className={issueInfo.icon} style={{ color: issueInfo.color }}></i>
                          <span className="issue-label">{issue.label}</span>
                          <span className="issue-reason">{issue.reason}</span>
                        </div>
                      );
                    })}
                    {applicant.issues.length > 3 && (
                      <p className="issue-more">
                        +{applicant.issues.length - 3} more issues
                      </p>
                    )}
                  </div>
                  <button 
                    className="btn-view-documents"
                    onClick={() => navigate(`/admin/applications/${applicant.id}`, { state: { viewMode: 'initial' } })}
                  >
                    <i className="fas fa-folder-open"></i> View Documents
                  </button>
                </div>
              ))
            ) : (
              <div className="no-data">
                <i className="fas fa-check-circle"></i>
                <p>All documents are up to date!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;