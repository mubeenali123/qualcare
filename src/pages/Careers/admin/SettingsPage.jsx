// components/Admin/SettingsPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { base_url } from '../../../components/config';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    companyName: '',
    contactEmail: '',
    phoneNumber: '',
    notificationInterval: '24', // default to 24 hours
    notificationIntervalUnit: 'hours', // hours or days
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${base_url}/admin/settings`);
      if (response.data) {
        setSettings({
          companyName: response.data.companyName || '',
          contactEmail: response.data.contactEmail || '',
          phoneNumber: response.data.phoneNumber || '',
          notificationInterval: response.data.notificationInterval || '24',
          notificationIntervalUnit: response.data.notificationIntervalUnit || 'hours',
        });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      setMessage({ type: 'error', text: 'Failed to load settings' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      await axios.post(`${base_url}/admin/settings`, settings);
      setMessage({ type: 'success', text: 'Settings saved successfully!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
      setMessage({ type: 'error', text: 'Failed to save settings' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <i className="fas fa-spinner fa-spin"></i>
        <p>Loading settings...</p>
      </div>
    );
  }

  return (
    <>
      <div className="page-header">
        <div>
          <h2>Settings</h2>
          <p>Configure application settings</p>
        </div>
      </div>

      <div className="settings-container">
        <form onSubmit={handleSubmit} className="settings-form">
          {/* Success/Error Message */}
          {message && (
            <div className={`alert alert-${message.type}`} style={{
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '20px',
              backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
              color: message.type === 'success' ? '#155724' : '#721c24',
              border: `1px solid ${message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`
            }}>
              {message.text}
            </div>
          )}

          {/* General Settings */}
          <div className="form-section">
            <h1 className="form-title">General Settings</h1>

            <div className="form-field">
              <label className="section-label">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={settings.companyName}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Enter company name"
              />
            </div>

            <div className="form-field">
              <label className="section-label">Contact Email</label>
              <input
                type="email"
                name="contactEmail"
                value={settings.contactEmail}
                onChange={handleInputChange}
                className="form-control"
                placeholder="admin@example.com"
              />
            </div>

            <div className="form-field">
              <label className="section-label">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={settings.phoneNumber}
                onChange={handleInputChange}
                className="form-control"
                placeholder="(555) 123-4567"
              />
            </div>
          </div>

          {/* Divider */}
          <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '32px 0' }} />

          {/* Notification Settings */}
          <div className="form-section">
            <h1 className="form-title">Notification Settings</h1>
            <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '20px' }}>
              Configure how frequently reminder notifications are sent for pending applications.
            </p>

            <div className="form-field">
              <label className="section-label">Reminder Interval</label>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                  type="number"
                  name="notificationInterval"
                  value={settings.notificationInterval}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="e.g. 24"
                  min="1"
                  style={{ maxWidth: '120px' }}
                />
                <select
                  name="notificationIntervalUnit"
                  value={settings.notificationIntervalUnit}
                  onChange={handleInputChange}
                  className="form-control"
                  style={{ maxWidth: '140px' }}
                >
                  <option value="minutes">Minutes</option>
                  <option value="hours">Hours</option>
                  <option value="days">Days</option>
                </select>
              </div>
              <p style={{ color: '#9ca3af', fontSize: '12px', marginTop: '6px' }}>
                Notifications will be sent every{' '}
                <strong>{settings.notificationInterval} {settings.notificationIntervalUnit}</strong>{' '}
                for applications that are still pending review.
              </p>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn-save"
              disabled={saving}
              style={{
                padding: '10px 24px',
                backgroundColor: '#4361ee',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              {saving ? (
                <><i className="fas fa-spinner fa-spin"></i> Saving...</>
              ) : (
                <><i className="fas fa-save"></i> Save Settings</>
              )}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .settings-container {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .settings-form {
          max-width: 600px;
        }
        
        .form-control {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
          transition: border-color 0.2s;
        }
        
        .form-control:focus {
          outline: none;
          border-color: #4361ee;
        }

        .form-field {
          margin-bottom: 20px;
        }

        .btn-save:hover {
          background-color: #3a56d4 !important;
          transform: translateY(-1px);
        }
        
        .btn-save:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </>
  );
};

export default SettingsPage;