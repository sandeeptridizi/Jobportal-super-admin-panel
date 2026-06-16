import { useState } from 'react';
import { Search, Filter, Users, Star, CheckCircle, Calendar, Clock, DollarSign, Video, Award, BookOpen, ArrowLeft, X } from 'lucide-react';

type TutorStatus = 'active' | 'cold-lead' | 'busy' | 'offline';
type ViewMode = 'list' | 'details' | 'booking';

interface TimeSlot {
  id: number;
  date: string;
  time: string;
  available: boolean;
}

interface Tutor {
  id: number;
  name: string;
  specialization: string[];
  experience: string;
  rating: number;
  totalSessions: number;
  hourlyRate: number;
  status: TutorStatus;
  verified: boolean;
  pro: boolean;
  bio: string;
  education: string;
  languages: string[];
  responseTime: string;
  availability: string;
  profileImage?: string;
}

export function Tutors() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | TutorStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  const tutors: Tutor[] = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialization: ['React Development', 'JavaScript', 'Web Performance', 'Frontend Architecture'],
      experience: '10 years',
      rating: 4.9,
      totalSessions: 1250,
      hourlyRate: 80,
      status: 'active',
      verified: true,
      pro: true,
      bio: 'Senior frontend developer and educator with 10 years of experience. Specialized in React and modern JavaScript. Former tech lead at major tech companies. Passionate about helping developers master web development.',
      education: 'MS Computer Science, Stanford University',
      languages: ['English', 'Spanish'],
      responseTime: '< 1 hour',
      availability: 'Mon-Fri, 9 AM - 6 PM PST'
    },
    {
      id: 2,
      name: 'Michael Chen',
      specialization: ['Python', 'Machine Learning', 'Data Science', 'AI'],
      experience: '8 years',
      rating: 4.8,
      totalSessions: 890,
      hourlyRate: 75,
      status: 'active',
      verified: true,
      pro: true,
      bio: 'AI/ML expert with strong background in data science and Python programming. Worked on cutting-edge ML projects. Love teaching complex concepts in simple ways.',
      education: 'PhD Machine Learning, MIT',
      languages: ['English', 'Mandarin'],
      responseTime: '< 2 hours',
      availability: 'Tue-Sat, 10 AM - 7 PM EST'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      specialization: ['Node.js', 'Backend Development', 'Database Design', 'System Architecture'],
      experience: '7 years',
      rating: 4.7,
      totalSessions: 650,
      hourlyRate: 70,
      status: 'active',
      verified: true,
      pro: false,
      bio: 'Backend specialist with expertise in Node.js and scalable system design. Experience with microservices and cloud platforms. Dedicated to student success.',
      education: 'BS Software Engineering, UC Berkeley',
      languages: ['English', 'Portuguese'],
      responseTime: '< 3 hours',
      availability: 'Mon-Fri, 2 PM - 9 PM EST'
    },
    {
      id: 4,
      name: 'David Kumar',
      specialization: ['Mobile Development', 'React Native', 'iOS', 'Android'],
      experience: '6 years',
      rating: 4.8,
      totalSessions: 420,
      hourlyRate: 65,
      status: 'active',
      verified: true,
      pro: false,
      bio: 'Mobile app developer specializing in cross-platform development. Built and published 20+ apps. Enjoy helping students build their first mobile apps.',
      education: 'MS Mobile Computing, Georgia Tech',
      languages: ['English', 'Hindi'],
      responseTime: '< 2 hours',
      availability: 'Mon-Thu, 6 PM - 11 PM PST'
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      specialization: ['UI/UX Design', 'Figma', 'Product Design', 'Design Systems'],
      experience: '9 years',
      rating: 4.9,
      totalSessions: 780,
      hourlyRate: 85,
      status: 'busy',
      verified: true,
      pro: true,
      bio: 'Senior product designer with extensive experience at top tech companies. Expert in creating intuitive user experiences and building design systems.',
      education: 'MFA Interaction Design, RISD',
      languages: ['English', 'French'],
      responseTime: '< 4 hours',
      availability: 'Limited availability'
    },
    {
      id: 6,
      name: 'James Wilson',
      specialization: ['DevOps', 'AWS', 'Docker', 'Kubernetes', 'CI/CD'],
      experience: '5 years',
      rating: 0,
      totalSessions: 0,
      hourlyRate: 60,
      status: 'cold-lead',
      verified: false,
      pro: false,
      bio: 'DevOps engineer looking to share knowledge about cloud infrastructure and deployment automation. Hands-on experience with AWS and containerization.',
      education: 'BS Computer Engineering, UT Austin',
      languages: ['English'],
      responseTime: 'TBD',
      availability: 'Flexible'
    }
  ];

  // Generate time slots for the selected tutor
  const generateTimeSlots = (tutorId: number): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const dates = ['2026-01-10', '2026-01-11', '2026-01-12', '2026-01-13', '2026-01-14'];
    const times = ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];
    
    let id = 1;
    dates.forEach(date => {
      times.forEach(time => {
        slots.push({
          id: id++,
          date,
          time,
          available: Math.random() > 0.3 // 70% of slots are available
        });
      });
    });
    
    return slots;
  };

  const filteredTutors = tutors.filter(tutor => {
    const matchesStatus = statusFilter === 'all' || tutor.status === statusFilter;
    const matchesSearch = searchQuery === '' ||
      tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.specialization.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: tutors.length,
    active: tutors.filter(t => t.status === 'active').length,
    avgRating: (tutors.filter(t => t.rating > 0).reduce((sum, t) => sum + t.rating, 0) / tutors.filter(t => t.rating > 0).length).toFixed(1),
    totalSessions: tutors.reduce((sum, t) => sum + t.totalSessions, 0)
  };

  // Booking View
  if (viewMode === 'booking' && selectedTutor) {
    const allSlots = generateTimeSlots(selectedTutor.id);
    const dates = [...new Set(allSlots.map(slot => slot.date))];
    const filteredSlots = selectedDate 
      ? allSlots.filter(slot => slot.date === selectedDate)
      : allSlots.filter(slot => slot.date === dates[0]);

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setViewMode('details')}
            className="p-2 rounded-lg transition-colors"
            style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', border: '1px solid #FFC300' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.1)'}
          >
            <ArrowLeft className="w-5 h-5" style={{ color: '#FFC300' }} />
          </button>
          <div>
            <h1 style={{ color: '#FFC300', fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.02em', textShadow: '0 0 30px rgba(255, 195, 0, 0.3), 0 0 60px rgba(255, 195, 0, 0.2)' }}>
              Book Session
            </h1>
            <p style={{ color: '#d3d3d3' }}>with {selectedTutor.name} • ₹{selectedTutor.hourlyRate}/hour</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            {/* Select Date */}
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #FFC300' }}>
              <h3 className="mb-4" style={{ color: '#FFC300', fontSize: '1.125rem', fontWeight: '600' }}>Select Date</h3>
              <div className="grid grid-cols-5 gap-3">
                {dates.map((date) => {
                  const dateObj = new Date(date);
                  const isSelected = selectedDate === date || (!selectedDate && date === dates[0]);
                  const availableCount = allSlots.filter(s => s.date === date && s.available).length;
                  
                  return (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className="p-4 rounded-lg transition-all"
                      style={{
                        backgroundColor: isSelected ? 'rgba(255, 195, 0, 0.2)' : 'rgba(255, 195, 0, 0.05)',
                        border: `2px solid ${isSelected ? '#FFC300' : '#6f6f6f'}`,
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => !isSelected && (e.currentTarget.style.borderColor = '#FFC300')}
                      onMouseLeave={(e) => !isSelected && (e.currentTarget.style.borderColor = '#6f6f6f')}
                    >
                      <p style={{ color: '#FFC300', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                        {dateObj.toLocaleDateString('en-US', { weekday: 'short' })}
                      </p>
                      <p style={{ color: '#f6f6f6', fontSize: '1.25rem', fontWeight: '700' }}>
                        {dateObj.getDate()}
                      </p>
                      <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>
                        {dateObj.toLocaleDateString('en-US', { month: 'short' })}
                      </p>
                      <p style={{ color: '#22c55e', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                        {availableCount} slots
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Select Time Slot */}
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #FFC300' }}>
              <h3 className="mb-4" style={{ color: '#FFC300', fontSize: '1.125rem', fontWeight: '600' }}>Select Time Slot (1 hour)</h3>
              <div className="grid grid-cols-4 gap-3">
                {filteredSlots.map((slot) => {
                  const isSelected = selectedSlot?.id === slot.id;
                  
                  return (
                    <button
                      key={slot.id}
                      onClick={() => slot.available && setSelectedSlot(slot)}
                      disabled={!slot.available}
                      className="p-3 rounded-lg transition-all"
                      style={{
                        backgroundColor: isSelected 
                          ? 'rgba(255, 195, 0, 0.2)' 
                          : slot.available 
                            ? 'rgba(255, 195, 0, 0.05)' 
                            : 'rgba(111, 111, 111, 0.1)',
                        border: `1px solid ${isSelected ? '#FFC300' : slot.available ? '#6f6f6f' : '#6f6f6f'}`,
                        cursor: slot.available ? 'pointer' : 'not-allowed',
                        opacity: slot.available ? 1 : 0.5
                      }}
                      onMouseEnter={(e) => slot.available && !isSelected && (e.currentTarget.style.borderColor = '#FFC300')}
                      onMouseLeave={(e) => slot.available && !isSelected && (e.currentTarget.style.borderColor = '#6f6f6f')}
                    >
                      <div className="flex items-center gap-2 justify-center">
                        <Clock className="w-4 h-4" style={{ color: slot.available ? '#FFC300' : '#6f6f6f' }} />
                        <span style={{ color: slot.available ? '#f6f6f6' : '#6f6f6f', fontWeight: '600' }}>
                          {slot.time}
                        </span>
                      </div>
                      {!slot.available && (
                        <p style={{ color: '#6f6f6f', fontSize: '0.75rem', marginTop: '0.25rem' }}>Booked</p>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Session Details */}
            {selectedSlot && (
              <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
                <h3 className="mb-4" style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>Session Details</h3>
                <div className="space-y-4">
                  <div>
                    <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>Topic / What to cover *</label>
                    <input 
                      type="text" 
                      placeholder="e.g., React Hooks, State Management..."
                      className="w-full p-3 rounded-lg outline-none"
                      style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                    />
                  </div>
                  <div>
                    <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>Additional Notes (Optional)</label>
                    <textarea 
                      placeholder="Any specific questions or areas you'd like to focus on..."
                      rows={3}
                      className="w-full p-3 rounded-lg outline-none"
                      style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" id="sendReminder" className="w-4 h-4" defaultChecked />
                    <label htmlFor="sendReminder" style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Send me reminder 1 hour before session</label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #FFC300' }}>
              <h3 className="mb-4" style={{ color: '#FFC300', fontSize: '1.125rem', fontWeight: '600' }}>Booking Summary</h3>
              <div className="space-y-3">
                <div>
                  <p style={{ color: '#6f6f6f', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Tutor</p>
                  <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>{selectedTutor.name}</p>
                </div>
                {selectedSlot && (
                  <>
                    <div>
                      <p style={{ color: '#6f6f6f', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Date & Time</p>
                      <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>
                        {new Date(selectedSlot.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                      </p>
                      <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>{selectedSlot.time}</p>
                    </div>
                    <div>
                      <p style={{ color: '#6f6f6f', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Duration</p>
                      <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>1 hour</p>
                    </div>
                    <div className="pt-3" style={{ borderTop: '1px solid #6f6f6f' }}>
                      <div className="flex items-center justify-between mb-2">
                        <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Session Fee</span>
                        <span style={{ color: '#f6f6f6', fontWeight: '600' }}>₹{selectedTutor.hourlyRate}</span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Platform Fee</span>
                        <span style={{ color: '#f6f6f6', fontWeight: '600' }}>₹5</span>
                      </div>
                      <div className="flex items-center justify-between pt-2" style={{ borderTop: '1px solid #6f6f6f' }}>
                        <span style={{ color: '#FFC300', fontSize: '1rem', fontWeight: '600' }}>Total</span>
                        <span style={{ color: '#FFC300', fontSize: '1.5rem', fontWeight: '700' }}>₹{selectedTutor.hourlyRate + 5}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {selectedSlot ? (
              <>
                <button
                  className="w-full px-6 py-4 rounded-lg transition-colors"
                  style={{ backgroundColor: '#FFC300', color: '#023047', fontWeight: '700', fontSize: '1rem' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d3d3d3'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFC300'}
                >
                  Confirm Booking
                </button>
                <button
                  onClick={() => setSelectedSlot(null)}
                  className="w-full px-6 py-3 rounded-lg transition-colors"
                  style={{ backgroundColor: 'rgba(111, 111, 111, 0.3)', color: '#d3d3d3', border: '1px solid #6f6f6f' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(111, 111, 111, 0.5)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(111, 111, 111, 0.3)'}
                >
                  Clear Selection
                </button>
              </>
            ) : (
              <div className="rounded-lg p-6 text-center" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f' }}>
                <Calendar className="w-8 h-8 mx-auto mb-2" style={{ color: '#6f6f6f' }} />
                <p style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Select a date and time slot to continue</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Details View
  if (viewMode === 'details' && selectedTutor) {
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
              {selectedTutor.name}
            </h1>
            <p style={{ color: '#d3d3d3' }}>{selectedTutor.specialization[0]} • ₹{selectedTutor.hourlyRate}/hour</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            {/* Profile Overview */}
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #FFC300' }}>
              <div className="flex items-start gap-6 mb-6">
                <div className="w-24 h-24 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(255, 195, 0, 0.2)', color: '#FFC300', fontSize: '2.5rem', fontWeight: '700' }}>
                  {selectedTutor.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h2 style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>{selectedTutor.name}</h2>
                    {selectedTutor.verified && (
                      <CheckCircle className="w-5 h-5" style={{ color: '#22c55e' }} />
                    )}
                    {selectedTutor.pro && (
                      <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.2)', color: '#FFC300', fontWeight: '600' }}>PRO</span>
                    )}
                  </div>
                  <p style={{ color: '#d3d3d3', fontSize: '1rem', lineHeight: '1.6', marginBottom: '1rem' }}>{selectedTutor.bio}</p>
                  {selectedTutor.status === 'active' && selectedTutor.rating > 0 && (
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5" style={{ color: '#FFC300', fill: '#FFC300' }} />
                        <span style={{ color: '#FFC300', fontSize: '1.25rem', fontWeight: '700' }}>{selectedTutor.rating}</span>
                        <span style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>({selectedTutor.totalSessions} sessions)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5" style={{ color: '#FFC300' }} />
                        <span style={{ color: '#f6f6f6', fontWeight: '600' }}>Responds in {selectedTutor.responseTime}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4" style={{ borderTop: '1px solid #6f6f6f' }}>
                <div>
                  <p style={{ color: '#6f6f6f', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Experience</p>
                  <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>{selectedTutor.experience}</p>
                </div>
                <div>
                  <p style={{ color: '#6f6f6f', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Hourly Rate</p>
                  <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>₹{selectedTutor.hourlyRate}/hour</p>
                </div>
                <div>
                  <p style={{ color: '#6f6f6f', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Education</p>
                  <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>{selectedTutor.education}</p>
                </div>
                <div>
                  <p style={{ color: '#6f6f6f', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Languages</p>
                  <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>{selectedTutor.languages.join(', ')}</p>
                </div>
              </div>
            </div>

            {/* Specializations */}
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #FFC300' }}>
              <h3 className="mb-4" style={{ color: '#FFC300', fontSize: '1.125rem', fontWeight: '600' }}>Areas of Expertise</h3>
              <div className="flex items-center gap-2 flex-wrap">
                {selectedTutor.specialization.map((spec, idx) => (
                  <span key={idx} className="px-4 py-2 rounded-full text-sm" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300', border: '1px solid #FFC300' }}>
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <h3 className="mb-4" style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>Availability</h3>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5" style={{ color: '#FFC300' }} />
                <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>{selectedTutor.availability}</span>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {selectedTutor.status === 'active' && (
              <>
                <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #FFC300' }}>
                  <h3 className="mb-4" style={{ color: '#FFC300', fontSize: '1.125rem', fontWeight: '600' }}>Session Info</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Duration</span>
                      <span style={{ color: '#FFC300', fontWeight: '700' }}>1 hour</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Rate</span>
                      <span style={{ color: '#FFC300', fontSize: '1.25rem', fontWeight: '700' }}>₹{selectedTutor.hourlyRate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Sessions Completed</span>
                      <span style={{ color: '#FFC300', fontWeight: '700' }}>{selectedTutor.totalSessions}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setViewMode('booking')}
                  className="w-full px-6 py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                  style={{ backgroundColor: '#FFC300', color: '#023047', fontWeight: '700', fontSize: '1rem' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d3d3d3'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFC300'}
                >
                  <Calendar className="w-5 h-5" />
                  Book a Session
                </button>
              </>
            )}

            {selectedTutor.status === 'cold-lead' && (
              <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #FFC300' }}>
                <h3 className="mb-4" style={{ color: '#FFC300', fontSize: '1.125rem', fontWeight: '600' }}>Cold Lead</h3>
                <p style={{ color: '#d3d3d3', fontSize: '0.875rem', marginBottom: '1rem' }}>
                  This tutor is not yet active. Contact them to complete onboarding.
                </p>
                <button
                  className="w-full px-6 py-3 rounded-lg transition-colors"
                  style={{ backgroundColor: '#FFC300', color: '#023047', fontWeight: '700' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d3d3d3'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFC300'}
                >
                  Contact Tutor
                </button>
              </div>
            )}

            {selectedTutor.status === 'busy' && (
              <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #FFC300' }}>
                <h3 className="mb-4" style={{ color: '#FFC300', fontSize: '1.125rem', fontWeight: '600' }}>Limited Availability</h3>
                <p style={{ color: '#d3d3d3', fontSize: '0.875rem', marginBottom: '1rem' }}>
                  This tutor is currently busy. Check back later or contact them directly.
                </p>
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

  // List View
  return (
    <div className="space-y-6">
      <div>
        <h1 style={{ color: '#FFC300', fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.02em', textShadow: '0 0 30px rgba(255, 195, 0, 0.3), 0 0 60px rgba(255, 195, 0, 0.2)' }}>
          Tutors
        </h1>
        <p style={{ color: '#d3d3d3' }}>Book 1-on-1 sessions with expert tutors • 1 hour slots available</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="rounded-lg p-4" style={{ backgroundColor: '#023047', border: '1px solid #FFC300' }}>
          <div className="flex items-center justify-between mb-2">
            <Users className="w-5 h-5" style={{ color: '#FFC300' }} />
            <span style={{ color: '#FFC300', fontSize: '1.75rem', fontWeight: '700' }}>{stats.total}</span>
          </div>
          <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Total Tutors</p>
        </div>
        <div className="rounded-lg p-4" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-5 h-5" style={{ color: '#FFC300' }} />
            <span style={{ color: '#FFC300', fontSize: '1.75rem', fontWeight: '700' }}>{stats.active}</span>
          </div>
          <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Active Tutors</p>
        </div>
        <div className="rounded-lg p-4" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
          <div className="flex items-center justify-between mb-2">
            <Star className="w-5 h-5" style={{ color: '#FFC300' }} />
            <span style={{ color: '#FFC300', fontSize: '1.75rem', fontWeight: '700' }}>{stats.avgRating}</span>
          </div>
          <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Avg Rating</p>
        </div>
        <div className="rounded-lg p-4" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
          <div className="flex items-center justify-between mb-2">
            <BookOpen className="w-5 h-5" style={{ color: '#FFC300' }} />
            <span style={{ color: '#FFC300', fontSize: '1.75rem', fontWeight: '700' }}>{stats.totalSessions.toLocaleString()}</span>
          </div>
          <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Total Sessions</p>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5" style={{ color: '#FFC300' }} />
            <span style={{ color: '#f6f6f6', fontWeight: '600' }}>Filters:</span>
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | TutorStatus)}
            className="px-4 py-2 rounded-lg outline-none"
            style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="cold-lead">Cold Leads</option>
            <option value="busy">Busy</option>
            <option value="offline">Offline</option>
          </select>

          <div className="flex-1"></div>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#6f6f6f' }} />
            <input 
              type="text" 
              placeholder="Search tutors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg outline-none"
              style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
            />
          </div>
        </div>
      </div>

      {/* Tutors Grid */}
      <div className="grid grid-cols-2 gap-6">
        {filteredTutors.map((tutor) => (
          <div 
            key={tutor.id}
            onClick={() => { setSelectedTutor(tutor); setViewMode('details'); }}
            className="rounded-lg p-6 cursor-pointer transition-all" 
            style={{ 
              backgroundColor: '#023047', 
              border: tutor.status === 'cold-lead' ? '1px solid #FFC300' : '1px solid #6f6f6f'
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#FFC300'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = tutor.status === 'cold-lead' ? '#FFC300' : '#6f6f6f'}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(255, 195, 0, 0.2)', color: '#FFC300', fontSize: '1.5rem', fontWeight: '700' }}>
                {tutor.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>{tutor.name}</h3>
                  {tutor.verified && <CheckCircle className="w-4 h-4" style={{ color: '#22c55e' }} />}
                  {tutor.pro && (
                    <span className="px-2 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.2)', color: '#FFC300', fontWeight: '600' }}>PRO</span>
                  )}
                </div>
                <p style={{ color: '#d3d3d3', fontSize: '0.875rem', marginBottom: '0.5rem' }}>{tutor.specialization[0]}</p>
                {tutor.status === 'active' && tutor.rating > 0 ? (
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" style={{ color: '#FFC300', fill: '#FFC300' }} />
                      <span style={{ color: '#FFC300', fontWeight: '600' }}>{tutor.rating}</span>
                    </div>
                    <span style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>•</span>
                    <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>{tutor.totalSessions} sessions</span>
                    <span style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>•</span>
                    <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>{tutor.experience} exp</span>
                  </div>
                ) : (
                  <div className="mb-3">
                    <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.2)', color: '#FFC300', fontWeight: '600' }}>
                      {tutor.status === 'cold-lead' ? 'COLD LEAD' : tutor.status.toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-1 flex-wrap">
                  {tutor.specialization.slice(0, 3).map((spec, idx) => (
                    <span key={idx} className="px-2 py-1 rounded text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300' }}>
                      {spec}
                    </span>
                  ))}
                  {tutor.specialization.length > 3 && (
                    <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300' }}>
                      +{tutor.specialization.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid #6f6f6f' }}>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" style={{ color: '#FFC300' }} />
                <span style={{ color: '#FFC300', fontSize: '1.25rem', fontWeight: '700' }}>₹{tutor.hourlyRate}</span>
                <span style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>/hour</span>
              </div>
              {tutor.status === 'active' && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" style={{ color: '#22c55e' }} />
                  <span style={{ color: '#22c55e', fontSize: '0.875rem', fontWeight: '600' }}>Available</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredTutors.length === 0 && (
        <div className="text-center py-12">
          <p style={{ color: '#6f6f6f', fontSize: '1.125rem' }}>No tutors found matching your filters</p>
        </div>
      )}
    </div>
  );
}