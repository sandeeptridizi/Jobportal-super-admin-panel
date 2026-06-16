import { useState } from 'react';
import { ArrowLeft, MapPin, DollarSign, Clock, Calendar, Pencil, Eye, CheckCircle, XCircle, MessageSquare, Download, Star, Award, TrendingUp } from 'lucide-react';

interface Freelancer {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  experienceLevel: 'Entry' | 'Intermediate' | 'Expert';
  yearsExperience: string;
  skills: string[];
  hourlyRate: string;
  proposalDate: string;
  status: 'pending' | 'shortlisted' | 'rejected' | 'hired';
  portfolioUrl: string;
  proposal: string;
  rating: number;
  completedProjects: number;
  availability: string;
}

interface FreelanceGigDetailViewProps {
  gigId: number;
  onBack: () => void;
}

export function FreelanceGigDetailView({ gigId, onBack }: FreelanceGigDetailViewProps) {
  const [selectedFreelancer, setSelectedFreelancer] = useState<Freelancer | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const gig = {
    id: gigId,
    title: 'Freelance Web Developer',
    company: 'Freelance Hub',
    location: 'Remote',
    projectDuration: '2-3 months',
    budget: '$75 - $150/hr',
    category: 'Technology',
    status: 'active',
    postedDate: '2024-12-02',
    deadline: '2024-12-15',
    experienceLevel: 'Expert',
    paymentType: 'Hourly',
    description: 'We are looking for an experienced freelance web developer to build a modern e-commerce platform. The project requires expertise in React, Node.js, and payment gateway integration.',
    requirements: [
      '5+ years of professional web development experience',
      'Strong portfolio with e-commerce projects',
      'Expertise in React.js and Node.js',
      'Experience with payment gateway integration',
      'Strong communication and project management skills',
      'Ability to work independently and meet deadlines'
    ],
    deliverables: [
      'Fully functional e-commerce website',
      'Admin dashboard for product management',
      'Payment gateway integration',
      'User authentication and authorization',
      'Responsive design for all devices',
      'Documentation and source code'
    ],
    skills: ['React', 'Node.js', 'MongoDB', 'Payment APIs', 'REST APIs', 'AWS']
  };

  const freelancers: Freelancer[] = [
    {
      id: 1,
      name: 'Marcus Johnson',
      email: 'marcus.j@freelance.com',
      phone: '+1 (555) 777-8888',
      location: 'San Francisco, CA',
      experienceLevel: 'Expert',
      yearsExperience: '8 years',
      skills: ['React', 'Node.js', 'MongoDB', 'AWS', 'Stripe', 'Docker'],
      hourlyRate: '$120/hr',
      proposalDate: '2024-12-03',
      status: 'shortlisted',
      portfolioUrl: '#',
      proposal: 'I have over 8 years of experience building e-commerce platforms for various clients. I have successfully delivered 15+ e-commerce projects with full payment integration...',
      rating: 4.9,
      completedProjects: 87,
      availability: 'Available immediately'
    },
    {
      id: 2,
      name: 'Lisa Anderson',
      email: 'lisa.a@freelance.com',
      phone: '+1 (555) 888-9999',
      location: 'Austin, TX',
      experienceLevel: 'Expert',
      yearsExperience: '6 years',
      skills: ['React', 'Node.js', 'PostgreSQL', 'PayPal', 'GraphQL', 'Redis'],
      hourlyRate: '$100/hr',
      proposalDate: '2024-12-04',
      status: 'pending',
      portfolioUrl: '#',
      proposal: 'As a full-stack developer specializing in e-commerce solutions, I bring a wealth of experience in building scalable and secure platforms...',
      rating: 4.8,
      completedProjects: 65,
      availability: 'Available in 1 week'
    },
    {
      id: 3,
      name: 'Kevin Park',
      email: 'kevin.p@freelance.com',
      phone: '+1 (555) 999-0000',
      location: 'Seattle, WA',
      experienceLevel: 'Expert',
      yearsExperience: '10 years',
      skills: ['React', 'Vue.js', 'Node.js', 'MySQL', 'Shopify API', 'Kubernetes'],
      hourlyRate: '$150/hr',
      proposalDate: '2024-12-02',
      status: 'shortlisted',
      portfolioUrl: '#',
      proposal: 'With a decade of experience in web development and a strong focus on e-commerce, I have delivered numerous high-traffic platforms...',
      rating: 5.0,
      completedProjects: 120,
      availability: 'Available immediately'
    },
    {
      id: 4,
      name: 'Rachel Green',
      email: 'rachel.g@freelance.com',
      phone: '+1 (555) 000-1111',
      location: 'Boston, MA',
      experienceLevel: 'Intermediate',
      yearsExperience: '4 years',
      skills: ['React', 'Express', 'MongoDB', 'Stripe', 'Firebase', 'Tailwind'],
      hourlyRate: '$80/hr',
      proposalDate: '2024-12-05',
      status: 'rejected',
      portfolioUrl: '#',
      proposal: 'I am an enthusiastic developer with a passion for creating beautiful and functional e-commerce websites...',
      rating: 4.5,
      completedProjects: 32,
      availability: 'Available in 2 weeks'
    },
    {
      id: 5,
      name: 'Daniel Kim',
      email: 'daniel.k@freelance.com',
      phone: '+1 (555) 111-2222',
      location: 'Los Angeles, CA',
      experienceLevel: 'Expert',
      yearsExperience: '7 years',
      skills: ['React', 'Next.js', 'Node.js', 'Prisma', 'Stripe', 'Vercel'],
      hourlyRate: '$130/hr',
      proposalDate: '2024-12-01',
      status: 'hired',
      portfolioUrl: '#',
      proposal: 'I specialize in modern full-stack development with a focus on performant and scalable e-commerce solutions...',
      rating: 4.9,
      completedProjects: 95,
      availability: 'Available immediately'
    },
  ];

  const filteredFreelancers = freelancers.filter(f => 
    filterStatus === 'all' || f.status === filterStatus
  );

  const stats = {
    total: freelancers.length,
    pending: freelancers.filter(f => f.status === 'pending').length,
    shortlisted: freelancers.filter(f => f.status === 'shortlisted').length,
    rejected: freelancers.filter(f => f.status === 'rejected').length,
    hired: freelancers.filter(f => f.status === 'hired').length,
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
          Back to Freelance Gigs
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
              {gig.title}
            </h1>
            <p className="mt-2" style={{ color: '#d3d3d3' }}>{gig.company}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex px-4 py-2 rounded-full" style={{
              backgroundColor: gig.status === 'active' ? '#FFC300' : '#6f6f6f',
              color: gig.status === 'active' ? '#023047' : '#f6f6f6'
            }}>
              {gig.status.charAt(0).toUpperCase() + gig.status.slice(1)}
            </span>
            <span className="inline-flex px-4 py-2 rounded-full" style={{
              backgroundColor: gig.experienceLevel === 'Expert' ? '#FFC300' : '#023047',
              color: gig.experienceLevel === 'Expert' ? '#023047' : '#f6f6f6'
            }}>
              {gig.experienceLevel}
            </span>
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
              <p style={{ color: '#f6f6f6' }}>{gig.location}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#023047' }}>
              <Clock className="w-5 h-5" style={{ color: '#f6f6f6' }} />
            </div>
            <div>
              <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Duration</p>
              <p style={{ color: '#f6f6f6' }}>{gig.projectDuration}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
              <DollarSign className="w-5 h-5" style={{ color: '#023047' }} />
            </div>
            <div>
              <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Budget</p>
              <p style={{ color: '#f6f6f6' }}>{gig.budget}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#6f6f6f' }}>
              <Calendar className="w-5 h-5" style={{ color: '#f6f6f6' }} />
            </div>
            <div>
              <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Deadline</p>
              <p style={{ color: '#f6f6f6' }}>{gig.deadline}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
              <Pencil className="w-5 h-5" style={{ color: '#023047' }} />
            </div>
            <div>
              <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Payment</p>
              <p style={{ color: '#f6f6f6' }}>{gig.paymentType}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="mb-2" style={{ color: '#FFC300' }}>Project Description</h3>
            <p style={{ color: '#d3d3d3' }}>{gig.description}</p>
          </div>

          <div>
            <h3 className="mb-2" style={{ color: '#FFC300' }}>Requirements</h3>
            <ul className="space-y-1">
              {gig.requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-2" style={{ color: '#d3d3d3' }}>
                  <span style={{ color: '#FFC300' }}>•</span>
                  {req}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-2" style={{ color: '#FFC300' }}>Deliverables</h3>
            <ul className="space-y-1">
              {gig.deliverables.map((item, index) => (
                <li key={index} className="flex items-start gap-2" style={{ color: '#d3d3d3' }}>
                  <span style={{ color: '#FFC300' }}>•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-2" style={{ color: '#FFC300' }}>Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {gig.skills.map((skill, index) => (
                <span key={index} className="px-3 py-1 rounded-full" style={{ backgroundColor: '#023047', color: '#f6f6f6', fontSize: '0.875rem' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
        <div className="p-6" style={{ borderBottom: '1px solid #6f6f6f' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 style={{ color: '#FFC300' }}>Freelancer Proposals ({stats.total})</h2>
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
            {filteredFreelancers.map((freelancer) => (
              <div key={freelancer.id} className="rounded-lg p-4 transition-shadow" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FFC300' }}>
                      <span style={{ color: '#023047', fontSize: '1.25rem', fontWeight: '700' }}>{freelancer.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 style={{ color: '#f6f6f6' }}>{freelancer.name}</h4>
                          <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>{freelancer.yearsExperience} of experience</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4" style={{ color: '#FFC300', fill: '#FFC300' }} />
                            <span style={{ color: '#f6f6f6' }}>{freelancer.rating}</span>
                          </div>
                          <span className="inline-flex px-3 py-1 rounded-full text-xs" style={{
                            backgroundColor: freelancer.status === 'hired' ? '#FFC300' : freelancer.status === 'shortlisted' ? '#023047' : freelancer.status === 'rejected' ? '#6f6f6f' : '#d3d3d3',
                            color: freelancer.status === 'hired' || freelancer.status === 'pending' ? '#023047' : '#f6f6f6'
                          }}>
                            {freelancer.status.charAt(0).toUpperCase() + freelancer.status.slice(1)}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                        <div className="flex items-center gap-2" style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>
                          <DollarSign className="w-4 h-4" />
                          {freelancer.hourlyRate}
                        </div>
                        <div className="flex items-center gap-2" style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>
                          <TrendingUp className="w-4 h-4" />
                          {freelancer.completedProjects} projects
                        </div>
                        <div className="flex items-center gap-2" style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>
                          <Clock className="w-4 h-4" />
                          {freelancer.availability}
                        </div>
                        <div className="flex items-center gap-2" style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>
                          <MapPin className="w-4 h-4" />
                          {freelancer.location}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {freelancer.skills.slice(0, 6).map((skill, index) => (
                          <span key={index} className="px-2 py-1 rounded text-xs" style={{ backgroundColor: '#6f6f6f', color: '#f6f6f6' }}>
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setSelectedFreelancer(freelancer)}
                          className="flex items-center gap-1 px-3 py-1 rounded-lg transition-colors text-xs"
                          style={{ backgroundColor: '#023047', color: '#f6f6f6' }}
                        >
                          <Eye className="w-4 h-4" />
                          View Profile
                        </button>
                        {freelancer.status === 'pending' && (
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
                        {freelancer.status === 'shortlisted' && (
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
      </div>

      {selectedFreelancer && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
          <div className="rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <div className="p-6" style={{ borderBottom: '1px solid #6f6f6f' }}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FFC300' }}>
                    <span style={{ color: '#023047', fontSize: '1.5rem', fontWeight: '700' }}>{selectedFreelancer.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h2 style={{ color: '#FFC300' }}>{selectedFreelancer.name}</h2>
                    <p style={{ color: '#d3d3d3' }}>{selectedFreelancer.experienceLevel} - {selectedFreelancer.yearsExperience}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5" style={{ color: '#FFC300', fill: '#FFC300' }} />
                        <span style={{ color: '#f6f6f6' }}>{selectedFreelancer.rating}</span>
                      </div>
                      <span style={{ color: '#d3d3d3' }}>•</span>
                      <span style={{ color: '#d3d3d3' }}>{selectedFreelancer.completedProjects} projects completed</span>
                      <span style={{ color: '#d3d3d3' }}>•</span>
                      <span style={{ color: '#FFC300' }}>{selectedFreelancer.hourlyRate}</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setSelectedFreelancer(null)} className="px-4 py-2 rounded-lg transition-colors" style={{ border: '1px solid #6f6f6f', color: '#d3d3d3' }}>Close</button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="mb-3" style={{ color: '#FFC300' }}>Contact Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Email</p>
                    <p style={{ color: '#f6f6f6' }}>{selectedFreelancer.email}</p>
                  </div>
                  <div>
                    <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Phone</p>
                    <p style={{ color: '#f6f6f6' }}>{selectedFreelancer.phone}</p>
                  </div>
                  <div>
                    <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Location</p>
                    <p style={{ color: '#f6f6f6' }}>{selectedFreelancer.location}</p>
                  </div>
                  <div>
                    <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Availability</p>
                    <p style={{ color: '#f6f6f6' }}>{selectedFreelancer.availability}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-3" style={{ color: '#FFC300' }}>Skills & Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedFreelancer.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 rounded-full" style={{ backgroundColor: '#023047', color: '#f6f6f6' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3" style={{ color: '#FFC300' }}>Proposal</h3>
                <p style={{ color: '#d3d3d3' }}>{selectedFreelancer.proposal}</p>
              </div>

              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: '#FFC300', color: '#023047' }}>
                  <Eye className="w-5 h-5" />
                  View Portfolio
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