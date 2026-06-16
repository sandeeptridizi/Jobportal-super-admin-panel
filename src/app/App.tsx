import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { JobManagement } from './components/JobManagement';
import { InternshipHub } from './components/InternshipHub';
import { FreelanceGigs } from './components/FreelanceGigs';
import { UserManagement } from './components/UserManagement';
import { Categories } from './components/Categories';
import { Companies } from './components/Companies';
import { Reports } from './components/Reports';
import { Settings } from './components/Settings';
import { ColdLeads } from './components/ColdLeads';
import { Income } from './components/Income';
import { Employees } from './components/Employees';
import { Notifications } from './components/Notifications';
import { Profile } from './components/Profile';
import { Support } from './components/Support';
import { Tasks } from './components/Tasks';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { ForgotPassword } from './components/ForgotPassword';
import { Institutes } from './components/Institutes';
import { Courses } from './components/Courses';
import { Tutors } from './components/Tutors';
import { Analytics } from './components/Analytics';
import { Finance } from './components/Finance';

export type Page = 'dashboard' | 'tasks' | 'jobs' | 'internships' | 'freelance' | 'users' | 'categories' | 'companies' | 'cold-leads' | 'income' | 'employees' | 'reports' | 'settings' | 'notifications' | 'profile' | 'support' | 'institutes' | 'courses' | 'tutors' | 'analytics' | 'finance';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'signup' | 'forgot-password'>('login');
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Handle login
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Handle signup
  const handleSignup = () => {
    setIsAuthenticated(true);
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthView('login');
  };

  // If not authenticated, show login or signup
  if (!isAuthenticated) {
    if (authView === 'login') {
      return (
        <Login 
          onLogin={handleLogin} 
          onSwitchToSignup={() => setAuthView('signup')}
          onSwitchToForgotPassword={() => setAuthView('forgot-password')}
        />
      );
    } else if (authView === 'signup') {
      return <Signup onSignup={handleSignup} onSwitchToLogin={() => setAuthView('login')} />;
    } else {
      return <ForgotPassword onBackToLogin={() => setAuthView('login')} />;
    }
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard setCurrentPage={setCurrentPage} />;
      case 'tasks':
        return <Tasks />;
      case 'analytics':
        return <Analytics />;
      case 'finance':
        return <Finance />;
      case 'jobs':
        return <JobManagement />;
      case 'internships':
        return <InternshipHub />;
      case 'freelance':
        return <FreelanceGigs />;
      case 'users':
        return <UserManagement />;
      case 'categories':
        return <Categories />;
      case 'companies':
        return <Companies />;
      case 'institutes':
        return <Institutes />;
      case 'courses':
        return <Courses />;
      case 'tutors':
        return <Tutors />;
      case 'cold-leads':
        return <ColdLeads />;
      case 'income':
        return <Income />;
      case 'employees':
        return <Employees />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      case 'notifications':
        return <Notifications />;
      case 'profile':
        return <Profile />;
      case 'support':
        return <Support />;
      default:
        return <Dashboard setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="flex h-screen" style={{ backgroundColor: '#f6f6f6' }}>
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
          setCurrentPage={setCurrentPage}
          onLogout={handleLogout}
        />
        <main 
          className="flex-1 overflow-y-auto p-6"
          style={{
            background: 'linear-gradient(180deg, #023047 0%, #012030 50%, #011520 100%)',
            backgroundAttachment: 'fixed',
            position: 'relative'
          }}
        >
          {/* Yellow accent wave - top */}
          <div 
            style={{
              position: 'absolute',
              top: '-50px',
              right: '-100px',
              width: '600px',
              height: '600px',
              background: 'radial-gradient(ellipse at center, rgba(255, 195, 0, 0.25) 0%, rgba(255, 195, 0, 0.1) 40%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 0,
              borderRadius: '50%',
              filter: 'blur(40px)'
            }}
          />
          
          {/* Dark blue accent - bottom left */}
          <div 
            style={{
              position: 'absolute',
              bottom: '-100px',
              left: '-100px',
              width: '500px',
              height: '500px',
              background: 'radial-gradient(circle, rgba(2, 48, 71, 0.4) 0%, rgba(2, 48, 71, 0.2) 50%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 0,
              borderRadius: '50%',
              filter: 'blur(60px)'
            }}
          />

          {/* Yellow accent - middle right */}
          <div 
            style={{
              position: 'absolute',
              top: '40%',
              right: '10%',
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(255, 195, 0, 0.15) 0%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 0,
              borderRadius: '50%',
              filter: 'blur(50px)'
            }}
          />

          {/* Subtle grid pattern overlay */}
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `
                linear-gradient(rgba(255, 195, 0, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 195, 0, 0.03) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              pointerEvents: 'none',
              zIndex: 0,
              opacity: 0.5
            }}
          />
          
          {/* Content wrapper */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
}