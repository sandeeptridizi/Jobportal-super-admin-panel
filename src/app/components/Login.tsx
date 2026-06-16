import { useState } from 'react';
import { Mail, Lock, AlertCircle, Briefcase } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
  onSwitchToSignup: () => void;
  onSwitchToForgotPassword: () => void;
}

export function Login({ onLogin, onSwitchToSignup, onSwitchToForgotPassword }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1000);
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#023047' }}>
      {/* Left side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: '#FFC300' }}
            >
              <Briefcase style={{ color: '#000000' }} size={24} />
            </div>
            <div>
              <h1 style={{ color: '#f6f6f6', fontSize: '24px', fontWeight: '600', margin: 0 }}>
                JobPortal
              </h1>
              <p style={{ color: '#d3d3d3', fontSize: '14px', margin: 0 }}>
                Super Admin Panel
              </p>
            </div>
          </div>

          {/* Welcome Text */}
          <div className="mb-8">
            <h2 style={{ color: '#f6f6f6', fontSize: '28px', fontWeight: '600', marginBottom: '8px' }}>
              Welcome Back
            </h2>
            <p style={{ color: '#d3d3d3', fontSize: '16px' }}>
              Sign in to access your admin dashboard
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div
              className="mb-6 p-4 rounded-lg flex items-start gap-3"
              style={{ backgroundColor: '#fff5f5', border: '1px solid #fed7d7' }}
            >
              <AlertCircle size={20} style={{ color: '#c53030', flexShrink: 0, marginTop: '2px' }} />
              <p style={{ color: '#c53030', fontSize: '14px', margin: 0 }}>
                {error}
              </p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-4">
              <label
                htmlFor="email"
                style={{ color: '#f6f6f6', fontSize: '14px', fontWeight: '500', display: 'block', marginBottom: '8px' }}
              >
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={20}
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#6f6f6f'
                  }}
                />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@jobportal.com"
                  style={{
                    width: '100%',
                    padding: '12px 12px 12px 44px',
                    border: '1px solid #d3d3d3',
                    borderRadius: '8px',
                    fontSize: '16px',
                    color: '#000000',
                    backgroundColor: '#ffffff',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#023047'}
                  onBlur={(e) => e.target.style.borderColor = '#d3d3d3'}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label
                htmlFor="password"
                style={{ color: '#f6f6f6', fontSize: '14px', fontWeight: '500', display: 'block', marginBottom: '8px' }}
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  size={20}
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#6f6f6f'
                  }}
                />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  style={{
                    width: '100%',
                    padding: '12px 12px 12px 44px',
                    border: '1px solid #d3d3d3',
                    borderRadius: '8px',
                    fontSize: '16px',
                    color: '#000000',
                    backgroundColor: '#ffffff',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#023047'}
                  onBlur={(e) => e.target.style.borderColor = '#d3d3d3'}
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{
                    width: '18px',
                    height: '18px',
                    cursor: 'pointer',
                    accentColor: '#FFC300'
                  }}
                />
                <span style={{ color: '#d3d3d3', fontSize: '14px' }}>
                  Remember me
                </span>
              </label>
              <button
                type="button"
                onClick={onSwitchToForgotPassword}
                style={{
                  color: '#FFC300',
                  fontSize: '14px',
                  fontWeight: '500',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: isLoading ? '#6f6f6f' : '#FFC300',
                color: '#000000',
                fontSize: '16px',
                fontWeight: '600',
                border: 'none',
                borderRadius: '8px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                marginBottom: '16px'
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = '#000000';
                  e.currentTarget.style.color = '#FFC300';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = '#FFC300';
                  e.currentTarget.style.color = '#000000';
                }
              }}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>

            {/* Sign Up Link */}
            <div className="text-center">
              <span style={{ color: '#d3d3d3', fontSize: '14px' }}>
                Don't have an account?{' '}
              </span>
              <button
                type="button"
                onClick={onSwitchToSignup}
                style={{
                  color: '#FFC300',
                  fontSize: '14px',
                  fontWeight: '600',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right side - Decorative */}
      <div
        className="hidden lg:flex lg:w-1/2 items-center justify-center p-8 relative overflow-hidden"
        style={{ backgroundColor: '#023047' }}
      >
        {/* Background decorative elements */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(255, 195, 0, 0.3) 0%, rgba(255, 195, 0, 0.1) 50%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)'
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            left: '-100px',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(2, 48, 71, 0.4) 0%, rgba(2, 48, 71, 0.2) 50%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)'
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-md text-center">
          <div
            className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: '#FFC300' }}
          >
            <Briefcase size={40} style={{ color: '#000000' }} />
          </div>
          <h2 style={{ color: '#f6f6f6', fontSize: '32px', fontWeight: '600', marginBottom: '16px' }}>
            Manage Your Job Portal
          </h2>
          <p style={{ color: '#d3d3d3', fontSize: '18px', lineHeight: '1.6' }}>
            Access powerful tools to manage jobs, internships, freelance gigs, users, and companies all in one place.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-12">
            <div
              className="p-4 rounded-lg"
              style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', border: '1px solid rgba(255, 195, 0, 0.3)' }}
            >
              <div style={{ color: '#FFC300', fontSize: '24px', fontWeight: '600' }}>
                10K+
              </div>
              <div style={{ color: '#d3d3d3', fontSize: '12px' }}>
                Active Jobs
              </div>
            </div>
            <div
              className="p-4 rounded-lg"
              style={{ backgroundColor: 'rgba(2, 48, 71, 0.3)', border: '1px solid rgba(2, 48, 71, 0.5)' }}
            >
              <div style={{ color: '#f6f6f6', fontSize: '24px', fontWeight: '600' }}>
                50K+
              </div>
              <div style={{ color: '#d3d3d3', fontSize: '12px' }}>
                Users
              </div>
            </div>
            <div
              className="p-4 rounded-lg"
              style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', border: '1px solid rgba(255, 195, 0, 0.3)' }}
            >
              <div style={{ color: '#FFC300', fontSize: '24px', fontWeight: '600' }}>
                5K+
              </div>
              <div style={{ color: '#d3d3d3', fontSize: '12px' }}>
                Companies
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}