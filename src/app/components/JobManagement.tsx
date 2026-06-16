import { useState } from 'react';
import { Plus, Search, Filter, Eye, Edit, Trash2, CheckCircle, XCircle, MapPin, DollarSign, Calendar, Building2, Crown, Zap, Star } from 'lucide-react';
import { JobDetailView } from './JobDetailView';
import { FilterModal } from './FilterModal';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time';
  salary: string;
  category: string;
  status: 'active' | 'pending' | 'closed';
  applications: number;
  postedDate: string;
  employer: string;
  plan: 'Pro' | 'Free' | 'Quick Recruit';
}

export function JobManagement() {
  const [showModal, setShowModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState({
    type: 'all',
    plan: 'all',
    category: 'all',
    location: 'all',
    status: 'all'
  });

  const jobs: Job[] = [
    { id: 1, title: 'Senior React Developer', company: 'Tech Corp', location: 'New York, NY', type: 'Full-time', salary: '$120k - $150k', category: 'Technology', status: 'active', applications: 45, postedDate: '2024-12-01', employer: 'john@techcorp.com', plan: 'Pro' },
    { id: 2, title: 'Product Manager', company: 'Startup Inc', location: 'San Francisco, CA', type: 'Full-time', salary: '$130k - $160k', category: 'Management', status: 'active', applications: 67, postedDate: '2024-12-03', employer: 'hr@startup.com', plan: 'Quick Recruit' },
    { id: 3, title: 'Data Scientist', company: 'Analytics Co', location: 'Boston, MA', type: 'Full-time', salary: '$110k - $140k', category: 'Technology', status: 'active', applications: 89, postedDate: '2024-11-28', employer: 'talent@analytics.com', plan: 'Pro' },
    { id: 4, title: 'DevOps Engineer', company: 'Cloud Systems', location: 'Austin, TX', type: 'Full-time', salary: '$100k - $130k', category: 'Technology', status: 'closed', applications: 56, postedDate: '2024-11-20', employer: 'jobs@cloud.com', plan: 'Free' },
    { id: 5, title: 'Part-time Sales Associate', company: 'Retail Plus', location: 'Chicago, IL', type: 'Part-time', salary: '$15 - $18/hr', category: 'Sales', status: 'active', applications: 41, postedDate: '2024-12-04', employer: 'hr@retailplus.com', plan: 'Free' },
    { id: 6, title: 'Marketing Manager', company: 'Brand Agency', location: 'Chicago, IL', type: 'Full-time', salary: '$90k - $120k', category: 'Marketing', status: 'active', applications: 34, postedDate: '2024-12-02', employer: 'hr@brand.com', plan: 'Quick Recruit' },
    { id: 7, title: 'Senior UX Designer', company: 'Design Studio', location: 'Austin, TX', type: 'Full-time', salary: '$95k - $125k', category: 'Design', status: 'pending', applications: 52, postedDate: '2024-12-05', employer: 'design@studio.com', plan: 'Pro' },
    { id: 8, title: 'Part-time Barista', company: 'Coffee Shop', location: 'Seattle, WA', type: 'Part-time', salary: '$14 - $16/hr', category: 'Hospitality', status: 'active', applications: 28, postedDate: '2024-12-06', employer: 'jobs@coffeeshop.com', plan: 'Free' },
    { id: 9, title: 'Backend Developer', company: 'Tech Startup', location: 'Remote', type: 'Full-time', salary: '$105k - $135k', category: 'Technology', status: 'active', applications: 73, postedDate: '2024-12-03', employer: 'careers@techstartup.com', plan: 'Pro' },
    { id: 10, title: 'Part-time Customer Service Rep', company: 'Support Co', location: 'Remote', type: 'Part-time', salary: '$16 - $20/hr', category: 'Customer Service', status: 'active', applications: 38, postedDate: '2024-12-04', employer: 'hr@supportco.com', plan: 'Free' },
    { id: 11, title: 'Financial Analyst', company: 'Investment Bank', location: 'Chicago, IL', type: 'Full-time', salary: '$85k - $110k', category: 'Finance', status: 'active', applications: 62, postedDate: '2024-12-02', employer: 'careers@investbank.com', plan: 'Quick Recruit' },
    { id: 12, title: 'HR Manager', company: 'Corporate Inc', location: 'New York, NY', type: 'Full-time', salary: '$80k - $100k', category: 'Human Resources', status: 'pending', applications: 44, postedDate: '2024-12-07', employer: 'hr@corporate.com', plan: 'Pro' },
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filters.type === 'all' || job.type === filters.type;
    const matchesPlan = filters.plan === 'all' || job.plan === filters.plan;
    const matchesCategory = filters.category === 'all' || job.category === filters.category;
    const matchesLocation = filters.location === 'all' || job.location === filters.location;
    const matchesStatus = filters.status === 'all' || job.status === filters.status;
    return matchesSearch && matchesType && matchesPlan && matchesCategory && matchesLocation && matchesStatus;
  });

  const jobTypeCounts = {
    all: jobs.length,
    'Full-time': jobs.filter(j => j.type === 'Full-time').length,
    'Part-time': jobs.filter(j => j.type === 'Part-time').length,
  };

  const planCounts = {
    all: jobs.length,
    'Pro': jobs.filter(j => j.plan === 'Pro').length,
    'Free': jobs.filter(j => j.plan === 'Free').length,
    'Quick Recruit': jobs.filter(j => j.plan === 'Quick Recruit').length,
  };

  // Extract unique values from data
  const uniqueCategories = [...new Set(jobs.map(j => j.category))];
  const uniqueLocations = [...new Set(jobs.map(j => j.location))];
  const uniqueStatuses = [...new Set(jobs.map(j => j.status))];

  // Create filter groups for FilterModal
  const filterGroups = [
    {
      id: 'category',
      label: 'Category',
      type: 'search' as const,
      options: [
        { label: 'All', value: 'all', count: jobs.length },
        ...uniqueCategories.map(cat => ({
          label: cat,
          value: cat,
          count: jobs.filter(j => j.category === cat).length
        }))
      ]
    },
    {
      id: 'location',
      label: 'Location',
      type: 'search' as const,
      options: [
        { label: 'All', value: 'all', count: jobs.length },
        ...uniqueLocations.map(loc => ({
          label: loc,
          value: loc,
          count: jobs.filter(j => j.location === loc).length
        }))
      ]
    },
    {
      id: 'type',
      label: 'Job Type',
      type: 'dropdown' as const,
      options: [
        { label: 'All Types', value: 'all', count: jobs.length },
        { label: 'Full-time', value: 'Full-time', count: jobs.filter(j => j.type === 'Full-time').length },
        { label: 'Part-time', value: 'Part-time', count: jobs.filter(j => j.type === 'Part-time').length }
      ]
    },
    {
      id: 'status',
      label: 'Status',
      type: 'buttons' as const,
      options: [
        { label: 'All', value: 'all', count: jobs.length },
        ...uniqueStatuses.map(status => ({
          label: status.charAt(0).toUpperCase() + status.slice(1),
          value: status,
          count: jobs.filter(j => j.status === status).length
        }))
      ]
    }
  ];

  const handleFilterChange = (filterId: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterId]: value
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      type: 'all',
      plan: 'all',
      category: 'all',
      location: 'all',
      status: 'all'
    });
  };

  const getPlanBadge = (plan: 'Pro' | 'Free' | 'Quick Recruit') => {
    switch (plan) {
      case 'Pro':
        return (
          <div className="flex items-center gap-1 px-2 py-1 rounded-md" style={{ backgroundColor: '#FFC300', color: '#023047' }}>
            <Crown className="w-3 h-3" />
            <span className="text-xs">Pro</span>
          </div>
        );
      case 'Quick Recruit':
        return (
          <div className="flex items-center gap-1 px-2 py-1 rounded-md" style={{ backgroundColor: '#023047', color: '#f6f6f6' }}>
            <Zap className="w-3 h-3" />
            <span className="text-xs">Quick Recruit</span>
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

  // If a job is selected, show the detail view
  if (selectedJobId !== null) {
    return <JobDetailView jobId={selectedJobId} onBack={() => setSelectedJobId(null)} />;
  }

  return (
    <div className="space-y-6" style={{
      background: 'radial-gradient(ellipse at top, rgba(255, 195, 0, 0.05) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(2, 48, 71, 0.3) 0%, transparent 50%)',
      minHeight: '100vh'
    }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 
            style={{ 
              color: '#FFC300',
              fontSize: '2.5rem',
              fontWeight: '800',
              letterSpacing: '-0.02em',
              textShadow: '0 0 30px rgba(255, 195, 0, 0.3), 0 0 60px rgba(255, 195, 0, 0.2)',
              background: 'radial-gradient(ellipse at center, rgba(255, 195, 0, 0.15) 0%, transparent 70%)',
              padding: '1rem',
              borderRadius: '12px'
            }}
          >
            Job Management
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
              {jobs.length}
            </p>
            <p style={{ color: '#6f6f6f' }}>Total Jobs</p>
          </div>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all"
          style={{ 
            background: 'radial-gradient(ellipse at center, #FFC300 0%, #e6af00 100%)', 
            color: '#023047',
            boxShadow: '0 4px 20px rgba(255, 195, 0, 0.4)',
            transform: 'scale(1)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 6px 30px rgba(255, 195, 0, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(255, 195, 0, 0.4)';
          }}
        >
          <Plus className="w-5 h-5" />
          Add New Job
        </button>
      </div>

      {/* Job Type Filters */}
      <div className="rounded-lg p-4" style={{ 
        background: 'radial-gradient(ellipse at top left, rgba(2, 48, 71, 0.8) 0%, #023047 50%, rgba(2, 48, 71, 0.9) 100%)', 
        border: '1px solid #6f6f6f',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
      }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
          {/* Job Type */}
          <div>
            <p className="mb-3" style={{ color: '#d3d3d3' }}>Job Type</p>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilters({ ...filters, type: 'all' })}
                className="px-4 py-2 rounded-lg transition-all"
                style={{
                  background: filters.type === 'all' 
                    ? 'radial-gradient(ellipse at center, rgba(255, 195, 0, 0.2) 0%, rgba(2, 48, 71, 0.8) 100%)' 
                    : '#6f6f6f',
                  color: '#f6f6f6',
                  border: filters.type === 'all' ? '1px solid #FFC300' : 'none'
                }}
              >
                All Jobs ({jobTypeCounts.all})
              </button>
              <button
                onClick={() => setFilters({ ...filters, type: 'Full-time' })}
                className="px-4 py-2 rounded-lg transition-all"
                style={{
                  background: filters.type === 'Full-time' 
                    ? 'radial-gradient(ellipse at center, rgba(255, 195, 0, 0.2) 0%, rgba(2, 48, 71, 0.8) 100%)' 
                    : '#6f6f6f',
                  color: '#f6f6f6',
                  border: filters.type === 'Full-time' ? '1px solid #FFC300' : 'none'
                }}
              >
                Full-time ({jobTypeCounts['Full-time']})
              </button>
              <button
                onClick={() => setFilters({ ...filters, type: 'Part-time' })}
                className="px-4 py-2 rounded-lg transition-all"
                style={{
                  background: filters.type === 'Part-time' 
                    ? 'radial-gradient(ellipse at center, rgba(255, 195, 0, 0.2) 0%, rgba(2, 48, 71, 0.8) 100%)' 
                    : '#6f6f6f',
                  color: '#f6f6f6',
                  border: filters.type === 'Part-time' ? '1px solid #FFC300' : 'none'
                }}
              >
                Part-time ({jobTypeCounts['Part-time']})
              </button>
            </div>
          </div>

          {/* Subscription Plan */}
          <div>
            <p className="mb-3" style={{ color: '#d3d3d3' }}>Subscription Plan</p>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilters({ ...filters, plan: 'all' })}
                className="px-4 py-2 rounded-lg transition-all"
                style={{
                  background: filters.plan === 'all' 
                    ? 'radial-gradient(ellipse at center, rgba(255, 195, 0, 0.2) 0%, rgba(2, 48, 71, 0.8) 100%)' 
                    : '#6f6f6f',
                  color: '#f6f6f6',
                  border: filters.plan === 'all' ? '1px solid #FFC300' : 'none'
                }}
              >
                All Plans ({planCounts.all})
              </button>
              <button
                onClick={() => setFilters({ ...filters, plan: 'Pro' })}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all"
                style={{
                  background: filters.plan === 'Pro' 
                    ? 'radial-gradient(ellipse at center, #FFC300 0%, #e6af00 100%)' 
                    : '#6f6f6f',
                  color: filters.plan === 'Pro' ? '#023047' : '#f6f6f6',
                  boxShadow: filters.plan === 'Pro' ? '0 4px 20px rgba(255, 195, 0, 0.3)' : 'none'
                }}
              >
                <Crown className="w-4 h-4" />
                Pro ({planCounts.Pro})
              </button>
              <button
                onClick={() => setFilters({ ...filters, plan: 'Quick Recruit' })}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all"
                style={{
                  background: filters.plan === 'Quick Recruit' 
                    ? 'radial-gradient(ellipse at center, rgba(255, 195, 0, 0.2) 0%, rgba(2, 48, 71, 0.8) 100%)' 
                    : '#6f6f6f',
                  color: '#f6f6f6',
                  border: filters.plan === 'Quick Recruit' ? '1px solid #FFC300' : 'none'
                }}
              >
                <Zap className="w-4 h-4" />
                Quick Recruit ({planCounts['Quick Recruit']})
              </button>
              <button
                onClick={() => setFilters({ ...filters, plan: 'Free' })}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all"
                style={{
                  background: filters.plan === 'Free' ? '#6f6f6f' : '#6f6f6f',
                  color: '#f6f6f6',
                  border: filters.plan === 'Free' ? '2px solid #f6f6f6' : 'none'
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
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none transition-all"
              style={{ 
                background: 'radial-gradient(ellipse at center, rgba(2, 48, 71, 0.6) 0%, #023047 100%)', 
                border: '1px solid #6f6f6f', 
                color: '#f6f6f6' 
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#FFC300'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#6f6f6f'}
            />
          </div>
          <button 
            onClick={() => setShowFilterModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all" 
            style={{ 
              border: '1px solid #6f6f6f', 
              color: '#d3d3d3',
              background: 'radial-gradient(ellipse at center, rgba(111, 111, 111, 0.2) 0%, transparent 100%)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#FFC300'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = '#6f6f6f'}
          >
            <Filter className="w-5 h-5" />
            More Filters
          </button>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid gap-4">
        {filteredJobs.map((job) => (
          <div 
            key={job.id} 
            onClick={() => setSelectedJobId(job.id)}
            className="rounded-lg p-6 transition-all cursor-pointer" 
            style={{ 
              background: 'radial-gradient(ellipse at top left, rgba(2, 48, 71, 0.9) 0%, #023047 40%, rgba(2, 48, 71, 0.95) 100%)', 
              border: '1px solid #6f6f6f',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#FFC300';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(255, 195, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#6f6f6f';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ 
                    background: 'radial-gradient(ellipse at center, #FFC300 0%, #e6af00 100%)',
                    boxShadow: '0 4px 12px rgba(255, 195, 0, 0.3)'
                  }}>
                    <Building2 className="w-6 h-6" style={{ color: '#023047' }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <h3 style={{ color: '#f6f6f6' }}>{job.title}</h3>
                        {getPlanBadge(job.plan)}
                      </div>
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs`} style={{
                        background: job.status === 'active' 
                          ? 'radial-gradient(ellipse at center, #FFC300 0%, #e6af00 100%)' 
                          : job.status === 'pending' 
                          ? 'radial-gradient(ellipse at center, rgba(255, 195, 0, 0.3) 0%, #023047 100%)' 
                          : '#6f6f6f',
                        color: job.status === 'active' ? '#023047' : '#f6f6f6',
                        boxShadow: job.status === 'active' ? '0 2px 8px rgba(255, 195, 0, 0.4)' : 'none'
                      }}>
                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 mt-4">
                      <div className="flex items-center gap-2" style={{ color: '#d3d3d3' }}>
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2" style={{ color: '#d3d3d3' }}>
                        <DollarSign className="w-4 h-4" />
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center gap-2" style={{ color: '#d3d3d3' }}>
                        <Calendar className="w-4 h-4" />
                        <span>{job.postedDate}</span>
                      </div>
                      <div className="flex items-center gap-2" style={{ color: '#d3d3d3' }}>
                        <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: '#023047', color: '#f6f6f6' }}>
                          {job.type}
                        </span>
                        <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: '#6f6f6f', color: '#f6f6f6' }}>{job.category}</span>
                      </div>
                    </div>

                    <div className="mt-4" style={{ color: '#d3d3d3' }}>
                      <span>{job.applications} applications</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 ml-4" onClick={(e) => e.stopPropagation()}>
                <button className="p-2 rounded-lg transition-colors" title="Edit" style={{ color: '#FFC300' }}>
                  <Edit className="w-5 h-5" />
                </button>
                {job.status === 'pending' && (
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

      {/* Add Job Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50" style={{ 
          background: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.95) 100%)',
          backdropFilter: 'blur(8px)'
        }}>
          <div className="rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" style={{ 
            background: 'radial-gradient(ellipse at top, rgba(2, 48, 71, 0.95) 0%, #023047 50%, rgba(2, 48, 71, 0.98) 100%)', 
            border: '1px solid #6f6f6f',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
          }}>
            <div className="p-6" style={{ borderBottom: '1px solid #6f6f6f' }}>
              <h2 style={{ color: '#FFC300' }}>Add New Job</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block mb-2" style={{ color: '#f6f6f6' }}>Job Title</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg focus:outline-none transition-all"
                  style={{ 
                    background: 'radial-gradient(ellipse at center, rgba(2, 48, 71, 0.6) 0%, #023047 100%)', 
                    border: '1px solid #6f6f6f', 
                    color: '#f6f6f6' 
                  }}
                  placeholder="e.g. Senior React Developer"
                  onFocus={(e) => e.currentTarget.style.borderColor = '#FFC300'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#6f6f6f'}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2" style={{ color: '#f6f6f6' }}>Company</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg focus:outline-none transition-all"
                    style={{ 
                      background: 'radial-gradient(ellipse at center, rgba(2, 48, 71, 0.6) 0%, #023047 100%)', 
                      border: '1px solid #6f6f6f', 
                      color: '#f6f6f6' 
                    }}
                    placeholder="Company name"
                    onFocus={(e) => e.currentTarget.style.borderColor = '#FFC300'}
                    onBlur={(e) => e.currentTarget.style.borderColor = '#6f6f6f'}
                  />
                </div>
                <div>
                  <label className="block mb-2" style={{ color: '#f6f6f6' }}>Location</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg focus:outline-none transition-all"
                    style={{ 
                      background: 'radial-gradient(ellipse at center, rgba(2, 48, 71, 0.6) 0%, #023047 100%)', 
                      border: '1px solid #6f6f6f', 
                      color: '#f6f6f6' 
                    }}
                    placeholder="City, State"
                    onFocus={(e) => e.currentTarget.style.borderColor = '#FFC300'}
                    onBlur={(e) => e.currentTarget.style.borderColor = '#6f6f6f'}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2" style={{ color: '#f6f6f6' }}>Job Type</label>
                  <select className="w-full px-4 py-2 rounded-lg focus:outline-none transition-all" style={{ 
                    background: 'radial-gradient(ellipse at center, rgba(2, 48, 71, 0.6) 0%, #023047 100%)', 
                    border: '1px solid #6f6f6f', 
                    color: '#f6f6f6' 
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#FFC300'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#6f6f6f'}>
                    <option>Full-time</option>
                    <option>Part-time</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2" style={{ color: '#f6f6f6' }}>Category</label>
                  <select className="w-full px-4 py-2 rounded-lg focus:outline-none transition-all" style={{ 
                    background: 'radial-gradient(ellipse at center, rgba(2, 48, 71, 0.6) 0%, #023047 100%)', 
                    border: '1px solid #6f6f6f', 
                    color: '#f6f6f6' 
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#FFC300'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#6f6f6f'}>
                    <option>Technology</option>
                    <option>Healthcare</option>
                    <option>Finance</option>
                    <option>Education</option>
                    <option>Marketing</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block mb-2" style={{ color: '#f6f6f6' }}>Salary Range</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg focus:outline-none transition-all"
                  style={{ 
                    background: 'radial-gradient(ellipse at center, rgba(2, 48, 71, 0.6) 0%, #023047 100%)', 
                    border: '1px solid #6f6f6f', 
                    color: '#f6f6f6' 
                  }}
                  placeholder="e.g. $100k - $130k or $15-$20/hr"
                  onFocus={(e) => e.currentTarget.style.borderColor = '#FFC300'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#6f6f6f'}
                />
              </div>
              <div>
                <label className="block mb-2" style={{ color: '#f6f6f6' }}>Description</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg focus:outline-none transition-all"
                  style={{ 
                    background: 'radial-gradient(ellipse at center, rgba(2, 48, 71, 0.6) 0%, #023047 100%)', 
                    border: '1px solid #6f6f6f', 
                    color: '#f6f6f6' 
                  }}
                  placeholder="Job description..."
                  onFocus={(e) => e.currentTarget.style.borderColor = '#FFC300'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#6f6f6f'}
                />
              </div>
            </div>
            <div className="p-6 flex gap-3 justify-end" style={{ borderTop: '1px solid #6f6f6f' }}>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg transition-colors"
                style={{ border: '1px solid #6f6f6f', color: '#d3d3d3' }}
              >
                Cancel
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg transition-all"
                style={{ 
                  background: 'radial-gradient(ellipse at center, #FFC300 0%, #e6af00 100%)', 
                  color: '#023047',
                  boxShadow: '0 4px 16px rgba(255, 195, 0, 0.4)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 6px 24px rgba(255, 195, 0, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(255, 195, 0, 0.4)';
                }}
              >
                Create Job
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FilterModal */}
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