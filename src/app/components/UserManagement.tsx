import { useState } from 'react';
import { Search, Filter, Edit, Trash2, Mail, Phone, MapPin, MoreVertical, UserCheck, UserX, Briefcase, BadgeCheck, Crown } from 'lucide-react';
import { UserDetailView } from './UserDetailView';
import { FilterModal } from './FilterModal';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'candidate' | 'employer' | 'admin';
  location: string;
  status: 'active' | 'inactive' | 'suspended';
  joinedDate: string;
  avatar?: string;
  applications?: number;
  jobsPosted?: number;
  isVerified?: boolean;
  isPro?: boolean;
}

export function UserManagement() {
  const [activeTab, setActiveTab] = useState<'all' | 'candidates' | 'employers'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    verified: 'all',
    isPro: 'all',
    location: 'all'
  });

  const users: User[] = [
    { id: 1, name: 'John Doe', email: 'john.doe@email.com', phone: '+1 234 567 8900', role: 'candidate', location: 'New York, NY', status: 'active', joinedDate: '2024-01-15', applications: 12, isVerified: true, isPro: true },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@email.com', phone: '+1 234 567 8901', role: 'employer', location: 'San Francisco, CA', status: 'active', joinedDate: '2024-02-20', jobsPosted: 8, isVerified: true, isPro: false },
    { id: 3, name: 'Mike Johnson', email: 'mike.j@email.com', phone: '+1 234 567 8902', role: 'candidate', location: 'Los Angeles, CA', status: 'active', joinedDate: '2024-03-10', applications: 5, isVerified: false, isPro: true },
    { id: 4, name: 'Sarah Williams', email: 'sarah.w@email.com', phone: '+1 234 567 8903', role: 'employer', location: 'Boston, MA', status: 'active', joinedDate: '2024-02-15', jobsPosted: 15, isVerified: true, isPro: true },
    { id: 5, name: 'Tom Brown', email: 'tom.brown@email.com', phone: '+1 234 567 8904', role: 'candidate', location: 'Chicago, IL', status: 'inactive', joinedDate: '2024-01-05', applications: 3, isVerified: false, isPro: false },
    { id: 6, name: 'Emily Davis', email: 'emily.d@email.com', phone: '+1 234 567 8905', role: 'employer', location: 'Austin, TX', status: 'suspended', joinedDate: '2024-03-01', jobsPosted: 4, isVerified: true, isPro: false },
    { id: 7, name: 'David Wilson', email: 'david.w@email.com', phone: '+1 234 567 8906', role: 'candidate', location: 'Seattle, WA', status: 'active', joinedDate: '2024-04-12', applications: 8, isVerified: true, isPro: true },
    { id: 8, name: 'Lisa Anderson', email: 'lisa.a@email.com', phone: '+1 234 567 8907', role: 'employer', location: 'Miami, FL', status: 'active', joinedDate: '2024-01-30', jobsPosted: 12, isVerified: false, isPro: true },
    { id: 9, name: 'Robert Taylor', email: 'robert.t@email.com', phone: '+1 234 567 8908', role: 'candidate', location: 'Portland, OR', status: 'active', joinedDate: '2024-05-18', applications: 15, isVerified: true, isPro: false },
    { id: 10, name: 'Amanda Martinez', email: 'amanda.m@email.com', phone: '+1 234 567 8909', role: 'employer', location: 'Denver, CO', status: 'active', joinedDate: '2024-03-22', jobsPosted: 6, isVerified: false, isPro: false },
    { id: 11, name: 'Chris Lee', email: 'chris.l@email.com', phone: '+1 234 567 8910', role: 'candidate', location: 'Phoenix, AZ', status: 'active', joinedDate: '2024-06-05', applications: 22, isVerified: true, isPro: true },
    { id: 12, name: 'Michelle Garcia', email: 'michelle.g@email.com', phone: '+1 234 567 8911', role: 'candidate', location: 'San Diego, CA', status: 'active', joinedDate: '2024-04-30', applications: 18, isVerified: true, isPro: true },
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || user.role === activeTab.slice(0, -1);
    const matchesFilters = 
      (filters.status === 'all' || user.status === filters.status) &&
      (filters.verified === 'all' || user.isVerified === (filters.verified === 'true')) &&
      (filters.isPro === 'all' || user.isPro === (filters.isPro === 'true')) &&
      (filters.location === 'all' || user.location === filters.location);
    return matchesSearch && matchesTab && matchesFilters;
  });

  // Filter groups for modal
  const filterGroups = [
    {
      id: 'status',
      label: 'Status',
      options: [
        { label: 'All Status', value: 'all', count: users.length },
        { label: 'Active', value: 'active', count: users.filter(u => u.status === 'active').length },
        { label: 'Inactive', value: 'inactive', count: users.filter(u => u.status === 'inactive').length },
        { label: 'Suspended', value: 'suspended', count: users.filter(u => u.status === 'suspended').length }
      ]
    },
    {
      id: 'verified',
      label: 'Verification',
      options: [
        { label: 'All Users', value: 'all', count: users.length },
        { label: 'Verified (BGV)', value: 'true', count: users.filter(u => u.isVerified).length },
        { label: 'Not Verified', value: 'false', count: users.filter(u => !u.isVerified).length }
      ]
    },
    {
      id: 'isPro',
      label: 'Account Type',
      options: [
        { label: 'All Types', value: 'all', count: users.length },
        { label: 'Pro (Paid)', value: 'true', count: users.filter(u => u.isPro).length },
        { label: 'Free', value: 'false', count: users.filter(u => !u.isPro).length }
      ]
    },
    {
      id: 'location',
      label: 'Location',
      type: 'search' as const,
      options: [
        { label: 'All Locations', value: 'all', count: users.length },
        ...Array.from(new Set(users.map(u => u.location))).map(loc => ({
          label: loc,
          value: loc,
          count: users.filter(u => u.location === loc).length
        }))
      ]
    }
  ];

  const handleFilterChange = (filterId: string, value: string) => {
    setFilters(prev => ({ ...prev, [filterId]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      status: 'all',
      verified: 'all',
      isPro: 'all',
      location: 'all'
    });
  };

  const stats = {
    all: users.length,
    candidates: users.filter(u => u.role === 'candidate').length,
    employers: users.filter(u => u.role === 'employer').length,
  };

  // If a user is selected, show the detail view
  if (selectedUserId !== null) {
    return <UserDetailView userId={selectedUserId} onBack={() => setSelectedUserId(null)} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-6 mb-6">
        <h1 
          style={{ 
            color: '#FFC300',
            fontSize: '2.5rem',
            fontWeight: '800',
            letterSpacing: '-0.02em',
            textShadow: '0 0 30px rgba(255, 195, 0, 0.3), 0 0 60px rgba(255, 195, 0, 0.2)'
          }}
        >
          User Management
        </h1>
        <div className="flex items-center gap-3">
          <p 
            style={{ 
              color: '#f6f6f6', 
              fontSize: '3rem', 
              fontWeight: '700',
              lineHeight: '1'
            }}
          >
            {stats.all}
          </p>
          <p style={{ color: '#6f6f6f' }}>Total Users</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ borderBottom: '1px solid #6f6f6f' }}>
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab('all')}
            className="pb-3 px-1 transition-colors"
            style={{
              borderBottom: activeTab === 'all' ? '2px solid #FFC300' : '2px solid transparent',
              color: activeTab === 'all' ? '#FFC300' : '#d3d3d3'
            }}
          >
            All Users ({stats.all})
          </button>
          <button
            onClick={() => setActiveTab('candidates')}
            className="pb-3 px-1 transition-colors"
            style={{
              borderBottom: activeTab === 'candidates' ? '2px solid #FFC300' : '2px solid transparent',
              color: activeTab === 'candidates' ? '#FFC300' : '#d3d3d3'
            }}
          >
            Candidates ({stats.candidates})
          </button>
          <button
            onClick={() => setActiveTab('employers')}
            className="pb-3 px-1 transition-colors"
            style={{
              borderBottom: activeTab === 'employers' ? '2px solid #FFC300' : '2px solid transparent',
              color: activeTab === 'employers' ? '#FFC300' : '#d3d3d3'
            }}
          >
            Employers ({stats.employers})
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="rounded-lg p-4" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[300px] relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#6f6f6f' }} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none"
              style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
            />
          </div>
          <button onClick={() => setShowFilterModal(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors" style={{ border: '1px solid #6f6f6f', color: '#d3d3d3' }}>
            <Filter className="w-5 h-5" />
            More Filters
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-lg overflow-hidden" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: '#023047', borderBottom: '1px solid #6f6f6f' }}>
              <tr>
                <th className="px-6 py-3 text-left" style={{ color: '#d3d3d3' }}>User</th>
                <th className="px-6 py-3 text-left" style={{ color: '#d3d3d3' }}>Contact</th>
                <th className="px-6 py-3 text-left" style={{ color: '#d3d3d3' }}>Role</th>
                <th className="px-6 py-3 text-left" style={{ color: '#d3d3d3' }}>Status</th>
                <th className="px-6 py-3 text-left" style={{ color: '#d3d3d3' }}>Activity</th>
                <th className="px-6 py-3 text-left" style={{ color: '#d3d3d3' }}>Joined</th>
                <th className="px-6 py-3 text-left" style={{ color: '#d3d3d3' }}>Actions</th>
              </tr>
            </thead>
            <tbody style={{ backgroundColor: '#023047' }}>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  onClick={() => setSelectedUserId(user.id)}
                  className="cursor-pointer transition-colors"
                  style={{ borderBottom: '1px solid #6f6f6f' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#023047'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#023047'}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
                        <span style={{ color: '#023047' }}>{user.name.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p style={{ color: '#f6f6f6' }}>{user.name}</p>
                          {user.isVerified && (
                            <BadgeCheck className="w-4 h-4" style={{ color: '#023047' }} title="Verified - BGV Completed" />
                          )}
                          {user.isPro && (
                            <Crown className="w-4 h-4" style={{ color: '#FFC300' }} title="Pro - Paid User" />
                          )}
                        </div>
                        <p className="text-xs flex items-center gap-1 mt-1" style={{ color: '#d3d3d3' }}>
                          <MapPin className="w-3 h-3" />
                          {user.location}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <p className="flex items-center gap-2 text-xs" style={{ color: '#d3d3d3' }}>
                        <Mail className="w-4 h-4" />
                        {user.email}
                      </p>
                      <p className="flex items-center gap-2 text-xs" style={{ color: '#d3d3d3' }}>
                        <Phone className="w-4 h-4" />
                        {user.phone}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-3 py-1 rounded-full text-xs" style={{
                      backgroundColor: user.role === 'employer' ? '#023047' : '#FFC300',
                      color: user.role === 'employer' ? '#f6f6f6' : '#023047'
                    }}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-3 py-1 rounded-full text-xs" style={{
                      backgroundColor: user.status === 'active' ? '#FFC300' : user.status === 'suspended' ? '#6f6f6f' : '#6f6f6f',
                      color: user.status === 'active' ? '#023047' : '#f6f6f6'
                    }}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2" style={{ color: '#d3d3d3' }}>
                      <Briefcase className="w-4 h-4" />
                      {user.role === 'candidate' ? (
                        <span>{user.applications} applications</span>
                      ) : (
                        <span>{user.jobsPosted} jobs posted</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4" style={{ color: '#d3d3d3' }}>{user.joinedDate}</td>
                  <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-2">
                      <button className="p-1 rounded transition-colors" title="Edit" style={{ color: '#FFC300' }}>
                        <Edit className="w-4 h-4" />
                      </button>
                      {user.status === 'active' ? (
                        <button className="p-1 rounded transition-colors" title="Suspend" style={{ color: '#6f6f6f' }}>
                          <UserX className="w-4 h-4" />
                        </button>
                      ) : (
                        <button className="p-1 rounded transition-colors" title="Activate" style={{ color: '#FFC300' }}>
                          <UserCheck className="w-4 h-4" />
                        </button>
                      )}
                      <button className="p-1 rounded transition-colors" style={{ color: '#d3d3d3' }}>
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Filter Modal */}
      <FilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        filterGroups={filterGroups}
        activeFilters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
      />
    </div>
  );
}