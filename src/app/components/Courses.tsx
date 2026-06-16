import { useState } from 'react';
import { Search, Filter, BookOpen, Users, Clock, DollarSign, Star, CheckCircle, Video, FileText, Award, Calendar, ArrowLeft, Play, Download } from 'lucide-react';

type CourseLevel = 'beginner' | 'intermediate' | 'advanced';
type CourseType = 'self-paced' | 'instructor-led' | 'hybrid';
type ViewMode = 'list' | 'details';

interface Course {
  id: number;
  title: string;
  instituteId: number;
  instituteName: string;
  instituteType: 'coaching-institute' | 'personal-trainer';
  description: string;
  level: CourseLevel;
  type: CourseType;
  duration: string;
  price: number;
  rating: number;
  totalStudents: number;
  totalLessons: number;
  totalHours: number;
  topics: string[];
  instructors: string[];
  startDate: string;
  prerequisites: string[];
  learningOutcomes: string[];
  verified: boolean;
  bestseller: boolean;
}

export function Courses() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [levelFilter, setLevelFilter] = useState<'all' | CourseLevel>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | CourseType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const courses: Course[] = [
    {
      id: 1,
      title: 'Complete Full Stack Web Development Bootcamp',
      instituteId: 1,
      instituteName: 'TechMaster Academy',
      instituteType: 'coaching-institute',
      description: 'Master modern web development from frontend to backend. Build real-world projects using React, Node.js, and MongoDB. Perfect for beginners and career switchers.',
      level: 'beginner',
      type: 'instructor-led',
      duration: '16 weeks',
      price: 2999,
      rating: 4.8,
      totalStudents: 1250,
      totalLessons: 180,
      totalHours: 240,
      topics: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB', 'REST APIs', 'Git', 'Deployment'],
      instructors: ['John Anderson', 'Sarah Mitchell', 'David Lee'],
      startDate: '2026-02-01',
      prerequisites: ['Basic computer knowledge', 'No coding experience required'],
      learningOutcomes: [
        'Build complete web applications from scratch',
        'Master React and modern JavaScript',
        'Create RESTful APIs with Node.js',
        'Deploy applications to production',
        'Work with databases and authentication'
      ],
      verified: true,
      bestseller: true
    },
    {
      id: 2,
      title: 'Advanced React Performance Optimization',
      instituteId: 2,
      instituteName: 'Sarah Williams',
      instituteType: 'personal-trainer',
      description: 'Deep dive into React performance optimization techniques. Learn advanced patterns, profiling, and best practices for building lightning-fast applications.',
      level: 'advanced',
      type: 'self-paced',
      duration: '6 weeks',
      price: 799,
      rating: 4.9,
      totalStudents: 340,
      totalLessons: 45,
      totalHours: 60,
      topics: ['React Profiler', 'Memoization', 'Code Splitting', 'Lazy Loading', 'Virtual DOM', 'Performance Patterns'],
      instructors: ['Sarah Williams'],
      startDate: '2026-01-15',
      prerequisites: ['Strong React fundamentals', '1+ years React experience', 'Understanding of JavaScript'],
      learningOutcomes: [
        'Identify and fix performance bottlenecks',
        'Master React.memo and useMemo',
        'Implement code splitting strategies',
        'Optimize bundle size',
        'Build high-performance UIs'
      ],
      verified: true,
      bestseller: false
    },
    {
      id: 3,
      title: 'Mobile App Development with React Native',
      instituteId: 3,
      instituteName: 'CodeCraft Institute',
      instituteType: 'coaching-institute',
      description: 'Build native mobile apps for iOS and Android using React Native. Learn navigation, animations, native modules, and app deployment.',
      level: 'intermediate',
      type: 'instructor-led',
      duration: '12 weeks',
      price: 2499,
      rating: 4.7,
      totalStudents: 890,
      totalLessons: 120,
      totalHours: 160,
      topics: ['React Native', 'Expo', 'Navigation', 'Animations', 'Native Modules', 'App Store Deployment'],
      instructors: ['Michael Chen', 'Lisa Park'],
      startDate: '2026-02-15',
      prerequisites: ['JavaScript fundamentals', 'Basic React knowledge'],
      learningOutcomes: [
        'Build cross-platform mobile apps',
        'Implement complex navigation flows',
        'Create smooth animations',
        'Work with device features',
        'Deploy apps to stores'
      ],
      verified: true,
      bestseller: true
    },
    {
      id: 4,
      title: 'Backend Development with Node.js & Express',
      instituteId: 6,
      instituteName: 'Alex Kumar',
      instituteType: 'personal-trainer',
      description: 'Comprehensive course on building scalable backend systems. Learn Node.js, Express, databases, authentication, and API design.',
      level: 'intermediate',
      type: 'hybrid',
      duration: '10 weeks',
      price: 1499,
      rating: 4.8,
      totalStudents: 580,
      totalLessons: 85,
      totalHours: 120,
      topics: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'JWT', 'REST APIs', 'GraphQL', 'Testing'],
      instructors: ['Alex Kumar'],
      startDate: '2026-01-20',
      prerequisites: ['JavaScript fundamentals', 'Basic web development knowledge'],
      learningOutcomes: [
        'Build robust RESTful APIs',
        'Design scalable database schemas',
        'Implement authentication & authorization',
        'Write comprehensive tests',
        'Deploy to cloud platforms'
      ],
      verified: true,
      bestseller: false
    },
    {
      id: 5,
      title: 'Data Structures & Algorithms Masterclass',
      instituteId: 1,
      instituteName: 'TechMaster Academy',
      instituteType: 'coaching-institute',
      description: 'Master essential data structures and algorithms. Perfect preparation for technical interviews at top tech companies.',
      level: 'intermediate',
      type: 'instructor-led',
      duration: '14 weeks',
      price: 1999,
      rating: 4.9,
      totalStudents: 1450,
      totalLessons: 140,
      totalHours: 180,
      topics: ['Arrays', 'Linked Lists', 'Trees', 'Graphs', 'Dynamic Programming', 'Sorting', 'Searching', 'Complexity'],
      instructors: ['John Anderson', 'Emily Rodriguez'],
      startDate: '2026-02-05',
      prerequisites: ['Programming fundamentals in any language'],
      learningOutcomes: [
        'Master core data structures',
        'Solve complex algorithmic problems',
        'Ace technical interviews',
        'Analyze time & space complexity',
        'Implement efficient solutions'
      ],
      verified: true,
      bestseller: true
    },
    {
      id: 6,
      title: 'Cloud Computing with AWS',
      instituteId: 1,
      instituteName: 'TechMaster Academy',
      instituteType: 'coaching-institute',
      description: 'Complete AWS cloud practitioner to solutions architect path. Learn EC2, S3, Lambda, DynamoDB, and more.',
      level: 'beginner',
      type: 'self-paced',
      duration: '8 weeks',
      price: 1299,
      rating: 4.7,
      totalStudents: 720,
      totalLessons: 95,
      totalHours: 110,
      topics: ['EC2', 'S3', 'Lambda', 'DynamoDB', 'CloudFormation', 'IAM', 'VPC', 'CloudWatch'],
      instructors: ['David Lee', 'Rachel Green'],
      startDate: '2026-01-10',
      prerequisites: ['Basic Linux commands', 'Understanding of web applications'],
      learningOutcomes: [
        'Deploy applications on AWS',
        'Design cloud architectures',
        'Implement serverless solutions',
        'Manage cloud security',
        'Pass AWS certifications'
      ],
      verified: true,
      bestseller: false
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesLevel = levelFilter === 'all' || course.level === levelFilter;
    const matchesType = typeFilter === 'all' || course.type === typeFilter;
    const matchesSearch = searchQuery === '' ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      course.instituteName.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesLevel && matchesType && matchesSearch;
  });

  const stats = {
    total: courses.length,
    students: courses.reduce((sum, c) => sum + c.totalStudents, 0),
    avgRating: (courses.reduce((sum, c) => sum + c.rating, 0) / courses.length).toFixed(1),
    bestsellers: courses.filter(c => c.bestseller).length
  };

  if (viewMode === 'details' && selectedCourse) {
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
              {selectedCourse.title}
            </h1>
            <p style={{ color: '#d3d3d3' }}>by {selectedCourse.instituteName}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #FFC300' }}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    {selectedCourse.bestseller && (
                      <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.2)', color: '#FFC300', fontWeight: '600' }}>BESTSELLER</span>
                    )}
                    {selectedCourse.verified && (
                      <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)', color: '#22c55e', fontWeight: '600' }}>VERIFIED</span>
                    )}
                    <span className="px-3 py-1 rounded-full text-xs" style={{ 
                      backgroundColor: 'rgba(255, 195, 0, 0.1)', 
                      color: '#FFC300',
                      textTransform: 'uppercase'
                    }}>
                      {selectedCourse.level}
                    </span>
                  </div>
                  <p style={{ color: '#d3d3d3', fontSize: '1rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                    {selectedCourse.description}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5" style={{ color: '#FFC300', fill: '#FFC300' }} />
                      <span style={{ color: '#FFC300', fontSize: '1.25rem', fontWeight: '700' }}>{selectedCourse.rating}</span>
                      <span style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>({selectedCourse.totalStudents.toLocaleString()} students)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4" style={{ borderTop: '1px solid #6f6f6f' }}>
                <div>
                  <p style={{ color: '#6f6f6f', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Duration</p>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" style={{ color: '#FFC300' }} />
                    <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>{selectedCourse.duration}</p>
                  </div>
                </div>
                <div>
                  <p style={{ color: '#6f6f6f', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Total Lessons</p>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" style={{ color: '#FFC300' }} />
                    <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>{selectedCourse.totalLessons} lessons</p>
                  </div>
                </div>
                <div>
                  <p style={{ color: '#6f6f6f', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Course Type</p>
                  <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600', textTransform: 'capitalize' }}>{selectedCourse.type.replace('-', ' ')}</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #FFC300' }}>
              <h3 className="mb-4" style={{ color: '#FFC300', fontSize: '1.125rem', fontWeight: '600' }}>What You'll Learn</h3>
              <div className="grid grid-cols-2 gap-3">
                {selectedCourse.learningOutcomes.map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#22c55e' }} />
                    <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <h3 className="mb-4" style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>Topics Covered</h3>
              <div className="flex items-center gap-2 flex-wrap">
                {selectedCourse.topics.map((topic, idx) => (
                  <span key={idx} className="px-4 py-2 rounded-full text-sm" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300', border: '1px solid #FFC300' }}>
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <h3 className="mb-4" style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>Prerequisites</h3>
              <ul className="space-y-2">
                {selectedCourse.prerequisites.map((prereq, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full mt-2" style={{ backgroundColor: '#FFC300' }}></div>
                    <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>{prereq}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <h3 className="mb-4" style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>Instructors</h3>
              <div className="space-y-3">
                {selectedCourse.instructors.map((instructor, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 195, 0, 0.2)', color: '#FFC300', fontSize: '1rem', fontWeight: '700' }}>
                      {instructor.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>{instructor}</p>
                      <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>Course Instructor</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #FFC300' }}>
              <div className="mb-6">
                <p style={{ color: '#6f6f6f', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Course Price</p>
                <p style={{ color: '#FFC300', fontSize: '2.5rem', fontWeight: '700' }}>₹{selectedCourse.price.toLocaleString()}</p>
              </div>
              <button
                className="w-full px-6 py-4 rounded-lg transition-colors flex items-center justify-center gap-2 mb-3"
                style={{ backgroundColor: '#FFC300', color: '#023047', fontWeight: '700', fontSize: '1rem' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d3d3d3'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFC300'}
              >
                <Play className="w-5 h-5" />
                Enroll Now
              </button>
              <button
                className="w-full px-6 py-3 rounded-lg transition-colors"
                style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300', border: '1px solid #FFC300' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.1)'}
              >
                Add to Wishlist
              </button>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <h3 className="mb-4" style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>Course Details</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Start Date</span>
                  <span style={{ color: '#FFC300', fontWeight: '600' }}>{new Date(selectedCourse.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Total Hours</span>
                  <span style={{ color: '#FFC300', fontWeight: '600' }}>{selectedCourse.totalHours}h</span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Students Enrolled</span>
                  <span style={{ color: '#FFC300', fontWeight: '600' }}>{selectedCourse.totalStudents.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Certificate</span>
                  <span style={{ color: '#22c55e', fontWeight: '600' }}>Included</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <h3 className="mb-4" style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>Institute Info</h3>
              <p style={{ color: '#FFC300', fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>{selectedCourse.instituteName}</p>
              <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>
                {selectedCourse.instituteType === 'coaching-institute' ? 'Coaching Institute' : 'Personal Trainer'}
              </p>
            </div>

            <button
              onClick={() => setViewMode('list')}
              className="w-full px-6 py-3 rounded-lg transition-colors"
              style={{ backgroundColor: 'rgba(111, 111, 111, 0.3)', color: '#d3d3d3', border: '1px solid #6f6f6f' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(111, 111, 111, 0.5)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(111, 111, 111, 0.3)'}
            >
              Back to Courses
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
          Courses
        </h1>
        <p style={{ color: '#d3d3d3' }}>Browse courses published by institutes and personal trainers with complete details</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="rounded-lg p-4" style={{ backgroundColor: '#023047', border: '1px solid #FFC300' }}>
          <div className="flex items-center justify-between mb-2">
            <BookOpen className="w-5 h-5" style={{ color: '#FFC300' }} />
            <span style={{ color: '#FFC300', fontSize: '1.75rem', fontWeight: '700' }}>{stats.total}</span>
          </div>
          <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Total Courses</p>
        </div>
        <div className="rounded-lg p-4" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
          <div className="flex items-center justify-between mb-2">
            <Users className="w-5 h-5" style={{ color: '#FFC300' }} />
            <span style={{ color: '#FFC300', fontSize: '1.75rem', fontWeight: '700' }}>{stats.students.toLocaleString()}</span>
          </div>
          <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Total Students</p>
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
            <Award className="w-5 h-5" style={{ color: '#FFC300' }} />
            <span style={{ color: '#FFC300', fontSize: '1.75rem', fontWeight: '700' }}>{stats.bestsellers}</span>
          </div>
          <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Bestsellers</p>
        </div>
      </div>

      <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5" style={{ color: '#FFC300' }} />
            <span style={{ color: '#f6f6f6', fontWeight: '600' }}>Filters:</span>
          </div>
          
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value as 'all' | CourseLevel)}
            className="px-4 py-2 rounded-lg outline-none"
            style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as 'all' | CourseType)}
            className="px-4 py-2 rounded-lg outline-none"
            style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
          >
            <option value="all">All Types</option>
            <option value="self-paced">Self-Paced</option>
            <option value="instructor-led">Instructor-Led</option>
            <option value="hybrid">Hybrid</option>
          </select>

          <div className="flex-1"></div>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#6f6f6f' }} />
            <input 
              type="text" 
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg outline-none"
              style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {filteredCourses.map((course) => (
          <div 
            key={course.id}
            onClick={() => { setSelectedCourse(course); setViewMode('details'); }}
            className="rounded-lg p-6 cursor-pointer transition-all" 
            style={{ 
              backgroundColor: '#023047', 
              border: course.bestseller ? '1px solid #FFC300' : '1px solid #6f6f6f'
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#FFC300'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = course.bestseller ? '#FFC300' : '#6f6f6f'}
          >
            <div className="mb-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>{course.title}</h3>
                  <p style={{ color: '#d3d3d3', fontSize: '0.875rem', marginBottom: '0.5rem' }}>by {course.instituteName}</p>
                </div>
                {course.bestseller && (
                  <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.2)', color: '#FFC300', fontWeight: '600' }}>
                    BESTSELLER
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4" style={{ color: '#FFC300', fill: '#FFC300' }} />
                  <span style={{ color: '#FFC300', fontWeight: '600' }}>{course.rating}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>{course.totalStudents.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>{course.duration}</span>
                </div>
              </div>

              <p style={{ color: '#d3d3d3', fontSize: '0.875rem', lineHeight: '1.5', marginBottom: '1rem' }}>
                {course.description.length > 120 ? course.description.substring(0, 120) + '...' : course.description}
              </p>

              <div className="flex items-center gap-1 flex-wrap mb-3">
                {course.topics.slice(0, 4).map((topic, idx) => (
                  <span key={idx} className="px-2 py-1 rounded text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300' }}>
                    {topic}
                  </span>
                ))}
                {course.topics.length > 4 && (
                  <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300' }}>
                    +{course.topics.length - 4} more
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid #6f6f6f' }}>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs" style={{ 
                  backgroundColor: 'rgba(255, 195, 0, 0.1)', 
                  color: '#FFC300',
                  textTransform: 'uppercase'
                }}>
                  {course.level}
                </span>
              </div>
              <div>
                <span style={{ color: '#FFC300', fontSize: '1.5rem', fontWeight: '700' }}>₹{course.price.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p style={{ color: '#6f6f6f', fontSize: '1.125rem' }}>No courses found matching your filters</p>
        </div>
      )}
    </div>
  );
}