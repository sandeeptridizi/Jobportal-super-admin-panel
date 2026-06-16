import { useState } from 'react';
import { Search, Filter, Plus, MapPin, Users, Award, Star, CheckCircle, X, Clock, Video, Monitor, Calendar, Phone, Mail, Globe, Building2, Target, TrendingUp, ArrowLeft, Building, BookOpen, GraduationCap } from 'lucide-react';

type InstituteType = 'coaching-institute' | 'personal-trainer';
type InstituteStatus = 'active' | 'cold-lead' | 'inactive';
type TrainingMode = 'virtual' | 'physical' | 'hybrid';
type ViewMode = 'list' | 'details';

interface Course {
  id: number;
  title: string;
  level: string;
  duration: string;
  price: number;
  students: number;
  status: 'active' | 'inactive';
}

interface Tutor {
  id: number;
  name: string;
  specialization: string[];
  experience: string;
  rating: number;
  totalSessions: number;
  hourlyRate: number;
  verified: boolean;
  pro: boolean;
}

interface Institute {
  id: number;
  name: string;
  type: InstituteType;
  status: InstituteStatus;
  verified: boolean;
  pro: boolean;
  trainingMode: TrainingMode;
  specialization: string[];
  location: string;
  rating: number;
  totalStudents: number;
  totalCourses: number;
  activeCourses: Course[];
  tutors: Tutor[];
  experience: string;
  contact: string;
  email: string;
  phone: string;
  website?: string;
  description: string;
  leadsGenerated: number;
  conversionRate: number;
  joined: string;
}

