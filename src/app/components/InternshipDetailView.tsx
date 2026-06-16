import { useState } from 'react';
import { ArrowLeft, MapPin, DollarSign, Clock, Calendar, Building2, GraduationCap, Eye, CheckCircle, XCircle, MessageSquare, Download, Star, Award, Users } from 'lucide-react';

interface Applicant {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  university: string;
  major: string;
  graduationYear: string;
  gpa: string;
  skills: string[];
  appliedDate: string;
  status: 'pending' | 'shortlisted' | 'rejected' | 'accepted';
  resumeUrl: string;
  coverLetter: string;
  rating: number;
  projects: string[];
}

interface InternshipDetailViewProps {
  internshipId: number;
  onBack: () => void;
}

export function InternshipDetailView({ internshipId, onBack }: InternshipDetailViewProps) {
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const internship = {
    id: internshipId,
    title: 'Software Engineering Intern',
    company: 'Tech Corp',
    location: 'New York, NY',
    duration: '3 months',
    stipend: '$25/hr',
    category: 'Technology',
    status: 'active',
    postedDate: '2024-12-01',
    startDate: '2025-01-15',
    spots: 5,
    isPaid: true,
    description: 'Join our engineering team for an exciting summer internship. You will work on real projects and gain hands-on experience with modern technologies.',
    requirements: [
      'Currently pursuing a degree in Computer Science or related field',
      'Basic knowledge of JavaScript and React',
      'Strong problem-solving skills',
      'Good communication skills',
      'Ability to work in a team environment'
    ],
    responsibilities: [
      'Assist in developing web applications',
      'Write clean, maintainable code',
      'Participate in code reviews',
      'Collaborate with senior developers',
      'Learn and apply new technologies'
    ],
    benefits: ['Paid Internship', 'Mentorship Program', 'Networking Opportunities', 'Certificate of Completion', 'Potential Full-time Offer']
  };

  const applicants: Applicant[] = [
    {
      id: 1,
      name: 'Alex Johnson',
      email: 'alex.j@university.edu',
      phone: '+1 (555) 111-2222',
      location: 'Boston, MA',
      university: 'MIT',
      major: 'Computer Science',
      graduationYear: '2026',
      gpa: '3.9',
      skills: ['JavaScript', 'React', 'Python', 'Git', 'HTML/CSS'],
      appliedDate: '2024-12-02',
      status: 'shortlisted',
      resumeUrl: '#',
      coverLetter: 'I am excited to apply for the Software Engineering Internship at Tech Corp. As a junior at MIT studying Computer Science...',
      rating: 4.7,
      projects: ['E-commerce Website', 'Task Management App', 'Weather Dashboard']
    },
    {
      id: 2,
      name: 'Emma Williams',
      email: 'emma.w@university.edu',
      phone: '+1 (555) 222-3333',
      location: 'New York, NY',
      university: 'Columbia University',
      major: 'Software Engineering',
      graduationYear: '2025',
      gpa: '3.8',
      skills: ['Java', 'React', 'Node.js', 'SQL', 'AWS'],
      appliedDate: '2024-12-03',
      status: 'pending',
      resumeUrl: '#',
      coverLetter: 'I am writing to express my strong interest in the Software Engineering Internship position at Tech Corp...',
      rating: 4.5,
      projects: ['Social Media Platform', 'Recipe Sharing App', 'Portfolio Website']
    },
    {
      id: 3,
      name: 'James Chen',
      email: 'j.chen@university.edu',
      phone: '+1 (555) 333-4444',
      location: 'Princeton, NJ',
      university: 'Princeton University',
      major: 'Computer Science',
      graduationYear: '2026',
      gpa: '4.0',
      skills: ['Python', 'JavaScript', 'C++', 'Machine Learning', 'Data Structures'],
      appliedDate: '2024-12-04',
      status: 'shortlisted',
      resumeUrl: '#',
      coverLetter: 'As a Computer Science student at Princeton with a passion for software development...',
      rating: 4.9,
      projects: ['AI Chatbot', 'Sorting Visualizer', 'Stock Price Predictor']
    },
    {
      id: 4,
      name: 'Sophia Martinez',
      email: 'sophia.m@university.edu',
      phone: '+1 (555) 444-5555',
      location: 'Philadelphia, PA',
      university: 'UPenn',
      major: 'Information Systems',
      graduationYear: '2025',
      gpa: '3.7',
      skills: ['JavaScript', 'React', 'MongoDB', 'Express', 'Node.js'],
      appliedDate: '2024-12-05',
      status: 'rejected',
      resumeUrl: '#',
      coverLetter: 'I am eager to join Tech Corp as a Software Engineering Intern and contribute to your innovative projects...',
      rating: 4.2,
      projects: ['Blog Platform', 'Fitness Tracker', 'Music Player']
    },
    {
      id: 5,
      name: 'Ryan Taylor',
      email: 'ryan.t@university.edu',
      phone: '+1 (555) 555-6666',
      location: 'New Haven, CT',
      university: 'Yale University',
      major: 'Computer Science',
      graduationYear: '2026',
      gpa: '3.9',
      skills: ['TypeScript', 'React', 'GraphQL', 'Docker', 'PostgreSQL'],
      appliedDate: '2024-12-01',
      status: 'accepted',
      resumeUrl: '#',
      coverLetter: 'With a strong academic background and hands-on project experience, I am confident I would be a great fit...',
      rating: 4.8,
      projects: ['Video Streaming Platform', 'Code Editor', 'Real-time Chat App']
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
    accepted: applicants.filter(a => a.status === 'accepted').length,
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
          Back to Internships
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
              {internship.title}
            </h1>
            <p className="mt-2" style={{ color: '#d3d3d3' }}>{internship.company}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex px-4 py-2 rounded-full" style={{
              backgroundColor: internship.status === 'active' ? '#FFC300' : '#6f6f6f',
              color: internship.status === 'active' ? '#023047' : '#f6f6f6'
            }}>
              {internship.status.charAt(0).toUpperCase() + internship.status.slice(1)}
            </span>
            {internship.isPaid && (
              <span className="inline-flex px-4 py-2 rounded-full" style={{ backgroundColor: '#023047', color: '#f6f6f6' }}>
                Paid
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
              <MapPin className="w-5 h-5" style={{ color: '#023047' }} />
            </div>
            <div>
              <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Location</p>
              <p style={{ color: '#f6f6f6' }}>{internship.location}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#023047' }}>
              <Clock className="w-5 h-5" style={{ color: '#f6f6f6' }} />
            </div>
            <div>
              <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Duration</p>
              <p style={{ color: '#f6f6f6' }}>{internship.duration}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
              <DollarSign className="w-5 h-5" style={{ color: '#023047' }} />
            </div>
            <div>
              <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Stipend</p>
              <p style={{ color: '#f6f6f6' }}>{internship.stipend}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#6f6f6f' }}>
              <Calendar className="w-5 h-5" style={{ color: '#f6f6f6' }} />
            </div>
            <div>
              <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Start Date</p>
              <p style={{ color: '#f6f6f6' }}>{internship.startDate}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
              <Users className="w-5 h-5" style={{ color: '#023047' }} />
            </div>
            <div>
              <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Spots</p>
              <p style={{ color: '#f6f6f6' }}>{internship.spots}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="mb-2" style={{ color: '#FFC300' }}>Description</h3>
            <p style={{ color: '#d3d3d3' }}>{internship.description}</p>
          </div>

          <div>
            <h3 className="mb-2" style={{ color: '#FFC300' }}>Requirements</h3>
            <ul className="space-y-1">
              {internship.requirements.map((req, index) => (
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
              {internship.responsibilities.map((resp, index) => (
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
              {internship.benefits.map((benefit, index) => (
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
            <h2 style={{ color: '#FFC300' }}>Student Applicants ({stats.total})</h2>
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
              <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Accepted</p>
              <p className="mt-1" style={{ color: '#FFC300', fontSize: '1.25rem', fontWeight: '700' }}>{stats.accepted}</p>
            </div>
          </div>

          <div className="flex gap-2 mt-4 flex-wrap">
            <button onClick={() => setFilterStatus('all')} className="px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: filterStatus === 'all' ? '#023047' : '#6f6f6f', color: '#f6f6f6' }}>All</button>
            <button onClick={() => setFilterStatus('pending')} className="px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: filterStatus === 'pending' ? '#023047' : '#6f6f6f', color: '#f6f6f6' }}>Pending</button>
            <button onClick={() => setFilterStatus('shortlisted')} className="px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: filterStatus === 'shortlisted' ? '#023047' : '#6f6f6f', color: '#f6f6f6' }}>Shortlisted</button>
            <button onClick={() => setFilterStatus('rejected')} className="px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: filterStatus === 'rejected' ? '#023047' : '#6f6f6f', color: '#f6f6f6' }}>Rejected</button>
            <button onClick={() => setFilterStatus('accepted')} className="px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: filterStatus === 'accepted' ? '#023047' : '#6f6f6f', color: '#f6f6f6' }}>Accepted</button>
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
                          <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>{applicant.university} - {applicant.major}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4" style={{ color: '#FFC300', fill: '#FFC300' }} />
                            <span style={{ color: '#f6f6f6' }}>{applicant.rating}</span>
                          </div>
                          <span className="inline-flex px-3 py-1 rounded-full text-xs" style={{
                            backgroundColor: applicant.status === 'accepted' ? '#FFC300' : applicant.status === 'shortlisted' ? '#023047' : applicant.status === 'rejected' ? '#6f6f6f' : '#d3d3d3',
                            color: applicant.status === 'accepted' || applicant.status === 'pending' ? '#023047' : '#f6f6f6'
                          }}>
                            {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                        <div className="flex items-center gap-2" style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>
                          <GraduationCap className="w-4 h-4" />
                          GPA: {applicant.gpa}
                        </div>
                        <div className="flex items-center gap-2" style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>
                          <Award className="w-4 h-4" />
                          Class of {applicant.graduationYear}
                        </div>
                        <div className="flex items-center gap-2" style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>
                          <Clock className="w-4 h-4" />
                          Applied {applicant.appliedDate}
                        </div>
                        <div className="flex items-center gap-2" style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>
                          <MapPin className="w-4 h-4" />
                          {applicant.location}
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
                            Accept
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
                    <p style={{ color: '#d3d3d3' }}>{selectedApplicant.university} - {selectedApplicant.major}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5" style={{ color: '#FFC300', fill: '#FFC300' }} />
                        <span style={{ color: '#f6f6f6' }}>{selectedApplicant.rating}</span>
                      </div>
                      <span style={{ color: '#d3d3d3' }}>•</span>
                      <span style={{ color: '#d3d3d3' }}>GPA: {selectedApplicant.gpa}</span>
                      <span style={{ color: '#d3d3d3' }}>•</span>
                      <span style={{ color: '#d3d3d3' }}>Graduating {selectedApplicant.graduationYear}</span>
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
                <h3 className="mb-3" style={{ color: '#FFC300' }}>Projects</h3>
                <div className="space-y-2">
                  {selectedApplicant.projects.map((project, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span style={{ color: '#FFC300' }}>•</span>
                      <span style={{ color: '#f6f6f6' }}>{project}</span>
                    </div>
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