import { useState } from 'react';
import { ArrowLeft, MapPin, Users, Briefcase, Mail, Phone, Globe, Building2, TrendingUp, Eye, Calendar, DollarSign, CheckCircle, FileText, Clock, Linkedin, User, Building } from 'lucide-react';

interface Job {
  id: number;
  title: string;
  type: string;
  location: string;
  salary: string;
  status: 'active' | 'closed';
  postedDate: string;
  applications: number;
  category: string;
}

interface CompanyDetailViewProps {
  companyId: number;
  onBack: () => void;
  onViewJob?: (jobId: number) => void;
}

export function CompanyDetailView({ companyId, onBack, onViewJob }: CompanyDetailViewProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'jobs'>('overview');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const company = {
    id: companyId,
    name: 'Tech Corp',
    industry: 'Technology',
    location: 'New York, NY',
    employeesCount: '1000-5000',
    website: 'techcorp.com',
    email: 'hr@techcorp.com',
    phone: '+1 (555) 123-4567',
    description: 'Tech Corp is a leading technology company specializing in innovative software solutions. We are committed to creating cutting-edge products that transform businesses and improve lives. Our team of talented professionals works on exciting projects using the latest technologies.',
    founded: '2010',
    headquarters: 'New York, NY',
    officeLocations: ['New York, NY', 'San Francisco, CA', 'Austin, TX', 'Boston, MA'],
    companySize: '2,500 employees',
    rating: 4.5,
    verified: true,
    status: 'active',
    joinedDate: '2023-01-15',
    activeJobs: 12,
    totalApplications: 456,
    culture: ['Innovation', 'Work-Life Balance', 'Growth Opportunities', 'Diverse & Inclusive'],
    benefits: ['Health Insurance', '401(k) Matching', 'Remote Work Options', 'Professional Development', 'Unlimited PTO', 'Stock Options'],
    registrationNumber: 'TC-2020-NY-45678',
    gstNumber: '29AABCT1234F1Z5',
    linkedinUrl: 'https://linkedin.com/company/techcorp',
    officeTimings: '9:00 AM - 6:00 PM',
    workingDays: 'Monday - Friday',
    companyType: 'Private Limited',
    foundedYear: '2015',
    ceoName: 'John Anderson'
  };

  const jobs: Job[] = [
    { id: 1, title: 'Senior React Developer', type: 'Full-time', location: 'New York, NY', salary: '$120k - $150k', status: 'active', postedDate: '2024-12-01', applications: 89, category: 'Technology' },
    { id: 2, title: 'Product Manager', type: 'Full-time', location: 'San Francisco, CA', salary: '$130k - $160k', status: 'active', postedDate: '2024-12-03', applications: 67, category: 'Management' },
    { id: 3, title: 'UX Designer', type: 'Full-time', location: 'Austin, TX', salary: '$90k - $120k', status: 'active', postedDate: '2024-12-05', applications: 56, category: 'Design' },
    { id: 4, title: 'Data Scientist', type: 'Full-time', location: 'Boston, MA', salary: '$140k - $170k', status: 'active', postedDate: '2024-11-28', applications: 78, category: 'Technology' },
    { id: 5, title: 'DevOps Engineer', type: 'Full-time', location: 'Remote', salary: '$110k - $140k', status: 'active', postedDate: '2024-12-04', applications: 52, category: 'Technology' },
    { id: 6, title: 'Marketing Manager', type: 'Full-time', location: 'New York, NY', salary: '$100k - $130k', status: 'active', postedDate: '2024-12-02', applications: 45, category: 'Marketing' },
    { id: 7, title: 'Backend Developer', type: 'Full-time', location: 'San Francisco, CA', salary: '$115k - $145k', status: 'active', postedDate: '2024-11-30', applications: 62, category: 'Technology' },
    { id: 8, title: 'QA Engineer', type: 'Full-time', location: 'Austin, TX', salary: '$85k - $110k', status: 'active', postedDate: '2024-12-06', applications: 38, category: 'Technology' },
    { id: 9, title: 'Sales Executive', type: 'Full-time', location: 'Boston, MA', salary: '$90k - $120k + Commission', status: 'closed', postedDate: '2024-11-15', applications: 94, category: 'Sales' },
    { id: 10, title: 'Mobile Developer', type: 'Full-time', location: 'Remote', salary: '$105k - $135k', status: 'active', postedDate: '2024-12-01', applications: 71, category: 'Technology' },
    { id: 11, title: 'HR Manager', type: 'Full-time', location: 'New York, NY', salary: '$95k - $125k', status: 'active', postedDate: '2024-12-03', applications: 42, category: 'Human Resources' },
    { id: 12, title: 'Content Strategist', type: 'Full-time', location: 'Remote', salary: '$80k - $105k', status: 'active', postedDate: '2024-12-05', applications: 33, category: 'Marketing' },
  ];

  const stats = {
    totalJobs: jobs.length,
    activeJobs: jobs.filter(j => j.status === 'active').length,
    totalApplications: jobs.reduce((sum, j) => sum + j.applications, 0),
    avgApplicationsPerJob: Math.round(jobs.reduce((sum, j) => sum + j.applications, 0) / jobs.length),
  };

  return (
    <div className="space-y-6">
      <div>
        <button 
          onClick={onBack}
          className="flex items-center gap-2 mb-4 transition-colors"
          style={{ color: '#d3d3d3' }}
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Companies
        </button>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #FFC300 0%, #023047 100%)' }}>
              <Building2 className="w-10 h-10" style={{ color: '#f6f6f6' }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 
                  style={{ 
                    color: '#FFC300',
                    fontSize: '2.5rem',
                    fontWeight: '800',
                    letterSpacing: '-0.02em',
                    textShadow: '0 0 30px rgba(255, 195, 0, 0.3), 0 0 60px rgba(255, 195, 0, 0.2)',
                    marginBottom: '0.25rem'
                  }}
                >
                  {company.name}
                </h1>
                {company.verified && (
                  <CheckCircle className="w-6 h-6" style={{ color: '#FFC300' }} title="Verified" />
                )}
              </div>
              <p className="mt-2" style={{ color: '#d3d3d3' }}>{company.industry}</p>
            </div>
          </div>
          <span className="inline-flex px-4 py-2 rounded-full" style={{
            backgroundColor: company.status === 'active' ? '#FFC300' : '#6f6f6f',
            color: company.status === 'active' ? '#023047' : '#f6f6f6'
          }}>
            {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
              <Briefcase className="w-5 h-5" style={{ color: '#023047' }} />
            </div>
          </div>
          <p style={{ color: '#d3d3d3' }}>Total Jobs</p>
          <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>{stats.totalJobs}</p>
        </div>
        <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
              <TrendingUp className="w-5 h-5" style={{ color: '#023047' }} />
            </div>
          </div>
          <p style={{ color: '#d3d3d3' }}>Active Jobs</p>
          <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>{stats.activeJobs}</p>
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
              <TrendingUp className="w-5 h-5" style={{ color: '#f6f6f6' }} />
            </div>
          </div>
          <p style={{ color: '#d3d3d3' }}>Avg per Job</p>
          <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>{stats.avgApplicationsPerJob}</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ borderBottom: '1px solid #6f6f6f' }}>
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab('overview')}
            className="pb-3 px-1 transition-colors"
            style={{
              borderBottom: activeTab === 'overview' ? '2px solid #FFC300' : '2px solid transparent',
              color: activeTab === 'overview' ? '#FFC300' : '#d3d3d3'
            }}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className="pb-3 px-1 transition-colors"
            style={{
              borderBottom: activeTab === 'jobs' ? '2px solid #FFC300' : '2px solid transparent',
              color: activeTab === 'jobs' ? '#FFC300' : '#d3d3d3'
            }}
          >
            Jobs ({stats.totalJobs})
          </button>
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <h3 className="mb-4" style={{ color: '#FFC300' }}>Company Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="mb-3" style={{ color: '#f6f6f6' }}>Contact Details</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5" style={{ color: '#d3d3d3' }} />
                    <span style={{ color: '#f6f6f6' }}>{company.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5" style={{ color: '#d3d3d3' }} />
                    <span style={{ color: '#f6f6f6' }}>{company.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5" style={{ color: '#d3d3d3' }} />
                    <span style={{ color: '#f6f6f6' }}>{company.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5" style={{ color: '#d3d3d3' }} />
                    <a href={`https://${company.website}`} target="_blank" rel="noopener noreferrer" style={{ color: '#FFC300' }}>
                      {company.website}
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-3" style={{ color: '#f6f6f6' }}>Company Details</h4>
                <div className="space-y-3">
                  <div>
                    <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Industry</p>
                    <p style={{ color: '#f6f6f6' }}>{company.industry}</p>
                  </div>
                  <div>
                    <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Company Size</p>
                    <p style={{ color: '#f6f6f6' }}>{company.companySize}</p>
                  </div>
                  <div>
                    <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Founded</p>
                    <p style={{ color: '#f6f6f6' }}>{company.founded}</p>
                  </div>
                  <div>
                    <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Joined Platform</p>
                    <p style={{ color: '#f6f6f6' }}>{company.joinedDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <h3 className="mb-3" style={{ color: '#FFC300' }}>About</h3>
            <p style={{ color: '#d3d3d3' }}>{company.description}</p>
          </div>

          {/* Company Registration & Legal Information */}
          <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <h3 className="mb-4" style={{ color: '#FFC300' }}>Registration & Legal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {company.registrationNumber && (
                <div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FFC300' }}>
                      <FileText className="w-5 h-5" style={{ color: '#023047' }} />
                    </div>
                    <div>
                      <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Registration Number</p>
                      <p style={{ color: '#f6f6f6' }}>{company.registrationNumber}</p>
                    </div>
                  </div>
                </div>
              )}
              {company.gstNumber && (
                <div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FFC300' }}>
                      <FileText className="w-5 h-5" style={{ color: '#023047' }} />
                    </div>
                    <div>
                      <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>GST Number</p>
                      <p style={{ color: '#f6f6f6' }}>{company.gstNumber}</p>
                    </div>
                  </div>
                </div>
              )}
              <div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#023047' }}>
                      <Building className="w-5 h-5" style={{ color: '#f6f6f6' }} />
                    </div>
                    <div>
                      <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Company Type</p>
                      <p style={{ color: '#f6f6f6' }}>{company.companyType}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#023047' }}>
                      <User className="w-5 h-5" style={{ color: '#f6f6f6' }} />
                    </div>
                    <div>
                      <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>CEO / Founder</p>
                      <p style={{ color: '#f6f6f6' }}>{company.ceoName}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Office Timings & Working Schedule */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <h3 className="mb-4" style={{ color: '#FFC300' }}>Office Timings</h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
                  <Clock className="w-6 h-6" style={{ color: '#023047' }} />
                </div>
                <div>
                  <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Working Hours</p>
                  <p style={{ color: '#f6f6f6', fontSize: '1.125rem' }}>{company.officeTimings}</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <h3 className="mb-4" style={{ color: '#FFC300' }}>Working Days</h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#023047' }}>
                  <Calendar className="w-6 h-6" style={{ color: '#f6f6f6' }} />
                </div>
                <div>
                  <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Work Week</p>
                  <p style={{ color: '#f6f6f6', fontSize: '1.125rem' }}>{company.workingDays}</p>
                </div>
              </div>
            </div>
          </div>

          {/* LinkedIn & Social Links */}
          <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <h3 className="mb-4" style={{ color: '#FFC300' }}>Social Media & Professional Links</h3>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#023047' }}>
                <Linkedin className="w-6 h-6" style={{ color: '#f6f6f6' }} />
              </div>
              <div className="flex-1">
                <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>LinkedIn Company Page</p>
                <a 
                  href={company.linkedinUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:underline"
                  style={{ color: '#FFC300', fontSize: '1.125rem' }}
                >
                  {company.linkedinUrl}
                </a>
              </div>
              <a 
                href={company.linkedinUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg transition-colors"
                style={{ backgroundColor: '#023047', color: '#f6f6f6' }}
              >
                Visit LinkedIn
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <h3 className="mb-3" style={{ color: '#FFC300' }}>Office Locations</h3>
              <div className="space-y-2">
                {company.officeLocations.map((location, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" style={{ color: '#FFC300' }} />
                    <span style={{ color: '#f6f6f6' }}>{location}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <h3 className="mb-3" style={{ color: '#FFC300' }}>Company Culture</h3>
              <div className="flex flex-wrap gap-2">
                {company.culture.map((item, index) => (
                  <span key={index} className="px-3 py-1 rounded-full" style={{ backgroundColor: '#023047', color: '#f6f6f6', fontSize: '0.875rem' }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <h3 className="mb-3" style={{ color: '#FFC300' }}>Benefits & Perks</h3>
            <div className="flex flex-wrap gap-2">
              {company.benefits.map((benefit, index) => (
                <span key={index} className="px-3 py-1 rounded-full" style={{ backgroundColor: '#FFC300', color: '#023047', fontSize: '0.875rem' }}>
                  {benefit}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Jobs Tab */}
      {activeTab === 'jobs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p style={{ color: '#d3d3d3' }}>Showing {jobs.length} job postings</p>
            <button className="px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: '#FFC300', color: '#023047' }}>
              Add New Job
            </button>
          </div>

          <div className="grid gap-4">
            {jobs.map((job) => (
              <div key={job.id} className="rounded-lg p-6 transition-shadow" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 style={{ color: '#f6f6f6' }}>{job.title}</h4>
                        <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>{job.category}</p>
                      </div>
                      <span className="inline-flex px-3 py-1 rounded-full text-xs" style={{
                        backgroundColor: job.status === 'active' ? '#FFC300' : '#6f6f6f',
                        color: job.status === 'active' ? '#023047' : '#f6f6f6'
                      }}>
                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div className="flex items-center gap-2" style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>
                        <Briefcase className="w-4 h-4" />
                        {job.type}
                      </div>
                      <div className="flex items-center gap-2" style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-2" style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>
                        <DollarSign className="w-4 h-4" />
                        {job.salary}
                      </div>
                      <div className="flex items-center gap-2" style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>
                        <Calendar className="w-4 h-4" />
                        Posted {job.postedDate}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" style={{ color: '#d3d3d3' }} />
                        <span style={{ color: '#f6f6f6' }}>{job.applications} applications</span>
                      </div>
                      <button 
                        onClick={() => onViewJob?.(job.id)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
                        style={{ backgroundColor: '#023047', color: '#f6f6f6' }}
                      >
                        <Eye className="w-4 h-4" />
                        View Details & Applicants
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}