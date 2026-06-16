import { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Building2, MapPin, Users, Briefcase, Mail, Phone, Globe, CheckCircle, XCircle, Star, BadgeCheck, Crown, Zap, FileText, Clock, Calendar } from 'lucide-react';
import { CompanyDetailView } from './CompanyDetailView';
import { FilterModal } from './FilterModal';

interface Company {
  id: number;
  name: string;
  logo?: string;
  industry: string;
  location: string;
  size: string;
  website: string;
  email: string;
  phone: string;
  description: string;
  activeJobs: number;
  totalApplications: number;
  employeesCount: string;
  status: 'active' | 'pending' | 'suspended';
  verified: boolean;
  isPro?: boolean;
  rating: number;
  joinedDate: string;
  plan: 'Pro' | 'Free' | 'Quick Recruit';
  registrationNumber?: string;
  gstNumber?: string;
  linkedinUrl?: string;
  officeTimings?: string;
  workingDays?: string;
  companyType?: string;
  foundedYear?: string;
  ceoName?: string;
}

export function Companies() {
  const [showModal, setShowModal] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  
  const [filters, setFilters] = useState({
    plan: 'all',
    verified: 'all',
    industry: 'all',
    location: 'all',
    status: 'all',
    size: 'all'
  });

  const companies: Company[] = [
    {
      id: 1,
      name: 'Tech Corp',
      industry: 'Technology',
      location: 'New York, NY',
      size: 'Large',
      website: 'www.techcorp.com',
      email: 'hr@techcorp.com',
      phone: '+1 234 567 8900',
      description: 'Leading technology company specializing in software development and cloud solutions.',
      activeJobs: 15,
      totalApplications: 234,
      employeesCount: '1000-5000',
      status: 'active',
      verified: true,
      isPro: true,
      rating: 4.5,
      joinedDate: '2023-01-15',
      plan: 'Pro',
      registrationNumber: 'TC-2020-NY-45678',
      gstNumber: '29AABCT1234F1Z5',
      linkedinUrl: 'https://linkedin.com/company/techcorp',
      officeTimings: '9:00 AM - 6:00 PM',
      workingDays: 'Monday - Friday',
      companyType: 'Private Limited',
      foundedYear: '2015',
      ceoName: 'John Anderson'
    },
    {
      id: 2,
      name: 'Startup Inc',
      industry: 'Technology',
      location: 'San Francisco, CA',
      size: 'Medium',
      website: 'www.startup.com',
      email: 'jobs@startup.com',
      phone: '+1 234 567 8901',
      description: 'Fast-growing startup revolutionizing the tech industry with innovative products.',
      activeJobs: 8,
      totalApplications: 156,
      employeesCount: '50-200',
      status: 'active',
      verified: true,
      isPro: false,
      rating: 4.2,
      joinedDate: '2023-03-20',
      plan: 'Free',
      registrationNumber: 'SI-2021-CA-12345',
      gstNumber: '27AABCS9876E1Z3',
      linkedinUrl: 'https://linkedin.com/company/startup-inc',
      officeTimings: '10:00 AM - 7:00 PM',
      workingDays: 'Monday - Friday',
      companyType: 'Startup',
      foundedYear: '2021',
      ceoName: 'Sarah Miller'
    },
    {
      id: 3,
      name: 'Design Studio',
      industry: 'Design',
      location: 'Los Angeles, CA',
      size: 'Small',
      website: 'www.designstudio.com',
      email: 'design@studio.com',
      phone: '+1 234 567 8902',
      description: 'Creative design agency offering freelance opportunities and internships.',
      activeJobs: 5,
      totalApplications: 89,
      employeesCount: '10-50',
      status: 'active',
      verified: false,
      isPro: true,
      rating: 4.0,
      joinedDate: '2023-06-10',
      plan: 'Pro',
      registrationNumber: 'DS-2022-CA-67890',
      gstNumber: '27AABCD5678G1Z8',
      linkedinUrl: 'https://linkedin.com/company/design-studio',
      officeTimings: '9:30 AM - 5:30 PM',
      workingDays: 'Monday - Saturday',
      companyType: 'Partnership',
      foundedYear: '2018',
      ceoName: 'Michael Roberts'
    },
    {
      id: 4,
      name: 'Analytics Co',
      industry: 'Data & Analytics',
      location: 'Boston, MA',
      size: 'Large',
      website: 'www.analytics.com',
      email: 'talent@analytics.com',
      phone: '+1 234 567 8903',
      description: 'Data analytics firm providing insights and solutions to Fortune 500 companies.',
      activeJobs: 12,
      totalApplications: 298,
      employeesCount: '500-1000',
      status: 'active',
      verified: true,
      isPro: true,
      rating: 4.7,
      joinedDate: '2022-11-05',
      plan: 'Pro',
      registrationNumber: 'AC-2019-MA-23456',
      gstNumber: '25AABCA3456H2Z1',
      linkedinUrl: 'https://linkedin.com/company/analytics-co',
      officeTimings: '8:00 AM - 5:00 PM',
      workingDays: 'Monday - Friday',
      companyType: 'Public Limited',
      foundedYear: '2014',
      ceoName: 'David Chen'
    },
    {
      id: 5,
      name: 'Brand Agency',
      industry: 'Marketing',
      location: 'Chicago, IL',
      size: 'Medium',
      website: 'www.brandagency.com',
      email: 'hr@brand.com',
      phone: '+1 234 567 8904',
      description: 'Full-service marketing agency with internship and freelance programs.',
      activeJobs: 6,
      totalApplications: 145,
      employeesCount: '100-500',
      status: 'active',
      verified: true,
      isPro: false,
      rating: 4.3,
      joinedDate: '2023-02-18',
      plan: 'Free',
      registrationNumber: 'BA-2020-IL-34567',
      gstNumber: '17AABCB7890J3Z4',
      linkedinUrl: 'https://linkedin.com/company/brand-agency',
      officeTimings: '9:00 AM - 6:30 PM',
      workingDays: 'Monday - Friday',
      companyType: 'Private Limited',
      foundedYear: '2017',
      ceoName: 'Emily White'
    },
    {
      id: 6,
      name: 'Cloud Systems',
      industry: 'Technology',
      location: 'Austin, TX',
      size: 'Large',
      website: 'www.cloudsystems.com',
      email: 'jobs@cloud.com',
      phone: '+1 234 567 8905',
      description: 'Enterprise cloud infrastructure provider serving global clients.',
      activeJobs: 18,
      totalApplications: 412,
      employeesCount: '5000+',
      status: 'active',
      verified: true,
      isPro: true,
      rating: 4.6,
      joinedDate: '2022-08-22',
      plan: 'Pro',
      registrationNumber: 'CS-2018-TX-56789',
      gstNumber: '48AABCC1234K4Z7',
      linkedinUrl: 'https://linkedin.com/company/cloud-systems',
      officeTimings: '8:30 AM - 5:30 PM',
      workingDays: 'Monday - Friday',
      companyType: 'Public Limited',
      foundedYear: '2012',
      ceoName: 'Robert Johnson'
    },
    {
      id: 7,
      name: 'Media Group',
      industry: 'Media & Publishing',
      location: 'Remote',
      size: 'Medium',
      website: 'www.mediagroup.com',
      email: 'content@media.com',
      phone: '+1 234 567 8906',
      description: 'Digital media company offering freelance writing and content creation opportunities.',
      activeJobs: 10,
      totalApplications: 178,
      employeesCount: '200-500',
      status: 'pending',
      verified: false,
      isPro: false,
      rating: 3.9,
      joinedDate: '2024-12-01',
      plan: 'Free',
      registrationNumber: 'MG-2023-CA-78901',
      gstNumber: '27AABCM4567L5Z2',
      linkedinUrl: 'https://linkedin.com/company/media-group',
      officeTimings: 'Flexible',
      workingDays: 'Monday - Sunday (Flexible)',
      companyType: 'Private Limited',
      foundedYear: '2023',
      ceoName: 'Lisa Martinez'
    },
    {
      id: 8,
      name: 'HealthTech Solutions',
      industry: 'Healthcare',
      location: 'Seattle, WA',
      size: 'Medium',
      website: 'www.healthtech.com',
      email: 'careers@healthtech.com',
      phone: '+1 234 567 8907',
      description: 'Healthcare technology company developing innovative medical software solutions.',
      activeJobs: 9,
      totalApplications: 201,
      employeesCount: '100-500',
      status: 'active',
      verified: true,
      isPro: true,
      rating: 4.4,
      joinedDate: '2023-04-12',
      plan: 'Pro',
      registrationNumber: 'HT-2021-WA-89012',
      gstNumber: '53AABCH6789M6Z9',
      linkedinUrl: 'https://linkedin.com/company/healthtech-solutions',
      officeTimings: '9:00 AM - 6:00 PM',
      workingDays: 'Monday - Friday',
      companyType: 'Private Limited',
      foundedYear: '2019',
      ceoName: 'Dr. James Wilson'
    },
  ];

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = filters.plan === 'all' || company.plan === filters.plan;
    const matchesVerified = filters.verified === 'all' || (filters.verified === 'verified' ? company.verified : !company.verified);
    const matchesIndustry = filters.industry === 'all' || company.industry === filters.industry;
    const matchesLocation = filters.location === 'all' || company.location === filters.location;
    const matchesStatus = filters.status === 'all' || company.status === filters.status;
    const matchesSize = filters.size === 'all' || company.size === filters.size;
    return matchesSearch && matchesPlan && matchesVerified && matchesIndustry && matchesLocation && matchesStatus && matchesSize;
  });

  const filterGroups = [
    {
      id: 'status',
      label: 'Status',
      options: [
        { label: 'All Status', value: 'all', count: companies.length },
        { label: 'Active', value: 'active', count: companies.filter(c => c.status === 'active').length },
        { label: 'Pending', value: 'pending', count: companies.filter(c => c.status === 'pending').length },
        { label: 'Inactive', value: 'inactive', count: companies.filter(c => c.status === 'inactive').length }
      ]
    },
    {
      id: 'industry',
      label: 'Industry',
      type: 'search' as const,
      options: [
        { label: 'All Industries', value: 'all', count: companies.length },
        ...Array.from(new Set(companies.map(c => c.industry))).map(ind => ({
          label: ind,
          value: ind,
          count: companies.filter(c => c.industry === ind).length
        }))
      ]
    },
    {
      id: 'size',
      label: 'Company Size',
      options: [
        { label: 'All Sizes', value: 'all', count: companies.length },
        ...Array.from(new Set(companies.map(c => c.size))).map(size => ({
          label: size,
          value: size,
          count: companies.filter(c => c.size === size).length
        }))
      ]
    },
    {
      id: 'location',
      label: 'Location',
      type: 'search' as const,
      options: [
        { label: 'All Locations', value: 'all', count: companies.length },
        ...Array.from(new Set(companies.map(c => c.location))).map(loc => ({
          label: loc,
          value: loc,
          count: companies.filter(c => c.location === loc).length
        }))
      ]
    }
  ];

  const handleFilterChange = (filterId: string, value: string) => {
    setFilters(prev => ({ ...prev, [filterId]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      plan: 'all',
      verified: 'all',
      industry: 'all',
      location: 'all',
      status: 'all',
      size: 'all'
    });
  };

  const stats = {
    total: companies.length,
    active: companies.filter(c => c.status === 'active').length,
    pending: companies.filter(c => c.status === 'pending').length,
    verified: companies.filter(c => c.verified).length,
  };

  const planCounts = {
    all: companies.length,
    'Pro': companies.filter(c => c.plan === 'Pro').length,
    'Free': companies.filter(c => c.plan === 'Free').length,
    'Quick Recruit': companies.filter(c => c.plan === 'Quick Recruit').length,
  };

  const verifiedCounts = {
    all: companies.length,
    verified: companies.filter(c => c.verified).length,
    unverified: companies.filter(c => !c.verified).length,
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

  if (selectedCompanyId !== null) {
    return <CompanyDetailView companyId={selectedCompanyId} onBack={() => setSelectedCompanyId(null)} />;
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
            Companies
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
              {companies.length}
            </p>
            <p style={{ color: '#6f6f6f' }}>Total Companies</p>
          </div>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
          style={{ backgroundColor: '#023047', color: '#FFC300' }}
        >
          <Plus className="w-5 h-5" />
          Add Company
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-lg p-4" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
          <p style={{ color: '#d3d3d3' }}>Total Companies</p>
          <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>{stats.total}</p>
        </div>
        <div className="rounded-lg p-4" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
          <p style={{ color: '#d3d3d3' }}>Active</p>
          <p className="mt-1" style={{ color: '#FFC300', fontSize: '1.5rem', fontWeight: '700' }}>{stats.active}</p>
        </div>
        <div className="rounded-lg p-4" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
          <p style={{ color: '#d3d3d3' }}>Pending Approval</p>
          <p className="mt-1" style={{ color: '#FFC300', fontSize: '1.5rem', fontWeight: '700' }}>{stats.pending}</p>
        </div>
        <div className="rounded-lg p-4" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
          <p style={{ color: '#d3d3d3' }}>Verified</p>
          <p className="mt-1" style={{ color: '#FFC300', fontSize: '1.5rem', fontWeight: '700' }}>{stats.verified}</p>
        </div>
      </div>

      <div className="rounded-lg p-4" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
          <div>
            <p className="mb-3" style={{ color: '#d3d3d3' }}>Subscription Plan</p>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilters({ ...filters, plan: 'all' })}
                className="px-4 py-2 rounded-lg transition-colors"
                style={{
                  backgroundColor: filters.plan === 'all' ? '#023047' : '#6f6f6f',
                  color: '#f6f6f6'
                }}
              >
                All Plans ({planCounts.all})
              </button>
              <button
                onClick={() => setFilters({ ...filters, plan: 'Pro' })}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
                style={{
                  backgroundColor: filters.plan === 'Pro' ? '#FFC300' : '#6f6f6f',
                  color: filters.plan === 'Pro' ? '#023047' : '#f6f6f6'
                }}
              >
                <Crown className="w-4 h-4" />
                Pro ({planCounts.Pro})
              </button>
              <button
                onClick={() => setFilters({ ...filters, plan: 'Quick Recruit' })}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
                style={{
                  backgroundColor: filters.plan === 'Quick Recruit' ? '#023047' : '#6f6f6f',
                  color: '#f6f6f6'
                }}
              >
                <Zap className="w-4 h-4" />
                Quick Recruit ({planCounts['Quick Recruit']})
              </button>
              <button
                onClick={() => setFilters({ ...filters, plan: 'Free' })}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
                style={{
                  backgroundColor: filters.plan === 'Free' ? '#6f6f6f' : '#6f6f6f',
                  color: '#f6f6f6',
                  border: filters.plan === 'Free' ? '2px solid #f6f6f6' : 'none'
                }}
              >
                <Star className="w-4 h-4" />
                Free ({planCounts.Free})
              </button>
            </div>
          </div>

          <div>
            <p className="mb-3" style={{ color: '#d3d3d3' }}>Verification Status</p>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilters({ ...filters, verified: 'all' })}
                className="px-4 py-2 rounded-lg transition-colors"
                style={{
                  backgroundColor: filters.verified === 'all' ? '#023047' : '#6f6f6f',
                  color: '#f6f6f6'
                }}
              >
                All Companies ({verifiedCounts.all})
              </button>
              <button
                onClick={() => setFilters({ ...filters, verified: 'verified' })}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
                style={{
                  backgroundColor: filters.verified === 'verified' ? '#023047' : '#6f6f6f',
                  color: '#f6f6f6'
                }}
              >
                <BadgeCheck className="w-4 h-4" />
                Verified ({verifiedCounts.verified})
              </button>
              <button
                onClick={() => setFilters({ ...filters, verified: 'unverified' })}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
                style={{
                  backgroundColor: filters.verified === 'unverified' ? '#6f6f6f' : '#6f6f6f',
                  color: '#f6f6f6',
                  border: filters.verified === 'unverified' ? '2px solid #d3d3d3' : 'none'
                }}
              >
                <XCircle className="w-4 h-4" />
                Unverified ({verifiedCounts.unverified})
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[300px] relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#6f6f6f' }} />
            <input
              type="text"
              placeholder="Search companies..."
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredCompanies.map((company) => (
          <div 
            key={company.id} 
            onClick={() => setSelectedCompanyId(company.id)}
            className="rounded-lg p-6 transition-all cursor-pointer" 
            style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#FFC300'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = '#6f6f6f'}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #FFC300 0%, #023047 100%)' }}>
                  <Building2 className="w-8 h-8" style={{ color: '#f6f6f6' }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start gap-2 flex-wrap">
                    <h3 style={{ color: '#f6f6f6' }}>{company.name}</h3>
                    {getPlanBadge(company.plan)}
                    {company.verified && (
                      <BadgeCheck className="w-5 h-5 flex-shrink-0" style={{ color: '#023047' }} title="Verified - BGV Completed" />
                    )}
                    {company.isPro && (
                      <Crown className="w-5 h-5 flex-shrink-0" style={{ color: '#FFC300' }} title="Pro - Paid Company" />
                    )}
                  </div>
                  <p className="mt-1" style={{ color: '#d3d3d3' }}>{company.industry}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Star className="w-4 h-4" style={{ color: '#FFC300', fill: '#FFC300' }} />
                    <span style={{ color: '#f6f6f6' }}>{company.rating}</span>
                  </div>
                </div>
              </div>
              <span className="inline-flex px-3 py-1 rounded-full text-xs" style={{
                backgroundColor: company.status === 'active' ? '#FFC300' : company.status === 'pending' ? '#023047' : '#6f6f6f',
                color: company.status === 'active' ? '#023047' : '#f6f6f6'
              }}>
                {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
              </span>
            </div>

            <p className="mb-4 line-clamp-2" style={{ color: '#d3d3d3' }}>{company.description}</p>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2" style={{ color: '#d3d3d3' }}>
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{company.location}</span>
              </div>
              <div className="flex items-center gap-2" style={{ color: '#d3d3d3' }}>
                <Users className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{company.employeesCount}</span>
              </div>
              <div className="flex items-center gap-2" style={{ color: '#d3d3d3' }}>
                <Briefcase className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{company.activeJobs} active jobs</span>
              </div>
              <div className="flex items-center gap-2" style={{ color: '#d3d3d3' }}>
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{company.totalApplications} applications</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid #6f6f6f' }}>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => {
                    setSelectedCompanyId(company.id);
                    setShowModal(true);
                  }}
                  className="p-2 rounded-lg transition-colors" 
                  title="View Details"
                  style={{ color: '#d3d3d3' }}
                >
                  <Edit className="w-4 h-4" />
                </button>
                {company.status === 'pending' && (
                  <>
                    <button className="p-2 rounded-lg transition-colors" title="Approve" style={{ color: '#FFC300' }}>
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg transition-colors" title="Reject" style={{ color: '#6f6f6f' }}>
                      <XCircle className="w-4 h-4" />
                    </button>
                  </>
                )}
                <button className="p-2 rounded-lg transition-colors" title="Delete" style={{ color: '#6f6f6f' }}>
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <a 
                href={`https://${company.website}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1"
                style={{ color: '#FFC300' }}
              >
                <Globe className="w-4 h-4" />
                <span>Website</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50" style={{ backgroundColor: 'rgba(2, 48, 71, 0.8)' }}>
          <div className="rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto" style={{ backgroundColor: '#023047', border: '2px solid #FFC300' }}>
            <div className="p-6" style={{ borderBottom: '1px solid #6f6f6f' }}>
              <h2 style={{ color: '#FFC300', fontSize: '1.5rem', fontWeight: '700' }}>{selectedCompanyId ? 'Company Details' : 'Add New Company'}</h2>
            </div>
            <div className="p-6 space-y-4">
              {selectedCompanyId ? (
                <CompanyDetailView companyId={selectedCompanyId} />
              ) : (
                <>
                  <div>
                    <label className="block mb-2" style={{ color: '#f6f6f6' }}>Company Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded-lg focus:outline-none"
                      style={{ 
                        border: '1px solid #6f6f6f', 
                        backgroundColor: '#f6f6f6',
                        color: '#023047'
                      }}
                      placeholder="e.g. Tech Corp"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2" style={{ color: '#f6f6f6' }}>Industry</label>
                      <select className="w-full px-4 py-2 rounded-lg focus:outline-none" style={{ 
                        border: '1px solid #6f6f6f', 
                        backgroundColor: '#f6f6f6',
                        color: '#023047'
                      }}>
                        <option>Technology</option>
                        <option>Healthcare</option>
                        <option>Finance</option>
                        <option>Education</option>
                        <option>Marketing</option>
                        <option>Media & Publishing</option>
                        <option>Design</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-2" style={{ color: '#f6f6f6' }}>Company Size</label>
                      <select className="w-full px-4 py-2 rounded-lg focus:outline-none" style={{ 
                        border: '1px solid #6f6f6f', 
                        backgroundColor: '#f6f6f6',
                        color: '#023047'
                      }}>
                        <option>1-10</option>
                        <option>10-50</option>
                        <option>50-200</option>
                        <option>200-500</option>
                        <option>500-1000</option>
                        <option>1000-5000</option>
                        <option>5000+</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2" style={{ color: '#f6f6f6' }}>Location</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded-lg focus:outline-none"
                      style={{ 
                        border: '1px solid #6f6f6f', 
                        backgroundColor: '#f6f6f6',
                        color: '#023047'
                      }}
                      placeholder="City, State"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2" style={{ color: '#f6f6f6' }}>Email</label>
                      <input
                        type="email"
                        className="w-full px-4 py-2 rounded-lg focus:outline-none"
                        style={{ 
                          border: '1px solid #6f6f6f', 
                          backgroundColor: '#f6f6f6',
                          color: '#023047'
                        }}
                        placeholder="hr@company.com"
                      />
                    </div>
                    <div>
                      <label className="block mb-2" style={{ color: '#f6f6f6' }}>Phone</label>
                      <input
                        type="tel"
                        className="w-full px-4 py-2 rounded-lg focus:outline-none"
                        style={{ 
                          border: '1px solid #6f6f6f', 
                          backgroundColor: '#f6f6f6',
                          color: '#023047'
                        }}
                        placeholder="+1 234 567 8900"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2" style={{ color: '#f6f6f6' }}>Website</label>
                    <input
                      type="url"
                      className="w-full px-4 py-2 rounded-lg focus:outline-none"
                      style={{ 
                        border: '1px solid #6f6f6f', 
                        backgroundColor: '#f6f6f6',
                        color: '#023047'
                      }}
                      placeholder="www.company.com"
                    />
                  </div>
                  <div>
                    <label className="block mb-2" style={{ color: '#f6f6f6' }}>Description</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg focus:outline-none"
                      style={{ 
                        border: '1px solid #6f6f6f', 
                        backgroundColor: '#f6f6f6',
                        color: '#023047'
                      }}
                      placeholder="Brief description of the company..."
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" style={{ accentColor: '#FFC300' }} />
                      <span style={{ color: '#f6f6f6' }}>Mark as verified</span>
                    </label>
                  </div>
                </>
              )}
            </div>
            <div className="p-6 flex gap-3 justify-end" style={{ borderTop: '1px solid #6f6f6f' }}>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg transition-colors"
                style={{ 
                  border: '1px solid #6f6f6f',
                  backgroundColor: '#6f6f6f',
                  color: '#f6f6f6'
                }}
              >
                Close
              </button>
              {!selectedCompanyId && (
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg transition-colors"
                  style={{ 
                    backgroundColor: '#FFC300',
                    color: '#023047'
                  }}
                >
                  Add Company
                </button>
              )}
              {selectedCompanyId && companies.find(c => c.id === selectedCompanyId)?.status === 'pending' && (
                <>
                  <button className="px-4 py-2 rounded-lg transition-colors" style={{ 
                    backgroundColor: '#FFC300',
                    color: '#023047'
                  }}>
                    Approve
                  </button>
                  <button className="px-4 py-2 rounded-lg transition-colors" style={{ 
                    backgroundColor: '#6f6f6f',
                    color: '#f6f6f6'
                  }}>
                    Reject
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

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