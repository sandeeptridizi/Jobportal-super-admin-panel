import { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Shield, Key, Bell, Globe, Lock, Edit2, Save, X, Camera, Briefcase, Building2, Clock } from 'lucide-react';

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'preferences'>('profile');
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [profileData, setProfileData] = useState({
    name: 'Admin User',
    email: 'admin@jobportal.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    role: 'Super Admin',
    department: 'Administration',
    joinedDate: '2023-01-15',
    employeeId: 'ADMIN-001',
    bio: 'Experienced administrator managing the job portal platform with expertise in HR technology and talent acquisition systems.',
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    loginAlerts: true,
    sessionTimeout: '30',
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    weeklyReports: true,
    applicationAlerts: true,
    language: 'en',
    timezone: 'America/New_York',
    theme: 'dark',
  });

  const activityLog = [
    { id: 1, action: 'Updated company verification status', timestamp: '2024-12-08 10:30 AM', ip: '192.168.1.1' },
    { id: 2, action: 'Reviewed job applications', timestamp: '2024-12-08 09:15 AM', ip: '192.168.1.1' },
    { id: 3, action: 'Created new employee account', timestamp: '2024-12-07 04:45 PM', ip: '192.168.1.1' },
    { id: 4, action: 'Updated system settings', timestamp: '2024-12-07 02:20 PM', ip: '192.168.1.1' },
    { id: 5, action: 'Generated income report', timestamp: '2024-12-07 11:30 AM', ip: '192.168.1.1' },
  ];

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 
          style={{ 
            color: '#FFC300',
            fontSize: '2.5rem',
            fontWeight: '800',
            letterSpacing: '-0.02em',
            textShadow: '0 0 30px rgba(255, 195, 0, 0.3), 0 0 60px rgba(255, 195, 0, 0.2)'
          }}
        >
          My Profile
        </h1>
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
            style={{ backgroundColor: '#FFC300', color: '#023047' }}
          >
            <Edit2 className="w-5 h-5" />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button 
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
              style={{ border: '1px solid #6f6f6f', color: '#d3d3d3' }}
            >
              <X className="w-5 h-5" />
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
              style={{ backgroundColor: '#023047', color: '#f6f6f6' }}
            >
              <Save className="w-5 h-5" />
              Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
        <div className="flex items-start gap-6">
          <div className="relative">
            <div 
              className="w-32 h-32 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #FFC300 0%, #023047 100%)' }}
            >
              <User className="w-16 h-16" style={{ color: '#f6f6f6' }} />
            </div>
            {isEditing && (
              <button 
                className="absolute bottom-0 right-0 w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#FFC300', color: '#023047' }}
              >
                <Camera className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>
                  {profileData.name}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span 
                    className="px-3 py-1 rounded-full text-sm"
                    style={{ backgroundColor: '#FFC300', color: '#023047' }}
                  >
                    {profileData.role}
                  </span>
                  <span 
                    className="px-3 py-1 rounded-full text-sm"
                    style={{ backgroundColor: '#023047', color: '#f6f6f6' }}
                  >
                    {profileData.department}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Employee ID</p>
                <p style={{ color: '#f6f6f6', fontWeight: '600' }}>{profileData.employeeId}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5" style={{ color: '#FFC300' }} />
                <div>
                  <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>Email</p>
                  <p style={{ color: '#f6f6f6' }}>{profileData.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5" style={{ color: '#FFC300' }} />
                <div>
                  <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>Phone</p>
                  <p style={{ color: '#f6f6f6' }}>{profileData.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5" style={{ color: '#FFC300' }} />
                <div>
                  <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>Location</p>
                  <p style={{ color: '#f6f6f6' }}>{profileData.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5" style={{ color: '#FFC300' }} />
                <div>
                  <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>Joined</p>
                  <p style={{ color: '#f6f6f6' }}>{profileData.joinedDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderBottom: '1px solid #6f6f6f' }}>
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab('profile')}
            className="pb-3 px-1 transition-colors"
            style={{
              borderBottom: activeTab === 'profile' ? '2px solid #FFC300' : '2px solid transparent',
              color: activeTab === 'profile' ? '#FFC300' : '#d3d3d3'
            }}
          >
            Profile Information
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className="pb-3 px-1 transition-colors"
            style={{
              borderBottom: activeTab === 'security' ? '2px solid #FFC300' : '2px solid transparent',
              color: activeTab === 'security' ? '#FFC300' : '#d3d3d3'
            }}
          >
            Security
          </button>
          <button
            onClick={() => setActiveTab('preferences')}
            className="pb-3 px-1 transition-colors"
            style={{
              borderBottom: activeTab === 'preferences' ? '2px solid #FFC300' : '2px solid transparent',
              color: activeTab === 'preferences' ? '#FFC300' : '#d3d3d3'
            }}
          >
            Preferences
          </button>
        </div>
      </div>

      {activeTab === 'profile' && (
        <div className="space-y-6">
          <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <h3 className="mb-4" style={{ color: '#FFC300' }}>Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2" style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Full Name</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{
                    backgroundColor: isEditing ? '#f6f6f6' : '#023047',
                    border: '1px solid #6f6f6f',
                    color: isEditing ? '#023047' : '#d3d3d3'
                  }}
                />
              </div>
              <div>
                <label className="block mb-2" style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{
                    backgroundColor: isEditing ? '#f6f6f6' : '#023047',
                    border: '1px solid #6f6f6f',
                    color: isEditing ? '#023047' : '#d3d3d3'
                  }}
                />
              </div>
              <div>
                <label className="block mb-2" style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Phone</label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{
                    backgroundColor: isEditing ? '#f6f6f6' : '#023047',
                    border: '1px solid #6f6f6f',
                    color: isEditing ? '#023047' : '#d3d3d3'
                  }}
                />
              </div>
              <div>
                <label className="block mb-2" style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Location</label>
                <input
                  type="text"
                  value={profileData.location}
                  onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{
                    backgroundColor: isEditing ? '#f6f6f6' : '#023047',
                    border: '1px solid #6f6f6f',
                    color: isEditing ? '#023047' : '#d3d3d3'
                  }}
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block mb-2" style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Bio</label>
              <textarea
                value={profileData.bio}
                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                disabled={!isEditing}
                rows={4}
                className="w-full px-4 py-2 rounded-lg"
                style={{
                  backgroundColor: isEditing ? '#f6f6f6' : '#023047',
                  border: '1px solid #6f6f6f',
                  color: isEditing ? '#023047' : '#d3d3d3'
                }}
              />
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <h3 className="mb-4" style={{ color: '#FFC300' }}>Recent Activity</h3>
            <div className="space-y-3">
              {activityLog.map((activity) => (
                <div 
                  key={activity.id}
                  className="flex items-start gap-3 p-3 rounded-lg"
                  style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#023047' }}>
                    <Shield className="w-4 h-4" style={{ color: '#f6f6f6' }} />
                  </div>
                  <div className="flex-1">
                    <p style={{ color: '#f6f6f6', fontSize: '0.875rem' }}>{activity.action}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>
                        <Clock className="w-3 h-3 inline mr-1" />
                        {activity.timestamp}
                      </span>
                      <span style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>
                        IP: {activity.ip}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="space-y-6">
          <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <h3 className="mb-4" style={{ color: '#FFC300' }}>Password</h3>
            <p className="mb-4" style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>
              Last changed: November 15, 2024
            </p>
            <button 
              onClick={() => setShowPasswordModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
              style={{ backgroundColor: '#FFC300', color: '#023047' }}
            >
              <Key className="w-5 h-5" />
              Change Password
            </button>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <h3 className="mb-4" style={{ color: '#FFC300' }}>Security Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: '#023047' }}>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5" style={{ color: '#FFC300' }} />
                  <div>
                    <p style={{ color: '#f6f6f6' }}>Two-Factor Authentication</p>
                    <p style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Add an extra layer of security</p>
                  </div>
                </div>
                <label className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    checked={securitySettings.twoFactorAuth}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, twoFactorAuth: e.target.checked })}
                    className="opacity-0 w-0 h-0"
                  />
                  <span 
                    className="absolute cursor-pointer inset-0 rounded-full transition-all"
                    style={{ 
                      backgroundColor: securitySettings.twoFactorAuth ? '#FFC300' : '#6f6f6f',
                    }}
                  >
                    <span
                      className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-all"
                      style={{
                        transform: securitySettings.twoFactorAuth ? 'translateX(24px)' : 'translateX(0)'
                      }}
                    />
                  </span>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: '#023047' }}>
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5" style={{ color: '#FFC300' }} />
                  <div>
                    <p style={{ color: '#f6f6f6' }}>Login Alerts</p>
                    <p style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Get notified of new login attempts</p>
                  </div>
                </div>
                <label className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    checked={securitySettings.loginAlerts}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, loginAlerts: e.target.checked })}
                    className="opacity-0 w-0 h-0"
                  />
                  <span 
                    className="absolute cursor-pointer inset-0 rounded-full transition-all"
                    style={{ 
                      backgroundColor: securitySettings.loginAlerts ? '#FFC300' : '#6f6f6f',
                    }}
                  >
                    <span
                      className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-all"
                      style={{
                        transform: securitySettings.loginAlerts ? 'translateX(24px)' : 'translateX(0)'
                      }}
                    />
                  </span>
                </label>
              </div>

              <div className="p-4 rounded-lg" style={{ backgroundColor: '#023047' }}>
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-5 h-5" style={{ color: '#FFC300' }} />
                  <div>
                    <p style={{ color: '#f6f6f6' }}>Session Timeout</p>
                    <p style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Auto logout after inactivity</p>
                  </div>
                </div>
                <select
                  value={securitySettings.sessionTimeout}
                  onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="120">2 hours</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'preferences' && (
        <div className="space-y-6">
          <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <h3 className="mb-4" style={{ color: '#FFC300' }}>Notification Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: '#023047' }}>
                <div>
                  <p style={{ color: '#f6f6f6' }}>Email Notifications</p>
                  <p style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Receive notifications via email</p>
                </div>
                <label className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    checked={preferences.emailNotifications}
                    onChange={(e) => setPreferences({ ...preferences, emailNotifications: e.target.checked })}
                    className="opacity-0 w-0 h-0"
                  />
                  <span 
                    className="absolute cursor-pointer inset-0 rounded-full transition-all"
                    style={{ 
                      backgroundColor: preferences.emailNotifications ? '#FFC300' : '#6f6f6f',
                    }}
                  >
                    <span
                      className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-all"
                      style={{
                        transform: preferences.emailNotifications ? 'translateX(24px)' : 'translateX(0)'
                      }}
                    />
                  </span>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: '#023047' }}>
                <div>
                  <p style={{ color: '#f6f6f6' }}>Push Notifications</p>
                  <p style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Receive push notifications</p>
                </div>
                <label className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    checked={preferences.pushNotifications}
                    onChange={(e) => setPreferences({ ...preferences, pushNotifications: e.target.checked })}
                    className="opacity-0 w-0 h-0"
                  />
                  <span 
                    className="absolute cursor-pointer inset-0 rounded-full transition-all"
                    style={{ 
                      backgroundColor: preferences.pushNotifications ? '#FFC300' : '#6f6f6f',
                    }}
                  >
                    <span
                      className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-all"
                      style={{
                        transform: preferences.pushNotifications ? 'translateX(24px)' : 'translateX(0)'
                      }}
                    />
                  </span>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: '#023047' }}>
                <div>
                  <p style={{ color: '#f6f6f6' }}>Weekly Reports</p>
                  <p style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Receive weekly summary reports</p>
                </div>
                <label className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    checked={preferences.weeklyReports}
                    onChange={(e) => setPreferences({ ...preferences, weeklyReports: e.target.checked })}
                    className="opacity-0 w-0 h-0"
                  />
                  <span 
                    className="absolute cursor-pointer inset-0 rounded-full transition-all"
                    style={{ 
                      backgroundColor: preferences.weeklyReports ? '#FFC300' : '#6f6f6f',
                    }}
                  >
                    <span
                      className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-all"
                      style={{
                        transform: preferences.weeklyReports ? 'translateX(24px)' : 'translateX(0)'
                      }}
                    />
                  </span>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: '#023047' }}>
                <div>
                  <p style={{ color: '#f6f6f6' }}>Application Alerts</p>
                  <p style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Get notified of new applications</p>
                </div>
                <label className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    checked={preferences.applicationAlerts}
                    onChange={(e) => setPreferences({ ...preferences, applicationAlerts: e.target.checked })}
                    className="opacity-0 w-0 h-0"
                  />
                  <span 
                    className="absolute cursor-pointer inset-0 rounded-full transition-all"
                    style={{ 
                      backgroundColor: preferences.applicationAlerts ? '#FFC300' : '#6f6f6f',
                    }}
                  >
                    <span
                      className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-all"
                      style={{
                        transform: preferences.applicationAlerts ? 'translateX(24px)' : 'translateX(0)'
                      }}
                    />
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <h3 className="mb-4" style={{ color: '#FFC300' }}>Regional Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block mb-2" style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Language</label>
                <select
                  value={preferences.language}
                  onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
              <div>
                <label className="block mb-2" style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Timezone</label>
                <select
                  value={preferences.timezone}
                  onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                >
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                </select>
              </div>
              <div>
                <label className="block mb-2" style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Theme</label>
                <select
                  value={preferences.theme}
                  onChange={(e) => setPreferences({ ...preferences, theme: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                >
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                  <option value="auto">Auto</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="rounded-lg max-w-md w-full" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <div className="p-6" style={{ borderBottom: '1px solid #6f6f6f' }}>
              <div className="flex items-center justify-between">
                <h2 style={{ color: '#FFC300', fontSize: '1.5rem', fontWeight: '700' }}>Change Password</h2>
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="p-1 rounded-lg transition-colors"
                  style={{ color: '#d3d3d3' }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block mb-2" style={{ color: '#f6f6f6' }}>Current Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 rounded-lg focus:outline-none"
                  style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                />
              </div>
              <div>
                <label className="block mb-2" style={{ color: '#f6f6f6' }}>New Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 rounded-lg focus:outline-none"
                  style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                />
              </div>
              <div>
                <label className="block mb-2" style={{ color: '#f6f6f6' }}>Confirm New Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 rounded-lg focus:outline-none"
                  style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                />
              </div>
            </div>
            <div className="p-6 flex gap-3 justify-end" style={{ borderTop: '1px solid #6f6f6f' }}>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="px-4 py-2 rounded-lg transition-colors"
                style={{ border: '1px solid #6f6f6f', color: '#d3d3d3' }}
              >
                Cancel
              </button>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="px-4 py-2 rounded-lg transition-colors"
                style={{ backgroundColor: '#FFC300', color: '#023047' }}
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}