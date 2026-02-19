import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../../redux/type';

const AdminApplicants = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  
  // Pull dynamic data from Redux
  const { applicants, loading } = useSelector(state => state.applicants);

  useEffect(() => {
    dispatch({ type: types.FETCH_APPLICANTS_REQUEST });
  }, [dispatch]);

  const filteredApplicants = applicants.filter(applicant =>
    applicant.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    applicant.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    applicant.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm("⚠️ Are you sure you want to delete this applicant? This action will remove them from the active list.")) {
      dispatch({
        type: types.DELETE_APPLICANT_REQUEST,
        payload: id
      });
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

  if (loading && applicants.length === 0) {
    return <div className="loader">Loading Applicants...</div>;
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
              <th>Fullname Name</th>
              <th>Email</th>
              <th>Date Applied</th>
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
        
        {/* Combined Name Cell for a cleaner look */}
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
          <div className="action-buttons">
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
    </>
  );
};

export default AdminApplicants;