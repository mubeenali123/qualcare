import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as types from "../../../redux/type";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, successMessage, user } = useSelector(
    state => state.auth
  );

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = () => {
    dispatch({
      type: types.ADMIN_LOGIN_REQUEST,
      payload: formData
    });
  };

  // 🔥 Redirect after login success
  useEffect(() => {
    if (user) {
      navigate("/admin/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="login-page">
      <div className="login-container centered-content mt-5 mb-5">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="text-center mb-4">Login</h2>

          {error && <div className="alert alert-danger">{typeof error === "string" ? error : JSON.stringify(error)}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}

          <div className="form-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
              autoFocus
            />
          </div>

          <div className="form-field mt-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn-next mt-4"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
