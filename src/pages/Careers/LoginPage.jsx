import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import * as types from "../../redux/type";

const LoginPage = ({ onBack }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const refParam = searchParams.get('ref') || searchParams.get('referenceId') || searchParams.get('id') || '';
  const passParam = searchParams.get('pass') || searchParams.get('password') || '';
  const redirectParam = searchParams.get('redirect') || searchParams.get('to') || '';

  // Pull token and user from auth state
  const { loading, error, token } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    referenceId: refParam || '',
    password: passParam || ''
  });

  // Handle URL query parameters from email link (pre-fill & optional auto-login)
  useEffect(() => {
    if (refParam || passParam) {
      setFormData(prev => ({
        ...prev,
        referenceId: refParam || prev.referenceId,
        password: passParam || prev.password
      }));

      // If both ref and pass are provided in email link, auto-login for 1-click access
      if (refParam && passParam && !token) {
        dispatch({
          type: types.USER_LOGIN_REQUEST,
          payload: { referenceId: refParam, password: passParam }
        });
      }
    }
  }, [refParam, passParam, token, dispatch]);

  // ✅ REDIRECT LOGIC
  // If login is successful, navigate to the target Next Phase page or /my-applications
  useEffect(() => {
    if (token) {
      const savedRedirect = sessionStorage.getItem('redirectAfterLogin');
      sessionStorage.removeItem('redirectAfterLogin');
      const target = redirectParam || savedRedirect || '/my-applications';
      navigate(target, { replace: true });
    }
  }, [token, navigate, redirectParam]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    if (!formData.referenceId || !formData.password) {
      return; 
    }
    
    dispatch({
      type: types.USER_LOGIN_REQUEST,
      payload: formData
    });
  };

  return (
    <div className="login-page">
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <img src="/logo.png.png" alt="QualCare Logo" />
          </div>
          <button className="home-btn" onClick={onBack || (() => navigate('/'))}>Home</button>
          <div className="header-right">
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
      </header>

      <div className="login-container centered-content mt-5 mb-5">
        <div className="login-form">
          <h2 className="text-center mb-4">Applicant Login</h2>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="form-field">
            <label className="section-label">Reference ID</label>
            <input
              type="text"
              name="referenceId"
              value={formData.referenceId}
              onChange={handleChange}
              placeholder="Enter your reference ID"
              className="form-control"
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()} // Login on Enter key
            />
          </div>

          <div className="form-field mt-3">
            <label className="section-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="form-control"
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()} // Login on Enter key
            />
          </div>

          <button
            type="button"
            className="btn-next mt-4"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-logo">
            <img src="/ncpc-logo.jpg" alt="NCPC Member" />
          </div>
          <div className="footer-content">
            <p>QUALCARE NURSE REGISTRY INC. © 2025. All Rights Reserved.</p>
            <p>State Licensed Nurse Registry Broward County License #NR30212051</p>
            <p>Powered by MISOL | <a href="#">Terms of Service</a> & <a href="#">Privacy Policy</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;