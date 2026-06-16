import { useState } from 'react';
import { 
  Search, Filter, Plus, Upload, Send, UserPlus, Building2, Users, 
  School, UserCheck, BookOpen, Mail, Phone, MapPin, Clock, 
  CheckCircle, XCircle, AlertCircle, Trash2, ArrowLeft, X,
  TrendingUp, Target, Bell, Calendar, MessageSquare, Activity,
  Star, Award, GraduationCap, Briefcase, Eye
} from 'lucide-react';
import { FilterModal } from './FilterModal';

type LeadType = 'user' | 'company' | 'tutor' | 'institute' | 'personal-trainer';
type LeadStatus = 'new' | 'contacted' | 'interested' | 'not-interested' | 'converted';
type ActionStatus = 'pending' | 'completed' | 'cancelled';

interface ActionItem {
  id: number;
  leadId: number;
  leadType: LeadType;
  action: string;
  status: ActionStatus;
  dueDate: string;
  assignedTo: string;
  createdDate: string;
  comment?: string;
  completedDate?: string;
}

interface BaseLead {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  source: string;
  addedDate: string;
  status: LeadStatus;
  assignedTo?: string;
  notes?: string;
  actionItems?: number[];
}

interface UserLead extends BaseLead {
  type: 'user';
  skills?: string[];
  experience?: string;
  lookingFor?: string;
}

interface CompanyLead extends BaseLead {
  type: 'company';
  industry: string;
  website: string;
  contactPerson: string;
  employeeCount?: string;
  hiringNeeds?: string;
}

interface TutorLead extends BaseLead {
  type: 'tutor';
  specialization: string[];
  experience: string;
  hourlyRate?: number;
  availability?: string;
}

interface InstituteLead extends BaseLead {
  type: 'institute';
  instituteType: 'coaching-institute' | 'personal-trainer';
  specialization: string[];
  trainingMode: 'virtual' | 'physical' | 'hybrid';
  studentsCapacity?: number;
}

interface PersonalTrainerLead extends BaseLead {
  type: 'personal-trainer';
  expertise: string[];
  certifications?: string[];
  experience: string;
  ratePerSession?: number;
}

type Lead = UserLead | CompanyLead | TutorLead | InstituteLead | PersonalTrainerLead;

interface Employee {
  id: number;
  name: string;
  role: string;
}

