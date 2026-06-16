import { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle, Briefcase } from 'lucide-react';

interface ForgotPasswordProps {
  onBackToLogin: () => void;
}

export function ForgotPassword({ onBackToLogin }: ForgotPasswordProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  const handleBackToLogin = () => {
    setIsSuccess(false);
    setEmail('');
    onBackToLogin();
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#023047' }}>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: '#FFC300' }}
            >
              <Briefcase style={{ color: '#023047' }} size={24} />
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

          {!isSuccess ? (
            <>
              <button
                onClick={onBackToLogin}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#FFC300',
                  fontSize: '14px',
                  fontWeight: '500',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  marginBottom: '24px',
                  padding: 0
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#d3d3d3';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#FFC300';
                }}
              >
                <ArrowLeft size={18} />
                Back to Login
              </button>

              <div className="mb-8">
                <h2 style={{ color: '#f6f6f6', fontSize: '28px', fontWeight: '600', marginBottom: '8px' }}>
                  Forgot Password?
                </h2>
                <p style={{ color: '#d3d3d3', fontSize: '16px' }}>
                  No worries! Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
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
                      required
                      style={{
                        width: '100%',
                        padding: '12px 12px 12px 44px',
                        border: '1px solid #d3d3d3',
                        borderRadius: '8px',
                        fontSize: '16px',
                        color: '#023047',
                        backgroundColor: '#ffffff',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#FFC300'}
                      onBlur={(e) => e.target.style.borderColor = '#d3d3d3'}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  style={{
                    width: '100%',
                    padding: '14px',
                    backgroundColor: isLoading ? '#6f6f6f' : '#FFC300',
                    color: '#023047',
                    fontSize: '16px',
                    fontWeight: '600',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (!isLoading) {
                      e.currentTarget.style.backgroundColor = '#023047';
                      e.currentTarget.style.color = '#FFC300';
                      e.currentTarget.style.border = '2px solid #FFC300';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isLoading) {
                      e.currentTarget.style.backgroundColor = '#FFC300';
                      e.currentTarget.style.color = '#023047';
                      e.currentTarget.style.border = 'none';
                    }
                  }}
                >
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div
                className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                style={{
                  background: 'radial-gradient(circle, rgba(255, 195, 0, 0.3) 0%, rgba(255, 195, 0, 0.1) 70%)',
                  border: '3px solid #FFC300'
                }}
              >
                <CheckCircle size={48} style={{ color: '#FFC300' }} />
              </div>

              <h2 style={{ color: '#f6f6f6', fontSize: '28px', fontWeight: '600', marginBottom: '12px' }}>
                Check Your Email
              </h2>
              
              <p style={{ color: '#d3d3d3', fontSize: '16px', marginBottom: '24px', lineHeight: '1.6' }}>
                We've sent a password reset link to <br />
                <span style={{ color: '#FFC300', fontWeight: '500' }}>{email}</span>
              </p>

              <div
                className="p-4 rounded-lg mb-6"
                style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', border: '1px solid rgba(255, 195, 0, 0.3)' }}
              >
                <p style={{ color: '#d3d3d3', fontSize: '14px', margin: 0, lineHeight: '1.6' }}>
                  Didn't receive the email? Check your spam folder or wait a few minutes before requesting another link.
                </p>
              </div>

              <button
                onClick={handleBackToLogin}
                style={{
                  width: '100%',
                  padding: '14px',
                  backgroundColor: '#FFC300',
                  color: '#023047',
                  fontSize: '16px',
                  fontWeight: '600',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#023047';
                  e.currentTarget.style.color = '#FFC300';
                  e.currentTarget.style.border = '2px solid #FFC300';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFC300';
                  e.currentTarget.style.color = '#023047';
                  e.currentTarget.style.border = 'none';
                }}
              >
                Back to Login
              </button>

              <div className="mt-6">
                <span style={{ color: '#d3d3d3', fontSize: '14px' }}>
                  Didn't receive the email?{' '}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setIsSuccess(false);
                    handleSubmit(new Event('submit') as any);
                  }}
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
                  Resend Link
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        className="hidden lg:flex lg:w-1/2 items-center justify-center p-8 relative overflow-hidden"
        style={{ backgroundColor: '#023047' }}
      >
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

        <div className="relative z-10 max-w-md text-center">
          <div
            className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center"
            style={{
              background: 'radial-gradient(circle, #FFC300 0%, rgba(255, 195, 0, 0.8) 100%)',
              boxShadow: '0 0 40px rgba(255, 195, 0, 0.3)'
            }}
          >
            <Mail size={40} style={{ color: '#023047' }} />
          </div>
          <h2 style={{ color: '#f6f6f6', fontSize: '32px', fontWeight: '600', marginBottom: '16px' }}>
            Password Recovery
          </h2>
          <p style={{ color: '#d3d3d3', fontSize: '18px', lineHeight: '1.6' }}>
            Secure password reset process to regain access to your admin dashboard quickly and safely.
          </p>

          <div className="mt-12 space-y-4">
            <div
              className="p-4 rounded-lg text-left"
              style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', border: '1px solid rgba(255, 195, 0, 0.3)' }}
            >
              <div style={{ color: '#FFC300', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                🔒 Secure Link
              </div>
              <div style={{ color: '#d3d3d3', fontSize: '12px' }}>
                Password reset link expires in 24 hours
              </div>
            </div>
            <div
              className="p-4 rounded-lg text-left"
              style={{ backgroundColor: 'rgba(2, 48, 71, 0.3)', border: '1px solid rgba(2, 48, 71, 0.5)' }}
            >
              <div style={{ color: '#FFC300', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                ✉️ Email Verification
              </div>
              <div style={{ color: '#d3d3d3', fontSize: '12px' }}>
                Sent only to registered email addresses
              </div>
            </div>
            <div
              className="p-4 rounded-lg text-left"
              style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', border: '1px solid rgba(255, 195, 0, 0.3)' }}
            >
              <div style={{ color: '#FFC300', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                ⚡ Quick Process
              </div>
              <div style={{ color: '#d3d3d3', fontSize: '12px' }}>
                Reset your password in just a few clicks
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
