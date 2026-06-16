import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { Download, TrendingUp, Users, Briefcase, FileText, Building2, GraduationCap, Pencil, FolderTree } from 'lucide-react';
import { Categories } from './Categories';

type ReportCategory = 'jobs' | 'internships' | 'freelance' | 'companies' | 'users' | 'categories';

export function Reports() {
  const [activeCategory, setActiveCategory] = useState<ReportCategory>('jobs');

  // Jobs Report Data
  const jobsMonthlyData = [
    { month: 'Jan', posted: 85, applications: 680, filled: 12 },
    { month: 'Feb', posted: 95, applications: 780, filled: 15 },
    { month: 'Mar', posted: 120, applications: 920, filled: 18 },
    { month: 'Apr', posted: 110, applications: 850, filled: 14 },
    { month: 'May', posted: 135, applications: 1050, filled: 21 },
    { month: 'Jun', posted: 150, applications: 1200, filled: 24 },
  ];

  const jobsByCategoryData = [
    { category: 'Technology', count: 450, applications: 1890 },
    { category: 'Healthcare', count: 280, applications: 1120 },
    { category: 'Finance', count: 200, applications: 850 },
    { category: 'Marketing', count: 180, applications: 720 },
    { category: 'Education', count: 150, applications: 600 },
  ];

  // Internships Report Data
  const internshipsMonthlyData = [
    { month: 'Jan', posted: 25, applications: 220, placed: 8 },
    { month: 'Feb', posted: 30, applications: 280, placed: 10 },
    { month: 'Mar', posted: 35, applications: 340, placed: 12 },
    { month: 'Apr', posted: 28, applications: 290, placed: 9 },
    { month: 'May', posted: 38, applications: 380, placed: 14 },
    { month: 'Jun', posted: 42, applications: 420, placed: 16 },
  ];

  const internshipsByTypeData = [
    { name: 'Paid', value: 180 },
    { name: 'Unpaid', value: 54 },
  ];

  // Freelance Report Data
  const freelanceMonthlyData = [
    { month: 'Jan', posted: 45, proposals: 380, completed: 28 },
    { month: 'Feb', posted: 52, proposals: 450, completed: 32 },
    { month: 'Mar', posted: 58, proposals: 510, completed: 38 },
    { month: 'Apr', posted: 48, proposals: 420, completed: 30 },
    { month: 'May', posted: 65, proposals: 580, completed: 42 },
    { month: 'Jun', posted: 72, proposals: 650, completed: 48 },
  ];

  const freelanceByLevelData = [
    { level: 'Entry', count: 85 },
    { level: 'Intermediate', count: 120 },
    { level: 'Expert', count: 95 },
  ];

  // Companies Report Data
  const companiesMonthlyData = [
    { month: 'Jan', joined: 12, activeJobs: 85 },
    { month: 'Feb', joined: 15, activeJobs: 95 },
    { month: 'Mar', joined: 20, activeJobs: 120 },
    { month: 'Apr', joined: 18, activeJobs: 110 },
    { month: 'May', joined: 22, activeJobs: 135 },
    { month: 'Jun', joined: 25, activeJobs: 150 },
  ];

  const companiesByIndustryData = [
    { industry: 'Technology', count: 120 },
    { industry: 'Healthcare', count: 85 },
    { industry: 'Finance', count: 65 },
    { industry: 'Marketing', count: 50 },
    { industry: 'Other', count: 136 },
  ];

  // Users Report Data
  const usersMonthlyData = [
    { month: 'Jan', candidates: 320, employers: 45 },
    { month: 'Feb', candidates: 380, employers: 52 },
    { month: 'Mar', candidates: 450, employers: 68 },
    { month: 'Apr', candidates: 420, employers: 61 },
    { month: 'May', candidates: 520, employers: 75 },
    { month: 'Jun', candidates: 580, employers: 88 },
  ];

  const userActivityData = [
    { week: 'Week 1', activeUsers: 1200, applications: 280 },
    { week: 'Week 2', activeUsers: 1350, applications: 320 },
    { week: 'Week 3', activeUsers: 1420, applications: 350 },
    { week: 'Week 4', activeUsers: 1580, applications: 410 },
  ];

  // Users Growth Data (Enhanced)
  const usersGrowthData = [
    { month: 'Jan', total: 365, candidates: 320, employers: 45, proUsers: 28, verifiedUsers: 15 },
    { month: 'Feb', total: 432, candidates: 380, employers: 52, proUsers: 35, verifiedUsers: 22 },
    { month: 'Mar', total: 518, candidates: 450, employers: 68, proUsers: 45, verifiedUsers: 31 },
    { month: 'Apr', total: 481, candidates: 420, employers: 61, proUsers: 38, verifiedUsers: 28 },
    { month: 'May', total: 595, candidates: 520, employers: 75, proUsers: 52, verifiedUsers: 41 },
    { month: 'Jun', total: 668, candidates: 580, employers: 88, proUsers: 61, verifiedUsers: 54 },
  ];

  const userTypeDistributionData = [
    { name: 'Regular Candidates', value: 6890 },
    { name: 'Pro Candidates', value: 750 },
    { name: 'Verified Candidates', value: 227 },
    { name: 'Regular Employers', value: 420 },
    { name: 'Pro Employers', value: 140 },
    { name: 'Verified Employers', value: 29 },
  ];

  const userGrowthRateData = [
    { month: 'Jan', growthRate: 8.5 },
    { month: 'Feb', growthRate: 11.2 },
    { month: 'Mar', growthRate: 15.3 },
    { month: 'Apr', growthRate: 9.8 },
    { month: 'May', growthRate: 17.6 },
    { month: 'Jun', growthRate: 19.2 },
  ];

  // Categories Report Data
  const categoriesGrowthData = [
    { month: 'Jan', added: 5, listings: 320 },
    { month: 'Feb', added: 8, listings: 380 },
    { month: 'Mar', added: 12, listings: 450 },
    { month: 'Apr', added: 7, listings: 420 },
    { month: 'May', added: 10, listings: 520 },
    { month: 'Jun', added: 14, listings: 580 },
  ];

  const COLORS = ['#FFC300', '#023047', '#6f6f6f', '#d3d3d3', '#f6f6f6'];

  return (
    <div className="space-y-6">
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
            Reports & Analytics
          </h1>
          <p className="mt-1" style={{ color: '#6f6f6f' }}>Comprehensive insights and data analysis by category</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: '#FFC300', color: '#023047' }}>
          <Download className="w-5 h-5" />
          Export Report
        </button>
      </div>

      {/* Category Menu Bar */}
      <div className="rounded-lg" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
        <div className="flex overflow-x-auto" style={{ borderBottom: '1px solid #6f6f6f' }}>
          <button
            onClick={() => setActiveCategory('jobs')}
            className="flex items-center gap-2 px-6 py-4 transition-colors whitespace-nowrap"
            style={{
              borderBottom: activeCategory === 'jobs' ? '2px solid #FFC300' : '2px solid transparent',
              backgroundColor: activeCategory === 'jobs' ? '#023047' : 'transparent',
              color: activeCategory === 'jobs' ? '#FFC300' : '#d3d3d3'
            }}
          >
            <Briefcase className="w-5 h-5" />
            <span>Jobs</span>
          </button>
          <button
            onClick={() => setActiveCategory('internships')}
            className="flex items-center gap-2 px-6 py-4 transition-colors whitespace-nowrap"
            style={{
              borderBottom: activeCategory === 'internships' ? '2px solid #FFC300' : '2px solid transparent',
              backgroundColor: activeCategory === 'internships' ? '#023047' : 'transparent',
              color: activeCategory === 'internships' ? '#FFC300' : '#d3d3d3'
            }}
          >
            <GraduationCap className="w-5 h-5" />
            <span>Internship Hub</span>
          </button>
          <button
            onClick={() => setActiveCategory('freelance')}
            className="flex items-center gap-2 px-6 py-4 transition-colors whitespace-nowrap"
            style={{
              borderBottom: activeCategory === 'freelance' ? '2px solid #FFC300' : '2px solid transparent',
              backgroundColor: activeCategory === 'freelance' ? '#023047' : 'transparent',
              color: activeCategory === 'freelance' ? '#FFC300' : '#d3d3d3'
            }}
          >
            <Pencil className="w-5 h-5" />
            <span>Freelance Gigs</span>
          </button>
          <button
            onClick={() => setActiveCategory('companies')}
            className="flex items-center gap-2 px-6 py-4 transition-colors whitespace-nowrap"
            style={{
              borderBottom: activeCategory === 'companies' ? '2px solid #FFC300' : '2px solid transparent',
              backgroundColor: activeCategory === 'companies' ? '#023047' : 'transparent',
              color: activeCategory === 'companies' ? '#FFC300' : '#d3d3d3'
            }}
          >
            <Building2 className="w-5 h-5" />
            <span>Companies</span>
          </button>
          <button
            onClick={() => setActiveCategory('users')}
            className="flex items-center gap-2 px-6 py-4 transition-colors whitespace-nowrap"
            style={{
              borderBottom: activeCategory === 'users' ? '2px solid #FFC300' : '2px solid transparent',
              backgroundColor: activeCategory === 'users' ? '#023047' : 'transparent',
              color: activeCategory === 'users' ? '#FFC300' : '#d3d3d3'
            }}
          >
            <Users className="w-5 h-5" />
            <span>User Management</span>
          </button>
          <button
            onClick={() => setActiveCategory('categories')}
            className="flex items-center gap-2 px-6 py-4 transition-colors whitespace-nowrap"
            style={{
              borderBottom: activeCategory === 'categories' ? '2px solid #FFC300' : '2px solid transparent',
              backgroundColor: activeCategory === 'categories' ? '#023047' : 'transparent',
              color: activeCategory === 'categories' ? '#FFC300' : '#d3d3d3'
            }}
          >
            <FileText className="w-5 h-5" />
            <span>Categories</span>
          </button>
        </div>
      </div>

      {/* Jobs Reports */}
      {activeCategory === 'jobs' && (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
                  <Briefcase className="w-5 h-5" style={{ color: '#023047' }} />
                </div>
                <TrendingUp className="w-4 h-4" style={{ color: '#FFC300' }} />
              </div>
              <p style={{ color: '#d3d3d3' }}>Total Jobs Posted</p>
              <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>1,260</p>
              <p className="mt-2" style={{ color: '#FFC300', fontSize: '0.875rem' }}>+12.5% from last month</p>
            </div>
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#023047' }}>
                  <FileText className="w-5 h-5" style={{ color: '#f6f6f6' }} />
                </div>
                <TrendingUp className="w-4 h-4" style={{ color: '#FFC300' }} />
              </div>
              <p style={{ color: '#d3d3d3' }}>Total Applications</p>
              <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>5,480</p>
              <p className="mt-2" style={{ color: '#FFC300', fontSize: '0.875rem' }}>+18.2% from last month</p>
            </div>
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#6f6f6f' }}>
                  <Users className="w-5 h-5" style={{ color: '#f6f6f6' }} />
                </div>
                <TrendingUp className="w-4 h-4" style={{ color: '#FFC300' }} />
              </div>
              <p style={{ color: '#d3d3d3' }}>Positions Filled</p>
              <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>104</p>
              <p className="mt-2" style={{ color: '#FFC300', fontSize: '0.875rem' }}>+8.3% from last month</p>
            </div>
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
                  <TrendingUp className="w-5 h-5" style={{ color: '#023047' }} />
                </div>
                <TrendingUp className="w-4 h-4" style={{ color: '#FFC300' }} />
              </div>
              <p style={{ color: '#d3d3d3' }}>Avg Applications/Job</p>
              <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>4.3</p>
              <p className="mt-2" style={{ color: '#FFC300', fontSize: '0.875rem' }}>+5.1% from last month</p>
            </div>
          </div>

          {/* Charts */}
          <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <div className="mb-6">
              <h3 style={{ color: '#FFC300' }}>Job Posting Trends</h3>
              <p className="mt-1" style={{ color: '#d3d3d3' }}>Monthly job postings, applications, and positions filled</p>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={jobsMonthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#6f6f6f" />
                <XAxis dataKey="month" stroke="#d3d3d3" />
                <YAxis stroke="#d3d3d3" />
                <Tooltip contentStyle={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }} />
                <Area type="monotone" dataKey="posted" stackId="1" stroke="#FFC300" fill="#FFC300" fillOpacity={0.6} name="Posted" />
                <Area type="monotone" dataKey="applications" stackId="2" stroke="#023047" fill="#023047" fillOpacity={0.6} name="Applications" />
                <Area type="monotone" dataKey="filled" stackId="3" stroke="#6f6f6f" fill="#6f6f6f" fillOpacity={0.6} name="Filled" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="mb-6">
                <h3 style={{ color: '#FFC300' }}>Jobs by Category</h3>
                <p className="mt-1" style={{ color: '#d3d3d3' }}>Distribution across different categories</p>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={jobsByCategoryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#6f6f6f" />
                  <XAxis dataKey="category" angle={-45} textAnchor="end" height={100} stroke="#d3d3d3" />
                  <YAxis stroke="#d3d3d3" />
                  <Tooltip contentStyle={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }} />
                  <Bar dataKey="count" fill="#FFC300" name="Jobs" />
                  <Bar dataKey="applications" fill="#023047" name="Applications" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="mb-4">
                <h3 style={{ color: '#FFC300' }}>Top Performing Jobs</h3>
                <p className="mt-1" style={{ color: '#d3d3d3' }}>Most applied positions this month</p>
              </div>
              <div className="space-y-3">
                {[
                  { title: 'Senior React Developer', applications: 89, company: 'Tech Corp' },
                  { title: 'Product Manager', applications: 67, company: 'Startup Inc' },
                  { title: 'Data Scientist', applications: 62, company: 'Analytics Co' },
                  { title: 'UX Designer', applications: 56, company: 'Design Studio' },
                  { title: 'Marketing Manager', applications: 45, company: 'Brand Agency' },
                ].map((job, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
                    <div>
                      <p style={{ color: '#f6f6f6' }}>{job.title}</p>
                      <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>{job.company}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full" style={{ backgroundColor: '#FFC300', color: '#023047', fontSize: '0.75rem' }}>{job.applications} apps</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Internships Reports */}
      {activeCategory === 'internships' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
                  <GraduationCap className="w-5 h-5" style={{ color: '#023047' }} />
                </div>
                <TrendingUp className="w-4 h-4" style={{ color: '#FFC300' }} />
              </div>
              <p style={{ color: '#d3d3d3' }}>Total Internships</p>
              <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>234</p>
              <p className="mt-2" style={{ color: '#FFC300', fontSize: '0.875rem' }}>+15.3% from last month</p>
            </div>
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#023047' }}>
                  <FileText className="w-5 h-5" style={{ color: '#f6f6f6' }} />
                </div>
                <TrendingUp className="w-4 h-4" style={{ color: '#FFC300' }} />
              </div>
              <p style={{ color: '#d3d3d3' }}>Total Applications</p>
              <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>1,930</p>
              <p className="mt-2" style={{ color: '#FFC300', fontSize: '0.875rem' }}>+22.1% from last month</p>
            </div>
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
                  <Users className="w-5 h-5" style={{ color: '#023047' }} />
                </div>
                <TrendingUp className="w-4 h-4" style={{ color: '#FFC300' }} />
              </div>
              <p style={{ color: '#d3d3d3' }}>Students Placed</p>
              <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>69</p>
              <p className="mt-2" style={{ color: '#FFC300', fontSize: '0.875rem' }}>+12.9% from last month</p>
            </div>
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#023047' }}>
                  <TrendingUp className="w-5 h-5" style={{ color: '#f6f6f6' }} />
                </div>
                <TrendingUp className="w-4 h-4" style={{ color: '#FFC300' }} />
              </div>
              <p style={{ color: '#d3d3d3' }}>Placement Rate</p>
              <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>29.5%</p>
              <p className="mt-2" style={{ color: '#FFC300', fontSize: '0.875rem' }}>+3.2% from last month</p>
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <div className="mb-6">
              <h3 style={{ color: '#f6f6f6' }}>Internship Trends</h3>
              <p className="mt-1" style={{ color: '#d3d3d3' }}>Monthly internship postings and placements</p>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={internshipsMonthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#6f6f6f" />
                <XAxis dataKey="month" stroke="#d3d3d3" />
                <YAxis stroke="#d3d3d3" />
                <Tooltip contentStyle={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }} />
                <Line type="monotone" dataKey="posted" stroke="#FFC300" strokeWidth={2} name="Posted" />
                <Line type="monotone" dataKey="applications" stroke="#023047" strokeWidth={2} name="Applications" />
                <Line type="monotone" dataKey="placed" stroke="#FFC300" strokeWidth={2} name="Placed" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="mb-6">
                <h3 style={{ color: '#f6f6f6' }}>Paid vs Unpaid Internships</h3>
                <p className="mt-1" style={{ color: '#d3d3d3' }}>Distribution of compensation types</p>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={internshipsByTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {internshipsByTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#FFC300' : '#6f6f6f'} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="mb-4">
                <h3 style={{ color: '#f6f6f6' }}>Top Companies Hiring Interns</h3>
                <p className="mt-1" style={{ color: '#d3d3d3' }}>Most active companies this month</p>
              </div>
              <div className="space-y-3">
                {[
                  { company: 'Tech Corp', internships: 15, applications: 234 },
                  { company: 'Design Studio', internships: 8, applications: 156 },
                  { company: 'Analytics Co', internships: 7, applications: 145 },
                  { company: 'Brand Agency', internships: 6, applications: 134 },
                  { company: 'Startup Inc', internships: 5, applications: 89 },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
                    <div>
                      <p style={{ color: '#f6f6f6' }}>{item.company}</p>
                      <p style={{ color: '#d3d3d3' }}>{item.internships} internships</p>
                    </div>
                    <span className="px-3 py-1 rounded-full" style={{ backgroundColor: '#FFC300', color: '#023047' }}>{item.applications} apps</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Freelance Reports */}
      {activeCategory === 'freelance' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
                  <Pencil className="w-5 h-5" style={{ color: '#023047' }} />
                </div>
                <TrendingUp className="w-4 h-4" style={{ color: '#FFC300' }} />
              </div>
              <p style={{ color: '#d3d3d3' }}>Total Gigs Posted</p>
              <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>340</p>
              <p className="mt-2" style={{ color: '#FFC300', fontSize: '0.875rem' }}>+19.4% from last month</p>
            </div>
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#023047' }}>
                  <FileText className="w-5 h-5" style={{ color: '#f6f6f6' }} />
                </div>
                <TrendingUp className="w-4 h-4" style={{ color: '#FFC300' }} />
              </div>
              <p style={{ color: '#d3d3d3' }}>Total Proposals</p>
              <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>2,990</p>
              <p className="mt-2" style={{ color: '#FFC300', fontSize: '0.875rem' }}>+24.5% from last month</p>
            </div>
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
                  <Users className="w-5 h-5" style={{ color: '#023047' }} />
                </div>
                <TrendingUp className="w-4 h-4" style={{ color: '#FFC300' }} />
              </div>
              <p style={{ color: '#d3d3d3' }}>Projects Completed</p>
              <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>218</p>
              <p className="mt-2" style={{ color: '#FFC300', fontSize: '0.875rem' }}>+16.2% from last month</p>
            </div>
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#023047' }}>
                  <TrendingUp className="w-5 h-5" style={{ color: '#f6f6f6' }} />
                </div>
                <TrendingUp className="w-4 h-4" style={{ color: '#FFC300' }} />
              </div>
              <p style={{ color: '#d3d3d3' }}>Avg Proposals/Gig</p>
              <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>8.8</p>
              <p className="mt-2" style={{ color: '#FFC300', fontSize: '0.875rem' }}>+4.7% from last month</p>
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <div className="mb-6">
              <h3 style={{ color: '#f6f6f6' }}>Freelance Gig Trends</h3>
              <p className="mt-1" style={{ color: '#d3d3d3' }}>Monthly gigs posted, proposals received, and completed projects</p>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={freelanceMonthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#6f6f6f" />
                <XAxis dataKey="month" stroke="#d3d3d3" />
                <YAxis stroke="#d3d3d3" />
                <Tooltip contentStyle={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }} />
                <Area type="monotone" dataKey="posted" stackId="1" stroke="#FFC300" fill="#FFC300" fillOpacity={0.6} name="Posted" />
                <Area type="monotone" dataKey="proposals" stackId="2" stroke="#023047" fill="#023047" fillOpacity={0.6} name="Proposals" />
                <Area type="monotone" dataKey="completed" stackId="3" stroke="#6f6f6f" fill="#6f6f6f" fillOpacity={0.6} name="Completed" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="mb-6">
                <h3 style={{ color: '#f6f6f6' }}>Gigs by Experience Level</h3>
                <p className="mt-1" style={{ color: '#d3d3d3' }}>Distribution across skill levels</p>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={freelanceByLevelData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#6f6f6f" />
                  <XAxis dataKey="level" stroke="#d3d3d3" />
                  <YAxis stroke="#d3d3d3" />
                  <Tooltip contentStyle={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }} />
                  <Bar dataKey="count" fill="#FFC300" name="Gigs" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="mb-4">
                <h3 style={{ color: '#f6f6f6' }}>Top Freelance Categories</h3>
                <p className="mt-1" style={{ color: '#d3d3d3' }}>Most popular gig types</p>
              </div>
              <div className="space-y-3">
                {[
                  { category: 'Web Development', gigs: 95, proposals: 842 },
                  { category: 'Graphic Design', gigs: 78, proposals: 654 },
                  { category: 'Content Writing', gigs: 65, proposals: 512 },
                  { category: 'Video Editing', gigs: 52, proposals: 438 },
                  { category: 'SEO/Marketing', gigs: 50, proposals: 544 },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
                    <div>
                      <p style={{ color: '#f6f6f6' }}>{item.category}</p>
                      <p style={{ color: '#d3d3d3' }}>{item.gigs} gigs</p>
                    </div>
                    <span className="px-3 py-1 rounded-full" style={{ backgroundColor: '#FFC300', color: '#023047' }}>{item.proposals} proposals</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Companies Reports */}
      {activeCategory === 'companies' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
                  <Building2 className="w-5 h-5" style={{ color: '#023047' }} />
                </div>
                <TrendingUp className="w-4 h-4" style={{ color: '#FFC300' }} />
              </div>
              <p style={{ color: '#d3d3d3' }}>Total Companies</p>
              <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>456</p>
              <p className="mt-2" style={{ color: '#FFC300', fontSize: '0.875rem' }}>+5.5% from last month</p>
            </div>
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#023047' }}>
                  <Briefcase className="w-5 h-5" style={{ color: '#f6f6f6' }} />
                </div>
                <TrendingUp className="w-4 h-4" style={{ color: '#FFC300' }} />
              </div>
              <p style={{ color: '#d3d3d3' }}>Active Job Postings</p>
              <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>1,834</p>
              <p className="mt-2" style={{ color: '#FFC300', fontSize: '0.875rem' }}>+13.8% from last month</p>
            </div>
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
                  <Users className="w-5 h-5" style={{ color: '#023047' }} />
                </div>
                <TrendingUp className="w-4 h-4" style={{ color: '#FFC300' }} />
              </div>
              <p style={{ color: '#d3d3d3' }}>Verified Companies</p>
              <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>342</p>
              <p className="mt-2" style={{ color: '#FFC300', fontSize: '0.875rem' }}>+7.2% from last month</p>
            </div>
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#023047' }}>
                  <TrendingUp className="w-5 h-5" style={{ color: '#f6f6f6' }} />
                </div>
                <TrendingUp className="w-4 h-4" style={{ color: '#FFC300' }} />
              </div>
              <p style={{ color: '#d3d3d3' }}>Avg Jobs/Company</p>
              <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>4.0</p>
              <p className="mt-2" style={{ color: '#FFC300', fontSize: '0.875rem' }}>+8.1% from last month</p>
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <div className="mb-6">
              <h3 style={{ color: '#f6f6f6' }}>Company Growth</h3>
              <p className="mt-1" style={{ color: '#d3d3d3' }}>New companies joined and their job postings</p>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={companiesMonthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#6f6f6f" />
                <XAxis dataKey="month" stroke="#d3d3d3" />
                <YAxis stroke="#d3d3d3" />
                <Tooltip contentStyle={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }} />
                <Line type="monotone" dataKey="joined" stroke="#FFC300" strokeWidth={2} name="New Companies" />
                <Line type="monotone" dataKey="activeJobs" stroke="#023047" strokeWidth={2} name="Active Jobs" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="mb-6">
                <h3 style={{ color: '#f6f6f6' }}>Companies by Industry</h3>
                <p className="mt-1" style={{ color: '#d3d3d3' }}>Distribution across sectors</p>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={companiesByIndustryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ industry, percent }) => `${industry} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {companiesByIndustryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="mb-4">
                <h3 style={{ color: '#f6f6f6' }}>Most Active Companies</h3>
                <p className="mt-1" style={{ color: '#d3d3d3' }}>Top companies by job postings</p>
              </div>
              <div className="space-y-3">
                {[
                  { company: 'Tech Corp', jobs: 45, applications: 1234 },
                  { company: 'Cloud Systems', jobs: 38, applications: 1089 },
                  { company: 'Analytics Co', jobs: 32, applications: 945 },
                  { company: 'Startup Inc', jobs: 28, applications: 823 },
                  { company: 'Brand Agency', jobs: 25, applications: 756 },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
                    <div>
                      <p style={{ color: '#f6f6f6' }}>{item.company}</p>
                      <p style={{ color: '#d3d3d3' }}>{item.jobs} active jobs</p>
                    </div>
                    <span className="px-3 py-1 rounded-full" style={{ backgroundColor: '#FFC300', color: '#023047' }}>{item.applications} apps</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Users Reports */}
      {activeCategory === 'users' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
                  <Users className="w-5 h-5" style={{ color: '#023047' }} />
                </div>
                <TrendingUp className="w-4 h-4" style={{ color: '#FFC300' }} />
              </div>
              <p style={{ color: '#d3d3d3' }}>Total Users</p>
              <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>8,456</p>
              <p className="mt-2" style={{ color: '#FFC300', fontSize: '0.875rem' }}>+11.2% from last month</p>
            </div>
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#023047' }}>
                  <Users className="w-5 h-5" style={{ color: '#f6f6f6' }} />
                </div>
                <TrendingUp className="w-4 h-4" style={{ color: '#FFC300' }} />
              </div>
              <p style={{ color: '#d3d3d3' }}>Candidates</p>
              <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>7,867</p>
              <p className="mt-2" style={{ color: '#FFC300', fontSize: '0.875rem' }}>+12.4% from last month</p>
            </div>
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
                  <Building2 className="w-5 h-5" style={{ color: '#023047' }} />
                </div>
                <TrendingUp className="w-4 h-4" style={{ color: '#FFC300' }} />
              </div>
              <p style={{ color: '#d3d3d3' }}>Employers</p>
              <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>589</p>
              <p className="mt-2" style={{ color: '#FFC300', fontSize: '0.875rem' }}>+6.8% from last month</p>
            </div>
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#023047' }}>
                  <TrendingUp className="w-5 h-5" style={{ color: '#f6f6f6' }} />
                </div>
                <TrendingUp className="w-4 h-4" style={{ color: '#FFC300' }} />
              </div>
              <p style={{ color: '#d3d3d3' }}>Active Users (30d)</p>
              <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>5,234</p>
              <p className="mt-2" style={{ color: '#FFC300', fontSize: '0.875rem' }}>+9.3% from last month</p>
            </div>
          </div>

          {/* Additional Growth Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
                  <TrendingUp className="w-5 h-5" style={{ color: '#023047' }} />
                </div>
                <TrendingUp className="w-4 h-4" style={{ color: '#FFC300' }} />
              </div>
              <p style={{ color: '#d3d3d3' }}>Pro Users</p>
              <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>890</p>
              <p className="mt-2" style={{ color: '#FFC300', fontSize: '0.875rem' }}>+18.5% from last month</p>
            </div>
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#023047' }}>
                  <Users className="w-5 h-5" style={{ color: '#f6f6f6' }} />
                </div>
                <TrendingUp className="w-4 h-4" style={{ color: '#FFC300' }} />
              </div>
              <p style={{ color: '#d3d3d3' }}>Verified Users</p>
              <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>256</p>
              <p className="mt-2" style={{ color: '#FFC300', fontSize: '0.875rem' }}>+15.7% from last month</p>
            </div>
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
                  <Users className="w-5 h-5" style={{ color: '#023047' }} />
                </div>
                <TrendingUp className="w-4 h-4" style={{ color: '#FFC300' }} />
              </div>
              <p style={{ color: '#d3d3d3' }}>New Users (This Month)</p>
              <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>668</p>
              <p className="mt-2" style={{ color: '#FFC300', fontSize: '0.875rem' }}>+19.2% from last month</p>
            </div>
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#023047' }}>
                  <TrendingUp className="w-5 h-5" style={{ color: '#f6f6f6' }} />
                </div>
                <TrendingUp className="w-4 h-4" style={{ color: '#FFC300' }} />
              </div>
              <p style={{ color: '#d3d3d3' }}>Growth Rate</p>
              <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>19.2%</p>
              <p className="mt-2" style={{ color: '#FFC300', fontSize: '0.875rem' }}>+2.4% from last month</p>
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <div className="mb-6">
              <h3 style={{ color: '#FFC300' }}>User Growth Overview</h3>
              <p className="mt-1" style={{ color: '#d3d3d3' }}>Comprehensive monthly user registration trends across all segments</p>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={usersGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#6f6f6f" />
                <XAxis dataKey="month" stroke="#d3d3d3" />
                <YAxis stroke="#d3d3d3" />
                <Tooltip contentStyle={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }} />
                <Area type="monotone" dataKey="candidates" stackId="1" stroke="#023047" fill="#023047" fillOpacity={0.7} name="Candidates" />
                <Area type="monotone" dataKey="employers" stackId="1" stroke="#FFC300" fill="#FFC300" fillOpacity={0.7} name="Employers" />
                <Area type="monotone" dataKey="proUsers" stroke="#6f6f6f" fill="transparent" strokeWidth={2} name="Pro Users" />
                <Area type="monotone" dataKey="verifiedUsers" stroke="#d3d3d3" fill="transparent" strokeWidth={2} name="Verified Users" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="mb-6">
                <h3 style={{ color: '#FFC300' }}>Monthly Growth Rate</h3>
                <p className="mt-1" style={{ color: '#d3d3d3' }}>Percentage growth in total users month-over-month</p>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={userGrowthRateData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#6f6f6f" />
                  <XAxis dataKey="month" stroke="#d3d3d3" />
                  <YAxis stroke="#d3d3d3" />
                  <Tooltip contentStyle={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }} />
                  <Bar dataKey="growthRate" fill="#FFC300" name="Growth Rate %" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="mb-6">
                <h3 style={{ color: '#FFC300' }}>User Type Distribution</h3>
                <p className="mt-1" style={{ color: '#d3d3d3' }}>Breakdown of user segments by type and status</p>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={userTypeDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name.split(' ')[0]} ${(percent * 100).toFixed(1)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {userTypeDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="mb-6">
                <h3 style={{ color: '#FFC300' }}>User Activity Trends</h3>
                <p className="mt-1" style={{ color: '#d3d3d3' }}>Weekly active users and applications</p>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={userActivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#6f6f6f" />
                  <XAxis dataKey="week" stroke="#d3d3d3" />
                  <YAxis stroke="#d3d3d3" />
                  <Tooltip contentStyle={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }} />
                  <Line type="monotone" dataKey="activeUsers" stroke="#023047" strokeWidth={2} name="Active Users" />
                  <Line type="monotone" dataKey="applications" stroke="#FFC300" strokeWidth={2} name="Applications" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="mb-4">
                <h3 style={{ color: '#FFC300' }}>Top User Locations</h3>
                <p className="mt-1" style={{ color: '#d3d3d3' }}>Users by geographic area</p>
              </div>
              <div className="space-y-3">
                {[
                  { location: 'New York, NY', users: 1234 },
                  { location: 'San Francisco, CA', users: 1089 },
                  { location: 'Los Angeles, CA', users: 945 },
                  { location: 'Chicago, IL', users: 823 },
                  { location: 'Boston, MA', users: 756 },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
                    <p style={{ color: '#f6f6f6' }}>{item.location}</p>
                    <span className="px-3 py-1 rounded-full" style={{ backgroundColor: '#FFC300', color: '#023047', fontSize: '0.75rem' }}>{item.users} users</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* User Segment Analysis */}
          <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <div className="mb-6">
              <h3 style={{ color: '#FFC300' }}>User Segment Trends</h3>
              <p className="mt-1" style={{ color: '#d3d3d3' }}>Monthly breakdown of Pro and Verified user growth</p>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={usersGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#6f6f6f" />
                <XAxis dataKey="month" stroke="#d3d3d3" />
                <YAxis stroke="#d3d3d3" />
                <Tooltip contentStyle={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }} />
                <Line type="monotone" dataKey="total" stroke="#f6f6f6" strokeWidth={2} name="Total New Users" />
                <Line type="monotone" dataKey="proUsers" stroke="#FFC300" strokeWidth={2} name="Pro Users" />
                <Line type="monotone" dataKey="verifiedUsers" stroke="#023047" strokeWidth={2} name="Verified Users" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      {/* Categories Reports */}
      {activeCategory === 'categories' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
                  <FolderTree className="w-5 h-5" style={{ color: '#023047' }} />
                </div>
                <TrendingUp className="w-4 h-4" style={{ color: '#FFC300' }} />
              </div>
              <p style={{ color: '#d3d3d3' }}>Total Categories</p>
              <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>150</p>
              <p className="mt-2" style={{ color: '#FFC300', fontSize: '0.875rem' }}>+5.5% from last month</p>
            </div>
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#023047' }}>
                  <FileText className="w-5 h-5" style={{ color: '#f6f6f6' }} />
                </div>
                <TrendingUp className="w-4 h-4" style={{ color: '#FFC300' }} />
              </div>
              <p style={{ color: '#d3d3d3' }}>Active Listings</p>
              <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>2,834</p>
              <p className="mt-2" style={{ color: '#FFC300', fontSize: '0.875rem' }}>+13.8% from last month</p>
            </div>
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
                  <Users className="w-5 h-5" style={{ color: '#023047' }} />
                </div>
                <TrendingUp className="w-4 h-4" style={{ color: '#FFC300' }} />
              </div>
              <p style={{ color: '#d3d3d3' }}>Verified Categories</p>
              <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>142</p>
              <p className="mt-2" style={{ color: '#FFC300', fontSize: '0.875rem' }}>+7.2% from last month</p>
            </div>
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#023047' }}>
                  <TrendingUp className="w-5 h-5" style={{ color: '#f6f6f6' }} />
                </div>
                <TrendingUp className="w-4 h-4" style={{ color: '#FFC300' }} />
              </div>
              <p style={{ color: '#d3d3d3' }}>Avg Listings/Category</p>
              <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>19.0</p>
              <p className="mt-2" style={{ color: '#FFC300', fontSize: '0.875rem' }}>+8.1% from last month</p>
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <div className="mb-6">
              <h3 style={{ color: '#f6f6f6' }}>Category Growth</h3>
              <p className="mt-1" style={{ color: '#d3d3d3' }}>New categories added and their listings</p>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={categoriesGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#6f6f6f" />
                <XAxis dataKey="month" stroke="#d3d3d3" />
                <YAxis stroke="#d3d3d3" />
                <Tooltip contentStyle={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }} />
                <Line type="monotone" dataKey="added" stroke="#FFC300" strokeWidth={2} name="New Categories" />
                <Line type="monotone" dataKey="listings" stroke="#023047" strokeWidth={2} name="Active Listings" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="mb-6">
                <h3 style={{ color: '#f6f6f6' }}>Categories by Industry</h3>
                <p className="mt-1" style={{ color: '#d3d3d3' }}>Distribution across sectors</p>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={companiesByIndustryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ industry, percent }) => `${industry} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {companiesByIndustryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="mb-4">
                <h3 style={{ color: '#f6f6f6' }}>Most Active Categories</h3>
                <p className="mt-1" style={{ color: '#d3d3d3' }}>Top categories by listings</p>
              </div>
              <div className="space-y-3">
                {[
                  { category: 'Tech Corp', listings: 45, applications: 1234 },
                  { category: 'Cloud Systems', listings: 38, applications: 1089 },
                  { category: 'Analytics Co', listings: 32, applications: 945 },
                  { category: 'Startup Inc', listings: 28, applications: 823 },
                  { category: 'Brand Agency', listings: 25, applications: 756 },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
                    <div>
                      <p style={{ color: '#f6f6f6' }}>{item.category}</p>
                      <p style={{ color: '#d3d3d3' }}>{item.listings} active listings</p>
                    </div>
                    <span className="px-3 py-1 rounded-full" style={{ backgroundColor: '#FFC300', color: '#023047' }}>{item.applications} apps</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}