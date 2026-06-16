import { useState } from 'react';
import { Save, Bell, Shield, Mail, Globe, Database, Users, Palette } from 'lucide-react';

export function Settings() {
  const [activeTab, setActiveTab] = useState<'general' | 'notifications' | 'security' | 'email' | 'integrations'>('general');

  return (
    <div className="space-y-6">
      <div>
        <h1 
          style={{ 
            color: '#FFC300',
            fontSize: '2.5rem',
            fontWeight: '800',
            letterSpacing: '-0.02em',
            textShadow: '0 0 30px rgba(255, 195, 0, 0.3), 0 0 60px rgba(255, 195, 0, 0.2)',
            marginBottom: '0.25rem'
          }}
        >
          Settings
        </h1>
        <p className="mt-1" style={{ color: '#6f6f6f' }}>Manage your admin panel settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="rounded-lg p-2" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <button
              onClick={() => setActiveTab('general')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
              style={{
                backgroundColor: activeTab === 'general' ? '#FFC300' : 'transparent',
                color: activeTab === 'general' ? '#023047' : '#d3d3d3'
              }}
            >
              <Globe className="w-5 h-5" />
              <span>General</span>
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
              style={{
                backgroundColor: activeTab === 'notifications' ? '#FFC300' : 'transparent',
                color: activeTab === 'notifications' ? '#023047' : '#d3d3d3'
              }}
            >
              <Bell className="w-5 h-5" />
              <span>Notifications</span>
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
              style={{
                backgroundColor: activeTab === 'security' ? '#FFC300' : 'transparent',
                color: activeTab === 'security' ? '#023047' : '#d3d3d3'
              }}
            >
              <Shield className="w-5 h-5" />
              <span>Security</span>
            </button>
            <button
              onClick={() => setActiveTab('email')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
              style={{
                backgroundColor: activeTab === 'email' ? '#FFC300' : 'transparent',
                color: activeTab === 'email' ? '#023047' : '#d3d3d3'
              }}
            >
              <Mail className="w-5 h-5" />
              <span>Email</span>
            </button>
            <button
              onClick={() => setActiveTab('integrations')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
              style={{
                backgroundColor: activeTab === 'integrations' ? '#FFC300' : 'transparent',
                color: activeTab === 'integrations' ? '#023047' : '#d3d3d3'
              }}
            >
              <Database className="w-5 h-5" />
              <span>Integrations</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="rounded-lg" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            {activeTab === 'general' && (
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="mb-4" style={{ color: '#FFC300' }}>General Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block mb-2" style={{ color: '#f6f6f6' }}>Platform Name</label>
                      <input type="text" defaultValue="JobPortal" className="w-full px-4 py-2 rounded-lg focus:outline-none" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }} />
                    </div>
                    <div>
                      <label className="block mb-2" style={{ color: '#f6f6f6' }}>Platform URL</label>
                      <input type="text" defaultValue="https://jobportal.com" className="w-full px-4 py-2 rounded-lg focus:outline-none" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }} />
                    </div>
                    <div>
                      <label className="block mb-2" style={{ color: '#f6f6f6' }}>Support Email</label>
                      <input type="email" defaultValue="support@jobportal.com" className="w-full px-4 py-2 rounded-lg focus:outline-none" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }} />
                    </div>
                    <div>
                      <label className="block mb-2" style={{ color: '#f6f6f6' }}>Timezone</label>
                      <select className="w-full px-4 py-2 rounded-lg focus:outline-none" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}>
                        <option>UTC-5 (Eastern Time)</option>
                        <option>UTC-6 (Central Time)</option>
                        <option>UTC-7 (Mountain Time)</option>
                        <option>UTC-8 (Pacific Time)</option>
                      </select>
                    </div>
                    <div>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span style={{ color: '#f6f6f6' }}>Enable user registration</span>
                      </label>
                    </div>
                    <div>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span style={{ color: '#f6f6f6' }}>Require email verification</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="mb-4" style={{ color: '#FFC300' }}>Notification Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid #6f6f6f' }}>
                      <div>
                        <p style={{ color: '#f6f6f6' }}>New job applications</p>
                        <p style={{ color: '#d3d3d3' }}>Get notified when candidates apply</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid #6f6f6f' }}>
                      <div>
                        <p style={{ color: '#f6f6f6' }}>New user registrations</p>
                        <p style={{ color: '#d3d3d3' }}>Get notified of new user sign-ups</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid #6f6f6f' }}>
                      <div>
                        <p style={{ color: '#f6f6f6' }}>Job postings pending approval</p>
                        <p style={{ color: '#d3d3d3' }}>Alert when jobs need review</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid #6f6f6f' }}>
                      <div>
                        <p style={{ color: '#f6f6f6' }}>Daily summary reports</p>
                        <p style={{ color: '#d3d3d3' }}>Receive daily activity summaries</p>
                      </div>
                      <input type="checkbox" className="rounded" />
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <div>
                        <p style={{ color: '#f6f6f6' }}>Weekly analytics</p>
                        <p style={{ color: '#d3d3d3' }}>Get weekly performance reports</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="mb-4" style={{ color: '#FFC300' }}>Security Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block mb-2" style={{ color: '#f6f6f6' }}>Current Password</label>
                      <input type="password" className="w-full px-4 py-2 rounded-lg focus:outline-none" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }} />
                    </div>
                    <div>
                      <label className="block mb-2" style={{ color: '#f6f6f6' }}>New Password</label>
                      <input type="password" className="w-full px-4 py-2 rounded-lg focus:outline-none" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }} />
                    </div>
                    <div>
                      <label className="block mb-2" style={{ color: '#f6f6f6' }}>Confirm New Password</label>
                      <input type="password" className="w-full px-4 py-2 rounded-lg focus:outline-none" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }} />
                    </div>
                    <div className="pt-4" style={{ borderTop: '1px solid #6f6f6f' }}>
                      <h4 className="mb-3" style={{ color: '#FFC300' }}>Two-Factor Authentication</h4>
                      <div>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" />
                          <span style={{ color: '#f6f6f6' }}>Enable two-factor authentication</span>
                        </label>
                      </div>
                    </div>
                    <div className="pt-4" style={{ borderTop: '1px solid #6f6f6f' }}>
                      <h4 className="mb-3" style={{ color: '#FFC300' }}>Session Management</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="flex items-center gap-2">
                            <input type="checkbox" defaultChecked className="rounded" />
                            <span style={{ color: '#f6f6f6' }}>Auto-logout after 30 minutes of inactivity</span>
                          </label>
                        </div>
                        <div>
                          <label className="flex items-center gap-2">
                            <input type="checkbox" className="rounded" />
                            <span style={{ color: '#f6f6f6' }}>Require re-authentication for sensitive actions</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'email' && (
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="mb-4" style={{ color: '#FFC300' }}>Email Configuration</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block mb-2" style={{ color: '#f6f6f6' }}>SMTP Host</label>
                      <input type="text" placeholder="smtp.example.com" className="w-full px-4 py-2 rounded-lg focus:outline-none" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-2" style={{ color: '#f6f6f6' }}>SMTP Port</label>
                        <input type="text" placeholder="587" className="w-full px-4 py-2 rounded-lg focus:outline-none" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }} />
                      </div>
                      <div>
                        <label className="block mb-2" style={{ color: '#f6f6f6' }}>Encryption</label>
                        <select className="w-full px-4 py-2 rounded-lg focus:outline-none" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}>
                          <option>TLS</option>
                          <option>SSL</option>
                          <option>None</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block mb-2" style={{ color: '#f6f6f6' }}>SMTP Username</label>
                      <input type="text" className="w-full px-4 py-2 rounded-lg focus:outline-none" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }} />
                    </div>
                    <div>
                      <label className="block mb-2" style={{ color: '#f6f6f6' }}>SMTP Password</label>
                      <input type="password" className="w-full px-4 py-2 rounded-lg focus:outline-none" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }} />
                    </div>
                    <div>
                      <label className="block mb-2" style={{ color: '#f6f6f6' }}>From Email</label>
                      <input type="email" placeholder="noreply@jobportal.com" className="w-full px-4 py-2 rounded-lg focus:outline-none" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }} />
                    </div>
                    <div>
                      <label className="block mb-2" style={{ color: '#f6f6f6' }}>From Name</label>
                      <input type="text" placeholder="JobPortal" className="w-full px-4 py-2 rounded-lg focus:outline-none" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }} />
                    </div>
                    <button className="px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: '#FFC300', color: '#023047' }}>
                      Test Email Configuration
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'integrations' && (
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="mb-4" style={{ color: '#FFC300' }}>Third-Party Integrations</h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg" style={{ border: '1px solid #6f6f6f' }}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#023047' }}>
                            <Database className="w-5 h-5" style={{ color: '#f6f6f6' }} />
                          </div>
                          <div>
                            <p style={{ color: '#f6f6f6' }}>LinkedIn Integration</p>
                            <p style={{ color: '#d3d3d3' }}>Import job postings from LinkedIn</p>
                          </div>
                        </div>
                        <button className="px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: '#FFC300', color: '#023047' }}>
                          Connect
                        </button>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg" style={{ border: '1px solid #6f6f6f' }}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
                            <Database className="w-5 h-5" style={{ color: '#023047' }} />
                          </div>
                          <div>
                            <p style={{ color: '#f6f6f6' }}>Indeed Integration</p>
                            <p style={{ color: '#d3d3d3' }}>Sync jobs with Indeed</p>
                          </div>
                        </div>
                        <button className="px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: '#FFC300', color: '#023047' }}>
                          Connected
                        </button>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg" style={{ border: '1px solid #6f6f6f' }}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#023047' }}>
                            <Mail className="w-5 h-5" style={{ color: '#f6f6f6' }} />
                          </div>
                          <div>
                            <p style={{ color: '#f6f6f6' }}>SendGrid</p>
                            <p style={{ color: '#d3d3d3' }}>Email delivery service</p>
                          </div>
                        </div>
                        <button className="px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: '#FFC300', color: '#023047' }}>
                          Connect
                        </button>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg" style={{ border: '1px solid #6f6f6f' }}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#6f6f6f' }}>
                            <Users className="w-5 h-5" style={{ color: '#f6f6f6' }} />
                          </div>
                          <div>
                            <p style={{ color: '#f6f6f6' }}>Google Analytics</p>
                            <p style={{ color: '#d3d3d3' }}>Track user behavior and metrics</p>
                          </div>
                        </div>
                        <button className="px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: '#FFC300', color: '#023047' }}>
                          Connected
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="p-6 flex justify-end" style={{ borderTop: '1px solid #6f6f6f' }}>
              <button className="flex items-center gap-2 px-6 py-2 rounded-lg transition-colors" style={{ backgroundColor: '#FFC300', color: '#023047' }}>
                <Save className="w-5 h-5" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}