export function Institutes() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedInstitute, setSelectedInstitute] = useState<Institute | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | InstituteType>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | InstituteStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const institutes: Institute[] = [
    {
      id: 1,
      name: 'TechMaster Academy',
      type: 'coaching-institute',
      status: 'active',
      verified: true,
      pro: true,
      trainingMode: 'hybrid',
      specialization: ['Full Stack Development', 'Data Science', 'Cloud Computing', 'DevOps'],
      location: 'San Francisco, CA',
      rating: 4.8,
      totalStudents: 2500,
      totalCourses: 25,
      activeCourses: [
        { id: 1, title: 'Advanced Full Stack Development', level: 'Advanced', duration: '12 weeks', price: 1500, students: 500, status: 'active' },
        { id: 2, title: 'Data Science Fundamentals', level: 'Beginner', duration: '8 weeks', price: 1000, students: 300, status: 'active' },
        { id: 3, title: 'Cloud Computing Essentials', level: 'Intermediate', duration: '10 weeks', price: 1200, students: 400, status: 'active' }
      ],
      tutors: [
        { id: 1, name: 'John Anderson', specialization: ['Full Stack Development', 'Data Science'], experience: '10 years', rating: 4.8, totalSessions: 1000, hourlyRate: 100, verified: true, pro: true },
        { id: 2, name: 'Jane Smith', specialization: ['Cloud Computing', 'DevOps'], experience: '8 years', rating: 4.7, totalSessions: 800, hourlyRate: 120, verified: true, pro: true }
      ],
      experience: '10 years',
      contact: 'John Anderson',
      email: 'contact@techmasteracademy.com',
      phone: '+1 (555) 234-5678',
      website: 'www.techmasteracademy.com',
      description: 'Leading technology training institute offering comprehensive courses in software development, data science, and cloud technologies. Experienced instructors with industry expertise.',
      leadsGenerated: 450,
      conversionRate: 68,
      joined: '2020-03-15'
    },
    {
      id: 2,
      name: 'Sarah Williams',
      type: 'personal-trainer',
      status: 'active',
      verified: true,
      pro: false,
      trainingMode: 'virtual',
      specialization: ['React Development', 'JavaScript', 'Web Performance'],
      location: 'Remote',
      rating: 4.9,
      totalStudents: 380,
      totalCourses: 8,
      activeCourses: [
        { id: 7, title: 'React Hooks Mastery', level: 'Advanced', duration: '4 weeks', price: 800, students: 150, status: 'active' },
        { id: 8, title: 'JavaScript ES6+ Deep Dive', level: 'Intermediate', duration: '6 weeks', price: 900, students: 230, status: 'active' }
      ],
      tutors: [
        { id: 5, name: 'Sarah Williams', specialization: ['React Development', 'JavaScript', 'Web Performance'], experience: '7 years', rating: 4.9, totalSessions: 380, hourlyRate: 85, verified: true, pro: false }
      ],
      experience: '7 years',
      contact: 'Sarah Williams',
      email: 'sarah.williams@email.com',
      phone: '+1 (555) 345-6789',
      description: 'Specialized React developer and trainer with focus on modern web development practices. Personalized training approach with hands-on projects.',
      leadsGenerated: 125,
      conversionRate: 75,
      joined: '2021-06-20'
    },
    {
      id: 3,
      name: 'CodeCraft Institute',
      type: 'coaching-institute',
      status: 'active',
      verified: true,
      pro: true,
      trainingMode: 'physical',
      specialization: ['Mobile App Development', 'iOS', 'Android', 'React Native'],
      location: 'New York, NY',
      rating: 4.7,
      totalStudents: 1800,
      totalCourses: 18,
      activeCourses: [
        { id: 4, title: 'iOS App Development', level: 'Intermediate', duration: '10 weeks', price: 1200, students: 300, status: 'active' },
        { id: 5, title: 'Android App Development', level: 'Advanced', duration: '12 weeks', price: 1500, students: 400, status: 'active' },
        { id: 6, title: 'React Native Fundamentals', level: 'Beginner', duration: '8 weeks', price: 1000, students: 200, status: 'active' }
      ],
      tutors: [
        { id: 3, name: 'Michael Chen', specialization: ['Mobile App Development', 'iOS'], experience: '8 years', rating: 4.7, totalSessions: 800, hourlyRate: 120, verified: true, pro: true },
        { id: 4, name: 'Emily Davis', specialization: ['Android', 'React Native'], experience: '6 years', rating: 4.6, totalSessions: 600, hourlyRate: 100, verified: true, pro: true }
      ],
      experience: '8 years',
      contact: 'Michael Chen',
      email: 'info@codecraft.com',
      phone: '+1 (555) 456-7890',
      website: 'www.codecraft.com',
      description: 'Premier mobile app development training center with state-of-the-art facilities. Industry partnerships for job placements.',
      leadsGenerated: 320,
      conversionRate: 62,
      joined: '2019-09-10'
    },
    {
      id: 4,
      name: 'David Rodriguez',
      type: 'personal-trainer',
      status: 'cold-lead',
      verified: false,
      pro: false,
      trainingMode: 'hybrid',
      specialization: ['Python', 'Machine Learning', 'AI'],
      location: 'Austin, TX',
      rating: 4.6,
      totalStudents: 0,
      totalCourses: 0,
      activeCourses: [],
      tutors: [],
      experience: '5 years',
      contact: 'David Rodriguez',
      email: 'david.rodriguez@email.com',
      phone: '+1 (555) 567-8901',
      description: 'AI and ML specialist looking to offer personalized training sessions. Strong background in Python and data science.',
      leadsGenerated: 0,
      conversionRate: 0,
      joined: '2025-12-28'
    },
    {
      id: 5,
      name: 'Digital Skills Academy',
      type: 'coaching-institute',
      status: 'cold-lead',
      verified: false,
      pro: false,
      trainingMode: 'virtual',
      specialization: ['Digital Marketing', 'SEO', 'Social Media', 'Content Strategy'],
      location: 'Chicago, IL',
      rating: 0,
      totalStudents: 0,
      totalCourses: 0,
      activeCourses: [],
      tutors: [],
      experience: '3 years',
      contact: 'Emma Thompson',
      email: 'contact@digitalskillsacademy.com',
      phone: '+1 (555) 678-9012',
      description: 'New digital marketing training institute seeking partnerships. Experienced team with industry certifications.',
      leadsGenerated: 0,
      conversionRate: 0,
      joined: '2026-01-02'
    },
    {
      id: 6,
      name: 'Alex Kumar',
      type: 'personal-trainer',
      status: 'active',
      verified: true,
      pro: true,
      trainingMode: 'virtual',
      specialization: ['Backend Development', 'Node.js', 'Database Design', 'API Development'],
      location: 'Seattle, WA',
      rating: 4.8,
      totalStudents: 290,
      totalCourses: 12,
      activeCourses: [
        { id: 9, title: 'Node.js API Development', level: 'Advanced', duration: '6 weeks', price: 1100, students: 140, status: 'active' },
        { id: 10, title: 'Database Design Masterclass', level: 'Intermediate', duration: '5 weeks', price: 950, students: 150, status: 'active' }
      ],
      tutors: [
        { id: 6, name: 'Alex Kumar', specialization: ['Backend Development', 'Node.js', 'Database Design', 'API Development'], experience: '9 years', rating: 4.8, totalSessions: 290, hourlyRate: 95, verified: true, pro: true }
      ],
      experience: '9 years',
      contact: 'Alex Kumar',
      email: 'alex.kumar@email.com',
      phone: '+1 (555) 789-0123',
      description: 'Senior backend developer offering specialized training in server-side technologies and scalable system design.',
      leadsGenerated: 98,
      conversionRate: 72,
      joined: '2020-11-05'
    }
  ];

  const filteredInstitutes = institutes.filter(institute => {
    const matchesType = activeFilter === 'all' || institute.type === activeFilter;
    const matchesStatus = statusFilter === 'all' || institute.status === statusFilter;
    const matchesSearch = searchQuery === '' || 
      institute.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      institute.specialization.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      institute.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesType && matchesStatus && matchesSearch;
  });

  const stats = {
    total: institutes.length,
    coachingInstitutes: institutes.filter(i => i.type === 'coaching-institute').length,
    personalTrainers: institutes.filter(i => i.type === 'personal-trainer').length,
    active: institutes.filter(i => i.status === 'active').length,
    coldLeads: institutes.filter(i => i.status === 'cold-lead').length,
    totalLeads: institutes.reduce((sum, i) => sum + i.leadsGenerated, 0),
    avgConversionRate: Math.round(institutes.filter(i => i.status === 'active').reduce((sum, i) => sum + i.conversionRate, 0) / institutes.filter(i => i.status === 'active').length)
  };

  if (viewMode === 'details' && selectedInstitute) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setViewMode('list')}
            className="p-2 rounded-lg transition-colors"
            style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', border: '1px solid #FFC300' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.1)'}
          >
            <ArrowLeft className="w-5 h-5" style={{ color: '#FFC300' }} />
          </button>
          <div>
            <h1 style={{ color: '#FFC300', fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.02em', textShadow: '0 0 30px rgba(255, 195, 0, 0.3), 0 0 60px rgba(255, 195, 0, 0.2)' }}>
              {selectedInstitute.name}
            </h1>
            <p style={{ color: '#d3d3d3' }}>{selectedInstitute.type === 'coaching-institute' ? 'Coaching Institute' : 'Personal Trainer'} • {selectedInstitute.location}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            {/* Overview */}
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #FFC300' }}>
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h2 style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>{selectedInstitute.name}</h2>
                    {selectedInstitute.verified && (
                      <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)', color: '#22c55e', fontWeight: '600' }}>VERIFIED</span>
                    )}
                    {selectedInstitute.pro && (
                      <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.2)', color: '#FFC300', fontWeight: '600' }}>PRO</span>
                    )}
                    <span className="px-3 py-1 rounded-full text-xs" style={{ 
                      backgroundColor: selectedInstitute.status === 'active' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255, 195, 0, 0.1)', 
                      color: selectedInstitute.status === 'active' ? '#22c55e' : '#FFC300',
                      textTransform: 'uppercase'
                    }}>
                      {selectedInstitute.status}
                    </span>
                  </div>
                  <p style={{ color: '#d3d3d3', fontSize: '1rem', marginBottom: '1rem' }}>{selectedInstitute.description}</p>
                  
                  {selectedInstitute.rating > 0 && (
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5" style={{ color: '#FFC300', fill: '#FFC300' }} />
                        <span style={{ color: '#FFC300', fontSize: '1.25rem', fontWeight: '700' }}>{selectedInstitute.rating}</span>
                        <span style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Rating</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5" style={{ color: '#FFC300' }} />
                        <span style={{ color: '#f6f6f6', fontSize: '1rem', fontWeight: '600' }}>{selectedInstitute.totalStudents.toLocaleString()}</span>
                        <span style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Students</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5" style={{ color: '#FFC300' }} />
                        <span style={{ color: '#f6f6f6', fontSize: '1rem', fontWeight: '600' }}>{selectedInstitute.totalCourses}</span>
                        <span style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Courses</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p style={{ color: '#6f6f6f', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Training Mode</p>
                  <div className="flex items-center gap-2">
                    {selectedInstitute.trainingMode === 'virtual' && <Video className="w-4 h-4" style={{ color: '#FFC300' }} />}
                    {selectedInstitute.trainingMode === 'physical' && <Building2 className="w-4 h-4" style={{ color: '#FFC300' }} />}
                    {selectedInstitute.trainingMode === 'hybrid' && <Monitor className="w-4 h-4" style={{ color: '#FFC300' }} />}
                    <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600', textTransform: 'capitalize' }}>{selectedInstitute.trainingMode}</p>
                  </div>
                </div>
                <div>
                  <p style={{ color: '#6f6f6f', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Experience</p>
                  <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>{selectedInstitute.experience}</p>
                </div>
                <div>
                  <p style={{ color: '#6f6f6f', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Location</p>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                    <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>{selectedInstitute.location}</p>
                  </div>
                </div>
                <div>
                  <p style={{ color: '#6f6f6f', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Joined</p>
                  <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>{new Date(selectedInstitute.joined).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #FFC300' }}>
              <h3 className="mb-4" style={{ color: '#FFC300', fontSize: '1.125rem', fontWeight: '600' }}>Specializations</h3>
              <div className="flex items-center gap-2 flex-wrap">
                {selectedInstitute.specialization.map((spec, idx) => (
                  <span key={idx} className="px-4 py-2 rounded-full text-sm" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300', border: '1px solid #FFC300' }}>
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {selectedInstitute.activeCourses && selectedInstitute.activeCourses.length > 0 && (
              <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #FFC300' }}>
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-5 h-5" style={{ color: '#FFC300' }} />
                  <h3 style={{ color: '#FFC300', fontSize: '1.125rem', fontWeight: '600' }}>Active Courses ({selectedInstitute.activeCourses.length})</h3>
                </div>
                <div className="space-y-3">
                  {selectedInstitute.activeCourses.map((course) => (
                    <div 
                      key={course.id}
                      className="rounded-lg p-4 transition-all cursor-pointer"
                      style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f' }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = '#FFC300'}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = '#6f6f6f'}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 style={{ color: '#f6f6f6', fontSize: '1rem', fontWeight: '600' }}>{course.title}</h4>
                        <span className="px-2 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)', color: '#22c55e', fontWeight: '600' }}>
                          {course.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mb-2">
                        <span style={{ color: '#d3d3d3', fontSize: '0.75rem' }}>Level: {course.level}</span>
                        <span style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>•</span>
                        <span style={{ color: '#d3d3d3', fontSize: '0.75rem' }}>Duration: {course.duration}</span>
                      </div>
                      <div className="flex items-center justify-between pt-2" style={{ borderTop: '1px solid rgba(111, 111, 111, 0.3)' }}>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                          <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>{course.students} students</span>
                        </div>
                        <span style={{ color: '#FFC300', fontSize: '1rem', fontWeight: '700' }}>₹{course.price.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedInstitute.tutors && selectedInstitute.tutors.length > 0 && (
              <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #FFC300' }}>
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="w-5 h-5" style={{ color: '#FFC300' }} />
                  <h3 style={{ color: '#FFC300', fontSize: '1.125rem', fontWeight: '600' }}>Tutors/Instructors ({selectedInstitute.tutors.length})</h3>
                </div>
                <div className="space-y-3">
                  {selectedInstitute.tutors.map((tutor) => (
                    <div 
                      key={tutor.id}
                      className="rounded-lg p-4 transition-all cursor-pointer"
                      style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f' }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = '#FFC300'}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = '#6f6f6f'}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h4 style={{ color: '#f6f6f6', fontSize: '1rem', fontWeight: '600' }}>{tutor.name}</h4>
                          {tutor.verified && <CheckCircle className="w-4 h-4" style={{ color: '#22c55e' }} />}
                          {tutor.pro && (
                            <span className="px-2 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.2)', color: '#FFC300', fontWeight: '600' }}>PRO</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4" style={{ color: '#FFC300', fill: '#FFC300' }} />
                          <span style={{ color: '#FFC300', fontWeight: '600' }}>{tutor.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 flex-wrap mb-2">
                        {tutor.specialization.slice(0, 3).map((spec, idx) => (
                          <span key={idx} className="px-2 py-1 rounded text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300' }}>
                            {spec}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-2" style={{ borderTop: '1px solid rgba(111, 111, 111, 0.3)' }}>
                        <span style={{ color: '#d3d3d3', fontSize: '0.75rem' }}>{tutor.experience} exp • {tutor.totalSessions} sessions</span>
                        <span style={{ color: '#FFC300', fontSize: '0.875rem', fontWeight: '600' }}>₹{tutor.hourlyRate}/hr</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <h3 className="mb-4" style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5" style={{ color: '#6f6f6f' }} />
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>{selectedInstitute.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5" style={{ color: '#6f6f6f' }} />
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>{selectedInstitute.phone}</span>
                </div>
                {selectedInstitute.website && (
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5" style={{ color: '#6f6f6f' }} />
                    <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>{selectedInstitute.website}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {selectedInstitute.status === 'active' && (
              <>
                <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #FFC300' }}>
                  <h3 className="mb-4" style={{ color: '#FFC300', fontSize: '1.125rem', fontWeight: '600' }}>Lead Performance</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Leads Generated</span>
                        <span style={{ color: '#FFC300', fontSize: '1.5rem', fontWeight: '700' }}>{selectedInstitute.leadsGenerated}</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Conversion Rate</span>
                        <span style={{ color: '#FFC300', fontSize: '1.5rem', fontWeight: '700' }}>{selectedInstitute.conversionRate}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full" style={{ backgroundColor: 'rgba(111, 111, 111, 0.3)' }}>
                        <div className="h-full rounded-full" style={{ width: `${selectedInstitute.conversionRate}%`, backgroundColor: '#FFC300' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
                  <h3 className="mb-4" style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>Quick Stats</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Total Students</span>
                      <span style={{ color: '#FFC300', fontWeight: '700' }}>{selectedInstitute.totalStudents.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Active Courses</span>
                      <span style={{ color: '#FFC300', fontWeight: '700' }}>{selectedInstitute.totalCourses}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Rating</span>
                      <span style={{ color: '#FFC300', fontWeight: '700' }}>{selectedInstitute.rating}/5.0</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {selectedInstitute.status === 'cold-lead' && (
              <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #FFC300' }}>
                <h3 className="mb-4" style={{ color: '#FFC300', fontSize: '1.125rem', fontWeight: '600' }}>Convert Lead</h3>
                <p style={{ color: '#d3d3d3', fontSize: '0.875rem', marginBottom: '1rem' }}>
                  This is a cold lead. Take action to convert them into an active institute partner.
                </p>
                <button
                  className="w-full px-6 py-3 rounded-lg transition-colors"
                  style={{ backgroundColor: '#FFC300', color: '#023047', fontWeight: '700' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d3d3d3'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFC300'}
                >
                  Contact & Convert
                </button>
              </div>
            )}

            <button
              onClick={() => setViewMode('list')}
              className="w-full px-6 py-3 rounded-lg transition-colors"
              style={{ backgroundColor: 'rgba(111, 111, 111, 0.3)', color: '#d3d3d3', border: '1px solid #6f6f6f' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(111, 111, 111, 0.5)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(111, 111, 111, 0.3)'}
            >
              Back to List
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 style={{ color: '#FFC300', fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.02em', textShadow: '0 0 30px rgba(255, 195, 0, 0.3), 0 0 60px rgba(255, 195, 0, 0.2)' }}>
          Institutes
        </h1>
        <p style={{ color: '#d3d3d3' }}>Manage coaching institutes and personal trainers offering virtual/physical training</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="rounded-lg p-4" style={{ backgroundColor: '#023047', border: '1px solid #FFC300' }}>
          <div className="flex items-center justify-between mb-2">
            <Building className="w-5 h-5" style={{ color: '#FFC300' }} />
            <span style={{ color: '#FFC300', fontSize: '1.75rem', fontWeight: '700' }}>{stats.total}</span>
          </div>
          <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Total Institutes</p>
        </div>
        <div className="rounded-lg p-4" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
          <div className="flex items-center justify-between mb-2">
            <Building2 className="w-5 h-5" style={{ color: '#FFC300' }} />
            <span style={{ color: '#FFC300', fontSize: '1.75rem', fontWeight: '700' }}>{stats.coachingInstitutes}</span>
          </div>
          <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Coaching Institutes</p>
        </div>
        <div className="rounded-lg p-4" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
          <div className="flex items-center justify-between mb-2">
            <Users className="w-5 h-5" style={{ color: '#FFC300' }} />
            <span style={{ color: '#FFC300', fontSize: '1.75rem', fontWeight: '700' }}>{stats.personalTrainers}</span>
          </div>
          <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Personal Trainers</p>
        </div>
        <div className="rounded-lg p-4" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
          <div className="flex items-center justify-between mb-2">
            <Target className="w-5 h-5" style={{ color: '#FFC300' }} />
            <span style={{ color: '#FFC300', fontSize: '1.75rem', fontWeight: '700' }}>{stats.totalLeads.toLocaleString()}</span>
          </div>
          <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Total Leads Generated</p>
        </div>
      </div>

      <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5" style={{ color: '#FFC300' }} />
            <span style={{ color: '#f6f6f6', fontWeight: '600' }}>Filters:</span>
          </div>
          
          <button
            onClick={() => setActiveFilter('all')}
            className="px-4 py-2 rounded-lg transition-colors"
            style={{
              backgroundColor: activeFilter === 'all' ? '#FFC300' : 'rgba(255, 195, 0, 0.1)',
              color: activeFilter === 'all' ? '#023047' : '#FFC300',
              border: `1px solid ${activeFilter === 'all' ? '#FFC300' : '#6f6f6f'}`
            }}
          >
            All Institutes
          </button>
          <button
            onClick={() => setActiveFilter('coaching-institute')}
            className="px-4 py-2 rounded-lg transition-colors"
            style={{
              backgroundColor: activeFilter === 'coaching-institute' ? '#FFC300' : 'rgba(255, 195, 0, 0.1)',
              color: activeFilter === 'coaching-institute' ? '#023047' : '#FFC300',
              border: `1px solid ${activeFilter === 'coaching-institute' ? '#FFC300' : '#6f6f6f'}`
            }}
          >
            Coaching Institutes
          </button>
          <button
            onClick={() => setActiveFilter('personal-trainer')}
            className="px-4 py-2 rounded-lg transition-colors"
            style={{
              backgroundColor: activeFilter === 'personal-trainer' ? '#FFC300' : 'rgba(255, 195, 0, 0.1)',
              color: activeFilter === 'personal-trainer' ? '#023047' : '#FFC300',
              border: `1px solid ${activeFilter === 'personal-trainer' ? '#FFC300' : '#6f6f6f'}`
            }}
          >
            Personal Trainers
          </button>

          <div className="mx-4" style={{ width: '1px', height: '24px', backgroundColor: '#6f6f6f' }}></div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | InstituteStatus)}
            className="px-4 py-2 rounded-lg outline-none"
            style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="cold-lead">Cold Leads</option>
            <option value="inactive">Inactive</option>
          </select>

          <div className="flex-1"></div>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#6f6f6f' }} />
            <input 
              type="text" 
              placeholder="Search institutes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg outline-none"
              style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {filteredInstitutes.map((institute) => (
          <div 
            key={institute.id}
            onClick={() => { setSelectedInstitute(institute); setViewMode('details'); }}
            className="rounded-lg p-6 cursor-pointer transition-all" 
            style={{ 
              backgroundColor: '#023047', 
              border: institute.status === 'cold-lead' ? '1px solid #FFC300' : '1px solid #6f6f6f'
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#FFC300'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = institute.status === 'cold-lead' ? '#FFC300' : '#6f6f6f'}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>{institute.name}</h3>
                  {institute.verified && <CheckCircle className="w-4 h-4" style={{ color: '#22c55e' }} />}
                  {institute.pro && (
                    <span className="px-2 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.2)', color: '#FFC300', fontWeight: '600' }}>PRO</span>
                  )}
                </div>
                <p style={{ color: '#d3d3d3', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                  {institute.type === 'coaching-institute' ? 'Coaching Institute' : 'Personal Trainer'}
                </p>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>{institute.location}</span>
                </div>
                {institute.status === 'active' ? (
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4" style={{ color: '#FFC300', fill: '#FFC300' }} />
                      <span style={{ color: '#FFC300', fontWeight: '600' }}>{institute.rating}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                      <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>{institute.totalStudents.toLocaleString()} students</span>
                    </div>
                  </div>
                ) : (
                  <div className="mb-3">
                    <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.2)', color: '#FFC300', fontWeight: '600' }}>
                      COLD LEAD
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-1 flex-wrap">
                  {institute.specialization.slice(0, 3).map((spec, idx) => (
                    <span key={idx} className="px-2 py-1 rounded text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300' }}>
                      {spec}
                    </span>
                  ))}
                  {institute.specialization.length > 3 && (
                    <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300' }}>
                      +{institute.specialization.length - 3} more
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {institute.trainingMode === 'virtual' && <Video className="w-5 h-5" style={{ color: '#FFC300' }} />}
                {institute.trainingMode === 'physical' && <Building2 className="w-5 h-5" style={{ color: '#FFC300' }} />}
                {institute.trainingMode === 'hybrid' && <Monitor className="w-5 h-5" style={{ color: '#FFC300' }} />}
              </div>
            </div>

            {institute.status === 'active' && (
              <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid #6f6f6f' }}>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4" style={{ color: '#FFC300' }} />
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>{institute.leadsGenerated} leads</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" style={{ color: '#22c55e' }} />
                  <span style={{ color: '#22c55e', fontSize: '0.875rem', fontWeight: '600' }}>{institute.conversionRate}% conversion</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredInstitutes.length === 0 && (
        <div className="text-center py-12">
          <p style={{ color: '#6f6f6f', fontSize: '1.125rem' }}>No institutes found matching your filters</p>
        </div>
      )}
    </div>
  );
}