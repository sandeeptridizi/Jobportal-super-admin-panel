import { useState } from 'react';
import { 
  ListTodo,
  UserPlus,
  Building2,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  Filter,
  Search,
  PlayCircle,
  XCircle,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Target,
  TrendingUp,
  Award,
  Timer,
  Plus,
  Eye,
  Edit2,
  ArrowLeft,
  Upload,
  Save,
  Send,
  Users,
  Trophy,
  Star,
  BarChart3,
  Activity,
  Zap,
  ArrowUp,
  ArrowDown,
  Shield,
  ShieldCheck,
  FileCheck,
  Sparkles,
  BadgeCheck,
  Building,
  User,
  Rocket,
  DollarSign
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'overdue';
type TaskType = 'user-conversion' | 'company-conversion';
type TaskPriority = 'urgent' | 'high' | 'medium' | 'low';
type ViewMode = 'tasks' | 'user-bgv' | 'company-bgv' | 'quick-recruit' | 'performance-leaderboard';
type QuickRecruitView = 'list' | 'job-details' | 'find-candidates' | 'view-profile' | 'schedule-interview';

interface Task {
  id: number;
  title: string;
  type: TaskType;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  assignedTime: string;
  lead: string;
  contact: string;
  description?: string;
  phone?: string;
  location?: string;
}

export function Tasks() {
  const [activeTab, setActiveTab] = useState<'all' | TaskStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('tasks');
  const [quickRecruitView, setQuickRecruitView] = useState<QuickRecruitView>('list');
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null);

  const allTasks: Task[] = [
    { 
      id: 1, 
      title: 'Contact John Doe (Cold Lead)', 
      type: 'user-conversion', 
      priority: 'high', 
      status: 'in-progress', 
      dueDate: 'Today, 3:00 PM',
      assignedTime: '2 hours ago',
      lead: 'John Doe',
      contact: 'john@email.com',
      phone: '+1 234 567 8900',
      location: 'New York, USA',
      description: 'Potential user interested in software development positions. Previously worked at Google.'
    },
    { 
      id: 2, 
      title: 'Follow up with Tech Solutions Inc', 
      type: 'company-conversion', 
      priority: 'urgent', 
      status: 'pending', 
      dueDate: 'Today, 5:00 PM',
      assignedTime: '1 hour ago',
      lead: 'Tech Solutions Inc',
      contact: 'contact@techsolutions.com',
      phone: '+1 234 567 8901',
      location: 'San Francisco, USA',
      description: 'Tech company looking to post 15+ job openings. Interested in Pro plan.'
    },
    { 
      id: 3, 
      title: 'Verify Sarah Williams profile', 
      type: 'user-conversion', 
      priority: 'medium', 
      status: 'pending', 
      dueDate: 'Tomorrow, 10:00 AM',
      assignedTime: '3 hours ago',
      lead: 'Sarah Williams',
      contact: 'sarah@email.com',
      phone: '+1 234 567 8902',
      location: 'Boston, USA',
      description: 'Senior designer looking for freelance opportunities. Portfolio review needed.'
    },
    { 
      id: 4, 
      title: 'Onboard Design Agency Co', 
      type: 'company-conversion', 
      priority: 'high', 
      status: 'in-progress', 
      dueDate: 'Tomorrow, 2:00 PM',
      assignedTime: '5 hours ago',
      lead: 'Design Agency Co',
      contact: 'hello@designagency.com',
      phone: '+1 234 567 8903',
      location: 'Los Angeles, USA',
      description: 'Design agency with 50+ employees. Looking to hire designers and developers.'
    },
    { 
      id: 5, 
      title: 'Complete Mike Chen documentation', 
      type: 'user-conversion', 
      priority: 'low', 
      status: 'pending', 
      dueDate: 'Dec 15, 2025',
      assignedTime: '1 day ago',
      lead: 'Mike Chen',
      contact: 'mike@email.com',
      phone: '+1 234 567 8904',
      location: 'Seattle, USA',
      description: 'Data scientist seeking remote work opportunities.'
    },
    { 
      id: 6, 
      title: 'Activate Cloud Systems Ltd', 
      type: 'company-conversion', 
      priority: 'urgent', 
      status: 'pending', 
      dueDate: 'Today, 6:00 PM',
      assignedTime: '30 mins ago',
      lead: 'Cloud Systems Ltd',
      contact: 'info@cloudsystems.com',
      phone: '+1 234 567 8905',
      location: 'Austin, USA',
      description: 'Cloud infrastructure company. Needs to post 20+ positions urgently.'
    },
    { 
      id: 7, 
      title: 'Convert Emma Brown profile', 
      type: 'user-conversion', 
      priority: 'medium', 
      status: 'completed', 
      dueDate: 'Dec 12, 2025',
      assignedTime: '2 days ago',
      lead: 'Emma Brown',
      contact: 'emma@email.com',
      phone: '+1 234 567 8906',
      location: 'Chicago, USA',
      description: 'Marketing specialist successfully activated. Now actively applying for jobs.'
    },
    { 
      id: 8, 
      title: 'Review David Lee application', 
      type: 'user-conversion', 
      priority: 'high', 
      status: 'overdue', 
      dueDate: 'Dec 11, 2025',
      assignedTime: '3 days ago',
      lead: 'David Lee',
      contact: 'david@email.com',
      phone: '+1 234 567 8907',
      location: 'Miami, USA',
      description: 'OVERDUE: Profile verification pending. Follow up required immediately.'
    },
    { 
      id: 9, 
      title: 'Onboard Startup Hub Inc', 
      type: 'company-conversion', 
      priority: 'medium', 
      status: 'completed', 
      dueDate: 'Dec 12, 2025',
      assignedTime: '2 days ago',
      lead: 'Startup Hub Inc',
      contact: 'team@startuphub.com',
      phone: '+1 234 567 8908',
      location: 'Denver, USA',
      description: 'Successfully onboarded. Posted 8 job openings. Pro plan activated.'
    },
    { 
      id: 10, 
      title: 'Follow up Analytics Corp', 
      type: 'company-conversion', 
      priority: 'low', 
      status: 'pending', 
      dueDate: 'Dec 16, 2025',
      assignedTime: '1 day ago',
      lead: 'Analytics Corp',
      contact: 'hr@analyticscorp.com',
      phone: '+1 234 567 8909',
      location: 'Portland, USA',
      description: 'Data analytics company. Interested in internship postings.'
    },
  ];

  const filteredTasks = allTasks.filter(task => {
    const matchesTab = activeTab === 'all' || task.status === activeTab;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.lead.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.contact.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const taskCounts = {
    all: allTasks.length,
    pending: allTasks.filter(t => t.status === 'pending').length,
    'in-progress': allTasks.filter(t => t.status === 'in-progress').length,
    completed: allTasks.filter(t => t.status === 'completed').length,
    overdue: allTasks.filter(t => t.status === 'overdue').length,
  };

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case 'urgent': return { bg: 'rgba(255, 0, 0, 0.2)', color: '#ff6b6b', border: '#ff6b6b' };
      case 'high': return { bg: 'rgba(255, 195, 0, 0.2)', color: '#FFC300', border: '#FFC300' };
      case 'medium': return { bg: 'rgba(111, 111, 111, 0.2)', color: '#d3d3d3', border: '#6f6f6f' };
      case 'low': return { bg: 'rgba(211, 211, 211, 0.1)', color: '#6f6f6f', border: '#6f6f6f' };
    }
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case 'completed': return { bg: 'rgba(255, 195, 0, 0.2)', color: '#FFC300', border: '#FFC300' };
      case 'in-progress': return { bg: 'rgba(255, 195, 0, 0.15)', color: '#FFC300', border: '#FFC300' };
      case 'pending': return { bg: 'rgba(211, 211, 211, 0.2)', color: '#d3d3d3', border: '#6f6f6f' };
      case 'overdue': return { bg: 'rgba(255, 0, 0, 0.2)', color: '#ff6b6b', border: '#ff6b6b' };
    }
  };

  // Render User BGV View
  if (viewMode === 'user-bgv') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setViewMode('tasks')}
            className="p-2 rounded-lg transition-colors"
            style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', border: '1px solid #FFC300' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.1)'}
          >
            <ArrowLeft className="w-5 h-5" style={{ color: '#FFC300' }} />
          </button>
          <div>
            <h1 style={{ color: '#FFC300', fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.02em', textShadow: '0 0 30px rgba(255, 195, 0, 0.3), 0 0 60px rgba(255, 195, 0, 0.2)' }}>
              User Background Verification
            </h1>
            <p style={{ color: '#d3d3d3' }}>Verify user credentials and mark as verified member</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <h3 className="mb-4" style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>User Details</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>Full Name *</label>
                    <input type="text" placeholder="John Doe" className="w-full p-3 rounded-lg outline-none" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f', color: '#f6f6f6' }} />
                  </div>
                  <div>
                    <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>Email Address *</label>
                    <input type="email" placeholder="john.doe@email.com" className="w-full p-3 rounded-lg outline-none" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f', color: '#f6f6f6' }} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>Phone Number *</label>
                    <input type="tel" placeholder="+1 234 567 8900" className="w-full p-3 rounded-lg outline-none" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f', color: '#f6f6f6' }} />
                  </div>
                  <div>
                    <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>Date of Birth</label>
                    <input type="date" className="w-full p-3 rounded-lg outline-none" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f', color: '#f6f6f6' }} />
                  </div>
                </div>
                <div>
                  <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>Current Location *</label>
                  <input type="text" placeholder="New York, USA" className="w-full p-3 rounded-lg outline-none" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f', color: '#f6f6f6' }} />
                </div>
              </div>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <h3 className="mb-4" style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>Uploaded Documents - Review & Verify</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f' }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <FileCheck className="w-5 h-5" style={{ color: '#FFC300' }} />
                      <div>
                        <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>Government ID (Passport)</p>
                        <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>passport_john_doe.pdf • 2.3 MB • Uploaded Dec 10, 2024</p>
                      </div>
                    </div>
                    <CheckCircle className="w-5 h-5" style={{ color: '#6f6f6f' }} />
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      className="px-4 py-2 rounded-lg transition-colors"
                      style={{ backgroundColor: '#FFC300', color: '#023047', fontWeight: '600', fontSize: '0.875rem' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d3d3d3'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFC300'}
                    >
                      View Document
                    </button>
                    <button 
                      className="flex-1 px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                      style={{ backgroundColor: 'rgba(255, 195, 0, 0.2)', color: '#FFC300', border: '1px solid #FFC300', fontSize: '0.875rem', fontWeight: '600' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.3)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.2)'}
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark as Verified
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f' }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <FileCheck className="w-5 h-5" style={{ color: '#FFC300' }} />
                      <div>
                        <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>Address Proof (Utility Bill)</p>
                        <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>utility_bill_nov_2024.pdf • 1.8 MB • Uploaded Dec 10, 2024</p>
                      </div>
                    </div>
                    <CheckCircle className="w-5 h-5" style={{ color: '#6f6f6f' }} />
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      className="px-4 py-2 rounded-lg transition-colors"
                      style={{ backgroundColor: '#FFC300', color: '#023047', fontWeight: '600', fontSize: '0.875rem' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d3d3d3'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFC300'}
                    >
                      View Document
                    </button>
                    <button 
                      className="flex-1 px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                      style={{ backgroundColor: 'rgba(255, 195, 0, 0.2)', color: '#FFC300', border: '1px solid #FFC300', fontSize: '0.875rem', fontWeight: '600' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.3)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.2)'}
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark as Verified
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f' }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <FileCheck className="w-5 h-5" style={{ color: '#FFC300' }} />
                      <div>
                        <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>Educational Certificate (Degree)</p>
                        <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>degree_computer_science.pdf • 3.1 MB • Uploaded Dec 10, 2024</p>
                      </div>
                    </div>
                    <CheckCircle className="w-5 h-5" style={{ color: '#6f6f6f' }} />
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      className="px-4 py-2 rounded-lg transition-colors"
                      style={{ backgroundColor: '#FFC300', color: '#023047', fontWeight: '600', fontSize: '0.875rem' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d3d3d3'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFC300'}
                    >
                      View Document
                    </button>
                    <button 
                      className="flex-1 px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                      style={{ backgroundColor: 'rgba(255, 195, 0, 0.2)', color: '#FFC300', border: '1px solid #FFC300', fontSize: '0.875rem', fontWeight: '600' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.3)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.2)'}
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark as Verified
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f' }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <FileCheck className="w-5 h-5" style={{ color: '#FFC300' }} />
                      <div>
                        <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>Employment Letter (Google Inc.)</p>
                        <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>experience_letter_google.pdf • 1.2 MB • Uploaded Dec 10, 2024</p>
                      </div>
                    </div>
                    <CheckCircle className="w-5 h-5" style={{ color: '#6f6f6f' }} />
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      className="px-4 py-2 rounded-lg transition-colors"
                      style={{ backgroundColor: '#FFC300', color: '#023047', fontWeight: '600', fontSize: '0.875rem' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d3d3d3'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFC300'}
                    >
                      View Document
                    </button>
                    <button 
                      className="flex-1 px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                      style={{ backgroundColor: 'rgba(255, 195, 0, 0.2)', color: '#FFC300', border: '1px solid #FFC300', fontSize: '0.875rem', fontWeight: '600' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.3)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.2)'}
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark as Verified
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <h3 className="mb-4" style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>Verification Notes</h3>
              <div className="space-y-4">
                <div>
                  <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>Verification Status</label>
                  <select className="w-full p-3 rounded-lg outline-none" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f', color: '#f6f6f6' }}>
                    <option>Pending Verification</option>
                    <option>Under Review</option>
                    <option>Verified</option>
                    <option>Rejected</option>
                  </select>
                </div>
                <div>
                  <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>Internal Notes</label>
                  <textarea placeholder="Add verification notes, findings, or concerns..." rows={4} className="w-full p-3 rounded-lg outline-none" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f', color: '#f6f6f6' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #FFC300' }}>
              <h3 className="mb-4" style={{ color: '#FFC300', fontSize: '1.125rem', fontWeight: '600' }}>Verification Checklist</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5" style={{ color: '#6f6f6f' }} />
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Identity verified</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5" style={{ color: '#6f6f6f' }} />
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Address confirmed</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5" style={{ color: '#6f6f6f' }} />
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Education validated</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5" style={{ color: '#6f6f6f' }} />
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Employment verified</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5" style={{ color: '#6f6f6f' }} />
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Background check clear</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <h3 className="mb-4" style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>BGV Stats Today</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Completed</span>
                  <span style={{ color: '#FFC300', fontSize: '1.25rem', fontWeight: '700' }}>8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>In Progress</span>
                  <span style={{ color: '#FFC300', fontSize: '1.25rem', fontWeight: '700' }}>3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Success Rate</span>
                  <span style={{ color: '#FFC300', fontSize: '1.25rem', fontWeight: '700' }}>96%</span>
                </div>
              </div>
            </div>

            <button
              className="w-full px-6 py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              style={{ backgroundColor: '#FFC300', color: '#023047', fontWeight: '700', fontSize: '1rem' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d3d3d3'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFC300'}
            >
              <ShieldCheck className="w-5 h-5" />
              Mark as Verified
            </button>
            <button
              className="w-full px-6 py-3 rounded-lg transition-colors"
              style={{ backgroundColor: 'rgba(111, 111, 111, 0.3)', color: '#d3d3d3', border: '1px solid #6f6f6f' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(111, 111, 111, 0.5)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(111, 111, 111, 0.3)'}
              onClick={() => setViewMode('tasks')}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render Company BGV View
  if (viewMode === 'company-bgv') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setViewMode('tasks')}
            className="p-2 rounded-lg transition-colors"
            style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', border: '1px solid #FFC300' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.1)'}
          >
            <ArrowLeft className="w-5 h-5" style={{ color: '#FFC300' }} />
          </button>
          <div>
            <h1 style={{ color: '#FFC300', fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.02em', textShadow: '0 0 30px rgba(255, 195, 0, 0.3), 0 0 60px rgba(255, 195, 0, 0.2)' }}>
              Company Background Verification
            </h1>
            <p style={{ color: '#d3d3d3' }}>Verify company credentials and mark as verified organization</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <h3 className="mb-4" style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>Company Information</h3>
              <div className="space-y-4">
                <div>
                  <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>Company Name *</label>
                  <input type="text" placeholder="Tech Solutions Inc" className="w-full p-3 rounded-lg outline-none" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f', color: '#f6f6f6' }} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>Registration Number *</label>
                    <input type="text" placeholder="REG123456789" className="w-full p-3 rounded-lg outline-none" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f', color: '#f6f6f6' }} />
                  </div>
                  <div>
                    <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>Tax ID / EIN</label>
                    <input type="text" placeholder="12-3456789" className="w-full p-3 rounded-lg outline-none" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f', color: '#f6f6f6' }} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>Industry *</label>
                    <select className="w-full p-3 rounded-lg outline-none" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f', color: '#f6f6f6' }}>
                      <option>Technology</option>
                      <option>Healthcare</option>
                      <option>Finance</option>
                      <option>Education</option>
                      <option>Retail</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>Year Established</label>
                    <input type="number" placeholder="2010" className="w-full p-3 rounded-lg outline-none" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f', color: '#f6f6f6' }} />
                  </div>
                </div>
                <div>
                  <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>Registered Address *</label>
                  <input type="text" placeholder="123 Business St, San Francisco, CA 94102" className="w-full p-3 rounded-lg outline-none" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f', color: '#f6f6f6' }} />
                </div>
                <div>
                  <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>Website URL</label>
                  <input type="url" placeholder="https://techsolutions.com" className="w-full p-3 rounded-lg outline-none" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f', color: '#f6f6f6' }} />
                </div>
              </div>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <h3 className="mb-4" style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>Company Registration Details - Review & Verify</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f' }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <FileCheck className="w-5 h-5" style={{ color: '#FFC300' }} />
                      <div>
                        <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>Business Registration Number</p>
                        <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>REG-2024-SF-123456 • Registered: Jan 15, 2024</p>
                      </div>
                    </div>
                    <CheckCircle className="w-5 h-5" style={{ color: '#6f6f6f' }} />
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      className="px-4 py-2 rounded-lg transition-colors"
                      style={{ backgroundColor: '#FFC300', color: '#023047', fontWeight: '600', fontSize: '0.875rem' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d3d3d3'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFC300'}
                    >
                      View Details
                    </button>
                    <button 
                      className="flex-1 px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                      style={{ backgroundColor: 'rgba(255, 195, 0, 0.2)', color: '#FFC300', border: '1px solid #FFC300', fontSize: '0.875rem', fontWeight: '600' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.3)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.2)'}
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark as Verified
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f' }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <FileCheck className="w-5 h-5" style={{ color: '#FFC300' }} />
                      <div>
                        <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>Tax ID / EIN Number</p>
                        <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>EIN: 12-3456789 • Tax Registration: Active</p>
                      </div>
                    </div>
                    <CheckCircle className="w-5 h-5" style={{ color: '#6f6f6f' }} />
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      className="px-4 py-2 rounded-lg transition-colors"
                      style={{ backgroundColor: '#FFC300', color: '#023047', fontWeight: '600', fontSize: '0.875rem' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d3d3d3'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFC300'}
                    >
                      View Details
                    </button>
                    <button 
                      className="flex-1 px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                      style={{ backgroundColor: 'rgba(255, 195, 0, 0.2)', color: '#FFC300', border: '1px solid #FFC300', fontSize: '0.875rem', fontWeight: '600' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.3)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.2)'}
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark as Verified
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f' }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <FileCheck className="w-5 h-5" style={{ color: '#FFC300' }} />
                      <div>
                        <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>Business License Number</p>
                        <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>LIC-CA-2024-789012 • Valid Until: Dec 31, 2025</p>
                      </div>
                    </div>
                    <CheckCircle className="w-5 h-5" style={{ color: '#6f6f6f' }} />
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      className="px-4 py-2 rounded-lg transition-colors"
                      style={{ backgroundColor: '#FFC300', color: '#023047', fontWeight: '600', fontSize: '0.875rem' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d3d3d3'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFC300'}
                    >
                      View Details
                    </button>
                    <button 
                      className="flex-1 px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                      style={{ backgroundColor: 'rgba(255, 195, 0, 0.2)', color: '#FFC300', border: '1px solid #FFC300', fontSize: '0.875rem', fontWeight: '600' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.3)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.2)'}
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark as Verified
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f' }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <FileCheck className="w-5 h-5" style={{ color: '#FFC300' }} />
                      <div>
                        <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>GST/VAT Registration</p>
                        <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>GST: 29ABCDE1234F1Z5 • Status: Active</p>
                      </div>
                    </div>
                    <CheckCircle className="w-5 h-5" style={{ color: '#6f6f6f' }} />
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      className="px-4 py-2 rounded-lg transition-colors"
                      style={{ backgroundColor: '#FFC300', color: '#023047', fontWeight: '600', fontSize: '0.875rem' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d3d3d3'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFC300'}
                    >
                      View Details
                    </button>
                    <button 
                      className="flex-1 px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                      style={{ backgroundColor: 'rgba(255, 195, 0, 0.2)', color: '#FFC300', border: '1px solid #FFC300', fontSize: '0.875rem', fontWeight: '600' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.3)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.2)'}
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark as Verified
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f' }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5" style={{ color: '#FFC300' }} />
                      <div>
                        <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>Registered Office Address</p>
                        <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>123 Business St, San Francisco, CA 94102 • Verified Location</p>
                      </div>
                    </div>
                    <CheckCircle className="w-5 h-5" style={{ color: '#6f6f6f' }} />
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      className="px-4 py-2 rounded-lg transition-colors"
                      style={{ backgroundColor: '#FFC300', color: '#023047', fontWeight: '600', fontSize: '0.875rem' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d3d3d3'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFC300'}
                    >
                      View Details
                    </button>
                    <button 
                      className="flex-1 px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                      style={{ backgroundColor: 'rgba(255, 195, 0, 0.2)', color: '#FFC300', border: '1px solid #FFC300', fontSize: '0.875rem', fontWeight: '600' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.3)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.2)'}
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark as Verified
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f' }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Building className="w-5 h-5" style={{ color: '#FFC300' }} />
                      <div>
                        <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>Company Website</p>
                        <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>https://techsolutions.com • Domain Active Since: 2020</p>
                      </div>
                    </div>
                    <CheckCircle className="w-5 h-5" style={{ color: '#6f6f6f' }} />
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      className="px-4 py-2 rounded-lg transition-colors"
                      style={{ backgroundColor: '#FFC300', color: '#023047', fontWeight: '600', fontSize: '0.875rem' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d3d3d3'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFC300'}
                    >
                      View Details
                    </button>
                    <button 
                      className="flex-1 px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                      style={{ backgroundColor: 'rgba(255, 195, 0, 0.2)', color: '#FFC300', border: '1px solid #FFC300', fontSize: '0.875rem', fontWeight: '600' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.3)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.2)'}
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark as Verified
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f' }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5" style={{ color: '#FFC300' }} />
                      <div>
                        <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>Authorized Contact Person</p>
                        <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>Jane Smith - HR Manager • jane@techsolutions.com</p>
                      </div>
                    </div>
                    <CheckCircle className="w-5 h-5" style={{ color: '#6f6f6f' }} />
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      className="px-4 py-2 rounded-lg transition-colors"
                      style={{ backgroundColor: '#FFC300', color: '#023047', fontWeight: '600', fontSize: '0.875rem' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d3d3d3'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFC300'}
                    >
                      View Details
                    </button>
                    <button 
                      className="flex-1 px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                      style={{ backgroundColor: 'rgba(255, 195, 0, 0.2)', color: '#FFC300', border: '1px solid #FFC300', fontSize: '0.875rem', fontWeight: '600' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.3)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.2)'}
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark as Verified
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f' }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5" style={{ color: '#FFC300' }} />
                      <div>
                        <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>Founder Profile</p>
                        <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>John Anderson - CEO & Founder • 15 years experience</p>
                      </div>
                    </div>
                    <CheckCircle className="w-5 h-5" style={{ color: '#6f6f6f' }} />
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      className="px-4 py-2 rounded-lg transition-colors"
                      style={{ backgroundColor: '#FFC300', color: '#023047', fontWeight: '600', fontSize: '0.875rem' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d3d3d3'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFC300'}
                    >
                      View Details
                    </button>
                    <button 
                      className="flex-1 px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                      style={{ backgroundColor: 'rgba(255, 195, 0, 0.2)', color: '#FFC300', border: '1px solid #FFC300', fontSize: '0.875rem', fontWeight: '600' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.3)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.2)'}
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark as Verified
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f' }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Building2 className="w-5 h-5" style={{ color: '#FFC300' }} />
                      <div>
                        <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>LinkedIn Company Profile</p>
                        <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>linkedin.com/company/techsolutions • 5,000+ followers</p>
                      </div>
                    </div>
                    <CheckCircle className="w-5 h-5" style={{ color: '#6f6f6f' }} />
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      className="px-4 py-2 rounded-lg transition-colors"
                      style={{ backgroundColor: '#FFC300', color: '#023047', fontWeight: '600', fontSize: '0.875rem' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d3d3d3'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFC300'}
                    >
                      View Details
                    </button>
                    <button 
                      className="flex-1 px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                      style={{ backgroundColor: 'rgba(255, 195, 0, 0.2)', color: '#FFC300', border: '1px solid #FFC300', fontSize: '0.875rem', fontWeight: '600' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.3)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.2)'}
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark as Verified
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f' }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5" style={{ color: '#FFC300' }} />
                      <div>
                        <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>LinkedIn Employee Count</p>
                        <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>52 employees on LinkedIn • Claimed: 50-100 employees</p>
                      </div>
                    </div>
                    <CheckCircle className="w-5 h-5" style={{ color: '#6f6f6f' }} />
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      className="px-4 py-2 rounded-lg transition-colors"
                      style={{ backgroundColor: '#FFC300', color: '#023047', fontWeight: '600', fontSize: '0.875rem' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d3d3d3'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFC300'}
                    >
                      View Details
                    </button>
                    <button 
                      className="flex-1 px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                      style={{ backgroundColor: 'rgba(255, 195, 0, 0.2)', color: '#FFC300', border: '1px solid #FFC300', fontSize: '0.875rem', fontWeight: '600' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.3)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.2)'}
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark as Verified
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <h3 className="mb-4" style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>Additional Information</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>Contact Name *</label>
                    <input type="text" placeholder="Jane Smith" className="w-full p-3 rounded-lg outline-none" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f', color: '#f6f6f6' }} />
                  </div>
                  <div>
                    <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>Designation</label>
                    <input type="text" placeholder="HR Manager" className="w-full p-3 rounded-lg outline-none" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f', color: '#f6f6f6' }} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>Email *</label>
                    <input type="email" placeholder="jane@techsolutions.com" className="w-full p-3 rounded-lg outline-none" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f', color: '#f6f6f6' }} />
                  </div>
                  <div>
                    <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>Phone *</label>
                    <input type="tel" placeholder="+1 234 567 8900" className="w-full p-3 rounded-lg outline-none" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f', color: '#f6f6f6' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <h3 className="mb-4" style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>Verification Status & Notes</h3>
              <div className="space-y-4">
                <div>
                  <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>Verification Status</label>
                  <select className="w-full p-3 rounded-lg outline-none" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f', color: '#f6f6f6' }}>
                    <option>Pending Verification</option>
                    <option>Document Review</option>
                    <option>Verified</option>
                    <option>Rejected</option>
                  </select>
                </div>
                <div>
                  <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>Internal Notes</label>
                  <textarea placeholder="Add verification notes, findings, concerns..." rows={4} className="w-full p-3 rounded-lg outline-none" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f', color: '#f6f6f6' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #FFC300' }}>
              <h3 className="mb-4" style={{ color: '#FFC300', fontSize: '1.125rem', fontWeight: '600' }}>Verification Checklist</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5" style={{ color: '#6f6f6f' }} />
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Registration verified</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5" style={{ color: '#6f6f6f' }} />
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Tax documents validated</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5" style={{ color: '#6f6f6f' }} />
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Business license confirmed</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5" style={{ color: '#6f6f6f' }} />
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Address verified</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5" style={{ color: '#6f6f6f' }} />
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Contact person validated</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5" style={{ color: '#6f6f6f' }} />
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Background check clear</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <h3 className="mb-4" style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>Company BGV Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Verified Today</span>
                  <span style={{ color: '#FFC300', fontSize: '1.25rem', fontWeight: '700' }}>5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>In Review</span>
                  <span style={{ color: '#FFC300', fontSize: '1.25rem', fontWeight: '700' }}>2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Success Rate</span>
                  <span style={{ color: '#FFC300', fontSize: '1.25rem', fontWeight: '700' }}>98%</span>
                </div>
              </div>
            </div>

            <button
              className="w-full px-6 py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              style={{ backgroundColor: '#FFC300', color: '#023047', fontWeight: '700', fontSize: '1rem' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d3d3d3'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFC300'}
            >
              <BadgeCheck className="w-5 h-5" />
              Mark Company as Verified
            </button>
            <button
              className="w-full px-6 py-3 rounded-lg transition-colors"
              style={{ backgroundColor: 'rgba(111, 111, 111, 0.3)', color: '#d3d3d3', border: '1px solid #6f6f6f' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(111, 111, 111, 0.5)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(111, 111, 111, 0.3)'}
              onClick={() => setViewMode('tasks')}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render Quick Recruit View
  if (viewMode === 'quick-recruit') {
    // Job Details View
    if (quickRecruitView === 'job-details') {
      return (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuickRecruitView('list')}
              className="p-2 rounded-lg transition-colors"
              style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', border: '1px solid #FFC300' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.2)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.1)'}
            >
              <ArrowLeft className="w-5 h-5" style={{ color: '#FFC300' }} />
            </button>
            <div>
              <h1 style={{ color: '#FFC300', fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.02em', textShadow: '0 0 30px rgba(255, 195, 0, 0.3), 0 0 60px rgba(255, 195, 0, 0.2)' }}>
                Senior Full Stack Developer
              </h1>
              <p style={{ color: '#d3d3d3' }}>TechCorp Solutions • San Francisco, CA</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              {/* Job Overview */}
              <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #FFC300' }}>
                <h3 className="mb-4" style={{ color: '#FFC300', fontSize: '1.125rem', fontWeight: '600' }}>Job Overview</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p style={{ color: '#6f6f6f', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Experience Level</p>
                    <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>Senior Level (6-10 years)</p>
                  </div>
                  <div>
                    <p style={{ color: '#6f6f6f', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Employment Type</p>
                    <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>Full-time</p>
                  </div>
                  <div>
                    <p style={{ color: '#6f6f6f', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Salary Range</p>
                    <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>$120,000 - $160,000/year</p>
                  </div>
                  <div>
                    <p style={{ color: '#6f6f6f', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Work Location</p>
                    <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>Hybrid (3 days on-site)</p>
                  </div>
                  <div>
                    <p style={{ color: '#6f6f6f', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Positions</p>
                    <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>2 openings</p>
                  </div>
                  <div>
                    <p style={{ color: '#6f6f6f', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Urgency</p>
                    <p style={{ color: '#FFC300', fontSize: '0.875rem', fontWeight: '600' }}>Critical (1-2 days)</p>
                  </div>
                </div>
                <div className="mb-4">
                  <p style={{ color: '#6f6f6f', fontSize: '0.75rem', marginBottom: '0.5rem' }}>Required Skills</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300', border: '1px solid #FFC300' }}>React</span>
                    <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300', border: '1px solid #FFC300' }}>Node.js</span>
                    <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300', border: '1px solid #FFC300' }}>TypeScript</span>
                    <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300', border: '1px solid #FFC300' }}>AWS</span>
                    <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300', border: '1px solid #FFC300' }}>PostgreSQL</span>
                    <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300', border: '1px solid #FFC300' }}>Docker</span>
                  </div>
                </div>
                <div>
                  <p style={{ color: '#6f6f6f', fontSize: '0.75rem', marginBottom: '0.5rem' }}>Job Description</p>
                  <p style={{ color: '#d3d3d3', fontSize: '0.875rem', lineHeight: '1.6' }}>
                    We are seeking an experienced Full Stack Developer to join our growing engineering team. The ideal candidate will have strong expertise in React and Node.js, with a proven track record of building scalable web applications. You will work closely with product managers and designers to create innovative solutions that enhance user experience.
                  </p>
                </div>
              </div>

              {/* Interview Rounds */}
              <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #FFC300' }}>
                <h3 className="mb-4 flex items-center gap-2" style={{ color: '#FFC300', fontSize: '1.125rem', fontWeight: '600' }}>
                  <Target className="w-5 h-5" />
                  Interview Rounds (4 Rounds)
                </h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #FFC300' }}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FFC300', color: '#023047', fontWeight: '700' }}>1</div>
                      <div className="flex-1">
                        <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>Technical Screening</p>
                        <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>45 minutes • Video Call</p>
                      </div>
                      <CheckCircle className="w-5 h-5" style={{ color: '#FFC300' }} />
                    </div>
                    <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Assessment of technical fundamentals, JavaScript/TypeScript knowledge, and problem-solving approach</p>
                  </div>
                  <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f' }}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FFC300', color: '#023047', fontWeight: '700' }}>2</div>
                      <div className="flex-1">
                        <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>System Design Round</p>
                        <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>60 minutes • Video Call</p>
                      </div>
                      <CheckCircle className="w-5 h-5" style={{ color: '#6f6f6f' }} />
                    </div>
                    <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Design a scalable system - Focus on architecture, database design, and API structure</p>
                  </div>
                  <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f' }}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FFC300', color: '#023047', fontWeight: '700' }}>3</div>
                      <div className="flex-1">
                        <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>Live Coding Challenge</p>
                        <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>90 minutes • Video Call with screen share</p>
                      </div>
                      <CheckCircle className="w-5 h-5" style={{ color: '#6f6f6f' }} />
                    </div>
                    <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Build a feature using React & Node.js - Real-time collaboration and code review</p>
                  </div>
                  <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f' }}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FFC300', color: '#023047', fontWeight: '700' }}>4</div>
                      <div className="flex-1">
                        <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>HR & Culture Fit</p>
                        <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>30 minutes • Video Call</p>
                      </div>
                      <CheckCircle className="w-5 h-5" style={{ color: '#6f6f6f' }} />
                    </div>
                    <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Discussion about expectations, team culture, benefits, and career growth</p>
                  </div>
                </div>
              </div>

              {/* Company Requirements */}
              <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
                <h3 className="mb-4" style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>Special Requirements</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5" style={{ color: '#FFC300' }} />
                    <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Background verification required</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5" style={{ color: '#FFC300' }} />
                    <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Must be willing to relocate to San Francisco</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5" style={{ color: '#FFC300' }} />
                    <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Start date: Within 30 days</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #FFC300' }}>
                <h3 className="mb-4" style={{ color: '#FFC300', fontSize: '1.125rem', fontWeight: '600' }}>Company Info</h3>
                <div className="space-y-3">
                  <div>
                    <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>Company</p>
                    <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>TechCorp Solutions</p>
                  </div>
                  <div>
                    <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>Industry</p>
                    <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>Technology</p>
                  </div>
                  <div>
                    <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>Company Size</p>
                    <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>201-500 employees</p>
                  </div>
                  <div>
                    <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>Contact Person</p>
                    <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>Jane Smith</p>
                    <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>HR Manager</p>
                  </div>
                  <div>
                    <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>Email</p>
                    <p style={{ color: '#f6f6f6', fontSize: '0.875rem' }}>jane@techcorp.com</p>
                  </div>
                  <div>
                    <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>Phone</p>
                    <p style={{ color: '#f6f6f6', fontSize: '0.875rem' }}>+1 234 567 8900</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
                <h3 className="mb-4" style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>Progress</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Overall Progress</p>
                      <p style={{ color: '#FFC300', fontSize: '0.875rem', fontWeight: '600' }}>10%</p>
                    </div>
                    <div className="w-full h-2 rounded-full" style={{ backgroundColor: 'rgba(111, 111, 111, 0.3)' }}>
                      <div className="h-full rounded-full" style={{ width: '10%', backgroundColor: '#FFC300' }}></div>
                    </div>
                  </div>
                  <div className="pt-3" style={{ borderTop: '1px solid #6f6f6f' }}>
                    <div className="flex items-center justify-between mb-2">
                      <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Candidates Matched</span>
                      <span style={{ color: '#FFC300', fontWeight: '600' }}>0</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>In Interview</span>
                      <span style={{ color: '#FFC300', fontWeight: '600' }}>0</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Offers Made</span>
                      <span style={{ color: '#FFC300', fontWeight: '600' }}>0</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => { setQuickRecruitView('find-candidates'); setSelectedJobId(1); }}
                className="w-full px-6 py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                style={{ backgroundColor: '#FFC300', color: '#023047', fontWeight: '700', fontSize: '1rem' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d3d3d3'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFC300'}
              >
                <Search className="w-5 h-5" />
                Find Candidates
              </button>
            </div>
          </div>
        </div>
      );
    }

    // View Profile View
    if (quickRecruitView === 'view-profile') {
      return (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuickRecruitView('find-candidates')}
              className="p-2 rounded-lg transition-colors"
              style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', border: '1px solid #FFC300' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.2)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.1)'}
            >
              <ArrowLeft className="w-5 h-5" style={{ color: '#FFC300' }} />
            </button>
            <div>
              <h1 style={{ color: '#FFC300', fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.02em', textShadow: '0 0 30px rgba(255, 195, 0, 0.3), 0 0 60px rgba(255, 195, 0, 0.2)' }}>
                Candidate Profile
              </h1>
              <p style={{ color: '#d3d3d3' }}>Alex Martinez • Senior Full Stack Developer</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              {/* Profile Overview */}
              <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #FFC300' }}>
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-24 h-24 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(255, 195, 0, 0.2)', color: '#FFC300', fontSize: '2.5rem', fontWeight: '700' }}>
                    AM
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h2 style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>Alex Martinez</h2>
                      <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)', color: '#22c55e', fontWeight: '600' }}>VERIFIED</span>
                      <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.2)', color: '#FFC300', fontWeight: '600' }}>98% MATCH</span>
                    </div>
                    <p style={{ color: '#d3d3d3', fontSize: '1.125rem', marginBottom: '1rem' }}>Senior Full Stack Developer</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                        <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>San Francisco, CA</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                        <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>alex.martinez@email.com</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                        <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>+1 (555) 123-4567</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                        <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>$130K expected salary</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-4" style={{ borderTop: '1px solid #6f6f6f' }}>
                  <p style={{ color: '#d3d3d3', fontSize: '0.875rem', lineHeight: '1.6' }}>
                    Passionate full-stack developer with 8 years of experience building scalable web applications. Expertise in modern JavaScript frameworks and cloud infrastructure. Led development teams and mentored junior developers. Strong focus on code quality, testing, and user experience.
                  </p>
                </div>
              </div>

              {/* Skills */}
              <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #FFC300' }}>
                <h3 className="mb-4" style={{ color: '#FFC300', fontSize: '1.125rem', fontWeight: '600' }}>Technical Skills</h3>
                <div className="space-y-4">
                  <div>
                    <p style={{ color: '#d3d3d3', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Frontend</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300', border: '1px solid #FFC300' }}>React</span>
                      <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300', border: '1px solid #FFC300' }}>TypeScript</span>
                      <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300', border: '1px solid #FFC300' }}>Next.js</span>
                      <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300', border: '1px solid #FFC300' }}>Tailwind CSS</span>
                      <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300', border: '1px solid #FFC300' }}>Redux</span>
                    </div>
                  </div>
                  <div>
                    <p style={{ color: '#d3d3d3', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Backend</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300', border: '1px solid #FFC300' }}>Node.js</span>
                      <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300', border: '1px solid #FFC300' }}>Express</span>
                      <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300', border: '1px solid #FFC300' }}>PostgreSQL</span>
                      <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300', border: '1px solid #FFC300' }}>MongoDB</span>
                      <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300', border: '1px solid #FFC300' }}>GraphQL</span>
                    </div>
                  </div>
                  <div>
                    <p style={{ color: '#d3d3d3', fontSize: '0.875rem', marginBottom: '0.5rem' }}>DevOps & Cloud</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300', border: '1px solid #FFC300' }}>AWS</span>
                      <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300', border: '1px solid #FFC300' }}>Docker</span>
                      <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300', border: '1px solid #FFC300' }}>CI/CD</span>
                      <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300', border: '1px solid #FFC300' }}>Git</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Work Experience */}
              <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
                <h3 className="mb-4" style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>Work Experience</h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f' }}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p style={{ color: '#f6f6f6', fontSize: '1rem', fontWeight: '600' }}>Senior Software Engineer</p>
                        <p style={{ color: '#FFC300', fontSize: '0.875rem' }}>Tech Innovations Inc.</p>
                      </div>
                      <p style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>2020 - Present</p>
                    </div>
                    <p style={{ color: '#d3d3d3', fontSize: '0.875rem', lineHeight: '1.5' }}>
                      Led development of customer-facing SaaS platform using React and Node.js. Managed team of 5 developers. Improved application performance by 40% and reduced load times by 60%.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f' }}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p style={{ color: '#f6f6f6', fontSize: '1rem', fontWeight: '600' }}>Full Stack Developer</p>
                        <p style={{ color: '#FFC300', fontSize: '0.875rem' }}>StartupXYZ</p>
                      </div>
                      <p style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>2018 - 2020</p>
                    </div>
                    <p style={{ color: '#d3d3d3', fontSize: '0.875rem', lineHeight: '1.5' }}>
                      Built and maintained e-commerce platform. Implemented payment gateway integrations and inventory management system. Contributed to 200% revenue growth.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f' }}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p style={{ color: '#f6f6f6', fontSize: '1rem', fontWeight: '600' }}>Software Developer</p>
                        <p style={{ color: '#FFC300', fontSize: '0.875rem' }}>Digital Solutions Ltd.</p>
                      </div>
                      <p style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>2016 - 2018</p>
                    </div>
                    <p style={{ color: '#d3d3d3', fontSize: '0.875rem', lineHeight: '1.5' }}>
                      Developed web applications for enterprise clients. Worked with agile methodologies and participated in code reviews.
                    </p>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
                <h3 className="mb-4" style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>Education</h3>
                <div className="space-y-3">
                  <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f' }}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p style={{ color: '#f6f6f6', fontSize: '1rem', fontWeight: '600' }}>Bachelor of Science in Computer Science</p>
                        <p style={{ color: '#FFC300', fontSize: '0.875rem' }}>Stanford University</p>
                      </div>
                      <p style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>2012 - 2016</p>
                    </div>
                    <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>GPA: 3.8/4.0 • Dean's List</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #FFC300' }}>
                <h3 className="mb-4" style={{ color: '#FFC300', fontSize: '1.125rem', fontWeight: '600' }}>Profile Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Profile Score</span>
                    <span style={{ color: '#FFC300', fontSize: '1.25rem', fontWeight: '700' }}>95/100</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Match Score</span>
                    <span style={{ color: '#FFC300', fontSize: '1.25rem', fontWeight: '700' }}>98%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Experience</span>
                    <span style={{ color: '#FFC300', fontSize: '1.25rem', fontWeight: '700' }}>8y</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Response Rate</span>
                    <span style={{ color: '#FFC300', fontSize: '1.25rem', fontWeight: '700' }}>92%</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
                <h3 className="mb-4" style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>Verification Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" style={{ color: '#22c55e' }} />
                    <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Email Verified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" style={{ color: '#22c55e' }} />
                    <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Phone Verified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" style={{ color: '#22c55e' }} />
                    <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Identity Verified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" style={{ color: '#22c55e' }} />
                    <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Background Check</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" style={{ color: '#22c55e' }} />
                    <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Employment History</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
                <h3 className="mb-4" style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>Availability</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" style={{ color: '#FFC300' }} />
                    <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Available immediately</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5" style={{ color: '#FFC300' }} />
                    <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Last active: 2 hours ago</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => { setQuickRecruitView('schedule-interview'); setSelectedCandidateId(1); }}
                className="w-full px-6 py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                style={{ backgroundColor: '#FFC300', color: '#023047', fontWeight: '700', fontSize: '1rem' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d3d3d3'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFC300'}
              >
                <Calendar className="w-5 h-5" />
                Schedule Interview
              </button>

              <button
                onClick={() => setQuickRecruitView('find-candidates')}
                className="w-full px-6 py-3 rounded-lg transition-colors"
                style={{ backgroundColor: 'rgba(111, 111, 111, 0.3)', color: '#d3d3d3', border: '1px solid #6f6f6f' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(111, 111, 111, 0.5)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(111, 111, 111, 0.3)'}
              >
                Back to Candidates
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Schedule Interview View
    if (quickRecruitView === 'schedule-interview') {
      return (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuickRecruitView('view-profile')}
              className="p-2 rounded-lg transition-colors"
              style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', border: '1px solid #FFC300' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.2)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.1)'}
            >
              <ArrowLeft className="w-5 h-5" style={{ color: '#FFC300' }} />
            </button>
            <div>
              <h1 style={{ color: '#FFC300', fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.02em', textShadow: '0 0 30px rgba(255, 195, 0, 0.3), 0 0 60px rgba(255, 195, 0, 0.2)' }}>
                Schedule Interview
              </h1>
              <p style={{ color: '#d3d3d3' }}>Alex Martinez • Senior Full Stack Developer Position</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              {/* Interview Round Selection */}
              <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #FFC300' }}>
                <h3 className="mb-4" style={{ color: '#FFC300', fontSize: '1.125rem', fontWeight: '600' }}>Select Interview Round</h3>
                <div className="space-y-3">
                  <div className="p-4 rounded-lg cursor-pointer transition-all" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', border: '2px solid #FFC300' }}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FFC300', color: '#023047', fontWeight: '700' }}>1</div>
                      <div className="flex-1">
                        <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>Technical Screening</p>
                        <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>45 minutes • Video Call</p>
                      </div>
                      <div className="w-5 h-5 rounded-full" style={{ border: '2px solid #FFC300', backgroundColor: '#FFC300' }}>
                        <div className="w-full h-full rounded-full" style={{ backgroundColor: '#023047', transform: 'scale(0.5)' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg cursor-pointer transition-all" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f' }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#FFC300'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = '#6f6f6f'}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#6f6f6f', color: '#f6f6f6', fontWeight: '700' }}>2</div>
                      <div className="flex-1">
                        <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>System Design Round</p>
                        <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>60 minutes • Video Call</p>
                      </div>
                      <div className="w-5 h-5 rounded-full" style={{ border: '2px solid #6f6f6f' }}></div>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg cursor-pointer transition-all" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f' }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#FFC300'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = '#6f6f6f'}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#6f6f6f', color: '#f6f6f6', fontWeight: '700' }}>3</div>
                      <div className="flex-1">
                        <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>Live Coding Challenge</p>
                        <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>90 minutes • Video Call with screen share</p>
                      </div>
                      <div className="w-5 h-5 rounded-full" style={{ border: '2px solid #6f6f6f' }}></div>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg cursor-pointer transition-all" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f' }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#FFC300'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = '#6f6f6f'}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#6f6f6f', color: '#f6f6f6', fontWeight: '700' }}>4</div>
                      <div className="flex-1">
                        <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>HR & Culture Fit</p>
                        <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>30 minutes • Video Call</p>
                      </div>
                      <div className="w-5 h-5 rounded-full" style={{ border: '2px solid #6f6f6f' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Date & Time Selection */}
              <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #FFC300' }}>
                <h3 className="mb-4" style={{ color: '#FFC300', fontSize: '1.125rem', fontWeight: '600' }}>Select Date & Time</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>Interview Date *</label>
                    <input 
                      type="date" 
                      className="w-full p-3 rounded-lg outline-none"
                      style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #FFC300', color: '#f6f6f6' }}
                    />
                  </div>
                  <div>
                    <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>Interview Time *</label>
                    <select className="w-full p-3 rounded-lg outline-none" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #FFC300', color: '#f6f6f6' }}>
                      <option>10:00 AM</option>
                      <option>11:00 AM</option>
                      <option>12:00 PM</option>
                      <option>02:00 PM</option>
                      <option>03:00 PM</option>
                      <option>04:00 PM</option>
                    </select>
                  </div>
                </div>
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f' }}>
                  <p style={{ color: '#FFC300', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>Suggested Time Slots</p>
                  <div className="grid grid-cols-3 gap-2">
                    <button className="px-3 py-2 rounded-lg text-xs transition-colors" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300', border: '1px solid #FFC300' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.2)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.1)'}
                    >
                      Tomorrow 10 AM
                    </button>
                    <button className="px-3 py-2 rounded-lg text-xs transition-colors" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300', border: '1px solid #FFC300' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.2)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.1)'}
                    >
                      Tomorrow 2 PM
                    </button>
                    <button className="px-3 py-2 rounded-lg text-xs transition-colors" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300', border: '1px solid #FFC300' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.2)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.1)'}
                    >
                      Dec 17, 11 AM
                    </button>
                  </div>
                </div>
              </div>

              {/* Interview Details */}
              <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
                <h3 className="mb-4" style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>Interview Details</h3>
                <div className="space-y-4">
                  <div>
                    <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>Interview Platform *</label>
                    <select className="w-full p-3 rounded-lg outline-none" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f', color: '#f6f6f6' }}>
                      <option>Zoom</option>
                      <option>Google Meet</option>
                      <option>Microsoft Teams</option>
                      <option>Phone Call</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>Interviewer(s) *</label>
                    <input 
                      type="text" 
                      placeholder="Jane Smith, John Doe"
                      className="w-full p-3 rounded-lg outline-none"
                      style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                    />
                  </div>
                  <div>
                    <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>Additional Notes</label>
                    <textarea 
                      placeholder="Any special instructions or topics to cover..."
                      rows={3}
                      className="w-full p-3 rounded-lg outline-none"
                      style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" id="sendReminder" className="w-4 h-4" />
                    <label htmlFor="sendReminder" style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Send reminder email to candidate 24 hours before</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" id="sendCalendar" className="w-4 h-4" defaultChecked />
                    <label htmlFor="sendCalendar" style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Send calendar invite</label>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #FFC300' }}>
                <h3 className="mb-4" style={{ color: '#FFC300', fontSize: '1.125rem', fontWeight: '600' }}>Candidate Info</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 195, 0, 0.2)', color: '#FFC300', fontSize: '1.25rem', fontWeight: '700' }}>
                    AM
                  </div>
                  <div>
                    <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>Alex Martinez</p>
                    <p style={{ color: '#d3d3d3', fontSize: '0.75rem' }}>Senior Full Stack Developer</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                    <span style={{ color: '#d3d3d3', fontSize: '0.75rem' }}>alex.martinez@email.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                    <span style={{ color: '#d3d3d3', fontSize: '0.75rem' }}>+1 (555) 123-4567</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
                <h3 className="mb-4" style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>Job Details</h3>
                <div className="space-y-2">
                  <p style={{ color: '#FFC300', fontSize: '0.875rem', fontWeight: '600' }}>Senior Full Stack Developer</p>
                  <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>TechCorp Solutions</p>
                  <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>San Francisco, CA</p>
                  <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>$120K - $160K</p>
                </div>
              </div>

              <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
                <h3 className="mb-4" style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>Interview Summary</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Round</span>
                    <span style={{ color: '#FFC300', fontWeight: '600' }}>1 of 4</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Duration</span>
                    <span style={{ color: '#FFC300', fontWeight: '600' }}>45 min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Type</span>
                    <span style={{ color: '#FFC300', fontWeight: '600' }}>Video</span>
                  </div>
                </div>
              </div>

              <button
                className="w-full px-6 py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                style={{ backgroundColor: '#FFC300', color: '#023047', fontWeight: '700', fontSize: '1rem' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d3d3d3'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFC300'}
              >
                <Send className="w-5 h-5" />
                Send Interview Invite
              </button>

              <button
                onClick={() => setQuickRecruitView('view-profile')}
                className="w-full px-6 py-3 rounded-lg transition-colors"
                style={{ backgroundColor: 'rgba(111, 111, 111, 0.3)', color: '#d3d3d3', border: '1px solid #6f6f6f' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(111, 111, 111, 0.5)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(111, 111, 111, 0.3)'}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Find Candidates View
    if (quickRecruitView === 'find-candidates') {
      return (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuickRecruitView('job-details')}
              className="p-2 rounded-lg transition-colors"
              style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', border: '1px solid #FFC300' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.2)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.1)'}
            >
              <ArrowLeft className="w-5 h-5" style={{ color: '#FFC300' }} />
            </button>
            <div>
              <h1 style={{ color: '#FFC300', fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.02em', textShadow: '0 0 30px rgba(255, 195, 0, 0.3), 0 0 60px rgba(255, 195, 0, 0.2)' }}>
                Find Candidates
              </h1>
              <p style={{ color: '#d3d3d3' }}>Senior Full Stack Developer • TechCorp Solutions</p>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #FFC300' }}>
            <h3 className="mb-4" style={{ color: '#FFC300', fontSize: '1.125rem', fontWeight: '600' }}>Search Platform Users</h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-2">
                <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>Keywords</label>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#6f6f6f' }} />
                  <input 
                    type="text" 
                    placeholder="React, Node.js, Full Stack..."
                    className="pl-10 w-full p-3 rounded-lg outline-none"
                    style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #FFC300', color: '#f6f6f6' }}
                  />
                </div>
              </div>
              <div>
                <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>Experience</label>
                <select className="w-full p-3 rounded-lg outline-none" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #FFC300', color: '#f6f6f6' }}>
                  <option>6-10 years</option>
                  <option>3-5 years</option>
                  <option>10+ years</option>
                </select>
              </div>
              <div>
                <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>Location</label>
                <select className="w-full p-3 rounded-lg outline-none" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #FFC300', color: '#f6f6f6' }}>
                  <option>San Francisco</option>
                  <option>Remote</option>
                  <option>Any</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <button className="px-6 py-2 rounded-lg transition-colors" style={{ backgroundColor: '#FFC300', color: '#023047', fontWeight: '600' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d3d3d3'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFC300'}
              >
                Search Candidates
              </button>
              <button className="px-6 py-2 rounded-lg transition-colors" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300', border: '1px solid #FFC300' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.1)'}
              >
                AI Smart Match
              </button>
            </div>
          </div>

          {/* Candidate Results */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>Matching Candidates (127 found)</h3>
              <select className="px-4 py-2 rounded-lg outline-none" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}>
                <option>Best Match</option>
                <option>Most Experienced</option>
                <option>Recently Active</option>
                <option>Salary Match</option>
              </select>
            </div>

            {/* Candidate Card 1 */}
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #FFC300' }}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 195, 0, 0.2)', color: '#FFC300', fontSize: '1.5rem', fontWeight: '700' }}>
                    AM
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>Alex Martinez</h4>
                      <span className="px-2 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.2)', color: '#FFC300', fontWeight: '600' }}>98% MATCH</span>
                      <span className="px-2 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)', color: '#22c55e' }}>VERIFIED</span>
                    </div>
                    <p style={{ color: '#d3d3d3', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Senior Full Stack Developer • 8 years experience</p>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                        <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>San Francisco, CA</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                        <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>$130K expected</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                        <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Available immediately</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap mb-3">
                      <span style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Skills:</span>
                      <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300' }}>React</span>
                      <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300' }}>Node.js</span>
                      <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300' }}>TypeScript</span>
                      <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300' }}>AWS</span>
                      <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300' }}>PostgreSQL</span>
                      <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300' }}>Docker</span>
                    </div>
                    <p style={{ color: '#d3d3d3', fontSize: '0.875rem', lineHeight: '1.5' }}>
                      Experienced full stack developer with expertise in building scalable web applications. Led team of 5 developers at previous company.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => { setQuickRecruitView('schedule-interview'); setSelectedCandidateId(1); }}
                    className="px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: '#FFC300', color: '#023047', fontWeight: '600', fontSize: '0.875rem' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d3d3d3'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFC300'}
                  >
                    Schedule Interview
                  </button>
                  <button 
                    onClick={() => { setQuickRecruitView('view-profile'); setSelectedCandidateId(1); }}
                    className="px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300', border: '1px solid #FFC300', fontSize: '0.875rem' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.2)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.1)'}
                  >
                    View Profile
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-4 pt-3" style={{ borderTop: '1px solid #6f6f6f' }}>
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4" style={{ color: '#FFC300' }} />
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Profile Score: 95/100</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" style={{ color: '#22c55e' }} />
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Background Verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4" style={{ color: '#FFC300' }} />
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Last active: 2 hours ago</span>
                </div>
              </div>
            </div>

            {/* Candidate Card 2 */}
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 195, 0, 0.2)', color: '#FFC300', fontSize: '1.5rem', fontWeight: '700' }}>
                    SC
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>Sarah Chen</h4>
                      <span className="px-2 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300', fontWeight: '600' }}>92% MATCH</span>
                      <span className="px-2 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)', color: '#22c55e' }}>VERIFIED</span>
                      <span className="px-2 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.2)', color: '#FFC300', fontWeight: '600' }}>PRO</span>
                    </div>
                    <p style={{ color: '#d3d3d3', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Full Stack Engineer • 7 years experience</p>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                        <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>San Jose, CA</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                        <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>$125K expected</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                        <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>2 weeks notice</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap mb-3">
                      <span style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Skills:</span>
                      <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300' }}>React</span>
                      <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300' }}>Node.js</span>
                      <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300' }}>TypeScript</span>
                      <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300' }}>MongoDB</span>
                      <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300' }}>GraphQL</span>
                    </div>
                    <p style={{ color: '#d3d3d3', fontSize: '0.875rem', lineHeight: '1.5' }}>
                      Passionate about creating user-friendly applications. Strong background in frontend development with growing backend expertise.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => { setQuickRecruitView('schedule-interview'); setSelectedCandidateId(2); }}
                    className="px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: '#FFC300', color: '#023047', fontWeight: '600', fontSize: '0.875rem' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d3d3d3'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFC300'}
                  >
                    Schedule Interview
                  </button>
                  <button 
                    onClick={() => { setQuickRecruitView('view-profile'); setSelectedCandidateId(2); }}
                    className="px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300', border: '1px solid #FFC300', fontSize: '0.875rem' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.2)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.1)'}
                  >
                    View Profile
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-4 pt-3" style={{ borderTop: '1px solid #6f6f6f' }}>
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4" style={{ color: '#FFC300' }} />
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Profile Score: 88/100</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" style={{ color: '#22c55e' }} />
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Background Verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4" style={{ color: '#FFC300' }} />
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Last active: 1 day ago</span>
                </div>
              </div>
            </div>

            {/* Candidate Card 3 */}
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 195, 0, 0.2)', color: '#FFC300', fontSize: '1.5rem', fontWeight: '700' }}>
                    RP
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>Raj Patel</h4>
                      <span className="px-2 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300', fontWeight: '600' }}>89% MATCH</span>
                      <span className="px-2 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)', color: '#22c55e' }}>VERIFIED</span>
                    </div>
                    <p style={{ color: '#d3d3d3', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Senior Software Engineer • 9 years experience</p>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                        <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Oakland, CA</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                        <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>$140K expected</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                        <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>1 month notice</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap mb-3">
                      <span style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Skills:</span>
                      <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300' }}>React</span>
                      <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300' }}>Node.js</span>
                      <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300' }}>Python</span>
                      <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300' }}>AWS</span>
                      <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300' }}>Kubernetes</span>
                    </div>
                    <p style={{ color: '#d3d3d3', fontSize: '0.875rem', lineHeight: '1.5' }}>
                      Senior engineer with strong DevOps experience. Specialized in building microservices architecture and cloud infrastructure.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => { setQuickRecruitView('schedule-interview'); setSelectedCandidateId(3); }}
                    className="px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: '#FFC300', color: '#023047', fontWeight: '600', fontSize: '0.875rem' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d3d3d3'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFC300'}
                  >
                    Schedule Interview
                  </button>
                  <button 
                    onClick={() => { setQuickRecruitView('view-profile'); setSelectedCandidateId(3); }}
                    className="px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300', border: '1px solid #FFC300', fontSize: '0.875rem' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.2)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.1)'}
                  >
                    View Profile
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-4 pt-3" style={{ borderTop: '1px solid #6f6f6f' }}>
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4" style={{ color: '#FFC300' }} />
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Profile Score: 91/100</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" style={{ color: '#22c55e' }} />
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Background Verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4" style={{ color: '#FFC300' }} />
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Last active: 5 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Job List View (default)
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setViewMode('tasks')}
              className="p-2 rounded-lg transition-colors"
              style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', border: '1px solid #FFC300' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.2)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.1)'}
            >
              <ArrowLeft className="w-5 h-5" style={{ color: '#FFC300' }} />
            </button>
            <div>
              <h1 style={{ color: '#FFC300', fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.02em', textShadow: '0 0 30px rgba(255, 195, 0, 0.3), 0 0 60px rgba(255, 195, 0, 0.2)' }}>
                Quick Recruit
              </h1>
              <p style={{ color: '#d3d3d3' }}>Help companies fill positions - Match candidates & conduct interviews</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-lg" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', border: '1px solid #FFC300' }}>
              <span style={{ color: '#FFC300', fontSize: '0.875rem', fontWeight: '600' }}>12 Active Jobs</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4">
          <div className="rounded-lg p-4" style={{ backgroundColor: '#023047', border: '1px solid #FFC300' }}>
            <div className="flex items-center justify-between mb-2">
              <Briefcase className="w-5 h-5" style={{ color: '#FFC300' }} />
              <span style={{ color: '#FFC300', fontSize: '1.75rem', fontWeight: '700' }}>12</span>
            </div>
            <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Active Jobs</p>
          </div>
          <div className="rounded-lg p-4" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <div className="flex items-center justify-between mb-2">
              <Users className="w-5 h-5" style={{ color: '#FFC300' }} />
              <span style={{ color: '#FFC300', fontSize: '1.75rem', fontWeight: '700' }}>38</span>
            </div>
            <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>In Interviews</p>
          </div>
          <div className="rounded-lg p-4" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-5 h-5" style={{ color: '#FFC300' }} />
              <span style={{ color: '#FFC300', fontSize: '1.75rem', fontWeight: '700' }}>67</span>
            </div>
            <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Positions Filled</p>
          </div>
          <div className="rounded-lg p-4" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-5 h-5" style={{ color: '#FFC300' }} />
              <span style={{ color: '#FFC300', fontSize: '1.75rem', fontWeight: '700' }}>3.2d</span>
            </div>
            <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Avg. Fill Time</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <select className="px-4 py-2 rounded-lg outline-none" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}>
            <option>All Status</option>
            <option>Finding Candidates</option>
            <option>Screening</option>
            <option>Interviewing</option>
            <option>Final Round</option>
            <option>Offer Stage</option>
          </select>
          <select className="px-4 py-2 rounded-lg outline-none" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}>
            <option>All Urgency</option>
            <option>Critical (1-2 days)</option>
            <option>High Priority (2-3 days)</option>
            <option>Standard (3-5 days)</option>
          </select>
          <select className="px-4 py-2 rounded-lg outline-none" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}>
            <option>All Categories</option>
            <option>Technology</option>
            <option>Sales & Marketing</option>
            <option>Finance</option>
            <option>Operations</option>
          </select>
          <div className="flex-1"></div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#6f6f6f' }} />
            <input 
              type="text" 
              placeholder="Search jobs..."
              className="pl-10 pr-4 py-2 rounded-lg outline-none"
              style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
            />
          </div>
        </div>

        {/* Quick Recruit Jobs List */}
        <div className="space-y-4">
          {/* Job Card 1 - Finding Candidates */}
          <div className="rounded-lg p-6 cursor-pointer transition-all" style={{ backgroundColor: '#023047', border: '1px solid #FFC300' }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#FFC300'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = '#FFC300'}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>Senior Full Stack Developer</h3>
                  <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.2)', color: '#FFC300', fontWeight: '600', border: '1px solid #FFC300' }}>
                    CRITICAL
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300' }}>
                    Finding Candidates
                  </span>
                </div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                    <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>TechCorp Solutions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                    <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                    <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>$120K - $160K</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                    <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Posted 2 hours ago</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Skills:</span>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300' }}>React</span>
                    <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300' }}>Node.js</span>
                    <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300' }}>TypeScript</span>
                    <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300' }}>AWS</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Interview Rounds:</span>
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>4 rounds (Technical → System Design → Coding → HR)</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => { setQuickRecruitView('find-candidates'); setSelectedJobId(1); }}
                  className="px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: '#FFC300', color: '#023047', fontWeight: '600', fontSize: '0.875rem' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d3d3d3'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFC300'}
                >
                  Find Candidates
                </button>
                <button 
                  onClick={() => { setQuickRecruitView('job-details'); setSelectedJobId(1); }}
                  className="px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300', border: '1px solid #FFC300', fontSize: '0.875rem' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.2)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.1)'}
                >
                  View Details
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid #6f6f6f' }}>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4" style={{ color: '#FFC300' }} />
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Target: 2 positions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" style={{ color: '#FFC300' }} />
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>0 candidates matched</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 rounded-full" style={{ backgroundColor: 'rgba(111, 111, 111, 0.3)' }}>
                  <div className="h-full rounded-full" style={{ width: '10%', backgroundColor: '#FFC300' }}></div>
                </div>
                <span style={{ color: '#FFC300', fontSize: '0.75rem', fontWeight: '600' }}>10%</span>
              </div>
            </div>
          </div>

          {/* Job Card 2 - Interviewing */}
          <div className="rounded-lg p-6 cursor-pointer transition-all" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#FFC300'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = '#6f6f6f'}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>Product Manager</h3>
                  <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300', fontWeight: '600' }}>
                    HIGH PRIORITY
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300' }}>
                    Interviewing
                  </span>
                </div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                    <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>InnovateTech Inc</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                    <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Remote</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                    <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>$100K - $140K</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                    <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Posted 1 day ago</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Skills:</span>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300' }}>Product Strategy</span>
                    <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300' }}>Agile</span>
                    <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300' }}>Analytics</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Interview Rounds:</span>
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>3 rounds (Screening → Product Case → Stakeholder)</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => { setQuickRecruitView('job-details'); setSelectedJobId(2); }}
                  className="px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: '#FFC300', color: '#023047', fontWeight: '600', fontSize: '0.875rem' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d3d3d3'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFC300'}
                >
                  Manage Interviews
                </button>
                <button 
                  onClick={() => { setQuickRecruitView('job-details'); setSelectedJobId(2); }}
                  className="px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300', border: '1px solid #FFC300', fontSize: '0.875rem' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.2)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.1)'}
                >
                  View Details
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid #6f6f6f' }}>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4" style={{ color: '#FFC300' }} />
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Target: 1 position</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" style={{ color: '#FFC300' }} />
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>8 candidates • 3 in final round</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 rounded-full" style={{ backgroundColor: 'rgba(111, 111, 111, 0.3)' }}>
                  <div className="h-full rounded-full" style={{ width: '75%', backgroundColor: '#FFC300' }}></div>
                </div>
                <span style={{ color: '#FFC300', fontSize: '0.75rem', fontWeight: '600' }}>75%</span>
              </div>
            </div>
          </div>

          {/* Job Card 3 - Offer Stage */}
          <div className="rounded-lg p-6 cursor-pointer transition-all" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#FFC300'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = '#6f6f6f'}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>Senior Data Scientist</h3>
                  <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(111, 111, 111, 0.3)', color: '#d3d3d3', fontWeight: '600' }}>
                    STANDARD
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)', color: '#22c55e' }}>
                    Offer Stage
                  </span>
                </div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                    <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>DataFlow Analytics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                    <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>New York, NY</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                    <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>$140K - $180K</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                    <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Posted 3 days ago</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Skills:</span>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300' }}>Python</span>
                    <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300' }}>ML/AI</span>
                    <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300' }}>TensorFlow</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Interview Rounds:</span>
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>3 rounds (Technical → ML Case Study → Final)</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => { setQuickRecruitView('job-details'); setSelectedJobId(3); }}
                  className="px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)', color: '#22c55e', border: '1px solid #22c55e', fontWeight: '600', fontSize: '0.875rem' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(34, 197, 94, 0.3)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(34, 197, 94, 0.2)'}
                >
                  Track Offer
                </button>
                <button 
                  onClick={() => { setQuickRecruitView('job-details'); setSelectedJobId(3); }}
                  className="px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300', border: '1px solid #FFC300', fontSize: '0.875rem' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.2)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.1)'}
                >
                  View Details
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid #6f6f6f' }}>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4" style={{ color: '#FFC300' }} />
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Target: 1 position</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" style={{ color: '#22c55e' }} />
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>12 candidates • 1 offer sent</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 rounded-full" style={{ backgroundColor: 'rgba(111, 111, 111, 0.3)' }}>
                  <div className="h-full rounded-full" style={{ width: '95%', backgroundColor: '#22c55e' }}></div>
                </div>
                <span style={{ color: '#22c55e', fontSize: '0.75rem', fontWeight: '600' }}>95%</span>
              </div>
            </div>
          </div>

          {/* Job Card 4 - Screening */}
          <div className="rounded-lg p-6 cursor-pointer transition-all" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#FFC300'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = '#6f6f6f'}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>UX/UI Designer</h3>
                  <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300', fontWeight: '600' }}>
                    HIGH PRIORITY
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300' }}>
                    Screening
                  </span>
                </div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                    <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>DesignHub Studios</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                    <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Austin, TX</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                    <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>$90K - $120K</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                    <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Posted 6 hours ago</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Skills:</span>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300' }}>Figma</span>
                    <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300' }}>UI/UX</span>
                    <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300' }}>Prototyping</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Interview Rounds:</span>
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>3 rounds (Portfolio Review → Design Task → Culture Fit)</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => { setQuickRecruitView('find-candidates'); setSelectedJobId(4); }}
                  className="px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: '#FFC300', color: '#023047', fontWeight: '600', fontSize: '0.875rem' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d3d3d3'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFC300'}
                >
                  Screen Candidates
                </button>
                <button 
                  onClick={() => { setQuickRecruitView('job-details'); setSelectedJobId(4); }}
                  className="px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300', border: '1px solid #FFC300', fontSize: '0.875rem' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.2)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.1)'}
                >
                  View Details
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid #6f6f6f' }}>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4" style={{ color: '#FFC300' }} />
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Target: 2 positions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" style={{ color: '#FFC300' }} />
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>15 candidates • 5 shortlisted</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 rounded-full" style={{ backgroundColor: 'rgba(111, 111, 111, 0.3)' }}>
                  <div className="h-full rounded-full" style={{ width: '40%', backgroundColor: '#FFC300' }}></div>
                </div>
                <span style={{ color: '#FFC300', fontSize: '0.75rem', fontWeight: '600' }}>40%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Performance & Leaderboard View
  if (viewMode === 'performance-leaderboard') {
    const weeklyData = [
      { day: 'Mon', tasks: 7, target: 10 },
      { day: 'Tue', tasks: 9, target: 10 },
      { day: 'Wed', tasks: 11, target: 10 },
      { day: 'Thu', tasks: 8, target: 10 },
      { day: 'Fri', tasks: 12, target: 10 },
      { day: 'Sat', tasks: 4, target: 5 },
      { day: 'Sun', tasks: 3, target: 5 },
    ];

    const performanceRadar = [
      { metric: 'Speed', value: 85, fullMark: 100 },
      { metric: 'Quality', value: 92, fullMark: 100 },
      { metric: 'Volume', value: 78, fullMark: 100 },
      { metric: 'Accuracy', value: 88, fullMark: 100 },
      { metric: 'Communication', value: 90, fullMark: 100 },
    ];

    const teamLeaderboard = [
      { rank: 1, name: 'You (Alex Johnson)', tasks: 47, successRate: 94, badge: 'gold', avatar: '🥇' },
      { rank: 2, name: 'Sarah Miller', tasks: 45, successRate: 90, badge: 'silver', avatar: '🥈' },
      { rank: 3, name: 'David Chen', tasks: 42, successRate: 88, badge: 'bronze', avatar: '🥉' },
      { rank: 4, name: 'Emma Wilson', tasks: 38, successRate: 85, badge: null, avatar: '👤' },
      { rank: 5, name: 'Mike Brown', tasks: 35, successRate: 82, badge: null, avatar: '👤' },
      { rank: 6, name: 'Lisa Anderson', tasks: 33, successRate: 80, badge: null, avatar: '👤' },
    ];

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setViewMode('tasks')}
            className="p-2 rounded-lg transition-colors"
            style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', border: '1px solid #FFC300' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.1)'}
          >
            <ArrowLeft className="w-5 h-5" style={{ color: '#FFC300' }} />
          </button>
          <div>
            <h1 style={{ color: '#FFC300', fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.02em', textShadow: '0 0 30px rgba(255, 195, 0, 0.3), 0 0 60px rgba(255, 195, 0, 0.2)' }}>
              Performance & Leaderboard
            </h1>
            <p style={{ color: '#d3d3d3' }}>Track your performance and compare with team members</p>
          </div>
        </div>

        {/* Performance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
                <CheckCircle className="w-6 h-6" style={{ color: '#023047' }} />
              </div>
              <div className="flex items-center gap-1" style={{ color: '#FFC300' }}>
                <ArrowUp className="w-4 h-4" />
                <span style={{ fontSize: '0.75rem', fontWeight: '600' }}>+3 today</span>
              </div>
            </div>
            <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Tasks Completed</p>
            <div className="flex items-baseline gap-2 mt-1">
              <p style={{ color: '#f6f6f6', fontSize: '2rem', fontWeight: '700' }}>12</p>
              <p style={{ color: '#6f6f6f', fontSize: '1rem' }}>/ 15</p>
            </div>
            <div className="mt-3">
              <div className="w-full h-2 rounded-full" style={{ backgroundColor: '#6f6f6f' }}>
                <div className="h-full rounded-full" style={{ backgroundColor: '#FFC300', width: '80%' }} />
              </div>
              <p className="mt-1 text-right" style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>80% of target</p>
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
                <ShieldCheck className="w-6 h-6" style={{ color: '#023047' }} />
              </div>
              <div className="flex items-center gap-1" style={{ color: '#FFC300' }}>
                <ArrowUp className="w-4 h-4" />
                <span style={{ fontSize: '0.75rem', fontWeight: '600' }}>+5 this week</span>
              </div>
            </div>
            <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>BGV Completed</p>
            <div className="flex items-baseline gap-2 mt-1">
              <p style={{ color: '#f6f6f6', fontSize: '2rem', fontWeight: '700' }}>47</p>
              <p style={{ color: '#6f6f6f', fontSize: '1rem' }}>this month</p>
            </div>
            <div className="mt-3">
              <div className="w-full h-2 rounded-full" style={{ backgroundColor: '#6f6f6f' }}>
                <div className="h-full rounded-full" style={{ backgroundColor: '#FFC300', width: '94%' }} />
              </div>
              <p className="mt-1 text-right" style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>94% success rate</p>
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
                <Rocket className="w-6 h-6" style={{ color: '#023047' }} />
              </div>
              <div className="flex items-center gap-1" style={{ color: '#FFC300' }}>
                <ArrowUp className="w-4 h-4" />
                <span style={{ fontSize: '0.75rem', fontWeight: '600' }}>+2 this week</span>
              </div>
            </div>
            <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Quick Recruits</p>
            <div className="flex items-baseline gap-2 mt-1">
              <p style={{ color: '#f6f6f6', fontSize: '2rem', fontWeight: '700' }}>18</p>
              <p style={{ color: '#6f6f6f', fontSize: '1rem' }}>this month</p>
            </div>
            <div className="mt-3">
              <div className="w-full h-2 rounded-full" style={{ backgroundColor: '#6f6f6f' }}>
                <div className="h-full rounded-full" style={{ backgroundColor: '#FFC300', width: '90%' }} />
              </div>
              <p className="mt-1 text-right" style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>90% within 3 days</p>
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
                <Trophy className="w-6 h-6" style={{ color: '#023047' }} />
              </div>
              <div className="flex items-center gap-1" style={{ color: '#FFC300' }}>
                <Star className="w-4 h-4" />
                <span style={{ fontSize: '0.75rem', fontWeight: '600' }}>Rank #1</span>
              </div>
            </div>
            <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Your Rank</p>
            <div className="flex items-baseline gap-2 mt-1">
              <p style={{ color: '#f6f6f6', fontSize: '2rem', fontWeight: '700' }}>1st</p>
              <p style={{ color: '#6f6f6f', fontSize: '1rem' }}>of 8</p>
            </div>
            <div className="mt-3">
              <div className="px-3 py-1 rounded-full inline-flex items-center gap-2" style={{ backgroundColor: '#FFC300' }}>
                <Trophy className="w-4 h-4" style={{ color: '#023047' }} />
                <span style={{ color: '#023047', fontSize: '0.75rem', fontWeight: '700' }}>TOP PERFORMER</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>Weekly Performance</h3>
                <p style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Your task completion vs targets</p>
              </div>
              <BarChart3 className="w-5 h-5" style={{ color: '#FFC300' }} />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#6f6f6f" opacity={0.3} />
                <XAxis dataKey="day" stroke="#d3d3d3" />
                <YAxis stroke="#d3d3d3" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#023047', 
                    border: '1px solid #FFC300', 
                    color: '#f6f6f6',
                    borderRadius: '8px'
                  }}
                />
                <Bar key="tasks-bar" dataKey="tasks" fill="#FFC300" radius={[8, 8, 0, 0]} name="Tasks" />
                <Bar key="tasks-target-bar" dataKey="target" fill="#6f6f6f" radius={[8, 8, 0, 0]} name="Target" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>Skill Metrics</h3>
                <p style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Your ratings across key areas</p>
              </div>
              <Activity className="w-5 h-5" style={{ color: '#FFC300' }} />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={performanceRadar}>
                <PolarGrid stroke="#6f6f6f" />
                <PolarAngleAxis dataKey="metric" stroke="#d3d3d3" />
                <PolarRadiusAxis stroke="#d3d3d3" />
                <Radar name="Performance" dataKey="value" stroke="#FFC300" fill="#FFC300" fillOpacity={0.3} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#023047', 
                    border: '1px solid #FFC300', 
                    color: '#f6f6f6',
                    borderRadius: '8px'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Achievements */}
        <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
          <h3 className="mb-4" style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>Recent Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg flex items-center gap-4" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', border: '1px solid #FFC300' }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
                <Trophy className="w-6 h-6" style={{ color: '#023047' }} />
              </div>
              <div>
                <p style={{ color: '#FFC300', fontSize: '1rem', fontWeight: '600' }}>Top Performer</p>
                <p style={{ color: '#d3d3d3', fontSize: '0.75rem' }}>This week</p>
              </div>
            </div>
            <div className="p-4 rounded-lg flex items-center gap-4" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', border: '1px solid #FFC300' }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
                <Star className="w-6 h-6" style={{ color: '#023047' }} />
              </div>
              <div>
                <p style={{ color: '#FFC300', fontSize: '1rem', fontWeight: '600' }}>50+ Tasks</p>
                <p style={{ color: '#d3d3d3', fontSize: '0.75rem' }}>This month</p>
              </div>
            </div>
            <div className="p-4 rounded-lg flex items-center gap-4" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', border: '1px solid #FFC300' }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
                <Zap className="w-6 h-6" style={{ color: '#023047' }} />
              </div>
              <div>
                <p style={{ color: '#FFC300', fontSize: '1rem', fontWeight: '600' }}>Speed Master</p>
                <p style={{ color: '#d3d3d3', fontSize: '0.75rem' }}>Fastest completion</p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Leaderboard */}
        <div className="rounded-lg" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
          <div className="p-6" style={{ borderBottom: '1px solid #6f6f6f' }}>
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6" style={{ color: '#FFC300' }} />
              <div>
                <h3 style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>Team Leaderboard</h3>
                <p style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Top performers this month</p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-3">
            {teamLeaderboard.map((member) => (
              <div 
                key={member.rank} 
                className="p-4 rounded-lg flex items-center justify-between transition-all"
                style={{ 
                  backgroundColor: member.rank === 1 ? 'rgba(255, 195, 0, 0.15)' : 'rgba(255, 195, 0, 0.05)', 
                  border: member.rank === 1 ? '1px solid #FFC300' : '1px solid #6f6f6f'
                }}
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ 
                      backgroundColor: 
                        member.badge === 'gold' ? '#FFC300' :
                        member.badge === 'silver' ? '#d3d3d3' :
                        member.badge === 'bronze' ? '#cd7f32' :
                        '#6f6f6f',
                      color: member.badge ? '#023047' : '#f6f6f6',
                      fontWeight: '700',
                      fontSize: '1.125rem'
                    }}
                  >
                    {member.badge ? <Trophy className="w-5 h-5" /> : member.rank}
                  </div>
                  <div>
                    <p style={{ color: '#f6f6f6', fontSize: '1rem', fontWeight: '600' }}>{member.name}</p>
                    <p style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Rank #{member.rank}</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p style={{ color: '#d3d3d3', fontSize: '0.75rem' }}>Tasks</p>
                    <p style={{ color: '#FFC300', fontSize: '1.5rem', fontWeight: '700' }}>{member.tasks}</p>
                  </div>
                  <div className="text-right">
                    <p style={{ color: '#d3d3d3', fontSize: '0.75rem' }}>Success</p>
                    <p style={{ color: '#FFC300', fontSize: '1.5rem', fontWeight: '700' }}>{member.successRate}%</p>
                  </div>
                  {member.rank === 1 && (
                    <div className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ backgroundColor: '#FFC300' }}>
                      <Award className="w-5 h-5" style={{ color: '#023047' }} />
                      <span style={{ color: '#023047', fontWeight: '700', fontSize: '0.875rem' }}>You!</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Default Tasks View
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
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
            My Tasks
          </h1>
          <p className="mt-1" style={{ color: '#d3d3d3' }}>Manage your assigned tasks and track progress</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
        <h3 className="mb-4" style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            className="p-4 rounded-lg transition-all duration-300 text-left"
            style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', border: '1px solid #FFC300' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.2)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            onClick={() => setViewMode('user-bgv')}
          >
            <ShieldCheck className="w-6 h-6 mb-2" style={{ color: '#FFC300' }} />
            <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>User BGV</p>
            <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>Verify user background</p>
          </button>
          <button
            className="p-4 rounded-lg transition-all duration-300 text-left"
            style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', border: '1px solid #FFC300' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.2)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            onClick={() => setViewMode('company-bgv')}
          >
            <BadgeCheck className="w-6 h-6 mb-2" style={{ color: '#FFC300' }} />
            <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>Company BGV</p>
            <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>Verify company details</p>
          </button>
          <button
            className="p-4 rounded-lg transition-all duration-300 text-left"
            style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', border: '1px solid #FFC300' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.2)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            onClick={() => setViewMode('quick-recruit')}
          >
            <Rocket className="w-6 h-6 mb-2" style={{ color: '#FFC300' }} />
            <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>Quick Recruit</p>
            <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>Fill in 3-5 days</p>
          </button>
          <button
            className="p-4 rounded-lg transition-all duration-300 text-left"
            style={{ backgroundColor: 'rgba(111, 111, 111, 0.2)', border: '1px solid #6f6f6f' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(111, 111, 111, 0.3)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(111, 111, 111, 0.2)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            onClick={() => setViewMode('performance-leaderboard')}
          >
            <Trophy className="w-6 h-6 mb-2" style={{ color: '#d3d3d3' }} />
            <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>Performance & Leaderboard</p>
            <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>View stats & rankings</p>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div 
          className="rounded-lg p-4 cursor-pointer transition-all"
          style={{ 
            backgroundColor: activeTab === 'all' ? 'rgba(255, 195, 0, 0.15)' : '#023047', 
            border: activeTab === 'all' ? '1px solid #FFC300' : '1px solid #6f6f6f' 
          }}
          onClick={() => setActiveTab('all')}
        >
          <div className="flex items-center justify-between mb-2">
            <ListTodo className="w-5 h-5" style={{ color: '#FFC300' }} />
            <span style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>{taskCounts.all}</span>
          </div>
          <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>All Tasks</p>
        </div>
        <div 
          className="rounded-lg p-4 cursor-pointer transition-all"
          style={{ 
            backgroundColor: activeTab === 'pending' ? 'rgba(211, 211, 211, 0.2)' : '#023047', 
            border: activeTab === 'pending' ? '1px solid #d3d3d3' : '1px solid #6f6f6f' 
          }}
          onClick={() => setActiveTab('pending')}
        >
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-5 h-5" style={{ color: '#d3d3d3' }} />
            <span style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>{taskCounts.pending}</span>
          </div>
          <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Pending</p>
        </div>
        <div 
          className="rounded-lg p-4 cursor-pointer transition-all"
          style={{ 
            backgroundColor: activeTab === 'in-progress' ? 'rgba(255, 195, 0, 0.15)' : '#023047', 
            border: activeTab === 'in-progress' ? '1px solid #FFC300' : '1px solid #6f6f6f' 
          }}
          onClick={() => setActiveTab('in-progress')}
        >
          <div className="flex items-center justify-between mb-2">
            <PlayCircle className="w-5 h-5" style={{ color: '#FFC300' }} />
            <span style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>{taskCounts['in-progress']}</span>
          </div>
          <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>In Progress</p>
        </div>
        <div 
          className="rounded-lg p-4 cursor-pointer transition-all"
          style={{ 
            backgroundColor: activeTab === 'completed' ? 'rgba(255, 195, 0, 0.15)' : '#023047', 
            border: activeTab === 'completed' ? '1px solid #FFC300' : '1px solid #6f6f6f' 
          }}
          onClick={() => setActiveTab('completed')}
        >
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-5 h-5" style={{ color: '#FFC300' }} />
            <span style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>{taskCounts.completed}</span>
          </div>
          <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Completed</p>
        </div>
        <div 
          className="rounded-lg p-4 cursor-pointer transition-all"
          style={{ 
            backgroundColor: activeTab === 'overdue' ? 'rgba(255, 0, 0, 0.2)' : '#023047', 
            border: activeTab === 'overdue' ? '1px solid #ff6b6b' : '1px solid #6f6f6f' 
          }}
          onClick={() => setActiveTab('overdue')}
        >
          <div className="flex items-center justify-between mb-2">
            <AlertCircle className="w-5 h-5" style={{ color: '#ff6b6b' }} />
            <span style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>{taskCounts.overdue}</span>
          </div>
          <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Overdue</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="rounded-lg p-4" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
        <div className="flex items-center gap-3">
          <Search className="w-5 h-5" style={{ color: '#6f6f6f' }} />
          <input
            type="text"
            placeholder="Search tasks by title, lead name, or contact..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none"
            style={{ color: '#f6f6f6', fontSize: '0.875rem' }}
          />
          <Filter className="w-5 h-5 cursor-pointer" style={{ color: '#6f6f6f' }} />
        </div>
      </div>

      {/* Tasks List */}
      <div className="rounded-lg" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
        <div className="p-6" style={{ borderBottom: '1px solid #6f6f6f' }}>
          <div className="flex items-center justify-between">
            <div>
              <h3 style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>
                {activeTab === 'all' ? 'All Tasks' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace('-', ' ') + ' Tasks'}
              </h3>
              <p style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>{filteredTasks.length} tasks found</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12">
              <ListTodo className="w-16 h-16 mx-auto mb-4" style={{ color: '#6f6f6f' }} />
              <p style={{ color: '#d3d3d3', fontSize: '1rem' }}>No tasks found</p>
              <p style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Try adjusting your filters or search query</p>
            </div>
          ) : (
            filteredTasks.map((task) => {
              const priorityStyle = getPriorityColor(task.priority);
              const statusStyle = getStatusColor(task.status);

              return (
                <div 
                  key={task.id} 
                  className="p-4 rounded-lg cursor-pointer transition-all"
                  style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.1)';
                    e.currentTarget.style.borderColor = '#FFC300';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.05)';
                    e.currentTarget.style.borderColor = '#6f6f6f';
                  }}
                  onClick={() => setSelectedTask(task)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 style={{ color: '#f6f6f6', fontSize: '1rem', fontWeight: '600' }}>{task.title}</h4>
                        {task.type === 'user-conversion' && (
                          <div className="px-2 py-0.5 rounded text-xs flex items-center gap-1" style={{ backgroundColor: 'rgba(255, 195, 0, 0.2)', color: '#FFC300', border: '1px solid #FFC300' }}>
                            <UserPlus className="w-3 h-3" />
                            User
                          </div>
                        )}
                        {task.type === 'company-conversion' && (
                          <div className="px-2 py-0.5 rounded text-xs flex items-center gap-1" style={{ backgroundColor: 'rgba(2, 48, 71, 0.5)', color: '#d3d3d3', border: '1px solid #6f6f6f' }}>
                            <Building2 className="w-3 h-3" />
                            Company
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm mb-2">
                        <span className="flex items-center gap-1" style={{ color: '#d3d3d3' }}>
                          <Briefcase className="w-3 h-3" />
                          {task.lead}
                        </span>
                        <span className="flex items-center gap-1" style={{ color: '#6f6f6f' }}>
                          <Mail className="w-3 h-3" />
                          {task.contact}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span 
                        className="px-2 py-1 rounded text-xs inline-flex items-center gap-1"
                        style={{
                          backgroundColor: priorityStyle.bg,
                          color: priorityStyle.color,
                          border: `1px solid ${priorityStyle.border}`
                        }}
                      >
                        {(task.priority === 'urgent' || task.priority === 'high') && <AlertCircle className="w-3 h-3" />}
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </span>
                      <span 
                        className="px-2 py-1 rounded text-xs inline-flex items-center gap-1"
                        style={{
                          backgroundColor: statusStyle.bg,
                          color: statusStyle.color,
                          border: `1px solid ${statusStyle.border}`
                        }}
                      >
                        {task.status === 'completed' && <CheckCircle className="w-3 h-3" />}
                        {task.status === 'in-progress' && <PlayCircle className="w-3 h-3" />}
                        {task.status === 'pending' && <Clock className="w-3 h-3" />}
                        {task.status === 'overdue' && <XCircle className="w-3 h-3" />}
                        {task.status === 'in-progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1" style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>
                        <Calendar className="w-3 h-3" />
                        Due: {task.dueDate}
                      </span>
                      <span className="flex items-center gap-1" style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>
                        <Clock className="w-3 h-3" />
                        Assigned {task.assignedTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {task.status !== 'completed' && (
                        <button
                          className="px-3 py-1.5 rounded transition-colors text-xs"
                          style={{ backgroundColor: '#FFC300', color: '#023047', fontWeight: '600' }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d3d3d3'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFC300'}
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle start task
                          }}
                        >
                          {task.status === 'in-progress' ? 'Continue' : 'Start Task'}
                        </button>
                      )}
                      <button
                        className="px-3 py-1.5 rounded transition-colors text-xs"
                        style={{ backgroundColor: 'rgba(111, 111, 111, 0.3)', color: '#d3d3d3', border: '1px solid #6f6f6f' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(111, 111, 111, 0.5)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(111, 111, 111, 0.3)'}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTask(task);
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
          onClick={() => setSelectedTask(null)}
        >
          <div 
            className="rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
            style={{ backgroundColor: '#023047', border: '1px solid #FFC300' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h2 style={{ color: '#FFC300', fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                  {selectedTask.title}
                </h2>
                <div className="flex items-center gap-2">
                  {selectedTask.type === 'user-conversion' && (
                    <div className="px-2 py-1 rounded text-xs flex items-center gap-1" style={{ backgroundColor: 'rgba(255, 195, 0, 0.2)', color: '#FFC300', border: '1px solid #FFC300' }}>
                      <UserPlus className="w-3 h-3" />
                      User Conversion
                    </div>
                  )}
                  {selectedTask.type === 'company-conversion' && (
                    <div className="px-2 py-1 rounded text-xs flex items-center gap-1" style={{ backgroundColor: 'rgba(2, 48, 71, 0.5)', color: '#d3d3d3', border: '1px solid #6f6f6f' }}>
                      <Building2 className="w-3 h-3" />
                      Company Conversion
                    </div>
                  )}
                  <span 
                    className="px-2 py-1 rounded text-xs inline-flex items-center gap-1"
                    style={{
                      backgroundColor: getPriorityColor(selectedTask.priority).bg,
                      color: getPriorityColor(selectedTask.priority).color,
                      border: `1px solid ${getPriorityColor(selectedTask.priority).border}`
                    }}
                  >
                    {selectedTask.priority.charAt(0).toUpperCase() + selectedTask.priority.slice(1)} Priority
                  </span>
                  <span 
                    className="px-2 py-1 rounded text-xs inline-flex items-center gap-1"
                    style={{
                      backgroundColor: getStatusColor(selectedTask.status).bg,
                      color: getStatusColor(selectedTask.status).color,
                      border: `1px solid ${getStatusColor(selectedTask.status).border}`
                    }}
                  >
                    {selectedTask.status.charAt(0).toUpperCase() + selectedTask.status.slice(1)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedTask(null)}
                className="p-2 rounded-lg transition-colors"
                style={{ backgroundColor: 'rgba(111, 111, 111, 0.3)' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(111, 111, 111, 0.5)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(111, 111, 111, 0.3)'}
              >
                <XCircle className="w-5 h-5" style={{ color: '#d3d3d3' }} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f' }}>
                  <p style={{ color: '#6f6f6f', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Lead Name</p>
                  <p style={{ color: '#f6f6f6', fontSize: '1rem', fontWeight: '600' }}>{selectedTask.lead}</p>
                </div>
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f' }}>
                  <p style={{ color: '#6f6f6f', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Due Date</p>
                  <p style={{ color: '#f6f6f6', fontSize: '1rem', fontWeight: '600' }}>{selectedTask.dueDate}</p>
                </div>
              </div>

              <div className="p-4 rounded-lg space-y-3" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f' }}>
                <h4 style={{ color: '#FFC300', fontSize: '0.875rem', fontWeight: '600' }}>Contact Information</h4>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>{selectedTask.contact}</span>
                </div>
                {selectedTask.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                    <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>{selectedTask.phone}</span>
                  </div>
                )}
                {selectedTask.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                    <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>{selectedTask.location}</span>
                  </div>
                )}
              </div>

              {selectedTask.description && (
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f' }}>
                  <h4 style={{ color: '#FFC300', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>Description</h4>
                  <p style={{ color: '#d3d3d3', fontSize: '0.875rem', lineHeight: '1.6' }}>{selectedTask.description}</p>
                </div>
              )}

              <div className="flex items-center gap-3 pt-4">
                {selectedTask.status !== 'completed' && (
                  <>
                    <button
                      className="flex-1 px-4 py-3 rounded-lg transition-colors"
                      style={{ backgroundColor: '#FFC300', color: '#023047', fontWeight: '600' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d3d3d3'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFC300'}
                    >
                      {selectedTask.status === 'in-progress' ? 'Continue Task' : 'Start Task'}
                    </button>
                    <button
                      className="flex-1 px-4 py-3 rounded-lg transition-colors"
                      style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300', border: '1px solid #FFC300' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.2)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.1)'}
                    >
                      Mark as Complete
                    </button>
                  </>
                )}
                {selectedTask.status === 'completed' && (
                  <div className="flex-1 px-4 py-3 rounded-lg flex items-center justify-center gap-2" style={{ backgroundColor: 'rgba(255, 195, 0, 0.2)', border: '1px solid #FFC300' }}>
                    <CheckCircle className="w-5 h-5" style={{ color: '#FFC300' }} />
                    <span style={{ color: '#FFC300', fontWeight: '600' }}>Task Completed</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
