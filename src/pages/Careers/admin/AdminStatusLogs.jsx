import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../../redux/type';

const AdminStatusLogs = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  const statusLogs = useSelector(state => state.applicationReducer?.allStatusLogs || []);
  const loading = useSelector(state => state.applicationReducer?.loading || false);

  useEffect(() => {
    dispatch({
      type: types.FETCH_ALL_STATUS_LOGS_REQUEST
    });
  }, [dispatch]);

  // Filter logs based on search and status filter
  const filteredLogs = statusLogs.filter(log => {
    const matchesSearch = 
      log.application_id?.toString().includes(searchTerm) ||
      log.changed_by?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.to_status?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filterStatus === 'all' || log.to_status?.toLowerCase() === filterStatus.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return 'status-approved';
      case 'rejected':
        return 'status-rejected';
      case 'pending':
        return 'status-pending';
      case 'under review':
        return 'status-review';
      default:
        return '';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return 'fas fa-check-circle';
      case 'rejected':
        return 'fas fa-times-circle';
      case 'pending':
        return 'fas fa-clock';
      case 'under review':
        return 'fas fa-eye';
      default:
        return 'fas fa-circle';
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <i className="fas fa-spinner fa-spin"></i>
        <p>Loading status logs...</p>
      </div>
    );
  }

  return (
    <>
      <div className="page-header">
        <h2>Status History & Logs</h2>
        <p>Track all application status changes and workflow history</p>
      </div>

      {/* Filters and Search */}
      <div className="logs-controls">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search by application ID, admin, or status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Filter by Status:</label>
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="status-filter"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
{/* 
        <div className="table-info">
          Showing {filteredLogs.length} of {statusLogs.length} logs
        </div> */}
      </div>

      {/* Status Logs Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Log ID</th>
              <th>Application ID</th>
              <th>From Status</th>
              <th>To Status</th>
              <th>Changed By</th>
              <th>Date & Time</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td>#{log.id}</td>
                  <td>
                    <span className="app-id">#{log.application_id?.toString().padStart(4, '0')}</span>
                  </td>
                  <td>
                    {log.from_status ? (
                      <span className={`status-badge ${getStatusColor(log.from_status)}`} style={{ opacity: 0.6 }}>
                        {log.from_status}
                      </span>
                    ) : (
                      <span className="text-muted">-</span>
                    )}
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <i className={getStatusIcon(log.to_status)} style={{ color: '#6b7280' }}></i>
                      <span className={`status-badge ${getStatusColor(log.to_status)}`}>
                        {log.to_status}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <i className="fas fa-user-circle" style={{ color: '#6b7280' }}></i>
                      <span>{log.changed_by || 'System'}</span>
                    </div>
                  </td>
                  <td>{new Date(log.created_at).toLocaleString()}</td>
                  <td>
                    {log.notes ? (
                      <span className="log-notes">{log.notes}</span>
                    ) : (
                      <span className="text-muted">-</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-data">
                  <i className="fas fa-inbox"></i>
                  <p>No status logs found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminStatusLogs;