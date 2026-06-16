import { useState } from 'react';
import { Plus, Search, Filter, Mail, Phone, MapPin, Calendar, Briefcase, X, Edit2, Trash2, User, BadgeCheck, Shield, Eye, EyeOff, Copy, Key } from 'lucide-react';

interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  location: string;
  joinDate: string;
  status: 'active' | 'on-leave' | 'inactive';
  salary: number;
  employeeId: string;
  manager: string;
  avatar?: string;
  loginId: string;
  password: string;
}

type ViewMode = 'list' | 'details' | 'create' | 'edit';

export function Employees() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDepartment, setFilterDepartment] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@jobportal.com',
      phone: '+1 (555) 123-4567',
      role: 'Senior HR Manager',
      department: 'Human Resources',
      location: 'New York, NY',
      joinDate: '2022-01-15',
      status: 'active',
      salary: 85000,
      employeeId: 'EMP-001',
      manager: 'David Chen',
      loginId: 'sarah.johnson',
      password: 'SecurePass123!'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@jobportal.com',
      phone: '+1 (555) 234-5678',
      role: 'Technical Lead',
      department: 'Engineering',
      location: 'San Francisco, CA',
      joinDate: '2021-08-20',
      status: 'active',
      salary: 120000,
      employeeId: 'EMP-002',
      manager: 'Sarah Johnson',
      loginId: 'michael.chen',
      password: 'TechLead2024#'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@jobportal.com',
      phone: '+1 (555) 345-6789',
      role: 'Marketing Manager',
      department: 'Marketing',
      location: 'Austin, TX',
      joinDate: '2022-03-10',
      status: 'active',
      salary: 75000,
      employeeId: 'EMP-003',
      manager: 'Sarah Johnson',
      loginId: 'emily.rodriguez',
      password: 'Marketing@456'
    },
    {
      id: 4,
      name: 'James Wilson',
      email: 'james.wilson@jobportal.com',
      phone: '+1 (555) 456-7890',
      role: 'Customer Success Lead',
      department: 'Customer Success',
      location: 'Remote',
      joinDate: '2023-01-05',
      status: 'active',
      salary: 70000,
      employeeId: 'EMP-004',
      manager: 'Sarah Johnson',
      loginId: 'james.wilson',
      password: 'Success789$'
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      email: 'lisa.anderson@jobportal.com',
      phone: '+1 (555) 567-8901',
      role: 'Senior Developer',
      department: 'Engineering',
      location: 'Seattle, WA',
      joinDate: '2021-11-12',
      status: 'on-leave',
      salary: 110000,
      employeeId: 'EMP-005',
      manager: 'Michael Chen',
      loginId: 'lisa.anderson',
      password: 'DevPass321!'
    },
    {
      id: 6,
      name: 'Robert Martinez',
      email: 'robert.martinez@jobportal.com',
      phone: '+1 (555) 678-9012',
      role: 'Product Manager',
      department: 'Product',
      location: 'Boston, MA',
      joinDate: '2022-06-01',
      status: 'active',
      salary: 95000,
      employeeId: 'EMP-006',
      manager: 'Sarah Johnson',
      loginId: 'robert.martinez',
      password: 'Product@987'
    },
    {
      id: 7,
      name: 'Jessica Taylor',
      email: 'jessica.taylor@jobportal.com',
      phone: '+1 (555) 789-0123',
      role: 'Content Writer',
      department: 'Marketing',
      location: 'Chicago, IL',
      joinDate: '2023-02-14',
      status: 'active',
      salary: 55000,
      employeeId: 'EMP-007',
      manager: 'Emily Rodriguez',
      loginId: 'jessica.taylor',
      password: 'Writer654#'
    },
    {
      id: 8,
      name: 'David Kim',
      email: 'david.kim@jobportal.com',
      phone: '+1 (555) 890-1234',
      role: 'Sales Manager',
      department: 'Sales',
      location: 'Miami, FL',
      joinDate: '2022-09-20',
      status: 'inactive',
      salary: 80000,
      employeeId: 'EMP-008',
      manager: 'Sarah Johnson',
      loginId: 'david.kim',
      password: 'Sales123$'
    }
  ]);

  const [formData, setFormData] = useState<Partial<Employee>>({
    name: '',
    email: '',
    phone: '',
    role: '',
    department: '',
    location: '',
    joinDate: '',
    status: 'active',
    salary: 0,
    employeeId: '',
    manager: '',
    loginId: '',
    password: ''
  });

  const departments = ['All', 'Human Resources', 'Engineering', 'Marketing', 'Customer Success', 'Product', 'Finance', 'Sales'];
  const statuses = ['All', 'Active', 'On Leave', 'Inactive'];

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         emp.employeeId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || emp.department === filterDepartment;
    const matchesStatus = filterStatus === 'all' || emp.status === filterStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const handleCreateEmployee = () => {
    const newEmployee: Employee = {
      id: employees.length + 1,
      name: formData.name || '',
      email: formData.email || '',
      phone: formData.phone || '',
      role: formData.role || '',
      department: formData.department || '',
      location: formData.location || '',
      joinDate: formData.joinDate || new Date().toISOString().split('T')[0],
      status: formData.status as 'active' | 'on-leave' | 'inactive' || 'active',
      salary: formData.salary || 0,
      employeeId: formData.employeeId || `EMP-${String(employees.length + 1).padStart(3, '0')}`,
      manager: formData.manager || '',
      loginId: formData.loginId || '',
      password: formData.password || ''
    };
    setEmployees([...employees, newEmployee]);
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: '',
      department: '',
      location: '',
      joinDate: '',
      status: 'active',
      salary: 0,
      employeeId: '',
      manager: '',
      loginId: '',
      password: ''
    });
    setViewMode('list');
  };

  const handleUpdateEmployee = () => {
    if (selectedEmployee) {
      const updatedEmployees = employees.map(emp =>
        emp.id === selectedEmployee.id ? { ...selectedEmployee, ...formData } : emp
      );
      setEmployees(updatedEmployees);
      setViewMode('list');
      setSelectedEmployee(null);
    }
  };

  const handleDeleteEmployee = (id: number) => {
    setEmployees(employees.filter(emp => emp.id !== id));
    setViewMode('list');
  };

  const handleViewDetails = (employee: Employee) => {
    setSelectedEmployee(employee);
    setViewMode('details');
  };

  const handleEditEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setFormData(employee);
    setViewMode('edit');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return { bg: '#FFC300', color: '#023047' };
      case 'on-leave':
        return { bg: '#023047', color: '#f6f6f6' };
      case 'inactive':
        return { bg: '#6f6f6f', color: '#f6f6f6' };
      default:
        return { bg: '#6f6f6f', color: '#f6f6f6' };
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (viewMode === 'list') {
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
              Employees
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
                {filteredEmployees.length}
              </p>
              <p style={{ color: '#6f6f6f' }}>Total Employees</p>
            </div>
          </div>
          <button 
            onClick={() => setViewMode('create')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
            style={{ backgroundColor: '#FFC300', color: '#023047' }}
          >
            <Plus className="w-5 h-5" />
            Add Employee
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
                <User className="w-5 h-5" style={{ color: '#023047' }} />
              </div>
            </div>
            <p style={{ color: '#d3d3d3' }}>Total Employees</p>
            <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.875rem', fontWeight: '700' }}>{employees.length}</p>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
                <BadgeCheck className="w-5 h-5" style={{ color: '#023047' }} />
              </div>
            </div>
            <p style={{ color: '#d3d3d3' }}>Active</p>
            <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.875rem', fontWeight: '700' }}>
              {employees.filter(e => e.status === 'active').length}
            </p>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#023047' }}>
                <Calendar className="w-5 h-5" style={{ color: '#f6f6f6' }} />
              </div>
            </div>
            <p style={{ color: '#d3d3d3' }}>On Leave</p>
            <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.875rem', fontWeight: '700' }}>
              {employees.filter(e => e.status === 'on-leave').length}
            </p>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#6f6f6f' }}>
                <Briefcase className="w-5 h-5" style={{ color: '#f6f6f6' }} />
              </div>
            </div>
            <p style={{ color: '#d3d3d3' }}>Departments</p>
            <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.875rem', fontWeight: '700' }}>
              {new Set(employees.map(e => e.department)).size}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#6f6f6f' }} />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none"
              style={{ 
                backgroundColor: '#023047', 
                border: '1px solid #6f6f6f',
                color: '#f6f6f6'
              }}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
            style={{ backgroundColor: '#023047', color: '#f6f6f6' }}
          >
            <Filter className="w-5 h-5" />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="rounded-lg p-4" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2" style={{ color: '#d3d3d3' }}>Department</label>
                <select
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                >
                  <option value="all">All Departments</option>
                  {departments.filter(d => d !== 'All').map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-2" style={{ color: '#d3d3d3' }}>Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="on-leave">On Leave</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEmployees.map((employee) => (
            <div
              key={employee.id}
              onClick={() => handleViewDetails(employee)}
              className="rounded-lg p-6 cursor-pointer transition-all duration-200"
              style={{ 
                backgroundColor: '#023047', 
                border: '1px solid #6f6f6f'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#FFC300';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#6f6f6f';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: '#FFC300' }}
                  >
                    <span style={{ color: '#023047', fontWeight: '700' }}>
                      {getInitials(employee.name)}
                    </span>
                  </div>
                  <div>
                    <p style={{ color: '#f6f6f6', fontWeight: '600' }}>{employee.name}</p>
                    <p style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>{employee.employeeId}</p>
                  </div>
                </div>
                <span 
                  className="px-2 py-1 rounded-full text-xs"
                  style={getStatusColor(employee.status)}
                >
                  {employee.status === 'on-leave' ? 'On Leave' : employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>{employee.role}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>{employee.department}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>{employee.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                  <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>{employee.email}</span>
                </div>
              </div>

              <div className="mt-4 pt-4" style={{ borderTop: '1px solid #6f6f6f' }}>
                <div className="flex items-center justify-between">
                  <span style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Joined</span>
                  <span style={{ color: '#FFC300', fontSize: '0.875rem' }}>
                    {new Date(employee.joinDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEmployees.length === 0 && (
          <div className="text-center py-12 rounded-lg" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <User className="w-16 h-16 mx-auto mb-4" style={{ color: '#6f6f6f' }} />
            <p style={{ color: '#d3d3d3' }}>No employees found</p>
          </div>
        )}
      </div>
    );
  }

  if (viewMode === 'details' && selectedEmployee) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setViewMode('list')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
            style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
          >
            <X className="w-5 h-5" />
            Back to List
          </button>
          <div className="flex gap-3">
            <button
              onClick={() => handleEditEmployee(selectedEmployee)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
              style={{ backgroundColor: '#023047', color: '#f6f6f6' }}
            >
              <Edit2 className="w-5 h-5" />
              Edit
            </button>
            <button
              onClick={() => handleDeleteEmployee(selectedEmployee.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
              style={{ backgroundColor: '#6f6f6f', color: '#f6f6f6' }}
            >
              <Trash2 className="w-5 h-5" />
              Delete
            </button>
          </div>
        </div>

        <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
          <div className="flex items-start gap-6">
            <div 
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#FFC300' }}
            >
              <span style={{ color: '#023047', fontSize: '2rem', fontWeight: '700' }}>
                {getInitials(selectedEmployee.name)}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 style={{ color: '#FFC300', fontSize: '1.875rem', fontWeight: '700' }}>
                  {selectedEmployee.name}
                </h2>
                <span 
                  className="px-3 py-1 rounded-full"
                  style={getStatusColor(selectedEmployee.status)}
                >
                  {selectedEmployee.status === 'on-leave' ? 'On Leave' : selectedEmployee.status.charAt(0).toUpperCase() + selectedEmployee.status.slice(1)}
                </span>
              </div>
              <p style={{ color: '#d3d3d3', fontSize: '1.125rem' }}>{selectedEmployee.role}</p>
              <p style={{ color: '#6f6f6f' }}>{selectedEmployee.employeeId}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <h3 className="mb-4" style={{ color: '#FFC300', fontSize: '1.25rem', fontWeight: '700' }}>Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#023047' }}>
                  <Mail className="w-5 h-5" style={{ color: '#f6f6f6' }} />
                </div>
                <div>
                  <p style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Email</p>
                  <p style={{ color: '#f6f6f6' }}>{selectedEmployee.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#023047' }}>
                  <Phone className="w-5 h-5" style={{ color: '#f6f6f6' }} />
                </div>
                <div>
                  <p style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Phone</p>
                  <p style={{ color: '#f6f6f6' }}>{selectedEmployee.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#023047' }}>
                  <MapPin className="w-5 h-5" style={{ color: '#f6f6f6' }} />
                </div>
                <div>
                  <p style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Location</p>
                  <p style={{ color: '#f6f6f6' }}>{selectedEmployee.location}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <h3 className="mb-4" style={{ color: '#FFC300', fontSize: '1.25rem', fontWeight: '700' }}>Employment Details</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
                  <Shield className="w-5 h-5" style={{ color: '#023047' }} />
                </div>
                <div>
                  <p style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Department</p>
                  <p style={{ color: '#f6f6f6' }}>{selectedEmployee.department}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
                  <Briefcase className="w-5 h-5" style={{ color: '#023047' }} />
                </div>
                <div>
                  <p style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Role</p>
                  <p style={{ color: '#f6f6f6' }}>{selectedEmployee.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
                  <Calendar className="w-5 h-5" style={{ color: '#023047' }} />
                </div>
                <div>
                  <p style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Join Date</p>
                  <p style={{ color: '#f6f6f6' }}>
                    {new Date(selectedEmployee.joinDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <h3 className="mb-4" style={{ color: '#FFC300', fontSize: '1.25rem', fontWeight: '700' }}>Additional Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#023047' }}>
                  <User className="w-5 h-5" style={{ color: '#f6f6f6' }} />
                </div>
                <div>
                  <p style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Reports To</p>
                  <p style={{ color: '#f6f6f6' }}>{selectedEmployee.manager}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#023047' }}>
                  <Briefcase className="w-5 h-5" style={{ color: '#f6f6f6' }} />
                </div>
                <div>
                  <p style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Salary</p>
                  <p style={{ color: '#f6f6f6' }}>${selectedEmployee.salary.toLocaleString()}/year</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <h3 className="mb-4" style={{ color: '#FFC300', fontSize: '1.25rem', fontWeight: '700' }}>Login Credentials</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
                  <User className="w-5 h-5" style={{ color: '#023047' }} />
                </div>
                <div className="flex-1">
                  <p style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Login ID</p>
                  <div className="flex items-center gap-2">
                    <p style={{ color: '#f6f6f6' }}>{selectedEmployee.loginId}</p>
                    <button
                      onClick={() => navigator.clipboard.writeText(selectedEmployee.loginId)}
                      className="p-1 rounded transition-colors"
                      style={{ color: '#FFC300' }}
                      title="Copy Login ID"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
                  <Key className="w-5 h-5" style={{ color: '#023047' }} />
                </div>
                <div className="flex-1">
                  <p style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Password</p>
                  <div className="flex items-center gap-2">
                    <p style={{ color: '#f6f6f6' }}>{'•'.repeat(selectedEmployee.password.length)}</p>
                    <button
                      onClick={() => navigator.clipboard.writeText(selectedEmployee.password)}
                      className="p-1 rounded transition-colors"
                      style={{ color: '#FFC300' }}
                      title="Copy Password"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: '#023047', border: '1px solid #FFC300' }}>
                <p style={{ color: '#FFC300', fontSize: '0.875rem' }}>
                  <strong>Note:</strong> These credentials are created by the admin for employee portal access.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <h3 className="mb-4" style={{ color: '#FFC300', fontSize: '1.25rem', fontWeight: '700' }}>Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span style={{ color: '#d3d3d3' }}>Tenure</span>
                <span style={{ color: '#FFC300', fontWeight: '600' }}>
                  {Math.floor((new Date().getTime() - new Date(selectedEmployee.joinDate).getTime()) / (1000 * 60 * 60 * 24 * 365))} years
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span style={{ color: '#d3d3d3' }}>Status</span>
                <span style={{ color: '#FFC300', fontWeight: '600' }}>
                  {selectedEmployee.status === 'active' ? 'Active' : selectedEmployee.status === 'on-leave' ? 'On Leave' : 'Inactive'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span style={{ color: '#d3d3d3' }}>Department Size</span>
                <span style={{ color: '#FFC300', fontWeight: '600' }}>
                  {employees.filter(e => e.department === selectedEmployee.department).length} members
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (viewMode === 'create' || viewMode === 'edit') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
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
            {viewMode === 'create' ? 'Add New Employee' : 'Edit Employee'}
          </h1>
          <button
            onClick={() => setViewMode('list')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
            style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
          >
            <X className="w-5 h-5" />
            Cancel
          </button>
        </div>

        <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
          <form onSubmit={(e) => {
            e.preventDefault();
            viewMode === 'create' ? handleCreateEmployee() : handleUpdateEmployee();
          }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2" style={{ color: '#d3d3d3' }}>
                  Full Name <span style={{ color: '#FFC300' }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className="block mb-2" style={{ color: '#d3d3d3' }}>
                  Email <span style={{ color: '#FFC300' }}>*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                  placeholder="email@jobportal.com"
                />
              </div>

              <div>
                <label className="block mb-2" style={{ color: '#d3d3d3' }}>
                  Phone <span style={{ color: '#FFC300' }}>*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label className="block mb-2" style={{ color: '#d3d3d3' }}>
                  Employee ID <span style={{ color: '#FFC300' }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.employeeId}
                  onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                  placeholder="EMP-001"
                />
              </div>

              <div>
                <label className="block mb-2" style={{ color: '#d3d3d3' }}>
                  Role <span style={{ color: '#FFC300' }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                  placeholder="e.g., Senior Developer"
                />
              </div>

              <div>
                <label className="block mb-2" style={{ color: '#d3d3d3' }}>
                  Department <span style={{ color: '#FFC300' }}>*</span>
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                >
                  <option value="">Select Department</option>
                  {departments.filter(d => d !== 'All').map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2" style={{ color: '#d3d3d3' }}>
                  Location <span style={{ color: '#FFC300' }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                  placeholder="City, State"
                />
              </div>

              <div>
                <label className="block mb-2" style={{ color: '#d3d3d3' }}>
                  Join Date <span style={{ color: '#FFC300' }}>*</span>
                </label>
                <input
                  type="date"
                  value={formData.joinDate}
                  onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                />
              </div>

              <div>
                <label className="block mb-2" style={{ color: '#d3d3d3' }}>
                  Annual Salary <span style={{ color: '#FFC300' }}>*</span>
                </label>
                <input
                  type="number"
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: Number(e.target.value) })}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                  placeholder="75000"
                />
              </div>

              <div>
                <label className="block mb-2" style={{ color: '#d3d3d3' }}>
                  Reports To <span style={{ color: '#FFC300' }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.manager}
                  onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                  placeholder="Manager Name"
                />
              </div>

              <div>
                <label className="block mb-2" style={{ color: '#d3d3d3' }}>
                  Status <span style={{ color: '#FFC300' }}>*</span>
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'on-leave' | 'inactive' })}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                >
                  <option value="active">Active</option>
                  <option value="on-leave">On Leave</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label className="block mb-2" style={{ color: '#d3d3d3' }}>
                  Login ID <span style={{ color: '#FFC300' }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.loginId}
                  onChange={(e) => setFormData({ ...formData, loginId: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                  placeholder="loginid"
                />
              </div>

              <div>
                <label className="block mb-2" style={{ color: '#d3d3d3' }}>
                  Password <span style={{ color: '#FFC300' }}>*</span>
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                  placeholder="securepassword123"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="submit"
                className="px-6 py-3 rounded-lg transition-colors"
                style={{ backgroundColor: '#FFC300', color: '#023047' }}
              >
                {viewMode === 'create' ? 'Create Employee' : 'Update Employee'}
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className="px-6 py-3 rounded-lg transition-colors"
                style={{ backgroundColor: '#6f6f6f', color: '#f6f6f6' }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return null;
}