export function ColdLeads() {
  const [activeTab, setActiveTab] = useState<LeadType>('user');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [showActionsListModal, setShowActionsListModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showConvertModal, setShowConvertModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [convertData, setConvertData] = useState<{ id: number; type: LeadType; name: string } | null>(null);

  const [filters, setFilters] = useState({
    status: 'all',
    source: 'all',
    assignedTo: 'all',
    location: 'all',
    specialization: 'all',
    industry: 'all'
  });

  const employees: Employee[] = [
    { id: 1, name: 'John Doe', role: 'Sales Manager' },
    { id: 2, name: 'Sarah Smith', role: 'Business Development' },
    { id: 3, name: 'Mike Johnson', role: 'Account Manager' },
    { id: 4, name: 'Emily Davis', role: 'Sales Executive' },
    { id: 5, name: 'David Wilson', role: 'Lead Specialist' },
  ];

  const [leads, setLeads] = useState<Lead[]>([
    { id: 1, type: 'user', name: 'Alex Thompson', email: 'alex.t@email.com', phone: '+91 98765 43210', location: 'Mumbai, Maharashtra', source: 'LinkedIn', addedDate: '2024-12-01', status: 'new', assignedTo: 'John Doe', skills: ['React', 'Node.js'], experience: '3 years', lookingFor: 'Full-time Job' },
    { id: 2, type: 'user', name: 'Maria Garcia', email: 'maria.g@email.com', phone: '+91 98765 43211', location: 'Bangalore, Karnataka', source: 'Indeed', addedDate: '2024-12-02', status: 'contacted', assignedTo: 'Sarah Smith', skills: ['Python', 'Django'], experience: '5 years', lookingFor: 'Remote Work' },
    { id: 3, type: 'user', name: 'James Wilson', email: 'james.w@email.com', phone: '+91 98765 43212', location: 'Delhi, NCR', source: 'Referral', addedDate: '2024-12-03', status: 'interested', assignedTo: 'Mike Johnson', skills: ['Java', 'Spring Boot'], experience: '7 years', lookingFor: 'Senior Position' },
    
    { id: 101, type: 'company', name: 'InnovateTech Solutions', email: 'hr@innovatetech.com', phone: '+91 80 4567 8900', location: 'Hyderabad, Telangana', website: 'www.innovatetech.in', contactPerson: 'Rajesh Kumar', industry: 'Technology', source: 'Cold Outreach', addedDate: '2024-12-01', status: 'contacted', assignedTo: 'Sarah Smith', employeeCount: '50-100', hiringNeeds: 'Developers, Designers' },
    { id: 102, type: 'company', name: 'Green Energy Corp', email: 'info@greenenergy.in', phone: '+91 22 1234 5678', location: 'Pune, Maharashtra', website: 'www.greenenergy.in', contactPerson: 'Priya Sharma', industry: 'Energy', source: 'Conference', addedDate: '2024-12-02', status: 'interested', assignedTo: 'John Doe', employeeCount: '100-200', hiringNeeds: 'Engineers, Sales' },
    
    { id: 201, type: 'tutor', name: 'Dr. Sarah Johnson', email: 'sarah.j@email.com', phone: '+91 98765 11111', location: 'Chennai, Tamil Nadu', source: 'Website', addedDate: '2024-12-01', status: 'new', assignedTo: 'Emily Davis', specialization: ['React Development', 'JavaScript', 'Web Performance'], experience: '10 years', hourlyRate: 2000, availability: 'Weekdays 6-9 PM' },
    { id: 202, type: 'tutor', name: 'Prof. Michael Chen', email: 'michael.c@email.com', phone: '+91 98765 22222', location: 'Kolkata, West Bengal', source: 'LinkedIn', addedDate: '2024-12-02', status: 'contacted', assignedTo: 'David Wilson', specialization: ['Python', 'Data Science', 'Machine Learning'], experience: '12 years', hourlyRate: 2500, availability: 'Flexible' },
    
    { id: 301, type: 'institute', name: 'Elite Coaching Academy', email: 'info@elitecoaching.in', phone: '+91 11 2345 6789', location: 'Gurgaon, Haryana', source: 'Referral', addedDate: '2024-12-01', status: 'interested', assignedTo: 'John Doe', instituteType: 'coaching-institute', specialization: ['Engineering Entrance', 'Medical Entrance', 'MBA Prep'], trainingMode: 'hybrid', studentsCapacity: 500 },
    { id: 302, type: 'institute', name: 'Tech Training Hub', email: 'contact@techtraining.in', phone: '+91 80 9876 5432', location: 'Bangalore, Karnataka', source: 'Cold Outreach', addedDate: '2024-12-02', status: 'contacted', assignedTo: 'Sarah Smith', instituteType: 'coaching-institute', specialization: ['Web Development', 'Data Science', 'Cloud Computing'], trainingMode: 'virtual', studentsCapacity: 200 },
    
    { id: 401, type: 'personal-trainer', name: 'Fitness Coach Arjun', email: 'arjun@fitpro.in', phone: '+91 98765 33333', location: 'Mumbai, Maharashtra', source: 'Instagram', addedDate: '2024-12-01', status: 'new', assignedTo: 'Emily Davis', expertise: ['Weight Training', 'Cardio', 'Nutrition'], experience: '8 years', certifications: ['ACE Certified', 'NASM'], ratePerSession: 1500 },
    { id: 402, type: 'personal-trainer', name: 'Yoga Guru Priya', email: 'priya@yogabliss.in', phone: '+91 98765 44444', location: 'Pune, Maharashtra', source: 'Referral', addedDate: '2024-12-02', status: 'contacted', assignedTo: 'David Wilson', expertise: ['Yoga', 'Meditation', 'Pranayama'], experience: '15 years', certifications: ['RYT 500', 'Ayurveda Certified'], ratePerSession: 1200 },
  ]);

  const [actionItems, setActionItems] = useState<ActionItem[]>([
    { id: 1, leadId: 1, leadType: 'user', action: 'Send introductory email', status: 'pending', dueDate: '2025-01-10', assignedTo: 'John Doe', createdDate: '2025-01-07', comment: 'Personalized message about job opportunities' },
    { id: 2, leadId: 101, leadType: 'company', action: 'Send company brochure', status: 'pending', dueDate: '2025-01-11', assignedTo: 'Sarah Smith', createdDate: '2025-01-07', comment: 'Follow up on tech hiring needs' },
    { id: 3, leadId: 201, leadType: 'tutor', action: 'Schedule demo session', status: 'pending', dueDate: '2025-01-12', assignedTo: 'Emily Davis', createdDate: '2025-01-07' },
  ]);

  const [newAction, setNewAction] = useState({
    action: '',
    dueDate: '',
    assignedTo: '',
    comment: ''
  });

  const [selectedAssignee, setSelectedAssignee] = useState('');

  const filteredLeads = leads.filter(lead => {
    if (lead.type !== activeTab) return false;
    
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filters.status === 'all' || lead.status === filters.status;
    const matchesSource = filters.source === 'all' || lead.source === filters.source;
    const matchesAssignedTo = filters.assignedTo === 'all' || 
                              (filters.assignedTo === 'unassigned' ? !lead.assignedTo : lead.assignedTo === filters.assignedTo);
    const matchesLocation = filters.location === 'all' || lead.location.includes(filters.location);
    
    if (lead.type === 'company' && filters.industry !== 'all') {
      return matchesSearch && matchesStatus && matchesSource && matchesAssignedTo && matchesLocation && lead.industry === filters.industry;
    }
    
    if ((lead.type === 'tutor' || lead.type === 'institute') && filters.specialization !== 'all') {
      const specs = lead.specialization || [];
      return matchesSearch && matchesStatus && matchesSource && matchesAssignedTo && matchesLocation && specs.some(s => s.includes(filters.specialization));
    }
    
    return matchesSearch && matchesStatus && matchesSource && matchesAssignedTo && matchesLocation;
  });

  const stats = {
    totalUsers: leads.filter(l => l.type === 'user').length,
    totalCompanies: leads.filter(l => l.type === 'company').length,
    totalTutors: leads.filter(l => l.type === 'tutor').length,
    totalInstitutes: leads.filter(l => l.type === 'institute').length,
    totalPersonalTrainers: leads.filter(l => l.type === 'personal-trainer').length,
    newLeads: leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    interested: leads.filter(l => l.status === 'interested').length,
    converted: leads.filter(l => l.status === 'converted').length,
    pendingActions: actionItems.filter(a => a.status === 'pending').length,
  };

  const getStatusColor = (status: LeadStatus) => {
    switch (status) {
      case 'new':
        return { bg: '#FFC300', color: '#023047' };
      case 'contacted':
        return { bg: '#6f6f6f', color: '#f6f6f6' };
      case 'interested':
        return { bg: '#22c55e', color: '#f6f6f6' };
      case 'not-interested':
        return { bg: '#ef4444', color: '#f6f6f6' };
      case 'converted':
        return { bg: '#023047', color: '#FFC300' };
      default:
        return { bg: '#6f6f6f', color: '#f6f6f6' };
    }
  };

  const getTabIcon = (type: LeadType) => {
    switch (type) {
      case 'user': return Users;
      case 'company': return Building2;
      case 'tutor': return UserCheck;
      case 'institute': return School;
      case 'personal-trainer': return Award;
      default: return Users;
    }
  };

  const getTabLabel = (type: LeadType) => {
    switch (type) {
      case 'user': return 'Users';
      case 'company': return 'Companies';
      case 'tutor': return 'Tutors';
      case 'institute': return 'Institutes';
      case 'personal-trainer': return 'Personal Trainers';
      default: return 'Users';
    }
  };

  const getTabCount = (type: LeadType) => {
    switch (type) {
      case 'user': return stats.totalUsers;
      case 'company': return stats.totalCompanies;
      case 'tutor': return stats.totalTutors;
      case 'institute': return stats.totalInstitutes;
      case 'personal-trainer': return stats.totalPersonalTrainers;
      default: return 0;
    }
  };

  const handleConvertLead = (lead: Lead) => {
    setConvertData({ id: lead.id, type: lead.type, name: lead.name });
    setShowConvertModal(true);
  };

  const confirmConvert = () => {
    if (!convertData) return;

    setLeads(leads.map(l => 
      l.id === convertData.id && l.type === convertData.type
        ? { ...l, status: 'converted' as LeadStatus }
        : l
    ));

    const destination = {
      'user': 'User Management',
      'company': 'Companies',
      'tutor': 'Tutors',
      'institute': 'Institutes',
      'personal-trainer': 'Personal Trainers'
    };

    alert(`${convertData.name} has been converted and moved to ${destination[convertData.type]}!`);

    setShowConvertModal(false);
    setConvertData(null);
  };

  const handleDelete = (id: number, type: LeadType) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      setLeads(leads.filter(l => !(l.id === id && l.type === type)));
    }
  };

  const handleAssignLead = () => {
    if (!selectedLead || !selectedAssignee) return;

    setLeads(leads.map(l => 
      l.id === selectedLead.id && l.type === selectedLead.type
        ? { ...l, assignedTo: selectedAssignee }
        : l
    ));

    setShowAssignModal(false);
    setSelectedLead(null);
    setSelectedAssignee('');
  };

  const handleCreateAction = () => {
    if (!selectedLead) return;

    const actionId = actionItems.length + 1;
    const newActionItem: ActionItem = {
      id: actionId,
      leadId: selectedLead.id,
      leadType: selectedLead.type,
      action: newAction.action,
      status: 'pending',
      dueDate: newAction.dueDate,
      assignedTo: newAction.assignedTo,
      createdDate: new Date().toISOString().split('T')[0],
      comment: newAction.comment
    };

    setActionItems([...actionItems, newActionItem]);
    setShowActionModal(false);
    setNewAction({ action: '', dueDate: '', assignedTo: '', comment: '' });
  };

  const getLeadActions = (leadId: number, leadType: LeadType) => {
    return actionItems.filter(a => a.leadId === leadId && a.leadType === leadType);
  };

  const handleCompleteAction = (actionId: number) => {
    setActionItems(actionItems.map(a => 
      a.id === actionId 
        ? { ...a, status: 'completed' as ActionStatus, completedDate: new Date().toISOString().split('T')[0] }
        : a
    ));
  };

  const renderLeadTypeSpecificInfo = (lead: Lead) => {
    switch (lead.type) {
      case 'user':
        return (
          <div className="space-y-2">
            {lead.skills && (
              <div className="flex items-start gap-2">
                <BookOpen className="w-4 h-4 mt-1" style={{ color: '#6f6f6f' }} />
                <div>
                  <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Skills</p>
                  <p style={{ color: '#f6f6f6' }}>{lead.skills.join(', ')}</p>
                </div>
              </div>
            )}
            {lead.experience && (
              <div className="flex items-start gap-2">
                <Award className="w-4 h-4 mt-1" style={{ color: '#6f6f6f' }} />
                <div>
                  <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Experience</p>
                  <p style={{ color: '#f6f6f6' }}>{lead.experience}</p>
                </div>
              </div>
            )}
            {lead.lookingFor && (
              <div className="flex items-start gap-2">
                <Target className="w-4 h-4 mt-1" style={{ color: '#6f6f6f' }} />
                <div>
                  <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Looking For</p>
                  <p style={{ color: '#f6f6f6' }}>{lead.lookingFor}</p>
                </div>
              </div>
            )}
          </div>
        );
      
      case 'company':
        return (
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Building2 className="w-4 h-4 mt-1" style={{ color: '#6f6f6f' }} />
              <div>
                <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Industry</p>
                <p style={{ color: '#f6f6f6' }}>{lead.industry}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Users className="w-4 h-4 mt-1" style={{ color: '#6f6f6f' }} />
              <div>
                <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Employee Count</p>
                <p style={{ color: '#f6f6f6' }}>{lead.employeeCount || 'Not specified'}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Briefcase className="w-4 h-4 mt-1" style={{ color: '#6f6f6f' }} />
              <div>
                <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Hiring Needs</p>
                <p style={{ color: '#f6f6f6' }}>{lead.hiringNeeds || 'Not specified'}</p>
              </div>
            </div>
          </div>
        );
      
      case 'tutor':
        return (
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <BookOpen className="w-4 h-4 mt-1" style={{ color: '#6f6f6f' }} />
              <div>
                <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Specialization</p>
                <p style={{ color: '#f6f6f6' }}>{lead.specialization.join(', ')}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Award className="w-4 h-4 mt-1" style={{ color: '#6f6f6f' }} />
              <div>
                <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Experience</p>
                <p style={{ color: '#f6f6f6' }}>{lead.experience}</p>
              </div>
            </div>
            {lead.hourlyRate && (
              <div className="flex items-start gap-2">
                <span className="text-lg mt-1">₹</span>
                <div>
                  <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Hourly Rate</p>
                  <p style={{ color: '#FFC300', fontWeight: '600' }}>₹{lead.hourlyRate}/hour</p>
                </div>
              </div>
            )}
          </div>
        );
      
      case 'institute':
        return (
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <School className="w-4 h-4 mt-1" style={{ color: '#6f6f6f' }} />
              <div>
                <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Type</p>
                <p style={{ color: '#f6f6f6' }}>{lead.instituteType === 'coaching-institute' ? 'Coaching Institute' : 'Personal Trainer'}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <BookOpen className="w-4 h-4 mt-1" style={{ color: '#6f6f6f' }} />
              <div>
                <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Specialization</p>
                <p style={{ color: '#f6f6f6' }}>{lead.specialization.join(', ')}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Activity className="w-4 h-4 mt-1" style={{ color: '#6f6f6f' }} />
              <div>
                <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Training Mode</p>
                <p style={{ color: '#f6f6f6' }}>{lead.trainingMode}</p>
              </div>
            </div>
          </div>
        );
      
      case 'personal-trainer':
        return (
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Award className="w-4 h-4 mt-1" style={{ color: '#6f6f6f' }} />
              <div>
                <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Expertise</p>
                <p style={{ color: '#f6f6f6' }}>{lead.expertise.join(', ')}</p>
              </div>
            </div>
            {lead.certifications && (
              <div className="flex items-start gap-2">
                <Star className="w-4 h-4 mt-1" style={{ color: '#6f6f6f' }} />
                <div>
                  <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Certifications</p>
                  <p style={{ color: '#f6f6f6' }}>{lead.certifications.join(', ')}</p>
                </div>
              </div>
            )}
            {lead.ratePerSession && (
              <div className="flex items-start gap-2">
                <span className="text-lg mt-1">₹</span>
                <div>
                  <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Rate Per Session</p>
                  <p style={{ color: '#FFC300', fontWeight: '600' }}>₹{lead.ratePerSession}/session</p>
                </div>
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  const tabTypes: LeadType[] = ['user', 'company', 'tutor', 'institute', 'personal-trainer'];

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
            Cold Leads Management
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
              {leads.length}
            </p>
            <p style={{ color: '#6f6f6f' }}>Total Leads</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300"
            style={{ backgroundColor: '#FFC300', color: '#023047', fontWeight: '600' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 195, 0, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <Plus className="w-5 h-5" />
            Add Lead
          </button>
          <button 
            className="flex items-center gap-2 px-4 py-3 rounded-lg transition-colors"
            style={{ border: '1px solid #6f6f6f', color: '#d3d3d3' }}
          >
            <Upload className="w-5 h-5" />
            Import CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', background: 'radial-gradient(circle at top right, rgba(255, 195, 0, 0.1), #023047)' }}>
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
              <UserPlus className="w-6 h-6" style={{ color: '#023047' }} />
            </div>
          </div>
          <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>New Leads</p>
          <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '2rem', fontWeight: '700' }}>{stats.newLeads}</p>
          <p className="mt-2" style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>Require attention</p>
        </div>

        <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#6f6f6f' }}>
              <Phone className="w-6 h-6" style={{ color: '#f6f6f6' }} />
            </div>
          </div>
          <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Contacted</p>
          <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '2rem', fontWeight: '700' }}>{stats.contacted}</p>
          <p className="mt-2" style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>In progress</p>
        </div>

        <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#22c55e' }}>
              <CheckCircle className="w-6 h-6" style={{ color: '#f6f6f6' }} />
            </div>
          </div>
          <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Interested</p>
          <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '2rem', fontWeight: '700' }}>{stats.interested}</p>
          <p className="mt-2" style={{ color: '#22c55e', fontSize: '0.75rem' }}>Ready to convert</p>
        </div>

        <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#023047', border: '2px solid #FFC300' }}>
              <TrendingUp className="w-6 h-6" style={{ color: '#FFC300' }} />
            </div>
          </div>
          <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Converted</p>
          <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '2rem', fontWeight: '700' }}>{stats.converted}</p>
          <p className="mt-2" style={{ color: '#FFC300', fontSize: '0.75rem' }}>Success rate</p>
        </div>

        <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#8b5cf6' }}>
              <Clock className="w-6 h-6" style={{ color: '#f6f6f6' }} />
            </div>
          </div>
          <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Pending Actions</p>
          <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '2rem', fontWeight: '700' }}>{stats.pendingActions}</p>
          <p className="mt-2" style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>Follow-ups needed</p>
        </div>
      </div>

      <div style={{ borderBottom: '1px solid #6f6f6f' }}>
        <div className="flex gap-6 overflow-x-auto">
          {tabTypes.map((type) => {
            const Icon = getTabIcon(type);
            const count = getTabCount(type);
            return (
              <button
                key={type}
                onClick={() => setActiveTab(type)}
                className="pb-3 px-1 transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
                style={{
                  borderBottom: activeTab === type ? '2px solid #FFC300' : '2px solid transparent',
                  color: activeTab === type ? '#FFC300' : '#d3d3d3'
                }}
              >
                <Icon className="w-5 h-5" />
                {getTabLabel(type)} ({count})
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-lg p-4" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[300px] relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#6f6f6f' }} />
            <input
              type="text"
              placeholder={`Search ${getTabLabel(activeTab).toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none"
              style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
            />
          </div>
          <button 
            onClick={() => setShowFilterModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors" 
            style={{ border: '1px solid #6f6f6f', color: '#d3d3d3' }}
          >
            <Filter className="w-5 h-5" />
            Filters
            {Object.values(filters).filter(f => f !== 'all').length > 0 && (
              <span className="px-2 py-1 rounded-full text-xs" style={{ backgroundColor: '#FFC300', color: '#023047' }}>
                {Object.values(filters).filter(f => f !== 'all').length}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="rounded-lg overflow-hidden" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: '#023047', borderBottom: '2px solid #6f6f6f' }}>
              <tr>
                <th className="px-6 py-4 text-left" style={{ color: '#FFC300', fontWeight: '600' }}>Name</th>
                <th className="px-6 py-4 text-left" style={{ color: '#FFC300', fontWeight: '600' }}>Contact</th>
                <th className="px-6 py-4 text-left" style={{ color: '#FFC300', fontWeight: '600' }}>Location</th>
                <th className="px-6 py-4 text-left" style={{ color: '#FFC300', fontWeight: '600' }}>Status</th>
                <th className="px-6 py-4 text-left" style={{ color: '#FFC300', fontWeight: '600' }}>Source</th>
                <th className="px-6 py-4 text-left" style={{ color: '#FFC300', fontWeight: '600' }}>Assigned To</th>
                <th className="px-6 py-4 text-left" style={{ color: '#FFC300', fontWeight: '600' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => {
                const statusColor = getStatusColor(lead.status);
                const leadActions = getLeadActions(lead.id, lead.type);
                
                return (
                  <tr 
                    key={`${lead.type}-${lead.id}`}
                    className="cursor-pointer transition-all duration-200"
                    style={{ borderBottom: '1px solid #6f6f6f' }}
                    onClick={() => {
                      setSelectedLead(lead);
                      setShowDetailModal(true);
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FFC300' }}>
                          {(() => {
                            const Icon = getTabIcon(lead.type);
                            return <Icon className="w-5 h-5" style={{ color: '#023047' }} />;
                          })()}
                        </div>
                        <div>
                          <p style={{ color: '#f6f6f6', fontWeight: '600' }}>{lead.name}</p>
                          <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>
                            Added {new Date(lead.addedDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Mail className="w-3 h-3" style={{ color: '#6f6f6f' }} />
                          <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>{lead.email}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-3 h-3" style={{ color: '#6f6f6f' }} />
                          <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>{lead.phone}</p>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                        <p style={{ color: '#f6f6f6' }}>{lead.location}</p>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 rounded-full text-xs" style={{ 
                        backgroundColor: statusColor.bg, 
                        color: statusColor.color,
                        fontWeight: '600'
                      }}>
                        {lead.status}
                      </span>
                    </td>
                    
                    <td className="px-6 py-4">
                      <p style={{ color: '#f6f6f6' }}>{lead.source}</p>
                    </td>
                    
                    <td className="px-6 py-4">
                      {lead.assignedTo ? (
                        <div className="flex items-center gap-2">
                          <UserCheck className="w-4 h-4" style={{ color: '#FFC300' }} />
                          <p style={{ color: '#FFC300', fontSize: '0.875rem' }}>{lead.assignedTo}</p>
                        </div>
                      ) : (
                        <p style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Unassigned</p>
                      )}
                      {leadActions.length > 0 && (
                        <div className="flex items-center gap-2 mt-1">
                          <Activity className="w-3 h-3" style={{ color: '#8b5cf6' }} />
                          <p style={{ color: '#8b5cf6', fontSize: '0.75rem' }}>
                            {leadActions.filter(a => a.status === 'pending').length} pending
                          </p>
                        </div>
                      )}
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedLead(lead);
                            setShowAssignModal(true);
                          }}
                          className="p-2 rounded-lg transition-colors"
                          style={{ border: '1px solid #6f6f6f' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#FFC300';
                            e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.1)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = '#6f6f6f';
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }}
                        >
                          <UserPlus className="w-4 h-4" style={{ color: '#d3d3d3' }} />
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleConvertLead(lead);
                          }}
                          className="p-2 rounded-lg transition-colors"
                          style={{ border: '1px solid #22c55e' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(34, 197, 94, 0.1)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }}
                        >
                          <CheckCircle className="w-4 h-4" style={{ color: '#22c55e' }} />
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(lead.id, lead.type);
                          }}
                          className="p-2 rounded-lg transition-colors"
                          style={{ border: '1px solid #ef4444' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }}
                        >
                          <Trash2 className="w-4 h-4" style={{ color: '#ef4444' }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredLeads.length === 0 && (
        <div className="rounded-lg p-12 text-center" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
          <AlertCircle className="w-12 h-12 mx-auto mb-4" style={{ color: '#6f6f6f' }} />
          <p style={{ color: '#d3d3d3', fontSize: '1.125rem' }}>No leads found</p>
          <p style={{ color: '#6f6f6f', fontSize: '0.875rem', marginTop: '0.5rem' }}>
            Try adjusting your search or filters
          </p>
        </div>
      )}

      <FilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        filterGroups={[
          {
            id: 'status',
            label: 'Status',
            type: 'buttons',
            options: [
              { label: 'All', value: 'all' },
              { label: 'New', value: 'new' },
              { label: 'Contacted', value: 'contacted' },
              { label: 'Interested', value: 'interested' },
              { label: 'Not Interested', value: 'not-interested' },
              { label: 'Converted', value: 'converted' }
            ]
          },
          {
            id: 'source',
            label: 'Source',
            type: 'buttons',
            options: [
              { label: 'All', value: 'all' },
              { label: 'LinkedIn', value: 'LinkedIn' },
              { label: 'Indeed', value: 'Indeed' },
              { label: 'Referral', value: 'Referral' },
              { label: 'Website', value: 'Website' },
              { label: 'Cold Outreach', value: 'Cold Outreach' },
              { label: 'Conference', value: 'Conference' },
              { label: 'Instagram', value: 'Instagram' },
              { label: 'Job Fair', value: 'Job Fair' }
            ]
          },
          {
            id: 'assignedTo',
            label: 'Assigned To',
            type: 'buttons',
            options: [
              { label: 'All', value: 'all' },
              { label: 'Unassigned', value: 'unassigned' },
              ...employees.map(emp => ({ label: emp.name, value: emp.name }))
            ]
          },
          {
            id: 'location',
            label: 'Location',
            type: 'search',
            options: [
              { label: 'All', value: 'all' },
              ...Array.from(new Set(leads.map(lead => lead.location))).map(loc => ({ label: loc, value: loc }))
            ]
          }
        ]}
        activeFilters={filters}
        onFilterChange={(filterId, value) => {
          setFilters({ ...filters, [filterId]: value });
        }}
        onReset={() => {
          setFilters({
            status: 'all',
            source: 'all',
            assignedTo: 'all',
            location: 'all',
            specialization: 'all',
            industry: 'all'
          });
        }}
      />

      {showDetailModal && selectedLead && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
          onClick={() => setShowDetailModal(false)}
        >
          <div 
            className="rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            style={{ backgroundColor: '#023047', border: '2px solid #FFC300' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
                  {(() => {
                    const Icon = getTabIcon(selectedLead.type);
                    return <Icon className="w-8 h-8" style={{ color: '#023047' }} />;
                  })()}
                </div>
                <div>
                  <h2 style={{ color: '#FFC300', fontSize: '1.5rem', fontWeight: '700' }}>{selectedLead.name}</h2>
                  <p style={{ color: '#d3d3d3' }}>{getTabLabel(selectedLead.type)}</p>
                </div>
              </div>
              <button onClick={() => setShowDetailModal(false)}>
                <X className="w-6 h-6" style={{ color: '#d3d3d3' }} />
              </button>
            </div>

            <div className="mb-6">
              <span className="inline-block px-4 py-2 rounded-lg text-sm" style={{ 
                backgroundColor: getStatusColor(selectedLead.status).bg, 
                color: getStatusColor(selectedLead.status).color,
                fontWeight: '600'
              }}>
                Status: {selectedLead.status.toUpperCase()}
              </span>
            </div>

            <div className="mb-6">
              <h3 style={{ color: '#FFC300', fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Mail className="w-4 h-4 mt-1" style={{ color: '#6f6f6f' }} />
                  <div>
                    <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Email</p>
                    <p style={{ color: '#f6f6f6' }}>{selectedLead.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 mt-1" style={{ color: '#6f6f6f' }} />
                  <div>
                    <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Phone</p>
                    <p style={{ color: '#f6f6f6' }}>{selectedLead.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-1" style={{ color: '#6f6f6f' }} />
                  <div>
                    <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Location</p>
                    <p style={{ color: '#f6f6f6' }}>{selectedLead.location}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 style={{ color: '#FFC300', fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
                {getTabLabel(selectedLead.type)} Details
              </h3>
              {renderLeadTypeSpecificInfo(selectedLead)}
            </div>

            <div className="mb-6">
              <h3 style={{ color: '#FFC300', fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Lead Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Source</p>
                  <p style={{ color: '#f6f6f6' }}>{selectedLead.source}</p>
                </div>
                <div>
                  <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Added Date</p>
                  <p style={{ color: '#f6f6f6' }}>{new Date(selectedLead.addedDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Assigned To</p>
                  <p style={{ color: '#f6f6f6' }}>{selectedLead.assignedTo || 'Unassigned'}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 flex-wrap">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDetailModal(false);
                  setShowActionModal(true);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
                style={{ backgroundColor: '#FFC300', color: '#023047', fontWeight: '600' }}
              >
                <Plus className="w-4 h-4" />
                Add Action
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDetailModal(false);
                  setShowAssignModal(true);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
                style={{ border: '1px solid #6f6f6f', color: '#d3d3d3' }}
              >
                <UserCheck className="w-4 h-4" />
                Assign
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleConvertLead(selectedLead);
                  setShowDetailModal(false);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
                style={{ border: '1px solid #22c55e', color: '#22c55e' }}
              >
                <CheckCircle className="w-4 h-4" />
                Convert Lead
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(selectedLead.id, selectedLead.type);
                  setShowDetailModal(false);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
                style={{ border: '1px solid #ef4444', color: '#ef4444' }}
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showConvertModal && convertData && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
          onClick={() => setShowConvertModal(false)}
        >
          <div 
            className="rounded-lg p-6 max-w-md w-full"
            style={{ backgroundColor: '#023047', border: '2px solid #22c55e' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ color: '#22c55e', fontSize: '1.25rem', fontWeight: '700' }}>Convert Lead</h3>
              <button onClick={() => setShowConvertModal(false)}>
                <X className="w-6 h-6" style={{ color: '#d3d3d3' }} />
              </button>
            </div>
            <p style={{ color: '#f6f6f6', marginBottom: '1.5rem' }}>
              Are you sure you want to convert <span style={{ color: '#FFC300', fontWeight: '600' }}>{convertData.name}</span> to an active {getTabLabel(convertData.type).toLowerCase().slice(0, -1)}?
            </p>
            <div className="flex gap-3">
              <button
                onClick={confirmConvert}
                className="flex-1 px-4 py-2 rounded-lg transition-colors"
                style={{ backgroundColor: '#22c55e', color: '#f6f6f6', fontWeight: '600' }}
              >
                Confirm Convert
              </button>
              <button
                onClick={() => setShowConvertModal(false)}
                className="flex-1 px-4 py-2 rounded-lg transition-colors"
                style={{ border: '1px solid #6f6f6f', color: '#d3d3d3' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showAssignModal && selectedLead && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
          onClick={() => setShowAssignModal(false)}
        >
          <div 
            className="rounded-lg p-6 max-w-md w-full"
            style={{ backgroundColor: '#023047', border: '2px solid #FFC300' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ color: '#FFC300', fontSize: '1.25rem', fontWeight: '700' }}>Assign Lead</h3>
              <button onClick={() => setShowAssignModal(false)}>
                <X className="w-6 h-6" style={{ color: '#d3d3d3' }} />
              </button>
            </div>
            <div className="mb-4">
              <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                Assign to Employee
              </label>
              <select
                value={selectedAssignee}
                onChange={(e) => setSelectedAssignee(e.target.value)}
                className="w-full px-4 py-2 rounded-lg focus:outline-none"
                style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
              >
                <option value="">Select Employee</option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.name}>{emp.name} - {emp.role}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleAssignLead}
                disabled={!selectedAssignee}
                className="flex-1 px-4 py-2 rounded-lg transition-colors"
                style={{ 
                  backgroundColor: selectedAssignee ? '#FFC300' : '#6f6f6f', 
                  color: '#023047', 
                  fontWeight: '600',
                  cursor: selectedAssignee ? 'pointer' : 'not-allowed'
                }}
              >
                Assign
              </button>
              <button
                onClick={() => setShowAssignModal(false)}
                className="flex-1 px-4 py-2 rounded-lg transition-colors"
                style={{ border: '1px solid #6f6f6f', color: '#d3d3d3' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showActionModal && selectedLead && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
          onClick={() => setShowActionModal(false)}
        >
          <div 
            className="rounded-lg p-6 max-w-md w-full"
            style={{ backgroundColor: '#023047', border: '2px solid #FFC300' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ color: '#FFC300', fontSize: '1.25rem', fontWeight: '700' }}>Create Action Item</h3>
              <button onClick={() => setShowActionModal(false)}>
                <X className="w-6 h-6" style={{ color: '#d3d3d3' }} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                  Action Description
                </label>
                <input
                  type="text"
                  value={newAction.action}
                  onChange={(e) => setNewAction({ ...newAction, action: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg focus:outline-none"
                  style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                  placeholder="e.g., Send introductory email"
                />
              </div>

              <div>
                <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                  Due Date
                </label>
                <input
                  type="date"
                  value={newAction.dueDate}
                  onChange={(e) => setNewAction({ ...newAction, dueDate: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg focus:outline-none"
                  style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                />
              </div>

              <div>
                <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                  Assign To
                </label>
                <select
                  value={newAction.assignedTo}
                  onChange={(e) => setNewAction({ ...newAction, assignedTo: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg focus:outline-none"
                  style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.name}>{emp.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                  Comment (Optional)
                </label>
                <textarea
                  value={newAction.comment}
                  onChange={(e) => setNewAction({ ...newAction, comment: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg focus:outline-none"
                  style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                  rows={3}
                  placeholder="Additional notes..."
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleCreateAction}
                disabled={!newAction.action || !newAction.dueDate || !newAction.assignedTo}
                className="flex-1 px-4 py-2 rounded-lg transition-colors"
                style={{ 
                  backgroundColor: (newAction.action && newAction.dueDate && newAction.assignedTo) ? '#FFC300' : '#6f6f6f', 
                  color: '#023047', 
                  fontWeight: '600',
                  cursor: (newAction.action && newAction.dueDate && newAction.assignedTo) ? 'pointer' : 'not-allowed'
                }}
              >
                Create Action
              </button>
              <button
                onClick={() => setShowActionModal(false)}
                className="flex-1 px-4 py-2 rounded-lg transition-colors"
                style={{ border: '1px solid #6f6f6f', color: '#d3d3d3' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
          onClick={() => setShowAddModal(false)}
        >
          <div 
            className="rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            style={{ backgroundColor: '#023047', border: '2px solid #FFC300' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 style={{ color: '#FFC300', fontSize: '1.5rem', fontWeight: '700' }}>Add New Lead</h3>
              <button onClick={() => setShowAddModal(false)}>
                <X className="w-6 h-6" style={{ color: '#d3d3d3' }} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                  Lead Type *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {tabTypes.map((type) => {
                    const Icon = getTabIcon(type);
                    return (
                      <button
                        key={type}
                        onClick={() => setActiveTab(type)}
                        className="flex items-center gap-2 p-3 rounded-lg transition-all"
                        style={{
                          backgroundColor: activeTab === type ? '#FFC300' : '#023047',
                          border: `1px solid ${activeTab === type ? '#FFC300' : '#6f6f6f'}`,
                          color: activeTab === type ? '#023047' : '#d3d3d3'
                        }}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-sm font-medium">{getTabLabel(type)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                    Name *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg focus:outline-none"
                    style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                    placeholder="Full name"
                  />
                </div>

                <div>
                  <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 rounded-lg focus:outline-none"
                    style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                    Phone *
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 rounded-lg focus:outline-none"
                    style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                    Location *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg focus:outline-none"
                    style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                    placeholder="City, State"
                  />
                </div>

                <div>
                  <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                    Source *
                  </label>
                  <select
                    className="w-full px-4 py-2 rounded-lg focus:outline-none"
                    style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                  >
                    <option value="">Select source</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Indeed">Indeed</option>
                    <option value="Referral">Referral</option>
                    <option value="Website">Website</option>
                    <option value="Cold Outreach">Cold Outreach</option>
                    <option value="Conference">Conference</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Job Fair">Job Fair</option>
                  </select>
                </div>

                <div>
                  <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                    Assign To (Optional)
                  </label>
                  <select
                    className="w-full px-4 py-2 rounded-lg focus:outline-none"
                    style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                  >
                    <option value="">Unassigned</option>
                    {employees.map((emp) => (
                      <option key={emp.id} value={emp.name}>{emp.name} - {emp.role}</option>
                    ))}
                  </select>
                </div>
              </div>

              {activeTab === 'user' && (
                <div className="pt-4 border-t" style={{ borderColor: '#6f6f6f' }}>
                  <h4 style={{ color: '#FFC300', fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>User Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                        Skills
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg focus:outline-none"
                        style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                        placeholder="React, Node.js, Python"
                      />
                    </div>
                    <div>
                      <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                        Experience
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg focus:outline-none"
                        style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                        placeholder="5 years"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                        Looking For
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg focus:outline-none"
                        style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                        placeholder="Full-time Job, Remote Work, etc."
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'company' && (
                <div className="pt-4 border-t" style={{ borderColor: '#6f6f6f' }}>
                  <h4 style={{ color: '#FFC300', fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>Company Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                        Industry *
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg focus:outline-none"
                        style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                        placeholder="Technology, Healthcare, etc."
                      />
                    </div>
                    <div>
                      <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                        Website
                      </label>
                      <input
                        type="url"
                        className="w-full px-4 py-2 rounded-lg focus:outline-none"
                        style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                        placeholder="www.company.com"
                      />
                    </div>
                    <div>
                      <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                        Contact Person
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg focus:outline-none"
                        style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                        placeholder="HR Manager name"
                      />
                    </div>
                    <div>
                      <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                        Employee Count
                      </label>
                      <select
                        className="w-full px-4 py-2 rounded-lg focus:outline-none"
                        style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                      >
                        <option value="">Select range</option>
                        <option value="1-10">1-10</option>
                        <option value="11-50">11-50</option>
                        <option value="51-100">51-100</option>
                        <option value="101-500">101-500</option>
                        <option value="500+">500+</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                        Hiring Needs
                      </label>
                      <textarea
                        className="w-full px-4 py-2 rounded-lg focus:outline-none"
                        style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                        rows={2}
                        placeholder="Developers, Designers, Marketing, etc."
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'tutor' && (
                <div className="pt-4 border-t" style={{ borderColor: '#6f6f6f' }}>
                  <h4 style={{ color: '#FFC300', fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>Tutor Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                        Specialization
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg focus:outline-none"
                        style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                        placeholder="React, Python, Data Science"
                      />
                    </div>
                    <div>
                      <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                        Experience
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg focus:outline-none"
                        style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                        placeholder="10 years"
                      />
                    </div>
                    <div>
                      <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                        Hourly Rate (₹)
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-2 rounded-lg focus:outline-none"
                        style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                        placeholder="2000"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                        Availability
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg focus:outline-none"
                        style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                        placeholder="Weekdays 6-9 PM, Flexible"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'institute' && (
                <div className="pt-4 border-t" style={{ borderColor: '#6f6f6f' }}>
                  <h4 style={{ color: '#FFC300', fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>Institute Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                        Institute Type
                      </label>
                      <select
                        className="w-full px-4 py-2 rounded-lg focus:outline-none"
                        style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                      >
                        <option value="coaching-institute">Coaching Institute</option>
                        <option value="personal-trainer">Personal Trainer</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                        Training Mode
                      </label>
                      <select
                        className="w-full px-4 py-2 rounded-lg focus:outline-none"
                        style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                      >
                        <option value="virtual">Virtual</option>
                        <option value="physical">Physical</option>
                        <option value="hybrid">Hybrid</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                        Specialization
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg focus:outline-none"
                        style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                        placeholder="Engineering Entrance, Web Development, etc."
                      />
                    </div>
                    <div>
                      <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                        Student Capacity
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-2 rounded-lg focus:outline-none"
                        style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                        placeholder="500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'personal-trainer' && (
                <div className="pt-4 border-t" style={{ borderColor: '#6f6f6f' }}>
                  <h4 style={{ color: '#FFC300', fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>Personal Trainer Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                        Expertise
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg focus:outline-none"
                        style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                        placeholder="Weight Training, Yoga, Cardio"
                      />
                    </div>
                    <div>
                      <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                        Experience
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg focus:outline-none"
                        style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                        placeholder="8 years"
                      />
                    </div>
                    <div>
                      <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                        Rate Per Session (₹)
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-2 rounded-lg focus:outline-none"
                        style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                        placeholder="1500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                        Certifications
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg focus:outline-none"
                        style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                        placeholder="ACE Certified, NASM, RYT 500"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                  Notes (Optional)
                </label>
                <textarea
                  className="w-full px-4 py-2 rounded-lg focus:outline-none"
                  style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                  rows={3}
                  placeholder="Additional information about this lead..."
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  alert('Lead added successfully!');
                  setShowAddModal(false);
                }}
                className="flex-1 px-4 py-3 rounded-lg transition-colors"
                style={{ backgroundColor: '#FFC300', color: '#023047', fontWeight: '600' }}
              >
                Add Lead
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-3 rounded-lg transition-colors"
                style={{ border: '1px solid #6f6f6f', color: '#d3d3d3' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
