import { Menu, Bell, Search, User, LogOut, Settings } from 'lucide-react';
import { Page } from '../App';
import { useState, useEffect, useRef } from 'react';

interface HeaderProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
  setCurrentPage?: (page: Page) => void;
  onLogout?: () => void;
}

export function Header({ toggleSidebar, sidebarOpen, setCurrentPage, onLogout }: HeaderProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    if (showProfileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileMenu]);

  return (
    <header className="px-6 py-4" style={{ backgroundColor: '#023047', borderBottom: '1px solid #6f6f6f' }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg transition-colors"
            style={{ color: '#f6f6f6' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6f6f6f'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#6f6f6f' }} />
            <input
              type="text"
              placeholder="Search jobs, users, applications..."
              className="w-full pl-10 pr-4 py-2 rounded-lg"
              style={{
                backgroundColor: '#f6f6f6',
                border: '1px solid #d3d3d3',
                color: '#023047'
              }}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setCurrentPage?.('settings')}
            className="p-2 rounded-lg transition-colors"
            style={{ color: '#f6f6f6' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6f6f6f'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <Settings className="w-5 h-5" />
          </button>

          <button 
            onClick={() => setCurrentPage?.('notifications')}
            className="relative p-2 rounded-lg transition-colors"
            style={{ color: '#f6f6f6' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6f6f6f'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ backgroundColor: '#FFC300' }}></span>
          </button>
          
          <div className="relative" style={{ borderLeft: '1px solid #6f6f6f' }}>
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-3 pl-4"
            >
              <div className="text-right">
                <p style={{ color: '#f6f6f6', fontSize: '0.875rem' }}>Admin User</p>
                <p style={{ color: '#d3d3d3', fontSize: '0.75rem' }}>Super Admin</p>
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
                <User className="w-5 h-5" style={{ color: '#023047' }} />
              </div>
            </button>

            {showProfileMenu && (
              <div
                className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg overflow-hidden"
                style={{
                  backgroundColor: '#023047',
                  border: '1px solid #6f6f6f',
                  zIndex: 50
                }}
                ref={menuRef}
              >
                <button
                  onClick={() => {
                    setCurrentPage?.('profile');
                    setShowProfileMenu(false);
                  }}
                  className="w-full px-4 py-3 text-left flex items-center gap-3 transition-colors"
                  style={{ color: '#f6f6f6' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6f6f6f'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <User className="w-4 h-4" />
                  <span style={{ fontSize: '0.875rem' }}>My Profile</span>
                </button>
                <div style={{ height: '1px', backgroundColor: '#6f6f6f' }} />
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onLogout?.();
                  }}
                  className="w-full px-4 py-3 text-left flex items-center gap-3 transition-colors"
                  style={{ color: '#f6f6f6' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6f6f6f'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <LogOut className="w-4 h-4" />
                  <span style={{ fontSize: '0.875rem' }}>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}