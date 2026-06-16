import { useState } from 'react';
import { ArrowLeft, MapPin, DollarSign, Briefcase, Calendar, Building2, Users, Eye, CheckCircle, XCircle, MessageSquare, Download, Star, Clock, Award } from 'lucide-react';

interface Applicant {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  experience: string;
  education: string;
  skills: string[];
  appliedDate: string;
  status: 'pending' | 'shortlisted' | 'rejected' | 'hired';
  resumeUrl: string;
  coverLetter: string;
  rating: number;
  previousCompanies: string[];
}

interface JobDetailViewProps {
  jobId: number;
  onBack: () => void;
}

export function JobDetailView({ jobId, onBack }: JobDetailViewProps) {
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const job = {
    id: jobId,
    title: 'Senior React Developer',
    company: 'Tech Corp',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$120k - $150k',
    category: 'Technology',
    status: 'active',
    postedDate: '2024-12-01',
    deadline: '2024-12-31',
    description: 'We are looking for an experienced React Developer to join our growing team. You will be responsible for developing and maintaining web applications using React.js and related technologies.',
    requirements: [
      '5+ years of experience with React.js',
      'Strong knowledge of JavaScript/TypeScript',
      'Experience with Redux, React Router',
      'Familiarity with RESTful APIs',
      'Experience with Git version control',
      'Excellent problem-solving skills'
    ],
    responsibilities: [
      'Develop new user-facing features using React.js',
      'Build reusable components and front-end libraries',
      'Optimize applications for maximum speed and scalability',
      'Collaborate with back-end developers and designers',
      'Participate in code reviews and mentoring'
    ],
    benefits: ['Health Insurance', 'Remote Work', '401(k)', 'Paid Time Off', 'Professional Development']
  };

  const applicants: Applicant[] = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      experience: '6 years',
      education: 'BS Computer Science - MIT',
      skills: ['React', 'TypeScript', 'Node.js', 'Redux', 'GraphQL'],
      appliedDate: '2024-12-02',
      status: 'shortlisted',
      resumeUrl: '#',
      coverLetter: 'I am excited to apply for the Senior React Developer position. With over 6 years of experience in building scalable web applications...',
      rating: 4.5,
      previousCompanies: ['Google', 'Microsoft', 'Startup Inc']
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 (555) 234-5678',
      location: 'Brooklyn, NY',
      experience: '5 years',
      education: 'MS Software Engineering - Stanford',
      skills: ['React', 'JavaScript', 'AWS', 'Docker', 'MongoDB'],
      appliedDate: '2024-12-03',
      status: 'pending',
      resumeUrl: '#',
      coverLetter: 'I have been following Tech Corp for years and am impressed by your innovative approach to technology...',
      rating: 4.8,
      previousCompanies: ['Amazon', 'Facebook']
    },
    {
      id: 3,
      name: 'Michael Chen',
      email: 'mchen@email.com',
      phone: '+1 (555) 345-6789',
      location: 'Queens, NY',
      experience: '7 years',
      education: 'BS Computer Engineering - Berkeley',
      skills: ['React', 'Vue.js', 'TypeScript', 'Python', 'PostgreSQL'],
      appliedDate: '2024-12-04',
      status: 'shortlisted',
      resumeUrl: '#',
      coverLetter: 'As a passionate developer with extensive experience in React and modern web technologies...',
      rating: 4.6,
      previousCompanies: ['Apple', 'Netflix', 'Uber']
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      phone: '+1 (555) 456-7890',
      location: 'Manhattan, NY',
      experience: '4 years',
      education: 'BS Information Systems - NYU',
      skills: ['React', 'JavaScript', 'CSS', 'Firebase', 'Git'],
      appliedDate: '2024-12-05',
      status: 'rejected',
      resumeUrl: '#',
      coverLetter: 'I am writing to express my interest in the Senior React Developer role at Tech Corp...',
      rating: 3.9,
      previousCompanies: ['IBM', 'Cisco']
    },
    {
      id: 5,
      name: 'David Wilson',
      email: 'dwilson@email.com',
      phone: '+1 (555) 567-8901',
      location: 'Jersey City, NJ',
      experience: '8 years',
      education: 'MS Computer Science - CMU',
      skills: ['React', 'Angular', 'Node.js', 'Kubernetes', 'Jenkins'],
      appliedDate: '2024-12-01',
      status: 'hired',
      resumeUrl: '#',
      coverLetter: 'With 8 years of full-stack development experience and a proven track record of delivering high-quality applications...',
      rating: 4.9,
      previousCompanies: ['LinkedIn', 'Twitter', 'Salesforce']
    },
  ];

  const matchedProfiles: Applicant[] = [
    {
      id: 101,
      name: 'Alex Thompson',
      email: 'alex.t@email.com',
      phone: '+1 (555) 678-9012',
      location: 'New York, NY',
      experience: '6 years',
      education: 'MS Computer Science - Columbia',
      skills: ['React', 'TypeScript', 'Redux', 'Node.js', 'AWS'],
      appliedDate: '',
      status: 'pending',
      resumeUrl: '#',
      coverLetter: '',
      rating: 4.7,
      previousCompanies: ['Meta', 'Airbnb', 'Dropbox']
    },
    {
      id: 102,
      name: 'Rachel Martinez',
      email: 'rachel.m@email.com',
      phone: '+1 (555) 789-0123',
      location: 'Manhattan, NY',
      experience: '5 years',
      education: 'BS Computer Science - Cornell',
      skills: ['React', 'JavaScript', 'GraphQL', 'Docker', 'CI/CD'],
      appliedDate: '',
      status: 'pending',
      resumeUrl: '#',
      coverLetter: '',
      rating: 4.6,
      previousCompanies: ['Spotify', 'Stripe']
    },
    {
      id: 103,
      name: 'James Lee',
      email: 'james.lee@email.com',
      phone: '+1 (555) 890-1234',
      location: 'Brooklyn, NY',
      experience: '7 years',
      education: 'MS Software Engineering - NYU',
      skills: ['React', 'TypeScript', 'Next.js', 'PostgreSQL', 'Redis'],
      appliedDate: '',
      status: 'pending',
      resumeUrl: '#',
      coverLetter: '',
      rating: 4.8,
      previousCompanies: ['Shopify', 'Square', 'Twilio']
    },
  ];

  const filteredApplicants = applicants.filter(app => 
    filterStatus === 'all' || app.status === filterStatus
  );

  const stats = {
    total: applicants.length,
    pending: applicants.filter(a => a.status === 'pending').length,
    shortlisted: applicants.filter(a => a.status === 'shortlisted').length,
    rejected: applicants.filter(a => a.status === 'rejected').length,
    hired: applicants.filter(a => a.status === 'hired').length,
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
          Back to Jobs
        </button>
        <div className="flex items-start justify-between">
          <div>
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
              {job.title}
            </h1>
            <p className="mt-2" style={{ color: '#d3d3d3' }}>{job.company}</p>
          </div>
          <span className="inline-flex px-4 py-2 rounded-full" style={{
            backgroundColor: job.status === 'active' ? '#FFC300' : '#6f6f6f',
            color: job.status === 'active' ? '#023047' : '#f6f6f6'
          }}>
            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
          </span>
        </div>
      </div>

      <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
              <MapPin className="w-5 h-5" style={{ color: '#023047' }} />
            </div>
            <div>
              <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Location</p>
              <p style={{ color: '#f6f6f6' }}>{job.location}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#023047' }}>
              <Briefcase className="w-5 h-5" style={{ color: '#f6f6f6' }} />
            </div>
            <div>
              <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Job Type</p>
              <p style={{ color: '#f6f6f6' }}>{job.type}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
              <DollarSign className="w-5 h-5" style={{ color: '#023047' }} />
            </div>
            <div>
              <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Salary</p>
              <p style={{ color: '#f6f6f6' }}>{job.salary}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#6f6f6f' }}>
              <Calendar className="w-5 h-5" style={{ color: '#f6f6f6' }} />
            </div>
            <div>
              <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Deadline</p>
              <p style={{ color: '#f6f6f6' }}>{job.deadline}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="mb-2" style={{ color: '#FFC300' }}>Description</h3>
            <p style={{ color: '#d3d3d3' }}>{job.description}</p>
          </div>

          <div>
            <h3 className="mb-2" style={{ color: '#FFC300' }}>Requirements</h3>
            <ul className="space-y-1">
              {job.requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-2" style={{ color: '#d3d3d3' }}>
                  <span style={{ color: '#FFC300' }}>•</span>
                  {req}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-2" style={{ color: '#FFC300' }}>Responsibilities</h3>
            <ul className="space-y-1">
              {job.responsibilities.map((resp, index) => (
                <li key={index} className="flex items-start gap-2" style={{ color: '#d3d3d3' }}>
                  <span style={{ color: '#FFC300' }}>•</span>
                  {resp}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-2" style={{ color: '#FFC300' }}>Benefits</h3>
            <div className="flex flex-wrap gap-2">
              {job.benefits.map((benefit, index) => (
                <span key={index} className="px-3 py-1 rounded-full" style={{ backgroundColor: '#023047', color: '#f6f6f6', fontSize: '0.875rem' }}>
                  {benefit}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
        <div className="p-6" style={{ borderBottom: '1px solid #6f6f6f' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 style={{ color: '#FFC300' }}>Applicants ({stats.total})</h2>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: '#FFC300', color: '#023047' }}>
              <Download className="w-5 h-5" />
              Export List
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="rounded-lg p-3 text-center" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Total</p>
              <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.25rem', fontWeight: '700' }}>{stats.total}</p>
            </div>
            <div className="rounded-lg p-3 text-center" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Pending</p>
              <p className="mt-1" style={{ color: '#FFC300', fontSize: '1.25rem', fontWeight: '700' }}>{stats.pending}</p>
            </div>
            <div className="rounded-lg p-3 text-center" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Shortlisted</p>
              <p className="mt-1" style={{ color: '#023047', fontSize: '1.25rem', fontWeight: '700' }}>{stats.shortlisted}</p>
            </div>
            <div className="rounded-lg p-3 text-center" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Rejected</p>
              <p className="mt-1" style={{ color: '#6f6f6f', fontSize: '1.25rem', fontWeight: '700' }}>{stats.rejected}</p>
            </div>
            <div className="rounded-lg p-3 text-center" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Hired</p>
              <p className="mt-1" style={{ color: '#FFC300', fontSize: '1.25rem', fontWeight: '700' }}>{stats.hired}</p>
            </div>
          </div>

          <div className="flex gap-2 mt-4 flex-wrap">
            <button onClick={() => setFilterStatus('all')} className="px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: filterStatus === 'all' ? '#023047' : '#6f6f6f', color: '#f6f6f6' }}>All</button>
            <button onClick={() => setFilterStatus('pending')} className="px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: filterStatus === 'pending' ? '#023047' : '#6f6f6f', color: '#f6f6f6' }}>Pending</button>
            <button onClick={() => setFilterStatus('shortlisted')} className="px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: filterStatus === 'shortlisted' ? '#023047' : '#6f6f6f', color: '#f6f6f6' }}>Shortlisted</button>
            <button onClick={() => setFilterStatus('rejected')} className="px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: filterStatus === 'rejected' ? '#023047' : '#6f6f6f', color: '#f6f6f6' }}>Rejected</button>
            <button onClick={() => setFilterStatus('hired')} className="px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: filterStatus === 'hired' ? '#023047' : '#6f6f6f', color: '#f6f6f6' }}>Hired</button>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-3">
            {filteredApplicants.map((applicant) => (
              <div key={applicant.id} className="rounded-lg p-4 transition-shadow" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FFC300' }}>
                      <span style={{ color: '#023047', fontSize: '1.25rem', fontWeight: '700' }}>{applicant.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 style={{ color: '#f6f6f6' }}>{applicant.name}</h4>
                          <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>{applicant.education}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4" style={{ color: '#FFC300', fill: '#FFC300' }} />
                            <span style={{ color: '#f6f6f6' }}>{applicant.rating}</span>
                          </div>
                          <span className="inline-flex px-3 py-1 rounded-full text-xs" style={{
                            backgroundColor: applicant.status === 'hired' ? '#FFC300' : applicant.status === 'shortlisted' ? '#023047' : applicant.status === 'rejected' ? '#6f6f6f' : '#d3d3d3',
                            color: applicant.status === 'hired' || applicant.status === 'pending' ? '#023047' : '#f6f6f6'
                          }}>
                            {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                        <div className="flex items-center gap-2" style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>
                          <MapPin className="w-4 h-4" />
                          {applicant.location}
                        </div>
                        <div className="flex items-center gap-2" style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>
                          <Award className="w-4 h-4" />
                          {applicant.experience} exp
                        </div>
                        <div className="flex items-center gap-2" style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>
                          <Clock className="w-4 h-4" />
                          Applied {applicant.appliedDate}
                        </div>
                        <div className="flex items-center gap-2" style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>
                          <Building2 className="w-4 h-4" />
                          {applicant.previousCompanies[0]}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {applicant.skills.slice(0, 5).map((skill, index) => (
                          <span key={index} className="px-2 py-1 rounded text-xs" style={{ backgroundColor: '#6f6f6f', color: '#f6f6f6' }}>
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setSelectedApplicant(applicant)}
                          className="flex items-center gap-1 px-3 py-1 rounded-lg transition-colors text-xs"
                          style={{ backgroundColor: '#023047', color: '#f6f6f6' }}
                        >
                          <Eye className="w-4 h-4" />
                          View Profile
                        </button>
                        {applicant.status === 'pending' && (
                          <>
                            <button className="flex items-center gap-1 px-3 py-1 rounded-lg transition-colors text-xs" style={{ backgroundColor: '#FFC300', color: '#023047' }}>
                              <CheckCircle className="w-4 h-4" />
                              Shortlist
                            </button>
                            <button className="flex items-center gap-1 px-3 py-1 rounded-lg transition-colors text-xs" style={{ backgroundColor: '#6f6f6f', color: '#f6f6f6' }}>
                              <XCircle className="w-4 h-4" />
                              Reject
                            </button>
                          </>
                        )}
                        {applicant.status === 'shortlisted' && (
                          <button className="flex items-center gap-1 px-3 py-1 rounded-lg transition-colors text-xs" style={{ backgroundColor: '#FFC300', color: '#023047' }}>
                            <CheckCircle className="w-4 h-4" />
                            Hire
                          </button>
                        )}
                        <button className="flex items-center gap-1 px-3 py-1 rounded-lg transition-colors text-xs" style={{ border: '1px solid #6f6f6f', color: '#d3d3d3' }}>
                          <MessageSquare className="w-4 h-4" />
                          Message
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6" style={{ borderTop: '1px solid #6f6f6f' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 style={{ color: '#FFC300' }}>Matched Profiles ({matchedProfiles.length})</h2>
              <p style={{ color: '#d3d3d3', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                Potential candidates matching job requirements
              </p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors" style={{ border: '1px solid #FFC300', color: '#FFC300' }}>
              <Users className="w-5 h-5" />
              View All Matches
            </button>
          </div>

          <div className="space-y-3">
            {matchedProfiles.map((profile) => (
              <div key={profile.id} className="rounded-lg p-4 transition-shadow hover:shadow-lg" style={{ 
                backgroundColor: '#023047', 
                border: '1px solid #6f6f6f',
                background: 'linear-gradient(135deg, rgba(255, 195, 0, 0.05) 0%, rgba(2, 48, 71, 0.95) 100%)'
              }}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ 
                      backgroundColor: '#FFC300',
                      boxShadow: '0 0 20px rgba(255, 195, 0, 0.3)'
                    }}>
                      <span style={{ color: '#023047', fontSize: '1.25rem', fontWeight: '700' }}>{profile.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 style={{ color: '#f6f6f6' }}>{profile.name}</h4>
                          <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>{profile.education}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4" style={{ color: '#FFC300', fill: '#FFC300' }} />
                            <span style={{ color: '#f6f6f6' }}>{profile.rating}</span>
                          </div>
                          <span className="inline-flex px-3 py-1 rounded-full text-xs" style={{
                            backgroundColor: '#FFC300',
                            color: '#023047'
                          }}>
                            {Math.round(profile.rating * 20)}% Match
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
                        <div className="flex items-center gap-2" style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>
                          <MapPin className="w-4 h-4" />
                          {profile.location}
                        </div>
                        <div className="flex items-center gap-2" style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>
                          <Award className="w-4 h-4" />
                          {profile.experience} exp
                        </div>
                        <div className="flex items-center gap-2" style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>
                          <Building2 className="w-4 h-4" />
                          {profile.previousCompanies[0]}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {profile.skills.slice(0, 5).map((skill, index) => (
                          <span key={index} className="px-2 py-1 rounded text-xs" style={{ 
                            backgroundColor: 'rgba(255, 195, 0, 0.2)', 
                            color: '#FFC300',
                            border: '1px solid rgba(255, 195, 0, 0.3)'
                          }}>
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setSelectedApplicant(profile)}
                          className="flex items-center gap-1 px-3 py-1 rounded-lg transition-colors text-xs"
                          style={{ backgroundColor: '#6f6f6f', color: '#f6f6f6' }}
                        >
                          <Eye className="w-4 h-4" />
                          View Profile
                        </button>
                        <button className="flex items-center gap-1 px-3 py-1 rounded-lg transition-colors text-xs" style={{ backgroundColor: '#FFC300', color: '#023047' }}>
                          <Users className="w-4 h-4" />
                          Invite to Apply
                        </button>
                        <button className="flex items-center gap-1 px-3 py-1 rounded-lg transition-colors text-xs" style={{ border: '1px solid #6f6f6f', color: '#d3d3d3' }}>
                          <MessageSquare className="w-4 h-4" />
                          Message
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedApplicant && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
          <div className="rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <div className="p-6" style={{ borderBottom: '1px solid #6f6f6f' }}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FFC300' }}>
                    <span style={{ color: '#023047', fontSize: '1.5rem', fontWeight: '700' }}>{selectedApplicant.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h2 style={{ color: '#FFC300' }}>{selectedApplicant.name}</h2>
                    <p style={{ color: '#d3d3d3' }}>{selectedApplicant.education}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5" style={{ color: '#FFC300', fill: '#FFC300' }} />
                        <span style={{ color: '#f6f6f6' }}>{selectedApplicant.rating}</span>
                      </div>
                      <span style={{ color: '#d3d3d3' }}>•</span>
                      <span style={{ color: '#d3d3d3' }}>{selectedApplicant.experience} experience</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setSelectedApplicant(null)} className="px-4 py-2 rounded-lg transition-colors" style={{ border: '1px solid #6f6f6f', color: '#d3d3d3' }}>Close</button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="mb-3" style={{ color: '#FFC300' }}>Contact Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Email</p>
                    <p style={{ color: '#f6f6f6' }}>{selectedApplicant.email}</p>
                  </div>
                  <div>
                    <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Phone</p>
                    <p style={{ color: '#f6f6f6' }}>{selectedApplicant.phone}</p>
                  </div>
                  <div>
                    <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Location</p>
                    <p style={{ color: '#f6f6f6' }}>{selectedApplicant.location}</p>
                  </div>
                  <div>
                    <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Applied On</p>
                    <p style={{ color: '#f6f6f6' }}>{selectedApplicant.appliedDate}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-3" style={{ color: '#FFC300' }}>Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedApplicant.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 rounded-full" style={{ backgroundColor: '#023047', color: '#f6f6f6' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3" style={{ color: '#FFC300' }}>Previous Companies</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedApplicant.previousCompanies.map((company, index) => (
                    <span key={index} className="px-3 py-1 rounded-full" style={{ backgroundColor: '#6f6f6f', color: '#f6f6f6' }}>
                      {company}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3" style={{ color: '#FFC300' }}>Cover Letter</h3>
                <p style={{ color: '#d3d3d3' }}>{selectedApplicant.coverLetter}</p>
              </div>

              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: '#FFC300', color: '#023047' }}>
                  <Download className="w-5 h-5" />
                  Download Resume
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors" style={{ border: '1px solid #6f6f6f', color: '#d3d3d3' }}>
                  <MessageSquare className="w-5 h-5" />
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}