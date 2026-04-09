import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../../redux/type';

const AdminApplicants = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const dispatch = useDispatch();
  
  const { applicants, loading } = useSelector(state => state.applicants);

  useEffect(() => {
    dispatch({ type: types.FETCH_APPLICANTS_REQUEST });
  }, [dispatch]);

  const filteredApplicants = applicants.filter(applicant =>
    applicant.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    applicant.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    applicant.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLockAccount = (id, name) => {
    if (window.confirm(`🔒 Lock account for ${name}? They will not be able to login.`)) {
      dispatch({
        type: types.LOCK_APPLICANT_ACCOUNT_REQUEST,
        payload: id
      });
    }
  };

  const handleUnlockAccount = (id, name) => {
    if (window.confirm(`🔓 Unlock account for ${name}?`)) {
      dispatch({
        type: types.UNLOCK_APPLICANT_ACCOUNT_REQUEST,
        payload: id
      });
    }
  };

  const handleArchiveAccount = (id, name) => {
    if (window.confirm(`📦 Archive account for ${name}? They will not be able to login and will be moved to archived list.`)) {
      dispatch({
        type: types.ARCHIVE_APPLICANT_ACCOUNT_REQUEST,
        payload: id
      });
    }
  };

  const handleResetPassword = (applicant) => {
    setSelectedApplicant(applicant);
    setNewPassword('');
    setShowPasswordModal(true);
  };

  const confirmPasswordReset = () => {
    if (!newPassword || newPassword.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    dispatch({
      type: types.RESET_APPLICANT_PASSWORD_REQUEST,
      payload: {
        id: selectedApplicant.id,
        new_password: newPassword
      }
    });

    alert(`Password reset successfully!\n\nNew Password: ${newPassword}\n\nPlease share this with the applicant.`);
    setShowPasswordModal(false);
  };

  const generateRandomPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewPassword(password);
  };

  const handleDelete = (id) => {
    if (window.confirm("⚠️ Are you sure you want to delete this applicant? This action cannot be undone.")) {
      dispatch({
        type: types.DELETE_APPLICANT_REQUEST,
        payload: id
      });
    }
  };

  const getAccountStatusBadge = (status) => {
    switch (status) {
      case 'locked':
        return <span className="account-status status-locked"><i className="fas fa-lock"></i> Locked</span>;
      case 'archived':
        return <span className="account-status status-archived"><i className="fas fa-archive"></i> Archived</span>;
      case 'active':
      default:
        return <span className="account-status status-active"><i className="fas fa-check-circle"></i> Active</span>;
    }
  };

  if (loading && applicants.length === 0) {
    return (
      <div className="loading-container">
        <i className="fas fa-spinner fa-spin"></i>
        <p>Loading Applicants...</p>
      </div>
    );
  }

  return (
    <>
      <div className="page-header">
        <h2>Applicants</h2>
        <p>Manage and review all nurse applicants</p>
      </div>

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
          Showing {filteredApplicants.length} of {applicants.length} applicants
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Date Applied</th>
              <th>Account Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplicants.length > 0 ? (
              filteredApplicants.map((applicant) => (
                <tr key={applicant.id}>
                  <td>
                    <span className="app-id">#{applicant.id.toString().padStart(4, '0')}</span>
                  </td>
                  
                  <td className="name-cell">
                    <div className="user-avatar">
                      {`${applicant.first_name?.[0] || ''}${applicant.last_name?.[0] || ''}`}
                    </div>
                    <div>
                      <strong>{applicant.first_name} {applicant.middle_name} {applicant.last_name}</strong>
                    </div>
                  </td>

                  <td>{applicant.email}</td>
                
                  <td>
                    {applicant.date_applied 
                      ? new Date(applicant.date_applied).toLocaleDateString() 
                      : 'N/A'}
                  </td>

                  <td>
                    {getAccountStatusBadge(applicant.user?.account_status)}
                  </td>

                  <td>
                    <div className="action-buttons">
                      {/* Lock/Unlock Toggle */}
                      {applicant.user?.account_status === 'locked' ? (
                        <button
                          className="btn-action btn-unlock"
                          onClick={() => handleUnlockAccount(applicant.id, `${applicant.first_name} ${applicant.last_name}`)}
                          title="Unlock Account"
                        >
                          <i className="fas fa-unlock"></i>
                        </button>
                      ) : (
                        <button
                          className="btn-action btn-lock"
                          onClick={() => handleLockAccount(applicant.id, `${applicant.first_name} ${applicant.last_name}`)}
                          title="Lock Account"
                        >
                          <i className="fas fa-lock"></i>
                        </button>
                      )}

                      {/* Archive Button */}
                      <button
                        className="btn-action btn-archive"
                        onClick={() => handleArchiveAccount(applicant.id, `${applicant.first_name} ${applicant.last_name}`)}
                        title="Archive Account"
                      >
                        <i className="fas fa-archive"></i>
                      </button>

                      {/* Reset Password Button */}
                      <button
                        className="btn-action btn-reset-password"
                        onClick={() => handleResetPassword(applicant)}
                        title="Reset Password"
                      >
                        <i className="fas fa-key"></i>
                      </button>

                      {/* Delete Button */}
                      <button
                        className="btn-action btn-delete"
                        onClick={() => handleDelete(applicant.id)}
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
                  <p>No applicants found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Password Reset Modal */}
      {showPasswordModal && (
        <div className="modal-overlay" onClick={() => setShowPasswordModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Reset Password</h3>
              <button className="modal-close" onClick={() => setShowPasswordModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <p className="modal-subtitle">
                Reset password for <strong>{selectedApplicant?.first_name} {selectedApplicant?.last_name}</strong>
              </p>
              
              <div className="form-group">
                <label>New Password</label>
                <div className="password-input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password (min 8 characters)"
                    className="form-input"
                  />
                  <button
                    type="button"
                    className="btn-toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                  </button>
                </div>
              </div>

              <button
                type="button"
                className="btn-generate-password"
                onClick={generateRandomPassword}
              >
                <i className="fas fa-random"></i> Generate Random Password
              </button>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowPasswordModal(false)}>
                Cancel
              </button>
              <button className="btn-confirm" onClick={confirmPasswordReset}>
                <i className="fas fa-check"></i> Reset Password
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminApplicants;