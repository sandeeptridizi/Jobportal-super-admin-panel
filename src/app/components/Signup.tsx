import { useState } from 'react';
import { Mail, Lock, User, Phone, AlertCircle, CheckCircle, Briefcase } from 'lucide-react';

interface SignupProps {
  onSignup: () => void;
  onSwitchToLogin: () => void;
}

export function Signup({ onSignup, onSwitchToLogin }: SignupProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const passwordStrength = (password: string) => {
    if (password.length === 0) return null;
    if (password.length < 6) return 'weak';
    if (password.length < 10 && /[A-Z]/.test(password) && /[0-9]/.test(password)) return 'medium';
    if (password.length >= 10 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*]/.test(password)) return 'strong';
    return 'medium';
  };

  const strength = passwordStrength(formData.password);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onSignup();
    }, 1000);
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#023047' }}>
      {/* Left side - Decorative */}
      <div
        className="hidden lg:flex lg:w-2/5 items-center justify-center p-8 relative overflow-hidden"
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
        <div className="relative z-10 max-w-md">
          <div
            className="w-20 h-20 mb-6 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: '#FFC300' }}
          >
            <Briefcase size={40} style={{ color: '#000000' }} />
          </div>
          <h2 style={{ color: '#f6f6f6', fontSize: '32px', fontWeight: '600', marginBottom: '16px' }}>
            Join Our Admin Team
          </h2>
          <p style={{ color: '#d3d3d3', fontSize: '18px', lineHeight: '1.6', marginBottom: '24px' }}>
            Get access to comprehensive tools for managing jobs, users, companies, and analytics.
          </p>

          {/* Features List */}
          <div className="space-y-4">
            {[
              'Manage Jobs, Internships & Freelance Gigs',
              'Track Users & Companies',
              'Advanced Analytics & Reports',
              'Real-time Notifications'
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(255, 195, 0, 0.2)' }}
                >
                  <CheckCircle size={18} style={{ color: '#FFC300' }} />
                </div>
                <span style={{ color: '#d3d3d3', fontSize: '16px' }}>
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side - Signup Form */}
      <div className="w-full lg:w-3/5 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-6">
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
          <div className="mb-6">
            <h2 style={{ color: '#f6f6f6', fontSize: '28px', fontWeight: '600', marginBottom: '8px' }}>
              Create Admin Account
            </h2>
            <p style={{ color: '#d3d3d3', fontSize: '16px' }}>
              Fill in your details to get started
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div
              className="mb-4 p-4 rounded-lg flex items-start gap-3"
              style={{ backgroundColor: '#fff5f5', border: '1px solid #fed7d7' }}
            >
              <AlertCircle size={20} style={{ color: '#c53030', flexShrink: 0, marginTop: '2px' }} />
              <p style={{ color: '#c53030', fontSize: '14px', margin: 0 }}>
                {error}
              </p>
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="mb-4">
              <label
                htmlFor="fullName"
                style={{ color: '#f6f6f6', fontSize: '14px', fontWeight: '500', display: 'block', marginBottom: '8px' }}
              >
                Full Name
              </label>
              <div className="relative">
                <User
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
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  placeholder="John Doe"
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

            {/* Email */}
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
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
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

            {/* Phone */}
            <div className="mb-4">
              <label
                htmlFor="phone"
                style={{ color: '#f6f6f6', fontSize: '14px', fontWeight: '500', display: 'block', marginBottom: '8px' }}
              >
                Phone Number
              </label>
              <div className="relative">
                <Phone
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
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="+1 (555) 000-0000"
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

            {/* Password */}
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
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  placeholder="Create a strong password"
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
              {/* Password Strength Indicator */}
              {strength && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    <div
                      style={{
                        flex: 1,
                        height: '4px',
                        borderRadius: '2px',
                        backgroundColor: strength === 'weak' ? '#c53030' : strength === 'medium' ? '#FFC300' : '#38a169'
                      }}
                    />
                    <div
                      style={{
                        flex: 1,
                        height: '4px',
                        borderRadius: '2px',
                        backgroundColor: strength === 'medium' || strength === 'strong' ? (strength === 'medium' ? '#FFC300' : '#38a169') : '#d3d3d3'
                      }}
                    />
                    <div
                      style={{
                        flex: 1,
                        height: '4px',
                        borderRadius: '2px',
                        backgroundColor: strength === 'strong' ? '#38a169' : '#d3d3d3'
                      }}
                    />
                  </div>
                  <p style={{ 
                    color: strength === 'weak' ? '#c53030' : strength === 'medium' ? '#d69e2e' : '#38a169',
                    fontSize: '12px',
                    marginTop: '4px'
                  }}>
                    Password strength: {strength}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                style={{ color: '#f6f6f6', fontSize: '14px', fontWeight: '500', display: 'block', marginBottom: '8px' }}
              >
                Confirm Password
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
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  placeholder="Confirm your password"
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

            {/* Terms and Conditions */}
            <div className="mb-6">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  style={{
                    width: '18px',
                    height: '18px',
                    cursor: 'pointer',
                    marginTop: '2px',
                    accentColor: '#FFC300',
                    flexShrink: 0
                  }}
                />
                <span style={{ color: '#d3d3d3', fontSize: '14px', lineHeight: '1.4' }}>
                  I agree to the{' '}
                  <button
                    type="button"
                    style={{
                      color: '#FFC300',
                      fontWeight: '500',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      padding: 0
                    }}
                  >
                    Terms and Conditions
                  </button>
                  {' '}and{' '}
                  <button
                    type="button"
                    style={{
                      color: '#FFC300',
                      fontWeight: '500',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      padding: 0
                    }}
                  >
                    Privacy Policy
                  </button>
                </span>
              </label>
            </div>

            {/* Signup Button */}
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
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>

            {/* Login Link */}
            <div className="text-center">
              <span style={{ color: '#d3d3d3', fontSize: '14px' }}>
                Already have an account?{' '}
              </span>
              <button
                type="button"
                onClick={onSwitchToLogin}
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
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}