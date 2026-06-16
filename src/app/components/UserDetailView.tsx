import { useState } from 'react';
import { ArrowLeft, MapPin, Mail, Phone, Briefcase, Calendar, Award, Star, Eye, Download, TrendingUp, Clock, CheckCircle, XCircle, Activity, FileText, BadgeCheck, Crown } from 'lucide-react';

interface Application {
  id: number;
  jobTitle: string;
  company: string;
  appliedDate: string;
  status: 'pending' | 'shortlisted' | 'rejected' | 'hired';
  jobType: string;
  location: string;
  salary: string;
}

interface UserDetailViewProps {
  userId: number;
  onBack: () => void;
  onViewJob?: (jobId: number) => void;
}

export function UserDetailView({ userId, onBack, onViewJob }: UserDetailViewProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'applications' | 'activity'>('overview');

  const user = {
    id: userId,
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    role: 'candidate',
    status: 'active',
    joinedDate: '2024-01-15',
    lastActive: '2024-12-08 10:30 AM',
    profileCompletion: 95,
    isVerified: true,
    isPro: true,
    
    experience: '6 years',
    education: 'BS Computer Science - MIT',
    currentPosition: 'Senior React Developer at Tech Startup',
    skills: ['React', 'TypeScript', 'Node.js', 'Redux', 'GraphQL', 'AWS', 'Docker', 'MongoDB'],
    bio: 'Experienced software engineer with a passion for building scalable web applications. Specialized in React and modern JavaScript frameworks.',
    
    resumeUrl: '#',
    portfolioUrl: 'johnsmith.dev',
    linkedIn: 'linkedin.com/in/johnsmith',
    github: 'github.com/johnsmith',
    
    totalApplications: 15,
    pendingApplications: 5,
    shortlistedApplications: 4,
    rejectedApplications: 4,
    hired: 2,
    profileViews: 234,
    savedJobs: 18,
  };

  const applications: Application[] = [
    { id: 1, jobTitle: 'Senior React Developer', company: 'Tech Corp', appliedDate: '2024-12-01', status: 'shortlisted', jobType: 'Full-time', location: 'New York, NY', salary: '$120k - $150k' },
    { id: 2, jobTitle: 'Frontend Lead', company: 'Startup Inc', appliedDate: '2024-12-03', status: 'pending', jobType: 'Full-time', location: 'San Francisco, CA', salary: '$130k - $160k' },
    { id: 3, jobTitle: 'Full Stack Developer', company: 'Digital Agency', appliedDate: '2024-12-05', status: 'pending', jobType: 'Full-time', location: 'Austin, TX', salary: '$110k - $140k' },
    { id: 4, jobTitle: 'React Native Developer', company: 'Mobile Solutions', appliedDate: '2024-11-28', status: 'rejected', jobType: 'Contract', location: 'Remote', salary: '$100/hr' },
    { id: 5, jobTitle: 'Software Engineer', company: 'Cloud Systems', appliedDate: '2024-11-25', status: 'shortlisted', jobType: 'Full-time', location: 'Boston, MA', salary: '$115k - $145k' },
    { id: 6, jobTitle: 'Web Developer', company: 'E-commerce Co', appliedDate: '2024-11-20', status: 'rejected', jobType: 'Full-time', location: 'Chicago, IL', salary: '$95k - $125k' },
    { id: 7, jobTitle: 'Lead Frontend Engineer', company: 'Fintech Startup', appliedDate: '2024-11-15', status: 'hired', jobType: 'Full-time', location: 'New York, NY', salary: '$140k - $170k' },
    { id: 8, jobTitle: 'JavaScript Developer', company: 'Media Group', appliedDate: '2024-11-10', status: 'rejected', jobType: 'Part-time', location: 'Remote', salary: '$75k - $95k' },
    { id: 9, jobTitle: 'Frontend Architect', company: 'Enterprise Corp', appliedDate: '2024-11-05', status: 'shortlisted', jobType: 'Full-time', location: 'Seattle, WA', salary: '$150k - $180k' },
    { id: 10, jobTitle: 'UI Developer', company: 'Design Studio', appliedDate: '2024-11-01', status: 'pending', jobType: 'Full-time', location: 'Los Angeles, CA', salary: '$105k - $135k' },
    { id: 11, jobTitle: 'React Developer', company: 'SaaS Company', appliedDate: '2024-10-28', status: 'rejected', jobType: 'Full-time', location: 'Denver, CO', salary: '$100k - $130k' },
    { id: 12, jobTitle: 'Senior Software Engineer', company: 'Tech Giant', appliedDate: '2024-10-25', status: 'pending', jobType: 'Full-time', location: 'Mountain View, CA', salary: '$160k - $200k' },
    { id: 13, jobTitle: 'Full Stack Engineer', company: 'Consulting Firm', appliedDate: '2024-10-20', status: 'shortlisted', jobType: 'Full-time', location: 'Washington, DC', salary: '$120k - $150k' },
    { id: 14, jobTitle: 'Contract Developer', company: 'Agency XYZ', appliedDate: '2024-10-15', status: 'hired', jobType: 'Contract', location: 'Remote', salary: '$110/hr' },
    { id: 15, jobTitle: 'Web Application Developer', company: 'Healthcare Tech', appliedDate: '2024-10-10', status: 'pending', jobType: 'Full-time', location: 'Philadelphia, PA', salary: '$110k - $140k' },
  ];

  const activityLog = [
    { id: 1, action: 'Applied to Senior React Developer at Tech Corp', timestamp: '2024-12-01 09:30 AM', type: 'application' },
    { id: 2, action: 'Profile viewed by Startup Inc', timestamp: '2024-12-02 02:15 PM', type: 'view' },
    { id: 3, action: 'Applied to Frontend Lead at Startup Inc', timestamp: '2024-12-03 11:45 AM', type: 'application' },
    { id: 4, action: 'Shortlisted for Senior React Developer at Tech Corp', timestamp: '2024-12-04 03:20 PM', type: 'status_change' },
    { id: 5, action: 'Applied to Full Stack Developer at Digital Agency', timestamp: '2024-12-05 10:00 AM', type: 'application' },
    { id: 6, action: 'Updated resume', timestamp: '2024-12-05 04:30 PM', type: 'profile_update' },
    { id: 7, action: 'Saved UI/UX Designer position at Creative Co', timestamp: '2024-12-06 01:20 PM', type: 'save' },
    { id: 8, action: 'Profile viewed by Digital Agency', timestamp: '2024-12-06 05:45 PM', type: 'view' },
    { id: 9, action: 'Updated skills section', timestamp: '2024-12-07 09:15 AM', type: 'profile_update' },
    { id: 10, action: 'Logged in from New York, NY', timestamp: '2024-12-08 08:00 AM', type: 'login' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <button 
          onClick={onBack}
          className="flex items-center gap-2 mb-4 transition-colors"
          style={{ color: '#d3d3d3' }}
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Users
        </button>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FFC300' }}>
              <span style={{ color: '#023047', fontSize: '2rem', fontWeight: '700' }}>{user.name.charAt(0)}</span>
            </div>
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
                {user.name}
              </h1>
              <p className="mt-1" style={{ color: '#d3d3d3' }}>{user.currentPosition}</p>
              <div className="flex items-center gap-2 mt-2">
                <MapPin className="w-4 h-4" style={{ color: '#d3d3d3' }} />
                <span style={{ color: '#d3d3d3' }}>{user.location}</span>
                <span style={{ color: '#6f6f6f' }}>•</span>
                <span style={{ color: '#d3d3d3' }}>Last active: {user.lastActive}</span>
                {user.isVerified && (
                  <>
                    <span style={{ color: '#6f6f6f' }}>•</span>
                    <div className="flex items-center gap-1" title="Verified - BGV Completed">
                      <BadgeCheck className="w-4 h-4" style={{ color: '#023047' }} />
                      <span style={{ color: '#023047', fontSize: '0.875rem' }}>Verified</span>
                    </div>
                  </>
                )}
                {user.isPro && (
                  <>
                    <span style={{ color: '#6f6f6f' }}>•</span>
                    <div className="flex items-center gap-1" title="Pro - Paid User">
                      <Crown className="w-4 h-4" style={{ color: '#FFC300' }} />
                      <span style={{ color: '#FFC300', fontSize: '0.875rem' }}>Pro</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <span className="inline-flex px-4 py-2 rounded-full" style={{
              backgroundColor: user.status === 'active' ? '#FFC300' : '#6f6f6f',
              color: user.status === 'active' ? '#023047' : '#f6f6f6'
            }}>
              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
            </span>
            <span className="inline-flex px-4 py-2 rounded-full" style={{
              backgroundColor: '#023047',
              color: '#f6f6f6'
            }}>
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <div className="rounded-lg p-4" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
          <div className="flex items-center justify-between mb-2">
            <FileText className="w-5 h-5" style={{ color: '#FFC300' }} />
          </div>
          <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Applications</p>
          <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.25rem', fontWeight: '700' }}>{user.totalApplications}</p>
        </div>
        <div className="rounded-lg p-4" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-5 h-5" style={{ color: '#FFC300' }} />
          </div>
          <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Pending</p>
          <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.25rem', fontWeight: '700' }}>{user.pendingApplications}</p>
        </div>
        <div className="rounded-lg p-4" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-5 h-5" style={{ color: '#023047' }} />
          </div>
          <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Shortlisted</p>
          <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.25rem', fontWeight: '700' }}>{user.shortlistedApplications}</p>
        </div>
        <div className="rounded-lg p-4" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-5 h-5" style={{ color: '#FFC300' }} />
          </div>
          <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Hired</p>
          <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.25rem', fontWeight: '700' }}>{user.hired}</p>
        </div>
        <div className="rounded-lg p-4" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
          <div className="flex items-center justify-between mb-2">
            <Eye className="w-5 h-5" style={{ color: '#6f6f6f' }} />
          </div>
          <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Profile Views</p>
          <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.25rem', fontWeight: '700' }}>{user.profileViews}</p>
        </div>
        <div className="rounded-lg p-4" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
          <div className="flex items-center justify-between mb-2">
            <Star className="w-5 h-5" style={{ color: '#FFC300' }} />
          </div>
          <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Saved Jobs</p>
          <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.25rem', fontWeight: '700' }}>{user.savedJobs}</p>
        </div>
      </div>

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
            onClick={() => setActiveTab('applications')}
            className="pb-3 px-1 transition-colors"
            style={{
              borderBottom: activeTab === 'applications' ? '2px solid #FFC300' : '2px solid transparent',
              color: activeTab === 'applications' ? '#FFC300' : '#d3d3d3'
            }}
          >
            Applications ({user.totalApplications})
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className="pb-3 px-1 transition-colors"
            style={{
              borderBottom: activeTab === 'activity' ? '2px solid #FFC300' : '2px solid transparent',
              color: activeTab === 'activity' ? '#FFC300' : '#d3d3d3'
            }}
          >
            Activity Log
          </button>
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ color: '#FFC300' }}>Profile Information</h3>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-700 rounded-full h-2 w-32">
                  <div className="h-2 rounded-full" style={{ width: `${user.profileCompletion}%`, backgroundColor: '#FFC300' }}></div>
                </div>
                <span style={{ color: '#FFC300' }}>{user.profileCompletion}% Complete</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="mb-3" style={{ color: '#f6f6f6' }}>Contact Details</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5" style={{ color: '#d3d3d3' }} />
                    <span style={{ color: '#f6f6f6' }}>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5" style={{ color: '#d3d3d3' }} />
                    <span style={{ color: '#f6f6f6' }}>{user.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5" style={{ color: '#d3d3d3' }} />
                    <span style={{ color: '#f6f6f6' }}>{user.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5" style={{ color: '#d3d3d3' }} />
                    <span style={{ color: '#f6f6f6' }}>Joined {user.joinedDate}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-3" style={{ color: '#f6f6f6' }}>Professional Details</h4>
                <div className="space-y-3">
                  <div>
                    <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Experience</p>
                    <p style={{ color: '#f6f6f6' }}>{user.experience}</p>
                  </div>
                  <div>
                    <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Education</p>
                    <p style={{ color: '#f6f6f6' }}>{user.education}</p>
                  </div>
                  <div>
                    <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Current Position</p>
                    <p style={{ color: '#f6f6f6' }}>{user.currentPosition}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <h3 className="mb-3" style={{ color: '#FFC300' }}>About</h3>
            <p style={{ color: '#d3d3d3' }}>{user.bio}</p>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <h3 className="mb-3" style={{ color: '#FFC300' }}>Skills</h3>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill, index) => (
                <span key={index} className="px-3 py-1 rounded-full" style={{ backgroundColor: '#023047', color: '#f6f6f6' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <h3 className="mb-3" style={{ color: '#FFC300' }}>Links & Documents</h3>
            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: '#FFC300', color: '#023047' }}>
                <Download className="w-4 h-4" />
                Download Resume
              </button>
              <a href={`https://${user.portfolioUrl}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors" style={{ border: '1px solid #6f6f6f', color: '#d3d3d3' }}>
                Portfolio
              </a>
              <a href={`https://${user.linkedIn}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors" style={{ border: '1px solid #6f6f6f', color: '#d3d3d3' }}>
                LinkedIn
              </a>
              <a href={`https://${user.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors" style={{ border: '1px solid #6f6f6f', color: '#d3d3d3' }}>
                GitHub
              </a>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'applications' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p style={{ color: '#d3d3d3' }}>Total applications: {applications.length}</p>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: '#FFC300', color: '#023047' }}>
              <Download className="w-5 h-5" />
              Export List
            </button>
          </div>

          <div className="grid gap-3">
            {applications.map((app) => (
              <div key={app.id} className="rounded-lg p-4" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 style={{ color: '#f6f6f6' }}>{app.jobTitle}</h4>
                        <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>{app.company}</p>
                      </div>
                      <span className="inline-flex px-3 py-1 rounded-full text-xs" style={{
                        backgroundColor: app.status === 'hired' ? '#FFC300' : app.status === 'shortlisted' ? '#023047' : app.status === 'rejected' ? '#6f6f6f' : '#d3d3d3',
                        color: app.status === 'hired' || app.status === 'pending' ? '#023047' : '#f6f6f6'
                      }}>
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                      <div className="flex items-center gap-2" style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>
                        <Briefcase className="w-4 h-4" />
                        {app.jobType}
                      </div>
                      <div className="flex items-center gap-2" style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>
                        <MapPin className="w-4 h-4" />
                        {app.location}
                      </div>
                      <div className="flex items-center gap-2" style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>
                        <TrendingUp className="w-4 h-4" />
                        {app.salary}
                      </div>
                      <div className="flex items-center gap-2" style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>
                        <Calendar className="w-4 h-4" />
                        Applied {app.appliedDate}
                      </div>
                    </div>

                    <button 
                      onClick={() => onViewJob?.(app.id)}
                      className="flex items-center gap-2 px-3 py-1 rounded-lg transition-colors text-xs"
                      style={{ backgroundColor: '#023047', color: '#f6f6f6' }}
                    >
                      <Eye className="w-4 h-4" />
                      View Job Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'activity' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 style={{ color: '#FFC300' }}>Recent Activity</h3>
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5" style={{ color: '#FFC300' }} />
              <span style={{ color: '#d3d3d3' }}>Last 30 days</span>
            </div>
          </div>

          <div className="space-y-3">
            {activityLog.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{
                  backgroundColor: activity.type === 'application' ? '#FFC300' :
                                   activity.type === 'status_change' ? '#023047' :
                                   activity.type === 'view' ? '#6f6f6f' :
                                   activity.type === 'profile_update' ? '#FFC300' :
                                   activity.type === 'save' ? '#d3d3d3' : '#6f6f6f'
                }}>
                  {activity.type === 'application' && <FileText className="w-5 h-5" style={{ color: '#023047' }} />}
                  {activity.type === 'status_change' && <CheckCircle className="w-5 h-5" style={{ color: '#f6f6f6' }} />}
                  {activity.type === 'view' && <Eye className="w-5 h-5" style={{ color: '#f6f6f6' }} />}
                  {activity.type === 'profile_update' && <Award className="w-5 h-5" style={{ color: '#023047' }} />}
                  {activity.type === 'save' && <Star className="w-5 h-5" style={{ color: '#023047' }} />}
                  {activity.type === 'login' && <Activity className="w-5 h-5" style={{ color: '#f6f6f6' }} />}
                </div>
                <div className="flex-1">
                  <p style={{ color: '#f6f6f6' }}>{activity.action}</p>
                  <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }} className="mt-1">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}