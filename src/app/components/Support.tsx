import { useState } from 'react';
import { MessageSquare, Plus, Search, Filter, X, Clock, AlertCircle, CheckCircle, User, Mail, Phone, Paperclip, Send, ChevronDown, Building2, UserCircle } from 'lucide-react';
import { SupportFilterModal } from './SupportFilterModal';

interface SupportTicket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  submittedBy: string;
  email: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  ticketSource: 'company' | 'user'; // Company Side or User Side
  companyName?: string; // If from company
  responses: {
    id: string;
    message: string;
    sender: string;
    timestamp: string;
    isAdmin: boolean;
  }[];
}

export function Support() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showCreateTicket, setShowCreateTicket] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [newResponse, setNewResponse] = useState('');
  const [filters, setFilters] = useState<Record<string, string[]>>({});

  const [tickets] = useState<SupportTicket[]>([
    {
      id: 'TKT-001',
      title: 'Unable to post job listings',
      description: 'Getting error message when trying to submit a new job posting. Error code: 500',
      status: 'in-progress',
      priority: 'high',
      category: 'Technical Issue',
      submittedBy: 'John Smith',
      email: 'john.smith@techcorp.com',
      phone: '+1 (555) 123-4567',
      createdAt: '2024-12-10 09:30 AM',
      updatedAt: '2024-12-10 02:15 PM',
      assignedTo: 'Sarah Johnson',
      ticketSource: 'company',
      companyName: 'TechCorp Inc.',
      responses: [
        {
          id: '1',
          message: 'Thank you for reporting this issue. We are looking into it.',
          sender: 'Support Team',
          timestamp: '2024-12-10 10:00 AM',
          isAdmin: true
        },
        {
          id: '2',
          message: 'We have identified the issue and are working on a fix. Should be resolved within 24 hours.',
          sender: 'Sarah Johnson',
          timestamp: '2024-12-10 02:15 PM',
          isAdmin: true
        }
      ]
    },
    {
      id: 'TKT-002',
      title: 'Cannot update my profile information',
      description: 'The save button is not working when I try to update my profile details.',
      status: 'open',
      priority: 'medium',
      category: 'Technical Issue',
      submittedBy: 'Emily Davis',
      email: 'emily.davis@email.com',
      createdAt: '2024-12-11 11:20 AM',
      updatedAt: '2024-12-11 11:20 AM',
      ticketSource: 'user',
      responses: []
    },
    {
      id: 'TKT-003',
      title: 'Dashboard analytics not loading',
      description: 'The dashboard page is blank and analytics widgets are not showing any data.',
      status: 'resolved',
      priority: 'urgent',
      category: 'Bug Report',
      submittedBy: 'Michael Chen',
      email: 'michael.chen@innovate.com',
      phone: '+1 (555) 987-6543',
      createdAt: '2024-12-09 03:45 PM',
      updatedAt: '2024-12-10 09:00 AM',
      assignedTo: 'Mike Wilson',
      ticketSource: 'company',
      companyName: 'Innovate Solutions',
      responses: [
        {
          id: '1',
          message: 'We found a caching issue. Please clear your browser cache and try again.',
          sender: 'Mike Wilson',
          timestamp: '2024-12-10 08:30 AM',
          isAdmin: true
        },
        {
          id: '2',
          message: 'That worked! Thank you so much.',
          sender: 'Michael Chen',
          timestamp: '2024-12-10 08:45 AM',
          isAdmin: false
        },
        {
          id: '3',
          message: 'Great! Marking this as resolved. Feel free to reopen if you have any other issues.',
          sender: 'Mike Wilson',
          timestamp: '2024-12-10 09:00 AM',
          isAdmin: true
        }
      ]
    },
    {
      id: 'TKT-004',
      title: 'Password reset email not received',
      description: 'I requested a password reset 30 minutes ago but haven\'t received any email yet.',
      status: 'closed',
      priority: 'high',
      category: 'Account Issue',
      submittedBy: 'Lisa Anderson',
      email: 'lisa.a@portal.com',
      createdAt: '2024-12-08 01:30 PM',
      updatedAt: '2024-12-08 04:20 PM',
      assignedTo: 'Sarah Johnson',
      ticketSource: 'user',
      responses: [
        {
          id: '1',
          message: 'Please check your spam folder. Also, I\'ve manually sent you a password reset link to your email.',
          sender: 'Sarah Johnson',
          timestamp: '2024-12-08 02:00 PM',
          isAdmin: true
        },
        {
          id: '2',
          message: 'Found it in spam! Password reset successful. Thank you!',
          sender: 'Lisa Anderson',
          timestamp: '2024-12-08 04:20 PM',
          isAdmin: false
        }
      ]
    },
    {
      id: 'TKT-005',
      title: 'Request to upgrade company account to Pro',
      description: 'We would like to upgrade our company account to Pro tier to access advanced features.',
      status: 'in-progress',
      priority: 'medium',
      category: 'General Inquiry',
      submittedBy: 'Robert Taylor',
      email: 'robert.t@hiring.com',
      phone: '+1 (555) 456-7890',
      createdAt: '2024-12-11 08:15 AM',
      updatedAt: '2024-12-11 10:30 AM',
      assignedTo: 'David Brown',
      ticketSource: 'company',
      companyName: 'Hiring Solutions LLC',
      responses: [
        {
          id: '1',
          message: 'I\'ve sent you an email with the Pro tier details and pricing. Please review and let me know if you have any questions.',
          sender: 'David Brown',
          timestamp: '2024-12-11 10:30 AM',
          isAdmin: true
        }
      ]
    },
    {
      id: 'TKT-006',
      title: 'Job application not submitted',
      description: 'I filled out the entire application form but it says submission failed.',
      status: 'open',
      priority: 'high',
      category: 'Bug Report',
      submittedBy: 'Amanda White',
      email: 'amanda.w@example.com',
      createdAt: '2024-12-12 05:30 PM',
      updatedAt: '2024-12-12 05:30 PM',
      ticketSource: 'user',
      responses: []
    },
    {
      id: 'TKT-007',
      title: 'Request API documentation for job posting',
      description: 'We need API documentation to integrate job posting functionality into our system.',
      status: 'open',
      priority: 'low',
      category: 'Feature Request',
      submittedBy: 'David Martinez',
      email: 'd.martinez@techstartup.io',
      phone: '+1 (555) 789-0123',
      createdAt: '2024-12-11 02:15 PM',
      updatedAt: '2024-12-11 02:15 PM',
      ticketSource: 'company',
      companyName: 'Tech Startup Inc.',
      responses: []
    },
    {
      id: 'TKT-008',
      title: 'Notifications not working on mobile',
      description: 'I\'m not receiving push notifications on my mobile device for new job matches.',
      status: 'in-progress',
      priority: 'medium',
      category: 'Technical Issue',
      submittedBy: 'Sarah Williams',
      email: 's.williams@mail.com',
      createdAt: '2024-12-10 11:00 AM',
      updatedAt: '2024-12-11 09:00 AM',
      assignedTo: 'Jennifer Lee',
      ticketSource: 'user',
      responses: [
        {
          id: '1',
          message: 'Can you please confirm which mobile device and OS version you\'re using?',
          sender: 'Jennifer Lee',
          timestamp: '2024-12-11 09:00 AM',
          isAdmin: true
        }
      ]
    }
  ]);

  const employees = [
    { id: 1, name: 'Sarah Johnson', role: 'Senior Support Engineer' },
    { id: 2, name: 'Mike Wilson', role: 'Technical Support' },
    { id: 3, name: 'Jennifer Lee', role: 'Support Specialist' },
    { id: 4, name: 'David Brown', role: 'Customer Success' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return '#FFC300';
      case 'in-progress': return '#3b82f6';
      case 'resolved': return '#10b981';
      case 'closed': return '#6f6f6f';
      default: return '#6f6f6f';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return '#ef4444';
      case 'high': return '#f97316';
      case 'medium': return '#FFC300';
      case 'low': return '#10b981';
      default: return '#6f6f6f';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <AlertCircle className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      case 'closed': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const handleSendResponse = () => {
    if (newResponse.trim() && selectedTicket) {
      setNewResponse('');
    }
  };

  const filterGroups = [
    {
      id: 'ticketSource',
      label: 'Ticket Source',
      options: [
        { value: 'company', label: 'Company Side' },
        { value: 'user', label: 'User Side' }
      ]
    },
    {
      id: 'status',
      label: 'Status',
      options: [
        { value: 'open', label: 'Open' },
        { value: 'in-progress', label: 'In Progress' },
        { value: 'resolved', label: 'Resolved' },
        { value: 'closed', label: 'Closed' }
      ]
    },
    {
      id: 'priority',
      label: 'Priority',
      options: [
        { value: 'urgent', label: 'Urgent' },
        { value: 'high', label: 'High' },
        { value: 'medium', label: 'Medium' },
        { value: 'low', label: 'Low' }
      ]
    },
    {
      id: 'category',
      label: 'Category',
      options: [
        { value: 'Technical Issue', label: 'Technical Issue' },
        { value: 'Bug Report', label: 'Bug Report' },
        { value: 'Feature Request', label: 'Feature Request' },
        { value: 'General Inquiry', label: 'General Inquiry' },
        { value: 'Account Issue', label: 'Account Issue' }
      ]
    }
  ];

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => {
      const current = prev[key] || [];
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [key]: updated };
    });
  };

  const handleResetFilters = () => {
    setFilters({});
  };

  const activeFilterCount = Object.values(filters).reduce((acc, arr) => acc + arr.length, 0);

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.submittedBy.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilters = Object.entries(filters).every(([key, values]) => {
      if (values.length === 0) return true;
      return values.includes(ticket[key as keyof SupportTicket] as string);
    });

    return matchesSearch && matchesFilters;
  });

  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'open').length,
    inProgress: tickets.filter(t => t.status === 'in-progress').length,
    resolved: tickets.filter(t => t.status === 'resolved').length
  };

  if (selectedTicket) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <button
              onClick={() => setSelectedTicket(null)}
              className="mb-2 px-3 py-1 rounded-lg transition-colors"
              style={{ border: '1px solid #6f6f6f', color: '#d3d3d3' }}
            >
              ← Back to Tickets
            </button>
            <h1 
              style={{ 
                color: '#FFC300',
                fontSize: '2.5rem',
                fontWeight: '800',
                letterSpacing: '-0.02em',
                textShadow: '0 0 30px rgba(255, 195, 0, 0.3), 0 0 60px rgba(255, 195, 0, 0.2)'
              }}
            >
              Ticket Details
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span style={{ color: '#6f6f6f' }}>{selectedTicket.id}</span>
                    <span
                      className="px-3 py-1 rounded-full text-sm flex items-center gap-1"
                      style={{ 
                        backgroundColor: selectedTicket.ticketSource === 'company' ? '#FFC300' : '#3b82f6',
                        color: '#023047'
                      }}
                    >
                      {selectedTicket.ticketSource === 'company' ? <Building2 className="w-4 h-4" /> : <UserCircle className="w-4 h-4" />}
                      {selectedTicket.ticketSource === 'company' ? 'COMPANY' : 'USER'}
                    </span>
                    <span
                      className="px-3 py-1 rounded-full text-sm flex items-center gap-1"
                      style={{ backgroundColor: getStatusColor(selectedTicket.status), color: '#023047' }}
                    >
                      {getStatusIcon(selectedTicket.status)}
                      {selectedTicket.status.replace('-', ' ').toUpperCase()}
                    </span>
                    <span
                      className="px-3 py-1 rounded-full text-sm"
                      style={{ backgroundColor: getPriorityColor(selectedTicket.priority), color: '#f6f6f6' }}
                    >
                      {selectedTicket.priority.toUpperCase()}
                    </span>
                  </div>
                  <h2 style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>
                    {selectedTicket.title}
                  </h2>
                </div>
              </div>

              <div className="p-4 rounded-lg mb-4" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
                <p style={{ color: '#d3d3d3' }}>{selectedTicket.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span style={{ color: '#6f6f6f' }}>Category:</span>
                  <span style={{ color: '#f6f6f6' }} className="ml-2">{selectedTicket.category}</span>
                </div>
                <div>
                  <span style={{ color: '#6f6f6f' }}>Created:</span>
                  <span style={{ color: '#f6f6f6' }} className="ml-2">{selectedTicket.createdAt}</span>
                </div>
                <div>
                  <span style={{ color: '#6f6f6f' }}>Last Updated:</span>
                  <span style={{ color: '#f6f6f6' }} className="ml-2">{selectedTicket.updatedAt}</span>
                </div>
                <div>
                  <span style={{ color: '#6f6f6f' }}>Assigned To:</span>
                  <span style={{ color: '#f6f6f6' }} className="ml-2">{selectedTicket.assignedTo || 'Unassigned'}</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <h3 className="mb-4" style={{ color: '#FFC300', fontSize: '1.25rem', fontWeight: '700' }}>
                Conversation ({selectedTicket.responses.length})
              </h3>
              
              <div className="space-y-4 mb-6">
                {selectedTicket.responses.map((response) => (
                  <div
                    key={response.id}
                    className={`p-4 rounded-lg ${response.isAdmin ? 'ml-8' : 'mr-8'}`}
                    style={{ 
                      backgroundColor: response.isAdmin ? '#023047' : '#023047',
                      border: `1px solid ${response.isAdmin ? '#FFC300' : '#6f6f6f'}`
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span style={{ color: '#f6f6f6', fontWeight: '600' }}>{response.sender}</span>
                      <span style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>{response.timestamp}</span>
                    </div>
                    <p style={{ color: '#d3d3d3' }}>{response.message}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <textarea
                  value={newResponse}
                  onChange={(e) => setNewResponse(e.target.value)}
                  rows={4}
                  placeholder="Type your response..."
                  className="w-full px-4 py-3 rounded-lg focus:outline-none"
                  style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                />
                <div className="flex justify-between items-center">
                  <button
                    className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors"
                    style={{ border: '1px solid #6f6f6f', color: '#d3d3d3' }}
                  >
                    <Paperclip className="w-4 h-4" />
                    Attach File
                  </button>
                  <button
                    onClick={handleSendResponse}
                    disabled={!newResponse.trim()}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
                    style={{ 
                      backgroundColor: newResponse.trim() ? '#FFC300' : '#6f6f6f',
                      color: newResponse.trim() ? '#023047' : '#d3d3d3',
                      opacity: newResponse.trim() ? 1 : 0.5
                    }}
                  >
                    <Send className="w-4 h-4" />
                    Send Response
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <h3 className="mb-4" style={{ color: '#FFC300' }}>Submitted By</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5" style={{ color: '#FFC300' }} />
                  <div>
                    <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>Name</p>
                    <p style={{ color: '#f6f6f6' }}>{selectedTicket.submittedBy}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5" style={{ color: '#FFC300' }} />
                  <div>
                    <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>Email</p>
                    <p style={{ color: '#f6f6f6' }}>{selectedTicket.email}</p>
                  </div>
                </div>
                {selectedTicket.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5" style={{ color: '#FFC300' }} />
                    <div>
                      <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>Phone</p>
                      <p style={{ color: '#f6f6f6' }}>{selectedTicket.phone}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <h3 className="mb-4" style={{ color: '#FFC300' }}>Actions</h3>
              <div className="space-y-3">
                <div>
                  <label className="block mb-2" style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Assign To</label>
                  <select
                    className="w-full px-4 py-2 rounded-lg"
                    style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                    defaultValue={selectedTicket.assignedTo || ''}
                  >
                    <option value="">Unassigned</option>
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.name}>{emp.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-2" style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Status</label>
                  <select
                    className="w-full px-4 py-2 rounded-lg"
                    style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                    defaultValue={selectedTicket.status}
                  >
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2" style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Priority</label>
                  <select
                    className="w-full px-4 py-2 rounded-lg"
                    style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                    defaultValue={selectedTicket.priority}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <button
                  className="w-full px-4 py-2 rounded-lg transition-colors"
                  style={{ backgroundColor: '#FFC300', color: '#023047' }}
                >
                  Update Ticket
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 
          style={{ 
            color: '#FFC300',
            fontSize: '2.5rem',
            fontWeight: '800',
            letterSpacing: '-0.02em',
            textShadow: '0 0 30px rgba(255, 195, 0, 0.3), 0 0 60px rgba(255, 195, 0, 0.2)'
          }}
        >
          Support Tickets
        </h1>
        <button
          onClick={() => setShowCreateTicket(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
          style={{ backgroundColor: '#FFC300', color: '#023047' }}
        >
          <Plus className="w-5 h-5" />
          Create Ticket
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div 
          className="rounded-lg p-6"
          style={{ 
            background: 'radial-gradient(circle at top right, rgba(255, 195, 0, 0.1), transparent 70%)',
            backgroundColor: '#023047',
            border: '1px solid #6f6f6f'
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Total Tickets</p>
              <p style={{ color: '#f6f6f6', fontSize: '2rem', fontWeight: '700' }}>{stats.total}</p>
            </div>
            <MessageSquare className="w-12 h-12" style={{ color: '#FFC300', opacity: 0.5 }} />
          </div>
        </div>

        <div 
          className="rounded-lg p-6"
          style={{ 
            background: 'radial-gradient(circle at top right, rgba(255, 195, 0, 0.1), transparent 70%)',
            backgroundColor: '#023047',
            border: '1px solid #6f6f6f'
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Open</p>
              <p style={{ color: '#FFC300', fontSize: '2rem', fontWeight: '700' }}>{stats.open}</p>
            </div>
            <AlertCircle className="w-12 h-12" style={{ color: '#FFC300', opacity: 0.5 }} />
          </div>
        </div>

        <div 
          className="rounded-lg p-6"
          style={{ 
            background: 'radial-gradient(circle at top right, rgba(59, 130, 246, 0.1), transparent 70%)',
            backgroundColor: '#023047',
            border: '1px solid #6f6f6f'
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>In Progress</p>
              <p style={{ color: '#3b82f6', fontSize: '2rem', fontWeight: '700' }}>{stats.inProgress}</p>
            </div>
            <Clock className="w-12 h-12" style={{ color: '#3b82f6', opacity: 0.5 }} />
          </div>
        </div>

        <div 
          className="rounded-lg p-6"
          style={{ 
            background: 'radial-gradient(circle at top right, rgba(16, 185, 129, 0.1), transparent 70%)',
            backgroundColor: '#023047',
            border: '1px solid #6f6f6f'
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Resolved</p>
              <p style={{ color: '#10b981', fontSize: '2rem', fontWeight: '700' }}>{stats.resolved}</p>
            </div>
            <CheckCircle className="w-12 h-12" style={{ color: '#10b981', opacity: 0.5 }} />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#6f6f6f' }} />
          <input
            type="text"
            placeholder="Search tickets by ID, title, description, or submitter..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none"
            style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
          />
        </div>
        <button
          onClick={() => setShowFilterModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors relative"
          style={{ border: '1px solid #6f6f6f', color: '#d3d3d3' }}
        >
          <Filter className="w-5 h-5" />
          Filters
          {activeFilterCount > 0 && (
            <span
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs"
              style={{ backgroundColor: '#FFC300', color: '#023047', fontWeight: '700' }}
            >
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      <div className="space-y-4">
        {filteredTickets.map((ticket) => (
          <div
            key={ticket.id}
            onClick={() => setSelectedTicket(ticket)}
            className="rounded-lg p-6 cursor-pointer transition-all hover:scale-[1.01]"
            style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>{ticket.id}</span>
                  <span
                    className="px-3 py-1 rounded-full text-xs flex items-center gap-1"
                    style={{ 
                      backgroundColor: ticket.ticketSource === 'company' ? '#FFC300' : '#3b82f6',
                      color: '#023047'
                    }}
                  >
                    {ticket.ticketSource === 'company' ? <Building2 className="w-3 h-3" /> : <UserCircle className="w-3 h-3" />}
                    {ticket.ticketSource === 'company' ? 'COMPANY' : 'USER'}
                  </span>
                  <span
                    className="px-3 py-1 rounded-full text-xs flex items-center gap-1"
                    style={{ backgroundColor: getStatusColor(ticket.status), color: '#023047' }}
                  >
                    {getStatusIcon(ticket.status)}
                    {ticket.status.replace('-', ' ').toUpperCase()}
                  </span>
                  <span
                    className="px-3 py-1 rounded-full text-xs"
                    style={{ backgroundColor: getPriorityColor(ticket.priority), color: '#f6f6f6' }}
                  >
                    {ticket.priority.toUpperCase()}
                  </span>
                  <span
                    className="px-3 py-1 rounded-full text-xs"
                    style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#d3d3d3' }}
                  >
                    {ticket.category}
                  </span>
                </div>
                <h3 style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }} className="mb-2">
                  {ticket.title}
                </h3>
                <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }} className="mb-3 line-clamp-2">
                  {ticket.description}
                </p>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    {ticket.ticketSource === 'company' ? <Building2 className="w-4 h-4" style={{ color: '#FFC300' }} /> : <User className="w-4 h-4" style={{ color: '#FFC300' }} />}
                    <span style={{ color: '#d3d3d3' }}>{ticket.submittedBy}</span>
                    {ticket.companyName && <span style={{ color: '#6f6f6f' }}>({ticket.companyName})</span>}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                    <span style={{ color: '#6f6f6f' }}>{ticket.createdAt}</span>
                  </div>
                  {ticket.assignedTo && (
                    <div className="flex items-center gap-2">
                      <span style={{ color: '#6f6f6f' }}>Assigned to:</span>
                      <span style={{ color: '#FFC300' }}>{ticket.assignedTo}</span>
                    </div>
                  )}
                  {ticket.responses.length > 0 && (
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                      <span style={{ color: '#6f6f6f' }}>{ticket.responses.length} responses</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredTickets.length === 0 && (
          <div className="text-center py-12 rounded-lg" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <MessageSquare className="w-16 h-16 mx-auto mb-4" style={{ color: '#6f6f6f' }} />
            <p style={{ color: '#d3d3d3', fontSize: '1.125rem' }}>No tickets found</p>
            <p style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {showCreateTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <div className="p-6" style={{ borderBottom: '1px solid #6f6f6f' }}>
              <div className="flex items-center justify-between">
                <h2 style={{ color: '#FFC300', fontSize: '1.5rem', fontWeight: '700' }}>Create Support Ticket</h2>
                <button
                  onClick={() => setShowCreateTicket(false)}
                  className="p-1 rounded-lg transition-colors"
                  style={{ color: '#d3d3d3' }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block mb-2" style={{ color: '#f6f6f6' }}>Title *</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg focus:outline-none"
                  style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                  placeholder="Brief description of the issue"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2" style={{ color: '#f6f6f6' }}>Category *</label>
                  <select
                    className="w-full px-4 py-2 rounded-lg focus:outline-none"
                    style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                  >
                    <option>Technical Issue</option>
                    <option>Bug Report</option>
                    <option>Feature Request</option>
                    <option>General Inquiry</option>
                    <option>Account Issue</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2" style={{ color: '#f6f6f6' }}>Priority *</label>
                  <select
                    className="w-full px-4 py-2 rounded-lg focus:outline-none"
                    style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block mb-2" style={{ color: '#f6f6f6' }}>Description *</label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-2 rounded-lg focus:outline-none"
                  style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                  placeholder="Provide detailed information about your issue or request..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2" style={{ color: '#f6f6f6' }}>Your Name *</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg focus:outline-none"
                    style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="block mb-2" style={{ color: '#f6f6f6' }}>Email *</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 rounded-lg focus:outline-none"
                    style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block mb-2" style={{ color: '#f6f6f6' }}>Phone (Optional)</label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 rounded-lg focus:outline-none"
                  style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label className="block mb-2" style={{ color: '#f6f6f6' }}>Attachments (Optional)</label>
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors w-full justify-center"
                  style={{ border: '1px dashed #6f6f6f', color: '#d3d3d3' }}
                >
                  <Paperclip className="w-5 h-5" />
                  Click to upload files
                </button>
              </div>
            </div>
            <div className="p-6 flex gap-3 justify-end" style={{ borderTop: '1px solid #6f6f6f' }}>
              <button
                onClick={() => setShowCreateTicket(false)}
                className="px-4 py-2 rounded-lg transition-colors"
                style={{ border: '1px solid #6f6f6f', color: '#d3d3d3' }}
              >
                Cancel
              </button>
              <button
                onClick={() => setShowCreateTicket(false)}
                className="px-4 py-2 rounded-lg transition-colors"
                style={{ backgroundColor: '#FFC300', color: '#023047' }}
              >
                Submit Ticket
              </button>
            </div>
          </div>
        </div>
      )}

      <SupportFilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        filterGroups={filterGroups}
        activeFilters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
      />
    </div>
  );
}