import { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, CheckCircle, XCircle, MapPin, DollarSign, Calendar, Pencil, Clock, Tag, TrendingUp } from 'lucide-react';
import { FreelanceGigDetailView } from './FreelanceGigDetailView';
import { FilterModal } from './FilterModal';

interface FreelanceGig {
  id: number;
  title: string;
  company: string;
  location: string;
  projectDuration: string;
  budget: string;
  category: string;
  status: 'active' | 'pending' | 'closed';
  proposals: number;
  postedDate: string;
  deadline: string;
  experienceLevel: 'Entry' | 'Intermediate' | 'Expert';
  paymentType: 'Fixed' | 'Hourly';
}

export function FreelanceGigs() {
  const [showModal, setShowModal] = useState(false);
  const [selectedGigId, setSelectedGigId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [experienceFilter, setExperienceFilter] = useState<string>('all');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all',
    paymentType: 'all',
    location: 'all'
  });

  const gigs: FreelanceGig[] = [
    { id: 1, title: 'Freelance Web Developer', company: 'Freelance Hub', location: 'Remote', projectDuration: '2-3 months', budget: '$75 - $150/hr', category: 'Technology', status: 'active', proposals: 56, postedDate: '2024-12-02', deadline: '2024-12-15', experienceLevel: 'Expert', paymentType: 'Hourly' },
    { id: 2, title: 'Freelance Content Writer', company: 'Media Group', location: 'Remote', projectDuration: '1 month', budget: '$50 - $100/article', category: 'Writing', status: 'active', proposals: 34, postedDate: '2024-12-05', deadline: '2024-12-12', experienceLevel: 'Intermediate', paymentType: 'Fixed' },
    { id: 3, title: 'Freelance Graphic Designer', company: 'Creative Co', location: 'Remote', projectDuration: '3-4 weeks', budget: '$40 - $80/hr', category: 'Design', status: 'active', proposals: 28, postedDate: '2024-12-03', deadline: '2024-12-10', experienceLevel: 'Intermediate', paymentType: 'Hourly' },
    { id: 4, title: 'Mobile App Developer', company: 'Startup Inc', location: 'Remote', projectDuration: '4-6 months', budget: '$8,000 - $15,000', category: 'Technology', status: 'active', proposals: 89, postedDate: '2024-11-28', deadline: '2024-12-20', experienceLevel: 'Expert', paymentType: 'Fixed' },
    { id: 5, title: 'Social Media Manager', company: 'Brand Agency', location: 'Remote', projectDuration: '2 months', budget: '$35 - $60/hr', category: 'Marketing', status: 'pending', proposals: 42, postedDate: '2024-12-06', deadline: '2024-12-14', experienceLevel: 'Intermediate', paymentType: 'Hourly' },
    { id: 6, title: 'Video Editor', company: 'Production Studio', location: 'Remote', projectDuration: '1 month', budget: '$2,500 - $4,000', category: 'Video Production', status: 'active', proposals: 67, postedDate: '2024-12-04', deadline: '2024-12-11', experienceLevel: 'Expert', paymentType: 'Fixed' },
    { id: 7, title: 'SEO Specialist', company: 'Digital Agency', location: 'Remote', projectDuration: '3 months', budget: '$45 - $75/hr', category: 'Marketing', status: 'active', proposals: 51, postedDate: '2024-12-01', deadline: '2024-12-13', experienceLevel: 'Intermediate', paymentType: 'Hourly' },
    { id: 8, title: 'WordPress Developer', company: 'Web Solutions', location: 'Remote', projectDuration: '2-3 weeks', budget: '$1,500 - $2,500', category: 'Technology', status: 'active', proposals: 73, postedDate: '2024-12-05', deadline: '2024-12-09', experienceLevel: 'Entry', paymentType: 'Fixed' },
    { id: 9, title: 'UI/UX Designer', company: 'Tech Startup', location: 'Remote', projectDuration: '1-2 months', budget: '$50 - $90/hr', category: 'Design', status: 'active', proposals: 94, postedDate: '2024-11-30', deadline: '2024-12-16', experienceLevel: 'Expert', paymentType: 'Hourly' },
    { id: 10, title: 'Data Entry Specialist', company: 'Business Corp', location: 'Remote', projectDuration: '2 weeks', budget: '$800 - $1,200', category: 'Administrative', status: 'closed', proposals: 112, postedDate: '2024-11-20', deadline: '2024-11-25', experienceLevel: 'Entry', paymentType: 'Fixed' },
  ];

  const filteredGigs = gigs.filter(gig => {
    const matchesSearch = gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gig.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gig.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesExperience = experienceFilter === 'all' || gig.experienceLevel === experienceFilter;
    const matchesStatus = filters.status === 'all' || gig.status === filters.status;
    const matchesCategory = filters.category === 'all' || gig.category === filters.category;
    const matchesPaymentType = filters.paymentType === 'all' || gig.paymentType === filters.paymentType;
    const matchesLocation = filters.location === 'all' || gig.location === filters.location;
    return matchesSearch && matchesExperience && matchesStatus && matchesCategory && matchesPaymentType && matchesLocation;
  });

  // Filter groups for modal
  const filterGroups = [
    {
      id: 'status',
      label: 'Status',
      options: [
        { label: 'All Status', value: 'all', count: gigs.length },
        { label: 'Active', value: 'active', count: gigs.filter(g => g.status === 'active').length },
        { label: 'Pending', value: 'pending', count: gigs.filter(g => g.status === 'pending').length },
        { label: 'Closed', value: 'closed', count: gigs.filter(g => g.status === 'closed').length }
      ]
    },
    {
      id: 'category',
      label: 'Category',
      type: 'search' as const,
      options: [
        { label: 'All Categories', value: 'all', count: gigs.length },
        ...Array.from(new Set(gigs.map(g => g.category))).map(cat => ({
          label: cat,
          value: cat,
          count: gigs.filter(g => g.category === cat).length
        }))
      ]
    },
    {
      id: 'paymentType',
      label: 'Payment Type',
      options: [
        { label: 'All Types', value: 'all', count: gigs.length },
        { label: 'Fixed', value: 'Fixed', count: gigs.filter(g => g.paymentType === 'Fixed').length },
        { label: 'Hourly', value: 'Hourly', count: gigs.filter(g => g.paymentType === 'Hourly').length }
      ]
    },
    {
      id: 'location',
      label: 'Location',
      type: 'search' as const,
      options: [
        { label: 'All Locations', value: 'all', count: gigs.length },
        ...Array.from(new Set(gigs.map(g => g.location))).map(loc => ({
          label: loc,
          value: loc,
          count: gigs.filter(g => g.location === loc).length
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
      category: 'all',
      paymentType: 'all',
      location: 'all'
    });
  };

  const stats = {
    total: gigs.length,
    active: gigs.filter(g => g.status === 'active').length,
    totalProposals: gigs.reduce((sum, g) => sum + g.proposals, 0),
    avgProposals: Math.round(gigs.reduce((sum, g) => sum + g.proposals, 0) / gigs.length),
  };

  // If a gig is selected, show the detail view
  if (selectedGigId !== null) {
    return <FreelanceGigDetailView gigId={selectedGigId} onBack={() => setSelectedGigId(null)} />;
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
            Freelance Gigs
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
            <p style={{ color: '#6f6f6f' }}>Total Gigs</p>
          </div>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
          style={{ backgroundColor: '#FFC300', color: '#023047' }}
        >
          <Plus className="w-5 h-5" />
          Add Freelance Gig
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
              <Pencil className="w-5 h-5" style={{ color: '#023047' }} />
            </div>
          </div>
          <p style={{ color: '#d3d3d3' }}>Total Gigs</p>
          <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>{stats.total}</p>
        </div>
        <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
              <CheckCircle className="w-5 h-5" style={{ color: '#023047' }} />
            </div>
          </div>
          <p style={{ color: '#d3d3d3' }}>Active Projects</p>
          <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>{stats.active}</p>
        </div>
        <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#023047' }}>
              <TrendingUp className="w-5 h-5" style={{ color: '#f6f6f6' }} />
            </div>
          </div>
          <p style={{ color: '#d3d3d3' }}>Total Proposals</p>
          <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>{stats.totalProposals}</p>
        </div>
        <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#6f6f6f' }}>
              <Tag className="w-5 h-5" style={{ color: '#f6f6f6' }} />
            </div>
          </div>
          <p style={{ color: '#d3d3d3' }}>Avg per Gig</p>
          <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>{stats.avgProposals}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-lg p-4" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
        <div className="flex gap-2 flex-wrap mb-4">
          <button onClick={() => setExperienceFilter('all')} className="px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: experienceFilter === 'all' ? '#023047' : '#6f6f6f', color: '#f6f6f6' }}>All Levels</button>
          <button onClick={() => setExperienceFilter('Entry')} className="px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: experienceFilter === 'Entry' ? '#023047' : '#6f6f6f', color: '#f6f6f6' }}>Entry Level</button>
          <button onClick={() => setExperienceFilter('Intermediate')} className="px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: experienceFilter === 'Intermediate' ? '#023047' : '#6f6f6f', color: '#f6f6f6' }}>Intermediate</button>
          <button onClick={() => setExperienceFilter('Expert')} className="px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: experienceFilter === 'Expert' ? '#023047' : '#6f6f6f', color: '#f6f6f6' }}>Expert</button>
        </div>
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[300px] relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#6f6f6f' }} />
            <input type="text" placeholder="Search freelance gigs..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }} />
          </div>
          <button onClick={() => setShowFilterModal(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors" style={{ border: '1px solid #6f6f6f', color: '#d3d3d3' }}>
            <Filter className="w-5 h-5" />
            More Filters
          </button>
        </div>
      </div>

      {/* Gigs Grid */}
      <div className="grid gap-4">
        {filteredGigs.map((gig) => (
          <div 
            key={gig.id} 
            onClick={() => setSelectedGigId(gig.id)}
            className="rounded-lg p-6 transition-all cursor-pointer" 
            style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#FFC300'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = '#6f6f6f'}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FFC300' }}>
                    <Pencil className="w-6 h-6" style={{ color: '#023047' }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 style={{ color: '#f6f6f6' }}>{gig.title}</h3>
                        <p className="mt-1" style={{ color: '#d3d3d3' }}>{gig.company}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex px-3 py-1 rounded-full text-xs" style={{
                          backgroundColor: gig.status === 'active' ? '#FFC300' : gig.status === 'pending' ? '#023047' : '#6f6f6f',
                          color: gig.status === 'active' ? '#023047' : '#f6f6f6'
                        }}>
                          {gig.status.charAt(0).toUpperCase() + gig.status.slice(1)}
                        </span>
                        <span className="inline-flex px-3 py-1 rounded-full text-xs" style={{
                          backgroundColor: gig.experienceLevel === 'Entry' ? '#6f6f6f' : gig.experienceLevel === 'Intermediate' ? '#023047' : '#FFC300',
                          color: gig.experienceLevel === 'Expert' ? '#023047' : '#f6f6f6'
                        }}>
                          {gig.experienceLevel}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 mt-4">
                      <div className="flex items-center gap-2" style={{ color: '#d3d3d3' }}>
                        <MapPin className="w-4 h-4" />
                        <span>{gig.location}</span>
                      </div>
                      <div className="flex items-center gap-2" style={{ color: '#d3d3d3' }}>
                        <Clock className="w-4 h-4" />
                        <span>{gig.projectDuration}</span>
                      </div>
                      <div className="flex items-center gap-2" style={{ color: '#d3d3d3' }}>
                        <DollarSign className="w-4 h-4" />
                        <span>{gig.budget}</span>
                      </div>
                      <div className="flex items-center gap-2" style={{ color: '#d3d3d3' }}>
                        <Calendar className="w-4 h-4" />
                        <span>Deadline: {gig.deadline}</span>
                      </div>
                      <div className="flex items-center gap-2" style={{ color: '#d3d3d3' }}>
                        <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: '#6f6f6f', color: '#f6f6f6' }}>{gig.category}</span>
                        <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: '#FFC300', color: '#023047' }}>{gig.paymentType}</span>
                      </div>
                    </div>

                    <div className="mt-4" style={{ color: '#d3d3d3' }}>
                      <span>{gig.proposals} proposals • Posted {gig.postedDate}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 ml-4" onClick={(e) => e.stopPropagation()}>
                <button className="p-2 rounded-lg transition-colors" title="Edit" style={{ color: '#FFC300' }}>
                  <Edit className="w-5 h-5" />
                </button>
                {gig.status === 'pending' && (
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

      {/* Add Gig Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
          <div className="rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <div className="p-6" style={{ borderBottom: '1px solid #6f6f6f' }}>
              <h2 style={{ color: '#FFC300' }}>Add New Freelance Gig</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block mb-2" style={{ color: '#f6f6f6' }}>Project Title</label>
                <input type="text" className="w-full px-4 py-2 rounded-lg focus:outline-none" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }} placeholder="e.g. Freelance Web Developer" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2" style={{ color: '#f6f6f6' }}>Company/Client</label>
                  <input type="text" className="w-full px-4 py-2 rounded-lg focus:outline-none" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }} placeholder="Company name" />
                </div>
                <div>
                  <label className="block mb-2" style={{ color: '#f6f6f6' }}>Location</label>
                  <input type="text" className="w-full px-4 py-2 rounded-lg focus:outline-none" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }} placeholder="Remote or City" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block mb-2" style={{ color: '#f6f6f6' }}>Project Duration</label>
                  <input type="text" className="w-full px-4 py-2 rounded-lg focus:outline-none" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }} placeholder="e.g. 2-3 months" />
                </div>
                <div>
                  <label className="block mb-2" style={{ color: '#f6f6f6' }}>Deadline</label>
                  <input type="date" className="w-full px-4 py-2 rounded-lg focus:outline-none" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }} />
                </div>
                <div>
                  <label className="block mb-2" style={{ color: '#f6f6f6' }}>Budget</label>
                  <input type="text" className="w-full px-4 py-2 rounded-lg focus:outline-none" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }} placeholder="e.g. $50-$100/hr" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block mb-2" style={{ color: '#f6f6f6' }}>Category</label>
                  <select className="w-full px-4 py-2 rounded-lg focus:outline-none" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}>
                    <option>Technology</option>
                    <option>Design</option>
                    <option>Writing</option>
                    <option>Marketing</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2" style={{ color: '#f6f6f6' }}>Payment Type</label>
                  <select className="w-full px-4 py-2 rounded-lg focus:outline-none" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}>
                    <option>Fixed</option>
                    <option>Hourly</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2" style={{ color: '#f6f6f6' }}>Experience Level</label>
                  <select className="w-full px-4 py-2 rounded-lg focus:outline-none" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}>
                    <option>Entry</option>
                    <option>Intermediate</option>
                    <option>Expert</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block mb-2" style={{ color: '#f6f6f6' }}>Project Description</label>
                <textarea rows={4} className="w-full px-4 py-2 rounded-lg focus:outline-none" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }} placeholder="Describe the project requirements..." />
              </div>
            </div>
            <div className="p-6 flex gap-3 justify-end" style={{ borderTop: '1px solid #6f6f6f' }}>
              <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg transition-colors" style={{ border: '1px solid #6f6f6f', color: '#d3d3d3' }}>Cancel</button>
              <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: '#FFC300', color: '#023047' }}>Create Gig</button>
            </div>
          </div>
        </div>
      )}

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
