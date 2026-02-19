import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../../redux/type';

const AdminApplications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  // 1. Pull dynamic data and loading status from Redux
const { applications, loading } = useSelector((state) => state.applicationReducer || {});
  // 2. Fetch applications from backend on component mount
  useEffect(() => {
    dispatch({ type: types.FETCH_ADMIN_APPS_REQUEST });
  }, [dispatch]);

  const safeApps = applications || [];
const filteredApplications = safeApps.filter(app =>
    app.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.status?.toLowerCase().includes(searchTerm.toLowerCase())
);

  const handleView = (id) => {
    console.log('Viewing application:', id);
    // Logic: dispatch fetch single application and navigate
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      // 4. Trigger the delete saga
      dispatch({ type: types.DELETE_ADMIN_APP_REQUEST, payload: id });
    }
  };

  const getStatusClass = (status) => {
    if (!status) return 'status-badge';
    switch (status.toLowerCase()) {
      case 'approved': return 'status-badge status-approved';
      case 'pending': return 'status-badge status-pending';
      case 'under review': return 'status-badge status-review';
      case 'rejected': return 'status-badge status-rejected';
      default: return 'status-badge';
    }
  };

  return (
    <>
      <div className="page-header">
        <h2>Applications</h2>
        <p>Review and manage all submitted applications</p>
      </div>

      {/* Search Bar */}
      <div className="table-controls">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search by name, email, or status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="table-info">
          {loading ? 'Refreshing data...' : `Showing ${filteredApplications?.length} of ${applications?.length} applications`}
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Application ID</th>
              <th>Applicant Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Submitted Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && applications.length === 0 ? (
              <tr><td colSpan="6" className="no-data">Loading applications...</td></tr>
            ) : filteredApplications.length > 0 ? (
              filteredApplications.map((app) => (
                <tr key={app.id}>
                  <td>
                    <span className="app-id">#{app.id.toString().padStart(4, '0')}</span>
                  </td>
                  <td className="name-cell">
                    <div className="user-avatar">
                      {app.full_name ? app.full_name.split(' ').map(n => n[0]).join('') : 'U'}
                    </div>
                    <span>{app.full_name}</span>
                  </td>
                  <td>{app.email}</td>
                  <td>
                    <span className={getStatusClass(app.status)}>
                      {app.status || 'Pending'}
                    </span>
                  </td>
                  <td>{app.created_at ? new Date(app.created_at).toLocaleDateString() : 'N/A'}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-action btn-view"
                        onClick={() => handleView(app.id)}
                        title="View Details"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button
                        className="btn-action btn-delete"
                        onClick={() => handleDelete(app.id)}
                        title="Delete"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">
                  <i className="fas fa-inbox"></i>
                  <p>No applications found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminApplications;