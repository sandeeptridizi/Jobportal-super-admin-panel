import { useState } from 'react';
import { DollarSign, TrendingUp, CreditCard, Calendar, Download, Filter, Search, X, Users, Briefcase, Zap, GraduationCap, UserCheck, Building2, Target, Edit, Save } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Plan {
  id: string;
  name: string;
  category: 'User' | 'Company' | 'Recruiter' | 'Trainer' | 'Freelancer' | 'Tutor' | 'Quick Recruit' | 'Internship';
  price: number;
  type: 'monthly' | 'per-job' | 'credits' | 'hourly';
  details?: string;
  subscribers: number;
  revenue: number;
  growth: number;
}

interface Transaction {
  id: number;
  planId: string;
  planName: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  paymentMethod: string;
}

const INITIAL_PLANS: Plan[] = [
  { id: 'user-pro', name: 'User - Pro', category: 'User', price: 99, type: 'monthly', details: 'month', subscribers: 1245, revenue: 123255, growth: 12.5 },
  { id: 'user-expert', name: 'User - Expert', category: 'User', price: 199, type: 'monthly', details: 'month', subscribers: 876, revenue: 174324, growth: 8.3 },
  { id: 'company-job', name: 'Company Job', category: 'Company', price: 199, type: 'per-job', details: 'job', subscribers: 342, revenue: 68058, growth: 15.2 },
  { id: 'company-job-pro', name: 'Company Job - Pro', category: 'Company', price: 299, type: 'per-job', details: 'job', subscribers: 234, revenue: 69966, growth: 18.7 },
  { id: 'recruiters-db', name: 'Recruiters Database', category: 'Recruiter', price: 2999, type: 'monthly', details: 'month', subscribers: 89, revenue: 266911, growth: 22.1 },
  { id: 'recruiters-db-pro', name: 'Recruiters Database - Pro', category: 'Recruiter', price: 3999, type: 'monthly', details: 'month', subscribers: 56, revenue: 223944, growth: 19.8 },
  { id: 'personal-trainer', name: 'Personal Trainer', category: 'Trainer', price: 4999, type: 'hourly', details: 'up to 20 hrs', subscribers: 43, revenue: 214957, growth: 25.3 },
  { id: 'personal-trainer-pro', name: 'Personal Trainer - Pro', category: 'Trainer', price: 9999, type: 'hourly', details: 'up to 48 hrs', subscribers: 28, revenue: 279972, growth: 31.2 },
  { id: 'freelancer', name: 'Freelancer', category: 'Freelancer', price: 3000, type: 'credits', details: 'Credits-based', subscribers: 187, revenue: 561000, growth: 14.6 },
  { id: 'tutors', name: 'Tutors', category: 'Tutor', price: 1999, type: 'hourly', details: 'up to 8 hrs', subscribers: 134, revenue: 267866, growth: 16.9 },
  { id: 'quick-recruit', name: 'Quick Recruit', category: 'Quick Recruit', price: 2499, type: 'per-job', details: 'job', subscribers: 98, revenue: 244902, growth: 20.4 },
  { id: 'quick-recruit-pro', name: 'Quick Recruit - Pro', category: 'Quick Recruit', price: 3499, type: 'per-job', details: 'job', subscribers: 67, revenue: 234433, growth: 23.7 },
  { id: 'internship', name: 'Internship', category: 'Internship', price: 99, type: 'per-job', details: 'job', subscribers: 456, revenue: 45144, growth: 10.2 },
];

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 1, planId: 'personal-trainer-pro', planName: 'Personal Trainer - Pro', customerName: 'Rajesh Kumar', customerEmail: 'rajesh@example.com', amount: 9999, date: '2024-03-27', status: 'completed', paymentMethod: 'UPI' },
  { id: 2, planId: 'recruiters-db', planName: 'Recruiters Database', customerName: 'TechCorp Solutions', customerEmail: 'admin@techcorp.com', amount: 2999, date: '2024-03-27', status: 'completed', paymentMethod: 'Net Banking' },
  { id: 3, planId: 'quick-recruit-pro', planName: 'Quick Recruit - Pro', customerName: 'Infosys Ltd', customerEmail: 'hr@infosys.com', amount: 3499, date: '2024-03-27', status: 'pending', paymentMethod: 'Credit Card' },
  { id: 4, planId: 'freelancer', planName: 'Freelancer', customerName: 'Priya Sharma', customerEmail: 'priya.sharma@email.com', amount: 3000, date: '2024-03-26', status: 'completed', paymentMethod: 'UPI' },
  { id: 5, planId: 'tutors', planName: 'Tutors', customerName: 'Amit Patel', customerEmail: 'amit.patel@gmail.com', amount: 1999, date: '2024-03-26', status: 'completed', paymentMethod: 'Debit Card' },
  { id: 6, planId: 'user-expert', planName: 'User - Expert', customerName: 'Sneha Reddy', customerEmail: 'sneha.reddy@yahoo.com', amount: 199, date: '2024-03-26', status: 'completed', paymentMethod: 'UPI' },
  { id: 7, planId: 'company-job-pro', planName: 'Company Job - Pro', customerName: 'Wipro Technologies', customerEmail: 'recruitment@wipro.com', amount: 299, date: '2024-03-25', status: 'completed', paymentMethod: 'Net Banking' },
  { id: 8, planId: 'personal-trainer', planName: 'Personal Trainer', customerName: 'Vikram Singh', customerEmail: 'vikram@example.com', amount: 4999, date: '2024-03-25', status: 'failed', paymentMethod: 'Credit Card' },
];

export function Finance() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [plans, setPlans] = useState<Plan[]>(INITIAL_PLANS);
  const [editFormData, setEditFormData] = useState<Plan | null>(null);

  const totalRevenue = plans.reduce((sum, plan) => sum + plan.revenue, 0);
  const totalSubscribers = plans.reduce((sum, plan) => sum + plan.subscribers, 0);
  const averageGrowth = plans.reduce((sum, plan) => sum + plan.growth, 0) / plans.length;

  const filteredPlans = plans.filter(plan => {
    const matchesCategory = selectedCategory === 'all' || plan.category === selectedCategory;
    const matchesSearch = plan.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categoryBreakdown = Object.entries(
    plans.reduce((acc, plan) => {
      acc[plan.category] = (acc[plan.category] || 0) + plan.revenue;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  const revenueTrendData = [
    { id: 'trend-oct', month: 'Oct', revenue: 2100000 },
    { id: 'trend-nov', month: 'Nov', revenue: 2350000 },
    { id: 'trend-dec', month: 'Dec', revenue: 2600000 },
    { id: 'trend-jan', month: 'Jan', revenue: 2800000 },
    { id: 'trend-feb', month: 'Feb', revenue: 2950000 },
    { id: 'trend-mar', month: 'Mar', revenue: 3274532 },
  ];

  const topPerformingPlans = [...plans]
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5)
    .map((plan, index) => ({
      id: `top-plan-${index}`,
      name: plan.name,
      revenue: plan.revenue,
    }));

  const COLORS = ['#FFC300', '#023047', '#6f6f6f', '#d3d3d3', '#FFD54F', '#0A4D68', '#8D8D8D', '#E8E8E8'];

  const categories = ['all', ...Array.from(new Set(INITIAL_PLANS.map(p => p.category)))];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'User': return Users;
      case 'Company': return Building2;
      case 'Recruiter': return Target;
      case 'Trainer': return UserCheck;
      case 'Freelancer': return Zap;
      case 'Tutor': return GraduationCap;
      case 'Quick Recruit': return Briefcase;
      case 'Internship': return GraduationCap;
      default: return DollarSign;
    }
  };

  const handleEditPlan = (plan: Plan) => {
    setEditingPlan(plan);
    setEditFormData({ ...plan });
  };

  const handleSavePlan = () => {
    if (editFormData) {
      setPlans(plans.map(p => p.id === editFormData.id ? editFormData : p));
      setEditingPlan(null);
      setEditFormData(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 style={{ color: '#f6f6f6', fontSize: '2rem', fontWeight: '700' }}>Finance Management</h1>
          <p style={{ color: '#d3d3d3', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Track and manage incoming finances across all subscription plans
          </p>
        </div>
        <div className="flex gap-3">
          <button
            className="px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
            style={{
              backgroundColor: '#023047',
              color: '#f6f6f6',
              border: '1px solid #6f6f6f',
            }}
          >
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      <div className="flex gap-2">
        {(['week', 'month', 'quarter', 'year'] as const).map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className="px-4 py-2 rounded-lg transition-all capitalize"
            style={{
              backgroundColor: timeRange === range ? '#FFC300' : '#023047',
              color: timeRange === range ? '#023047' : '#f6f6f6',
              border: '1px solid #6f6f6f',
            }}
          >
            {range}
          </button>
        ))}
      </div>

      <div
        className="p-6 rounded-xl"
        style={{
          background: 'radial-gradient(ellipse at top left, rgba(255, 195, 0, 0.1), rgba(2, 48, 71, 0.8))',
          border: '2px solid #FFC300',
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5" style={{ color: '#FFC300' }} />
          <h3 style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>Filters</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
              Search Plans
            </label>
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                style={{ color: '#6f6f6f' }}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by plan name..."
                className="w-full pl-10 pr-4 py-2 rounded-lg"
                style={{
                  backgroundColor: '#023047',
                  border: '1px solid #6f6f6f',
                  color: '#f6f6f6',
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 rounded-lg"
              style={{
                backgroundColor: '#023047',
                border: '1px solid #6f6f6f',
                color: '#f6f6f6',
              }}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div
          className="p-6 rounded-xl transition-all cursor-pointer"
          style={{
            background: 'radial-gradient(ellipse at top left, rgba(255, 195, 0, 0.15), rgba(2, 48, 71, 0.8))',
            border: '1px solid #6f6f6f',
          }}
        >
          <div className="flex justify-between items-start mb-4">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: '#FFC300' }}
            >
              <DollarSign className="w-6 h-6" style={{ color: '#023047' }} />
            </div>
            <span
              className="px-2 py-1 rounded text-xs"
              style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)', color: '#4ade80' }}
            >
              +{averageGrowth.toFixed(1)}%
            </span>
          </div>
          <h3 style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Total Revenue</h3>
          <p style={{ color: '#f6f6f6', fontSize: '1.875rem', fontWeight: '700', marginTop: '0.5rem' }}>
            ₹{totalRevenue.toLocaleString('en-IN')}
          </p>
        </div>

        <div
          className="p-6 rounded-xl transition-all cursor-pointer"
          style={{
            background: 'radial-gradient(ellipse at top left, rgba(2, 48, 71, 0.5), rgba(2, 48, 71, 0.8))',
            border: '1px solid #6f6f6f',
          }}
        >
          <div className="flex justify-between items-start mb-4">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: '#023047', border: '1px solid #FFC300' }}
            >
              <Users className="w-6 h-6" style={{ color: '#FFC300' }} />
            </div>
            <span
              className="px-2 py-1 rounded text-xs"
              style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)', color: '#4ade80' }}
            >
              Active
            </span>
          </div>
          <h3 style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Total Subscribers</h3>
          <p style={{ color: '#f6f6f6', fontSize: '1.875rem', fontWeight: '700', marginTop: '0.5rem' }}>
            {totalSubscribers.toLocaleString('en-IN')}
          </p>
        </div>

        <div
          className="p-6 rounded-xl transition-all cursor-pointer"
          style={{
            background: 'radial-gradient(ellipse at top left, rgba(2, 48, 71, 0.5), rgba(2, 48, 71, 0.8))',
            border: '1px solid #6f6f6f',
          }}
        >
          <div className="flex justify-between items-start mb-4">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: '#023047', border: '1px solid #FFC300' }}
            >
              <CreditCard className="w-6 h-6" style={{ color: '#FFC300' }} />
            </div>
          </div>
          <h3 style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Active Plans</h3>
          <p style={{ color: '#f6f6f6', fontSize: '1.875rem', fontWeight: '700', marginTop: '0.5rem' }}>
            {INITIAL_PLANS.length}
          </p>
        </div>

        <div
          className="p-6 rounded-xl transition-all cursor-pointer"
          style={{
            background: 'radial-gradient(ellipse at top left, rgba(2, 48, 71, 0.5), rgba(2, 48, 71, 0.8))',
            border: '1px solid #6f6f6f',
          }}
        >
          <div className="flex justify-between items-start mb-4">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: '#023047', border: '1px solid #FFC300' }}
            >
              <TrendingUp className="w-6 h-6" style={{ color: '#FFC300' }} />
            </div>
            <span
              className="px-2 py-1 rounded text-xs"
              style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)', color: '#4ade80' }}
            >
              Growth
            </span>
          </div>
          <h3 style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Avg. Growth Rate</h3>
          <p style={{ color: '#f6f6f6', fontSize: '1.875rem', fontWeight: '700', marginTop: '0.5rem' }}>
            {averageGrowth.toFixed(1)}%
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
          className="p-6 rounded-xl"
          style={{
            background: 'radial-gradient(ellipse at top left, rgba(2, 48, 71, 0.5), rgba(2, 48, 71, 0.8))',
            border: '1px solid #6f6f6f',
          }}
        >
          <h3 style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
            Revenue Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#6f6f6f" />
              <XAxis dataKey="month" stroke="#d3d3d3" />
              <YAxis stroke="#d3d3d3" />
              <Tooltip
                contentStyle={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', borderRadius: '8px' }}
                labelStyle={{ color: '#f6f6f6' }}
              />
              <Line type="monotone" dataKey="revenue" stroke="#FFC300" strokeWidth={3} dot={{ fill: '#FFC300', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div
          className="p-6 rounded-xl"
          style={{
            background: 'radial-gradient(ellipse at top left, rgba(2, 48, 71, 0.5), rgba(2, 48, 71, 0.8))',
            border: '1px solid #6f6f6f',
          }}
        >
          <h3 style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
            Revenue by Category
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryBreakdown.map((entry, index) => (
                  <Cell key={`category-${entry.name}-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', borderRadius: '8px' }}
                formatter={(value: any) => `₹${value.toLocaleString('en-IN')}`}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div
        className="p-6 rounded-xl"
        style={{
          background: 'radial-gradient(ellipse at top left, rgba(2, 48, 71, 0.5), rgba(2, 48, 71, 0.8))',
          border: '1px solid #6f6f6f',
        }}
      >
        <h3 style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
          Top Performing Plans
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topPerformingPlans} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#6f6f6f" />
            <XAxis type="number" stroke="#d3d3d3" />
            <YAxis dataKey="name" type="category" stroke="#d3d3d3" width={180} />
            <Tooltip
              contentStyle={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', borderRadius: '8px' }}
              formatter={(value: any) => `₹${value.toLocaleString('en-IN')}`}
            />
            <Bar dataKey="revenue" fill="#FFC300" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div
        className="p-6 rounded-xl"
        style={{
          background: 'radial-gradient(ellipse at top left, rgba(2, 48, 71, 0.5), rgba(2, 48, 71, 0.8))',
          border: '1px solid #6f6f6f',
        }}
      >
        <h3 style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
          All Subscription Plans ({filteredPlans.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPlans.map((plan) => {
            const Icon = getCategoryIcon(plan.category);
            return (
              <div
                key={plan.id}
                className="p-4 rounded-lg transition-all relative"
                style={{
                  backgroundColor: '#023047',
                  border: '1px solid #6f6f6f',
                }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditPlan(plan);
                  }}
                  className="absolute top-3 right-3 p-2 rounded-lg transition-all"
                  style={{
                    backgroundColor: 'rgba(255, 195, 0, 0.2)',
                    border: '1px solid #FFC300',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFC300';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.2)';
                  }}
                >
                  <Edit className="w-4 h-4" style={{ color: '#FFC300' }} />
                </button>

                <div 
                  onClick={() => setSelectedPlan(plan)}
                  className="cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-3 pr-10">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(255, 195, 0, 0.2)', border: '1px solid #FFC300' }}
                    >
                      <Icon className="w-5 h-5" style={{ color: '#FFC300' }} />
                    </div>
                    <span
                      className="px-2 py-1 rounded text-xs"
                      style={{
                        backgroundColor: plan.growth > 20 ? 'rgba(34, 197, 94, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                        color: plan.growth > 20 ? '#4ade80' : '#60a5fa',
                      }}
                    >
                      +{plan.growth}%
                    </span>
                  </div>

                  <h4 style={{ color: '#f6f6f6', fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                    {plan.name}
                  </h4>
                  <p style={{ color: '#d3d3d3', fontSize: '0.75rem', marginBottom: '1rem' }}>
                    {plan.category}
                  </p>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Price:</span>
                      <span style={{ color: '#FFC300', fontSize: '0.875rem', fontWeight: '600' }}>
                        ₹{plan.price.toLocaleString('en-IN')} / {plan.details}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Subscribers:</span>
                      <span style={{ color: '#f6f6f6', fontSize: '0.875rem' }}>
                        {plan.subscribers.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Revenue:</span>
                      <span style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>
                        ₹{plan.revenue.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="p-6 rounded-xl"
        style={{
          background: 'radial-gradient(ellipse at top left, rgba(2, 48, 71, 0.5), rgba(2, 48, 71, 0.8))',
          border: '1px solid #6f6f6f',
        }}
      >
        <h3 style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
          Recent Transactions
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid #6f6f6f' }}>
                <th style={{ color: '#d3d3d3', fontSize: '0.875rem', textAlign: 'left', padding: '0.75rem' }}>
                  Customer
                </th>
                <th style={{ color: '#d3d3d3', fontSize: '0.875rem', textAlign: 'left', padding: '0.75rem' }}>
                  Plan
                </th>
                <th style={{ color: '#d3d3d3', fontSize: '0.875rem', textAlign: 'left', padding: '0.75rem' }}>
                  Amount
                </th>
                <th style={{ color: '#d3d3d3', fontSize: '0.875rem', textAlign: 'left', padding: '0.75rem' }}>
                  Date
                </th>
                <th style={{ color: '#d3d3d3', fontSize: '0.875rem', textAlign: 'left', padding: '0.75rem' }}>
                  Payment Method
                </th>
                <th style={{ color: '#d3d3d3', fontSize: '0.875rem', textAlign: 'left', padding: '0.75rem' }}>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {MOCK_TRANSACTIONS.map((transaction) => (
                <tr key={transaction.id} style={{ borderBottom: '1px solid #6f6f6f' }}>
                  <td style={{ padding: '0.75rem' }}>
                    <div>
                      <p style={{ color: '#f6f6f6', fontSize: '0.875rem' }}>{transaction.customerName}</p>
                      <p style={{ color: '#d3d3d3', fontSize: '0.75rem' }}>{transaction.customerEmail}</p>
                    </div>
                  </td>
                  <td style={{ color: '#f6f6f6', fontSize: '0.875rem', padding: '0.75rem' }}>
                    {transaction.planName}
                  </td>
                  <td style={{ color: '#FFC300', fontSize: '0.875rem', fontWeight: '600', padding: '0.75rem' }}>
                    ₹{transaction.amount.toLocaleString('en-IN')}
                  </td>
                  <td style={{ color: '#d3d3d3', fontSize: '0.875rem', padding: '0.75rem' }}>
                    {new Date(transaction.date).toLocaleDateString('en-IN')}
                  </td>
                  <td style={{ color: '#d3d3d3', fontSize: '0.875rem', padding: '0.75rem' }}>
                    {transaction.paymentMethod}
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <span
                      className="px-2 py-1 rounded text-xs"
                      style={{
                        backgroundColor:
                          transaction.status === 'completed'
                            ? 'rgba(34, 197, 94, 0.2)'
                            : transaction.status === 'pending'
                            ? 'rgba(234, 179, 8, 0.2)'
                            : 'rgba(239, 68, 68, 0.2)',
                        color:
                          transaction.status === 'completed'
                            ? '#4ade80'
                            : transaction.status === 'pending'
                            ? '#fbbf24'
                            : '#f87171',
                      }}
                    >
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedPlan && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
          onClick={() => setSelectedPlan(null)}
        >
          <div
            className="p-6 rounded-xl max-w-2xl w-full mx-4"
            style={{
              background: 'radial-gradient(ellipse at top left, rgba(2, 48, 71, 0.95), rgba(1, 32, 48, 0.95))',
              border: '2px solid #FFC300',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>{selectedPlan.name}</h2>
              <button onClick={() => setSelectedPlan(null)}>
                <X className="w-6 h-6" style={{ color: '#d3d3d3' }} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <p style={{ color: '#d3d3d3', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Category</p>
                <p style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>{selectedPlan.category}</p>
              </div>
              <div>
                <p style={{ color: '#d3d3d3', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Price</p>
                <p style={{ color: '#FFC300', fontSize: '1.125rem', fontWeight: '600' }}>
                  ₹{selectedPlan.price.toLocaleString('en-IN')} / {selectedPlan.details}
                </p>
              </div>
              <div>
                <p style={{ color: '#d3d3d3', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Total Subscribers</p>
                <p style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>
                  {selectedPlan.subscribers.toLocaleString('en-IN')}
                </p>
              </div>
              <div>
                <p style={{ color: '#d3d3d3', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Total Revenue</p>
                <p style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>
                  ₹{selectedPlan.revenue.toLocaleString('en-IN')}
                </p>
              </div>
              <div>
                <p style={{ color: '#d3d3d3', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Growth Rate</p>
                <p style={{ color: '#4ade80', fontSize: '1.125rem', fontWeight: '600' }}>+{selectedPlan.growth}%</p>
              </div>
              <div>
                <p style={{ color: '#d3d3d3', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Type</p>
                <p style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>
                  {selectedPlan.type.charAt(0).toUpperCase() + selectedPlan.type.slice(1)}
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedPlan(null)}
              className="w-full py-3 rounded-lg transition-all"
              style={{
                backgroundColor: '#FFC300',
                color: '#023047',
                fontWeight: '600',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {editingPlan && editFormData && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
          onClick={() => setEditingPlan(null)}
        >
          <div
            className="p-6 rounded-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            style={{
              background: 'radial-gradient(ellipse at top left, rgba(2, 48, 71, 0.95), rgba(1, 32, 48, 0.95))',
              border: '2px solid #FFC300',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>Edit Plan: {editingPlan.name}</h2>
              <button onClick={() => setEditingPlan(null)}>
                <X className="w-6 h-6" style={{ color: '#d3d3d3' }} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                  Plan Name
                </label>
                <input
                  type="text"
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{
                    backgroundColor: '#023047',
                    border: '1px solid #6f6f6f',
                    color: '#f6f6f6',
                  }}
                />
              </div>

              <div>
                <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                  Category
                </label>
                <select
                  value={editFormData.category}
                  onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value as any })}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{
                    backgroundColor: '#023047',
                    border: '1px solid #6f6f6f',
                    color: '#f6f6f6',
                  }}
                >
                  <option value="User">User</option>
                  <option value="Company">Company</option>
                  <option value="Recruiter">Recruiter</option>
                  <option value="Trainer">Trainer</option>
                  <option value="Freelancer">Freelancer</option>
                  <option value="Tutor">Tutor</option>
                  <option value="Quick Recruit">Quick Recruit</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div>
                <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                  Price (₹)
                </label>
                <input
                  type="number"
                  value={editFormData.price}
                  onChange={(e) => setEditFormData({ ...editFormData, price: Number(e.target.value) })}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{
                    backgroundColor: '#023047',
                    border: '1px solid #6f6f6f',
                    color: '#f6f6f6',
                  }}
                />
              </div>

              <div>
                <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                  Billing Type
                </label>
                <select
                  value={editFormData.type}
                  onChange={(e) => setEditFormData({ ...editFormData, type: e.target.value as any })}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{
                    backgroundColor: '#023047',
                    border: '1px solid #6f6f6f',
                    color: '#f6f6f6',
                  }}
                >
                  <option value="monthly">Monthly</option>
                  <option value="per-job">Per Job</option>
                  <option value="credits">Credits</option>
                  <option value="hourly">Hourly</option>
                </select>
              </div>

              <div>
                <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                  Details
                </label>
                <input
                  type="text"
                  value={editFormData.details || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, details: e.target.value })}
                  placeholder="e.g., month, job, up to 20 hrs"
                  className="w-full px-4 py-2 rounded-lg"
                  style={{
                    backgroundColor: '#023047',
                    border: '1px solid #6f6f6f',
                    color: '#f6f6f6',
                  }}
                />
              </div>

              <div>
                <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                  Subscribers
                </label>
                <input
                  type="number"
                  value={editFormData.subscribers}
                  onChange={(e) => setEditFormData({ ...editFormData, subscribers: Number(e.target.value) })}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{
                    backgroundColor: '#023047',
                    border: '1px solid #6f6f6f',
                    color: '#f6f6f6',
                  }}
                />
              </div>

              <div>
                <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                  Revenue (₹)
                </label>
                <input
                  type="number"
                  value={editFormData.revenue}
                  onChange={(e) => setEditFormData({ ...editFormData, revenue: Number(e.target.value) })}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{
                    backgroundColor: '#023047',
                    border: '1px solid #6f6f6f',
                    color: '#f6f6f6',
                  }}
                />
              </div>

              <div>
                <label style={{ color: '#d3d3d3', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                  Growth Rate (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={editFormData.growth}
                  onChange={(e) => setEditFormData({ ...editFormData, growth: Number(e.target.value) })}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{
                    backgroundColor: '#023047',
                    border: '1px solid #6f6f6f',
                    color: '#f6f6f6',
                  }}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSavePlan}
                className="flex-1 py-3 rounded-lg flex items-center justify-center gap-2 transition-all"
                style={{
                  backgroundColor: '#FFC300',
                  color: '#023047',
                  fontWeight: '600',
                }}
              >
                <Save className="w-5 h-5" />
                Save Changes
              </button>
              <button
                onClick={() => setEditingPlan(null)}
                className="px-6 py-3 rounded-lg transition-all"
                style={{
                  backgroundColor: '#023047',
                  color: '#f6f6f6',
                  border: '1px solid #6f6f6f',
                }}
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