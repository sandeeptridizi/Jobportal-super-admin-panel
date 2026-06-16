import { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, CheckCircle, XCircle, MapPin, DollarSign, Calendar, Building2, GraduationCap, Clock, Users, Crown, Star } from 'lucide-react';
import { InternshipDetailView } from './InternshipDetailView';
import { FilterModal } from './FilterModal';

interface Internship {
  id: number;
  title: string;
  company: string;
  location: string;
  duration: string;
  stipend: string;
  category: string;
  status: 'active' | 'pending' | 'closed';
  applications: number;
  postedDate: string;
  startDate: string;
  spots: number;
  isPaid: boolean;
  plan: 'Pro' | 'Free';
}

export function InternshipHub() {
  const [showModal, setShowModal] = useState(false);
  const [selectedInternshipId, setSelectedInternshipId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [planFilter, setPlanFilter] = useState<string>('all');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    location: 'all',
    duration: 'all',
    paymentType: 'all'
  });

  const internships: Internship[] = [
    { id: 1, title: 'Software Engineering Intern', company: 'Tech Corp', location: 'New York, NY', duration: '3 months', stipend: '$25/hr', category: 'Technology', status: 'active', applications: 112, postedDate: '2024-12-01', startDate: '2025-01-15', spots: 5, isPaid: true, plan: 'Pro' },
    { id: 2, title: 'Summer Marketing Intern', company: 'Brand Agency', location: 'Remote', duration: '3 months', stipend: '$20/hr', category: 'Marketing', status: 'active', applications: 89, postedDate: '2024-12-04', startDate: '2025-06-01', spots: 3, isPaid: true, plan: 'Pro' },
    { id: 3, title: 'UX Design Intern', company: 'Design Studio', location: 'Austin, TX', duration: '6 months', stipend: '$18/hr', category: 'Design', status: 'pending', applications: 67, postedDate: '2024-12-05', startDate: '2025-02-01', spots: 2, isPaid: true, plan: 'Free' },
    { id: 4, title: 'Data Science Intern', company: 'Analytics Co', location: 'Boston, MA', duration: '4 months', stipend: '$30/hr', category: 'Technology', status: 'active', applications: 145, postedDate: '2024-11-28', startDate: '2025-01-20', spots: 4, isPaid: true, plan: 'Pro' },
    { id: 5, title: 'Product Design Intern', company: 'Startup Inc', location: 'San Francisco, CA', duration: '3 months', stipend: '$22/hr', category: 'Design', status: 'active', applications: 78, postedDate: '2024-12-03', startDate: '2025-01-10', spots: 2, isPaid: true, plan: 'Free' },
    { id: 6, title: 'Finance Intern', company: 'Investment Bank', location: 'Chicago, IL', duration: '6 months', stipend: '$28/hr', category: 'Finance', status: 'active', applications: 134, postedDate: '2024-12-02', startDate: '2025-02-15', spots: 6, isPaid: true, plan: 'Pro' },
    { id: 7, title: 'Content Writing Intern', company: 'Media Group', location: 'Remote', duration: '2 months', stipend: 'Unpaid', category: 'Writing', status: 'active', applications: 56, postedDate: '2024-12-06', startDate: '2025-01-05', spots: 4, isPaid: false, plan: 'Free' },
    { id: 8, title: 'HR Intern', company: 'Cloud Systems', location: 'Austin, TX', duration: '3 months', stipend: '$19/hr', category: 'Human Resources', status: 'active', applications: 43, postedDate: '2024-12-04', startDate: '2025-01-15', spots: 2, isPaid: true, plan: 'Free' },
    { id: 9, title: 'Business Analyst Intern', company: 'Consulting Firm', location: 'Seattle, WA', duration: '4 months', stipend: '$26/hr', category: 'Business', status: 'closed', applications: 98, postedDate: '2024-11-15', startDate: '2024-12-01', spots: 3, isPaid: true, plan: 'Pro' },
  ];

  const filteredInternships = internships.filter(internship => {
    const matchesSearch = internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || internship.category === categoryFilter;
    const matchesPlan = planFilter === 'all' || internship.plan === planFilter;
    const matchesStatus = filters.status === 'all' || internship.status === filters.status;
    const matchesLocation = filters.location === 'all' || internship.location === filters.location;
    const matchesDuration = filters.duration === 'all' || internship.duration === filters.duration;
    const matchesPaymentType = filters.paymentType === 'all' || (filters.paymentType === 'paid' ? internship.isPaid : !internship.isPaid);
    return matchesSearch && matchesCategory && matchesPlan && matchesStatus && matchesLocation && matchesDuration && matchesPaymentType;
  });

  const categories = ['all', ...Array.from(new Set(internships.map(i => i.category)))];

  const filterGroups = [
    {
      id: 'status',
      label: 'Status',
      options: [
        { label: 'All Status', value: 'all', count: internships.length },
        { label: 'Active', value: 'active', count: internships.filter(i => i.status === 'active').length },
        { label: 'Pending', value: 'pending', count: internships.filter(i => i.status === 'pending').length },
        { label: 'Closed', value: 'closed', count: internships.filter(i => i.status === 'closed').length }
      ]
    },
    {
      id: 'location',
      label: 'Location',
      type: 'search' as const,
      options: [
        { label: 'All Locations', value: 'all', count: internships.length },
        ...Array.from(new Set(internships.map(i => i.location))).map(loc => ({
          label: loc,
          value: loc,
          count: internships.filter(i => i.location === loc).length
        }))
      ]
    },
    {
      id: 'duration',
      label: 'Duration',
      options: [
        { label: 'All Durations', value: 'all', count: internships.length },
        ...Array.from(new Set(internships.map(i => i.duration))).map(dur => ({
          label: dur,
          value: dur,
          count: internships.filter(i => i.duration === dur).length
        }))
      ]
    },
    {
      id: 'paymentType',
      label: 'Payment Type',
      options: [
        { label: 'All Types', value: 'all', count: internships.length },
        { label: 'Paid', value: 'paid', count: internships.filter(i => i.isPaid).length },
        { label: 'Unpaid', value: 'unpaid', count: internships.filter(i => !i.isPaid).length }
      ]
    }
  ];

  const handleFilterChange = (filterId: string, value: string) => {
    setFilters(prev => ({ ...prev, [filterId]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      status: 'all',
      location: 'all',
      duration: 'all',
      paymentType: 'all'
    });
  };

  const stats = {
    total: internships.length,
    active: internships.filter(i => i.status === 'active').length,
    totalApplications: internships.reduce((sum, i) => sum + i.applications, 0),
    avgApplications: Math.round(internships.reduce((sum, i) => sum + i.applications, 0) / internships.length),
  };

  const planCounts = {
    all: internships.length,
    'Pro': internships.filter(i => i.plan === 'Pro').length,
    'Free': internships.filter(i => i.plan === 'Free').length,
  };

  const getPlanBadge = (plan: 'Pro' | 'Free') => {
    switch (plan) {
      case 'Pro':
        return (
          <div className="flex items-center gap-1 px-2 py-1 rounded-md" style={{ backgroundColor: '#FFC300', color: '#023047' }}>
            <Crown className="w-3 h-3" />
            <span className="text-xs">Pro</span>
          </div>
        );
      case 'Free':
        return (
          <div className="flex items-center gap-1 px-2 py-1 rounded-md" style={{ backgroundColor: '#6f6f6f', color: '#f6f6f6' }}>
            <Star className="w-3 h-3" />
            <span className="text-xs">Free</span>
          </div>
        );
    }
  };

  if (selectedInternshipId !== null) {
    return <InternshipDetailView internshipId={selectedInternshipId} onBack={() => setSelectedInternshipId(null)} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 
            style={{ 
              color: '#FFC300',
              fontSize: '2.5rem',
              fontWeight: '800',
              letterSpacing: '-0.02em',
              textShadow: '0 0 30px rgba(255, 195, 0, 0.3), 0 0 60px rgba(255, 195, 0, 0.2)'
            }}
          >
            Internship Hub
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
              {stats.total}
            </p>
            <p style={{ color: '#6f6f6f' }}>Total Internships</p>
          </div>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
          style={{ backgroundColor: '#FFC300', color: '#023047' }}
        >
          <Plus className="w-5 h-5" />
          Add Internship
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
              <GraduationCap className="w-5 h-5" style={{ color: '#023047' }} />
            </div>
          </div>
          <p style={{ color: '#d3d3d3' }}>Total Internships</p>
          <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>{stats.total}</p>
        </div>
        <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
              <CheckCircle className="w-5 h-5" style={{ color: '#023047' }} />
            </div>
          </div>
          <p style={{ color: '#d3d3d3' }}>Active Postings</p>
          <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>{stats.active}</p>
        </div>
        <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#023047' }}>
              <Users className="w-5 h-5" style={{ color: '#f6f6f6' }} />
            </div>
          </div>
          <p style={{ color: '#d3d3d3' }}>Total Applications</p>
          <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>{stats.totalApplications}</p>
        </div>
        <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#6f6f6f' }}>
              <Building2 className="w-5 h-5" style={{ color: '#f6f6f6' }} />
            </div>
          </div>
          <p style={{ color: '#d3d3d3' }}>Avg per Posting</p>
          <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>{stats.avgApplications}</p>
        </div>
      </div>

      <div className="rounded-lg p-4" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
          <div>
            <p className="mb-3" style={{ color: '#d3d3d3' }}>Category</p>
            <div className="flex gap-2 flex-wrap">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setCategoryFilter(category)}
                  className="px-4 py-2 rounded-lg transition-colors"
                  style={{
                    backgroundColor: categoryFilter === category ? '#023047' : '#6f6f6f',
                    color: '#f6f6f6'
                  }}
                >
                  {category === 'all' ? 'All Categories' : category}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3" style={{ color: '#d3d3d3' }}>Subscription Plan</p>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setPlanFilter('all')}
                className="px-4 py-2 rounded-lg transition-colors"
                style={{
                  backgroundColor: planFilter === 'all' ? '#023047' : '#6f6f6f',
                  color: '#f6f6f6'
                }}
              >
                All Plans ({planCounts.all})
              </button>
              <button
                onClick={() => setPlanFilter('Pro')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
                style={{
                  backgroundColor: planFilter === 'Pro' ? '#FFC300' : '#6f6f6f',
                  color: planFilter === 'Pro' ? '#023047' : '#f6f6f6'
                }}
              >
                <Crown className="w-4 h-4" />
                Pro ({planCounts.Pro})
              </button>
              <button
                onClick={() => setPlanFilter('Free')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
                style={{
                  backgroundColor: planFilter === 'Free' ? '#6f6f6f' : '#6f6f6f',
                  color: '#f6f6f6',
                  border: planFilter === 'Free' ? '2px solid #f6f6f6' : 'none'
                }}
              >
                <Star className="w-4 h-4" />
                Free ({planCounts.Free})
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[300px] relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#6f6f6f' }} />
            <input
              type="text"
              placeholder="Search internships..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none"
              style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors" style={{ border: '1px solid #6f6f6f', color: '#d3d3d3' }} onClick={() => setShowFilterModal(true)}>
            <Filter className="w-5 h-5" />
            More Filters
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredInternships.map((internship) => (
          <div 
            key={internship.id} 
            onClick={() => setSelectedInternshipId(internship.id)}
            className="rounded-lg p-6 transition-all cursor-pointer" 
            style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#FFC300'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = '#6f6f6f'}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FFC300' }}>
                    <GraduationCap className="w-6 h-6" style={{ color: '#023047' }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <h3 style={{ color: '#f6f6f6' }}>{internship.title}</h3>
                        {getPlanBadge(internship.plan)}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex px-3 py-1 rounded-full text-xs" style={{
                          backgroundColor: internship.status === 'active' ? '#FFC300' : internship.status === 'pending' ? '#023047' : '#6f6f6f',
                          color: internship.status === 'active' ? '#023047' : '#f6f6f6'
                        }}>
                          {internship.status.charAt(0).toUpperCase() + internship.status.slice(1)}
                        </span>
                        {internship.isPaid && (
                          <span className="inline-flex px-3 py-1 rounded-full text-xs" style={{ backgroundColor: '#023047', color: '#f6f6f6' }}>
                            Paid
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 mt-4">
                      <div className="flex items-center gap-2" style={{ color: '#d3d3d3' }}>
                        <MapPin className="w-4 h-4" />
                        <span>{internship.location}</span>
                      </div>
                      <div className="flex items-center gap-2" style={{ color: '#d3d3d3' }}>
                        <Clock className="w-4 h-4" />
                        <span>{internship.duration}</span>
                      </div>
                      <div className="flex items-center gap-2" style={{ color: '#d3d3d3' }}>
                        <DollarSign className="w-4 h-4" />
                        <span>{internship.stipend}</span>
                      </div>
                      <div className="flex items-center gap-2" style={{ color: '#d3d3d3' }}>
                        <Calendar className="w-4 h-4" />
                        <span>Starts: {internship.startDate}</span>
                      </div>
                      <div className="flex items-center gap-2" style={{ color: '#d3d3d3' }}>
                        <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: '#6f6f6f', color: '#f6f6f6' }}>{internship.category}</span>
                        <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: '#FFC300', color: '#023047' }}>{internship.spots} spots</span>
                      </div>
                    </div>

                    <div className="mt-4" style={{ color: '#d3d3d3' }}>
                      <span>{internship.applications} applications • Posted {internship.postedDate}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 ml-4" onClick={(e) => e.stopPropagation()}>
                <button className="p-2 rounded-lg transition-colors" title="Edit" style={{ color: '#FFC300' }}>
                  <Edit className="w-5 h-5" />
                </button>
                {internship.status === 'pending' && (
                  <>
                    <button className="p-2 rounded-lg transition-colors" title="Approve" style={{ color: '#FFC300' }}>
                      <CheckCircle className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-lg transition-colors" title="Reject" style={{ color: '#6f6f6f' }}>
                      <XCircle className="w-5 h-5" />
                    </button>
                  </>
                )}
                <button className="p-2 rounded-lg transition-colors" title="Delete" style={{ color: '#6f6f6f' }}>
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
          <div className="rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <div className="p-6" style={{ borderBottom: '1px solid #6f6f6f' }}>
              <h2 style={{ color: '#FFC300' }}>Add New Internship</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block mb-2" style={{ color: '#f6f6f6' }}>Internship Title</label>
                <input type="text" className="w-full px-4 py-2 rounded-lg focus:outline-none" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }} placeholder="e.g. Software Engineering Intern" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2" style={{ color: '#f6f6f6' }}>Company</label>
                  <input type="text" className="w-full px-4 py-2 rounded-lg focus:outline-none" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }} placeholder="Company name" />
                </div>
                <div>
                  <label className="block mb-2" style={{ color: '#f6f6f6' }}>Location</label>
                  <input type="text" className="w-full px-4 py-2 rounded-lg focus:outline-none" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }} placeholder="City, State or Remote" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2" style={{ color: '#f6f6f6' }}>Duration</label>
                  <input type="text" className="w-full px-4 py-2 rounded-lg focus:outline-none" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }} placeholder="e.g. 3 months" />
                </div>
                <div>
                  <label className="block mb-2" style={{ color: '#f6f6f6' }}>Start Date</label>
                  <input type="date" className="w-full px-4 py-2 rounded-lg focus:outline-none" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }} />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block mb-2" style={{ color: '#f6f6f6' }}>Stipend</label>
                  <input type="text" className="w-full px-4 py-2 rounded-lg focus:outline-none" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }} placeholder="e.g. $15-$20/hr or Unpaid with stipend" />
                </div>
                <div>
                  <label className="block mb-2" style={{ color: '#f6f6f6' }}>Category</label>
                  <select className="w-full px-4 py-2 rounded-lg focus:outline-none" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}>
                    <option>Technology</option>
                    <option>Design</option>
                    <option>Marketing</option>
                    <option>Finance</option>
                    <option>Business</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2" style={{ color: '#f6f6f6' }}>Spots Available</label>
                  <input type="number" className="w-full px-4 py-2 rounded-lg focus:outline-none" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }} placeholder="Number of spots available" />
                </div>
              </div>
              <div>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span style={{ color: '#f6f6f6' }}>This is a paid internship</span>
                </label>
              </div>
              <div>
                <label className="block mb-2" style={{ color: '#f6f6f6' }}>Description</label>
                <textarea rows={4} className="w-full px-4 py-2 rounded-lg focus:outline-none" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }} placeholder="Internship description..." />
              </div>
            </div>
            <div className="p-6 flex gap-3 justify-end" style={{ borderTop: '1px solid #6f6f6f' }}>
              <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg transition-colors" style={{ border: '1px solid #6f6f6f', color: '#d3d3d3' }}>Cancel</button>
              <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: '#FFC300', color: '#023047' }}>Create Internship</button>
            </div>
          </div>
        </div>
      )}

      {showFilterModal && (
        <FilterModal
          isOpen={showFilterModal}
          onClose={() => setShowFilterModal(false)}
          filterGroups={filterGroups}
          activeFilters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
        />
      )}
    </div>
  );
}