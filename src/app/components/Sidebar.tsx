import { LayoutDashboard, Briefcase, Users, GraduationCap, Pencil, Building2, BarChart3, UserPlus, DollarSign, UsersRound, HeadphonesIcon, ListTodo, BookOpen, Building, UserCheck, TrendingUp, Wallet } from 'lucide-react';
import { Page } from '../App';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function Sidebar({ currentPage, setCurrentPage, isOpen }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard' as Page, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tasks' as Page, label: 'Tasks', icon: ListTodo },
    { id: 'analytics' as Page, label: 'Analytics', icon: TrendingUp },
    { id: 'finance' as Page, label: 'Finance', icon: Wallet },
    { id: 'jobs' as Page, label: 'Job Management', icon: Briefcase },
    { id: 'internships' as Page, label: 'Internship Hub', icon: GraduationCap },
    { id: 'freelance' as Page, label: 'Freelance Gigs', icon: Pencil },
    { id: 'companies' as Page, label: 'Companies', icon: Building2 },
    { id: 'institutes' as Page, label: 'Institutes', icon: Building },
    { id: 'courses' as Page, label: 'Courses', icon: BookOpen },
    { id: 'tutors' as Page, label: 'Tutors', icon: UserCheck },
    { id: 'users' as Page, label: 'User Management', icon: Users },
    { id: 'cold-leads' as Page, label: 'Cold Leads', icon: UserPlus },
    { id: 'support' as Page, label: 'Support', icon: HeadphonesIcon },
  ];

  if (!isOpen) {
    return null;
  }

  return (
    <aside className="w-64 flex flex-col" style={{ backgroundColor: '#023047', borderRight: '1px solid #6f6f6f' }}>
      <div className="p-6" style={{ borderBottom: '1px solid #6f6f6f' }}>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
            <Briefcase className="w-6 h-6" style={{ color: '#023047' }} />
          </div>
          <div>
            <h1 style={{ color: '#f6f6f6', fontSize: '1.25rem', fontWeight: '700' }}>JobPortal</h1>
            <p style={{ color: '#d3d3d3', fontSize: '0.75rem' }}>Super Admin</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => setCurrentPage(item.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
                  style={{
                    backgroundColor: isActive ? '#023047' : 'transparent',
                    color: isActive ? '#FFC300' : '#f6f6f6'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = '#6f6f6f';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}