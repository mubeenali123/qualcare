import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { base_url } from '../../../components/config';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    companyName: '',
    contactEmail: '',
    phoneNumber: '',
    notificationInterval: '24',
    notificationIntervalUnit: 'hours',
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${base_url}/admin/settings`);
      if (response.data) {
        setSettings({
          companyName: response.data.companyName || '',
          contactEmail: response.data.contactEmail || '',
          phoneNumber: response.data.phoneNumber || '',
          notificationInterval: response.data.notificationInterval?.toString() || '24',
          notificationIntervalUnit: response.data.notificationIntervalUnit || 'hours',
        });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      showNotification('Failed to load settings', 'error');
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

    try {
      const response = await axios.post(`${base_url}/admin/settings`, settings);
      
      if (response.data.success) {
        showNotification('✅ Settings saved successfully!', 'success');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      showNotification('❌ Failed to save settings', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleResetSettings = async () => {
    if (window.confirm('⚠️ Are you sure you want to reset all settings to defaults? This action cannot be undone.')) {
      setResetting(true);
      try {
        const response = await axios.post(`${base_url}/admin/settings/reset`);
        
        if (response.data.success) {
          setSettings({
            companyName: response.data.data.companyName || '',
            contactEmail: response.data.data.contactEmail || '',
            phoneNumber: response.data.data.phoneNumber || '',
            notificationInterval: response.data.data.notificationInterval?.toString() || '24',
            notificationIntervalUnit: response.data.data.notificationIntervalUnit || 'hours',
          });
          showNotification('🔄 Settings reset to defaults', 'info');
        }
      } catch (error) {
        console.error('Error resetting settings:', error);
        showNotification('❌ Failed to reset settings', 'error');
      } finally {
        setResetting(false);
      }
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
      {/* Notification Toast */}
      {notification && (
        <div className={`notification-toast notification-${notification.type}`}>
          <div className="notification-content">
            <i className={`fas ${
              notification.type === 'success' ? 'fa-check-circle' :
              notification.type === 'error' ? 'fa-times-circle' :
              'fa-info-circle'
            }`}></i>
            <span>{notification.message}</span>
          </div>
          <button 
            className="notification-close" 
            onClick={() => setNotification(null)}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      )}

      <div className="page-header">
        <div>
          <h2>Settings</h2>
          <p>Configure application settings and preferences</p>
        </div>
        <button
          className="btn-reset"
          onClick={handleResetSettings}
          disabled={resetting}
          style={{
            padding: '10px 20px',
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          {resetting ? (
            <><i className="fas fa-spinner fa-spin"></i> Resetting...</>
          ) : (
            <><i className="fas fa-undo"></i> Reset to Defaults</>
          )}
        </button>
      </div>

      <div className="settings-container">
        <form onSubmit={handleSubmit} className="settings-form">
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
                  max="999"
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
                padding: '12px 32px',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 6px rgba(16, 185, 129, 0.3)'
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

    </>
  );
};

export default SettingsPage;