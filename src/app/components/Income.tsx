import { useState } from 'react';
import { DollarSign, TrendingUp, Users, Briefcase, Zap, CreditCard, Download, Calendar, ArrowUpRight, Building2, Crown, CheckCircle, Edit3, Search, Filter, Tag, Percent, X, Plus, Save } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Transaction {
  id: number;
  type: 'company' | 'user' | 'freelancer';
  userName: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  plan?: string;
}

interface PlanDetails {
  name: string;
  price: number;
  duration: string;
  features: string[];
  subscribers?: number;
  purchases?: number;
  revenue: number;
}

interface Entity {
  id: number;
  name: string;
  type: 'company' | 'user' | 'freelancer';
  currentPlan: string;
  planPrice: number;
  renewalDate: string;
  status: 'active' | 'expired' | 'trial';
  email: string;
}

interface Coupon {
  id: number;
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  applicableTo: 'company' | 'user' | 'freelancer' | 'all';
  validUntil: string;
  usageLimit: number;
  usageCount: number;
  status: 'active' | 'expired';
}

export function Income() {
  const [activeTab, setActiveTab] = useState<'analytics' | 'update-plans' | 'plan-settings'>('analytics');
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');
  const [selectedRevenue, setSelectedRevenue] = useState<'all' | 'company' | 'user' | 'freelancer'>('all');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'company' | 'user' | 'freelancer'>('all');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [updatePlansSubTab, setUpdatePlansSubTab] = useState<'plans' | 'coupons'>('plans');

  const [showEditPlanModal, setShowEditPlanModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PlanDetails | null>(null);
  const [editPlanType, setEditPlanType] = useState<'company' | 'user' | 'freelancer'>('company');

  const revenueStats = {
    total: 1847520,
    monthly: 452300,
    weekly: 104850,
    growth: 18.5,
    companies: 984560,
    users: 592140,
    freelancers: 270820,
  };

  const monthlyRevenueData = [
    { month: 'Jan', companies: 145000, users: 84000, freelancers: 38000, total: 267000 },
    { month: 'Feb', companies: 158000, users: 92000, freelancers: 42000, total: 292000 },
    { month: 'Mar', companies: 172000, users: 98000, freelancers: 45000, total: 315000 },
    { month: 'Apr', companies: 185000, users: 105000, freelancers: 48000, total: 338000 },
    { month: 'May', companies: 196000, users: 112000, freelancers: 52000, total: 360000 },
    { month: 'Jun', companies: 208000, users: 118000, freelancers: 56000, total: 382000 },
  ];

  const revenueDistribution = [
    { name: 'Companies', value: revenueStats.companies, color: '#023047' },
    { name: 'Users', value: revenueStats.users, color: '#FFC300' },
    { name: 'Freelancers', value: revenueStats.freelancers, color: '#6f6f6f' },
  ];

  const [subscriptionPlans, setSubscriptionPlans] = useState<{
    companies: PlanDetails[];
    users: PlanDetails[];
    freelancers: PlanDetails[];
  }>({
    companies: [
      { 
        name: 'Free Plan', 
        price: 0, 
        duration: 'Lifetime',
        features: ['Post 1 job', 'Basic analytics', 'Email support'],
        subscribers: 245, 
        revenue: 0 
      },
      { 
        name: 'Pro Plan', 
        price: 99, 
        duration: 'Monthly',
        features: ['Post 5 jobs', 'Advanced analytics', 'Priority support', 'Verified badge'],
        subscribers: 1842, 
        revenue: 182358 
      },
      { 
        name: 'Quick Recruit', 
        price: 999, 
        duration: 'Monthly',
        features: ['Post 20 jobs', 'Premium analytics', '24/7 support', 'Featured listings', 'Application tracking'],
        subscribers: 456, 
        revenue: 455544 
      },
      { 
        name: 'Complete Recruit', 
        price: 2499, 
        duration: 'Monthly',
        features: ['Unlimited job posts', 'Full analytics suite', 'Dedicated account manager', 'API access', 'Custom branding', 'Background verification'],
        subscribers: 139, 
        revenue: 347361 
      },
    ],
    users: [
      { 
        name: 'Elite Plan', 
        price: 99, 
        duration: 'Monthly',
        features: ['Apply to 50 jobs', 'Resume builder', 'Profile boost', 'Email alerts'],
        subscribers: 3245, 
        revenue: 321255 
      },
      { 
        name: 'Pro Plan', 
        price: 199, 
        duration: 'Monthly',
        features: ['Unlimited applications', 'Premium resume templates', 'Priority visibility', 'Career coaching', 'Interview preparation'],
        subscribers: 1362, 
        revenue: 271038 
      },
    ],
    freelancers: [
      { 
        name: 'Credit Plan', 
        price: 1999, 
        duration: 'One-time',
        features: ['100 credits', 'Bid on projects', 'Portfolio showcase', 'Client messaging', 'Payment protection'],
        purchases: 542, 
        revenue: 1083458 
      },
    ],
  });

  const [entities] = useState<Entity[]>([
    { id: 1, name: 'Tech Corp', type: 'company', currentPlan: 'Complete Recruit', planPrice: 2499, renewalDate: '2025-01-15', status: 'active', email: 'hr@techcorp.com' },
    { id: 2, name: 'Startup Inc', type: 'company', currentPlan: 'Quick Recruit', planPrice: 999, renewalDate: '2025-02-20', status: 'active', email: 'jobs@startup.com' },
    { id: 3, name: 'Design Studio', type: 'company', currentPlan: 'Pro Plan', planPrice: 99, renewalDate: '2024-12-30', status: 'active', email: 'design@studio.com' },
    { id: 4, name: 'John Doe', type: 'user', currentPlan: 'Pro Plan', planPrice: 199, renewalDate: '2025-01-10', status: 'active', email: 'john@email.com' },
    { id: 5, name: 'Sarah Wilson', type: 'user', currentPlan: 'Elite Plan', planPrice: 99, renewalDate: '2025-03-05', status: 'active', email: 'sarah@email.com' },
    { id: 6, name: 'Mike Johnson', type: 'freelancer', currentPlan: 'Credit Plan', planPrice: 1999, renewalDate: '2024-12-15', status: 'expired', email: 'mike@email.com' },
    { id: 7, name: 'Analytics Co', type: 'company', currentPlan: 'Free', planPrice: 0, renewalDate: '-', status: 'trial', email: 'talent@analytics.com' },
    { id: 8, name: 'Emily Davis', type: 'user', currentPlan: 'Elite Plan', planPrice: 99, renewalDate: '2025-02-14', status: 'active', email: 'emily@email.com' },
  ]);

  const [coupons, setCoupons] = useState<Coupon[]>([
    { id: 1, code: 'WINTER2024', discount: 20, type: 'percentage', applicableTo: 'all', validUntil: '2024-12-31', usageLimit: 100, usageCount: 45, status: 'active' },
    { id: 2, code: 'COMPANY50', discount: 50, type: 'percentage', applicableTo: 'company', validUntil: '2025-01-15', usageLimit: 50, usageCount: 28, status: 'active' },
    { id: 3, code: 'NEWUSER100', discount: 100, type: 'fixed', applicableTo: 'user', validUntil: '2025-02-28', usageLimit: 200, usageCount: 89, status: 'active' },
    { id: 4, code: 'FREELANCE500', discount: 500, type: 'fixed', applicableTo: 'freelancer', validUntil: '2025-03-31', usageLimit: 75, usageCount: 12, status: 'active' },
    { id: 5, code: 'EARLYBIRD', discount: 30, type: 'percentage', applicableTo: 'all', validUntil: '2024-11-30', usageLimit: 150, usageCount: 150, status: 'expired' },
  ]);

  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discount: 0,
    type: 'percentage' as 'percentage' | 'fixed',
    applicableTo: 'all' as 'company' | 'user' | 'freelancer' | 'all',
    validUntil: '',
    usageLimit: 100,
  });

  const transactions: Transaction[] = [
    { id: 1, type: 'company', userName: 'Tech Corp', amount: 2499, date: '2024-12-08', status: 'completed', plan: 'Complete Recruit' },
    { id: 2, type: 'user', userName: 'John Doe', amount: 199, date: '2024-12-08', status: 'completed', plan: 'Pro Plan' },
    { id: 3, type: 'freelancer', userName: 'Sarah Wilson', amount: 1999, date: '2024-12-07', status: 'completed', plan: 'Credit Plan' },
    { id: 4, type: 'company', userName: 'Startup Inc', amount: 999, date: '2024-12-07', status: 'completed', plan: 'Quick Recruit' },
    { id: 5, type: 'user', userName: 'Mike Johnson', amount: 99, date: '2024-12-07', status: 'pending', plan: 'Elite Plan' },
    { id: 6, type: 'company', userName: 'Design Studio', amount: 99, date: '2024-12-06', status: 'completed', plan: 'Pro Plan' },
    { id: 7, type: 'freelancer', userName: 'Emily Davis', amount: 1999, date: '2024-12-06', status: 'completed', plan: 'Credit Plan' },
    { id: 8, type: 'user', userName: 'David Brown', amount: 199, date: '2024-12-06', status: 'completed', plan: 'Pro Plan' },
    { id: 9, type: 'company', userName: 'Analytics Co', amount: 2499, date: '2024-12-05', status: 'completed', plan: 'Complete Recruit' },
    { id: 10, type: 'user', userName: 'Chris Lee', amount: 99, date: '2024-12-05', status: 'failed', plan: 'Elite Plan' },
    { id: 11, type: 'company', userName: 'Cloud Systems', amount: 999, date: '2024-12-04', status: 'completed', plan: 'Quick Recruit' },
    { id: 12, type: 'freelancer', userName: 'Lisa Anderson', amount: 1999, date: '2024-12-04', status: 'completed', plan: 'Credit Plan' },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'company':
        return { bg: '#023047', color: '#f6f6f6', label: 'Company' };
      case 'user':
        return { bg: '#FFC300', color: '#023047', label: 'User' };
      case 'freelancer':
        return { bg: '#6f6f6f', color: '#f6f6f6', label: 'Freelancer' };
      default:
        return { bg: '#6f6f6f', color: '#f6f6f6', label: type };
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return { bg: '#FFC300', color: '#023047' };
      case 'pending':
        return { bg: '#023047', color: '#f6f6f6' };
      case 'failed':
        return { bg: '#6f6f6f', color: '#f6f6f6' };
      case 'active':
        return { bg: '#FFC300', color: '#023047' };
      case 'expired':
        return { bg: '#6f6f6f', color: '#f6f6f6' };
      case 'trial':
        return { bg: '#023047', color: '#f6f6f6' };
      default:
        return { bg: '#6f6f6f', color: '#f6f6f6' };
    }
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg p-3 shadow-lg" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color, marginBottom: '4px' }}>
              {entry.name}: ₹{entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const filteredEntities = entities.filter(entity => {
    const matchesSearch = entity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entity.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || entity.type === filterType;
    return matchesSearch && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'company':
        return <Building2 className="w-5 h-5" />;
      case 'user':
        return <Users className="w-5 h-5" />;
      case 'freelancer':
        return <Zap className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const handleUpdatePlan = (entity: Entity) => {
    setSelectedEntity(entity);
    setSelectedPlan(entity.currentPlan);
    setShowUpdateModal(true);
  };

  const confirmUpdatePlan = () => {
    console.log(`Updating ${selectedEntity?.name} to ${selectedPlan}`);
    setShowUpdateModal(false);
    setSelectedEntity(null);
  };

  const handleCreateCoupon = () => {
    const coupon: Coupon = {
      id: coupons.length + 1,
      code: newCoupon.code,
      discount: newCoupon.discount,
      type: newCoupon.type,
      applicableTo: newCoupon.applicableTo,
      validUntil: newCoupon.validUntil,
      usageLimit: newCoupon.usageLimit,
      usageCount: 0,
      status: 'active',
    };
    setCoupons([...coupons, coupon]);
    setNewCoupon({
      code: '',
      discount: 0,
      type: 'percentage',
      applicableTo: 'all',
      validUntil: '',
      usageLimit: 100,
    });
    setShowCouponModal(false);
  };

  const deleteCoupon = (id: number) => {
    setCoupons(coupons.filter(c => c.id !== id));
  };

  const getAvailablePlans = () => {
    if (!selectedEntity) return [];
    switch (selectedEntity.type) {
      case 'company':
        return subscriptionPlans.companies;
      case 'user':
        return subscriptionPlans.users;
      case 'freelancer':
        return subscriptionPlans.freelancers;
      default:
        return [];
    }
  };

  const handleEditPlan = (plan: PlanDetails, type: 'company' | 'user' | 'freelancer') => {
    setEditingPlan({ ...plan });
    setEditPlanType(type);
    setShowEditPlanModal(true);
  };

  const handleSavePlan = () => {
    if (!editingPlan) return;
    
    setSubscriptionPlans(prev => ({
      ...prev,
      [editPlanType + 's']: prev[editPlanType + 's' as keyof typeof prev].map(p => 
        p.name === editingPlan.name ? editingPlan : p
      )
    }));
    
    setShowEditPlanModal(false);
    setEditingPlan(null);
  };

  const addFeature = () => {
    if (!editingPlan) return;
    setEditingPlan({
      ...editingPlan,
      features: [...editingPlan.features, '']
    });
  };

  const updateFeature = (index: number, value: string) => {
    if (!editingPlan) return;
    const newFeatures = [...editingPlan.features];
    newFeatures[index] = value;
    setEditingPlan({
      ...editingPlan,
      features: newFeatures
    });
  };

  const removeFeature = (index: number) => {
    if (!editingPlan) return;
    setEditingPlan({
      ...editingPlan,
      features: editingPlan.features.filter((_, i) => i !== index)
    });
  };

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
            Income & Plans
          </h1>
          <p className="mt-1" style={{ color: '#6f6f6f' }}>Manage revenue, subscriptions and pricing</p>
        </div>
        {activeTab === 'update-plans' && updatePlansSubTab === 'coupons' && (
          <button 
            onClick={() => setShowCouponModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
            style={{ backgroundColor: '#FFC300', color: '#023047' }}
          >
            <Plus className="w-5 h-5" />
            Create Coupon
          </button>
        )}
        {activeTab === 'analytics' && (
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: '#023047', color: '#f6f6f6' }}>
            <Download className="w-4 h-4" />
            Export Report
          </button>
        )}
      </div>

      <div style={{ borderBottom: '1px solid #6f6f6f' }}>
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab('analytics')}
            className="pb-3 px-1 transition-colors"
            style={{
              borderBottom: activeTab === 'analytics' ? '2px solid #FFC300' : '2px solid transparent',
              color: activeTab === 'analytics' ? '#FFC300' : '#d3d3d3'
            }}
          >
            Revenue Analytics
          </button>
          <button
            onClick={() => setActiveTab('update-plans')}
            className="pb-3 px-1 transition-colors"
            style={{
              borderBottom: activeTab === 'update-plans' ? '2px solid #FFC300' : '2px solid transparent',
              color: activeTab === 'update-plans' ? '#FFC300' : '#d3d3d3'
            }}
          >
            Update Plans
          </button>
          <button
            onClick={() => setActiveTab('plan-settings')}
            className="pb-3 px-1 transition-colors"
            style={{
              borderBottom: activeTab === 'plan-settings' ? '2px solid #FFC300' : '2px solid transparent',
              color: activeTab === 'plan-settings' ? '#FFC300' : '#d3d3d3'
            }}
          >
            Plan Settings
          </button>
        </div>
      </div>

      {activeTab === 'analytics' && (
        <>
          <div className="flex gap-3">
            <button
              onClick={() => setTimeRange('week')}
              className="px-4 py-2 rounded-lg transition-colors"
              style={{
                backgroundColor: timeRange === 'week' ? '#FFC300' : '#023047',
                color: timeRange === 'week' ? '#023047' : '#f6f6f6',
                border: '1px solid #6f6f6f'
              }}
            >
              This Week
            </button>
            <button
              onClick={() => setTimeRange('month')}
              className="px-4 py-2 rounded-lg transition-colors"
              style={{
                backgroundColor: timeRange === 'month' ? '#FFC300' : '#023047',
                color: timeRange === 'month' ? '#023047' : '#f6f6f6',
                border: '1px solid #6f6f6f'
              }}
            >
              This Month
            </button>
            <button
              onClick={() => setTimeRange('year')}
              className="px-4 py-2 rounded-lg transition-colors"
              style={{
                backgroundColor: timeRange === 'year' ? '#FFC300' : '#023047',
                color: timeRange === 'year' ? '#023047' : '#f6f6f6',
                border: '1px solid #6f6f6f'
              }}
            >
              This Year
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
                  <DollarSign className="w-6 h-6" style={{ color: '#023047' }} />
                </div>
                <div className="flex items-center gap-1" style={{ color: '#FFC300' }}>
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-sm">{revenueStats.growth}%</span>
                </div>
              </div>
              <p style={{ color: '#d3d3d3' }}>Total Revenue</p>
              <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.875rem', fontWeight: '700' }}>₹{revenueStats.total.toLocaleString()}</p>
              <p className="mt-2" style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>All time earnings</p>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#023047' }}>
                  <Building2 className="w-6 h-6" style={{ color: '#f6f6f6' }} />
                </div>
              </div>
              <p style={{ color: '#d3d3d3' }}>Company Plans</p>
              <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.875rem', fontWeight: '700' }}>₹{revenueStats.companies.toLocaleString()}</p>
              <p className="mt-2" style={{ color: '#FFC300', fontSize: '0.875rem' }}>2,682 subscriptions</p>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
                  <Users className="w-6 h-6" style={{ color: '#023047' }} />
                </div>
              </div>
              <p style={{ color: '#d3d3d3' }}>User Plans</p>
              <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.875rem', fontWeight: '700' }}>₹{revenueStats.users.toLocaleString()}</p>
              <p className="mt-2" style={{ color: '#FFC300', fontSize: '0.875rem' }}>4,607 users</p>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#6f6f6f' }}>
                  <Zap className="w-6 h-6" style={{ color: '#f6f6f6' }} />
                </div>
              </div>
              <p style={{ color: '#d3d3d3' }}>Freelancer Credits</p>
              <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.875rem', fontWeight: '700' }}>₹{revenueStats.freelancers.toLocaleString()}</p>
              <p className="mt-2" style={{ color: '#FFC300', fontSize: '0.875rem' }}>542 purchases</p>
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 style={{ color: '#FFC300', fontSize: '1.25rem', fontWeight: '700' }}>Revenue Trends</h2>
              <div className="flex gap-2">
                <Calendar className="w-5 h-5" style={{ color: '#d3d3d3' }} />
                <span style={{ color: '#d3d3d3' }}>Last 6 Months</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={monthlyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#6f6f6f" opacity={0.2} />
                <XAxis dataKey="month" stroke="#d3d3d3" />
                <YAxis stroke="#d3d3d3" />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ color: '#f6f6f6' }} />
                <Line key="companies-line" type="monotone" dataKey="companies" stroke="#023047" strokeWidth={2} name="Companies" />
                <Line key="users-line" type="monotone" dataKey="users" stroke="#FFC300" strokeWidth={2} name="Users" />
                <Line key="freelancers-line" type="monotone" dataKey="freelancers" stroke="#6f6f6f" strokeWidth={2} name="Freelancers" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <h2 className="mb-6" style={{ color: '#FFC300', fontSize: '1.25rem', fontWeight: '700' }}>Revenue Distribution</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={revenueDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {revenueDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {revenueDistribution.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span style={{ color: '#d3d3d3' }}>{item.name}</span>
                    </div>
                    <span style={{ color: '#f6f6f6' }}>₹{item.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <h2 className="mb-6" style={{ color: '#FFC300', fontSize: '1.25rem', fontWeight: '700' }}>Subscription Plans Performance</h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="w-4 h-4" style={{ color: '#023047' }} />
                    <h3 style={{ color: '#023047', fontSize: '0.875rem', fontWeight: '600' }}>Company Plans</h3>
                  </div>
                  {subscriptionPlans.companies.map((plan, index) => (
                    <div key={index} className="flex items-center justify-between py-2 px-3 mb-1 rounded" style={{ backgroundColor: '#023047' }}>
                      <div>
                        <p style={{ color: '#f6f6f6', fontSize: '0.875rem' }}>{plan.name}</p>
                        <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>{plan.subscribers} companies</p>
                      </div>
                      <div className="text-right">
                        <p style={{ color: '#FFC300', fontWeight: '600' }}>₹{plan.revenue.toLocaleString()}</p>
                        <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>{plan.price === 0 ? 'Free' : `₹${plan.price}`}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2 mt-4">
                    <Users className="w-4 h-4" style={{ color: '#023047' }} />
                    <h3 style={{ color: '#023047', fontSize: '0.875rem', fontWeight: '600' }}>User Plans</h3>
                  </div>
                  {subscriptionPlans.users.map((plan, index) => (
                    <div key={index} className="flex items-center justify-between py-2 px-3 mb-1 rounded" style={{ backgroundColor: '#023047' }}>
                      <div>
                        <p style={{ color: '#f6f6f6', fontSize: '0.875rem' }}>{plan.name}</p>
                        <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>{plan.subscribers} subscribers</p>
                      </div>
                      <div className="text-right">
                        <p style={{ color: '#FFC300', fontWeight: '600' }}>₹{plan.revenue.toLocaleString()}</p>
                        <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>₹{plan.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2 mt-4">
                    <Zap className="w-4 h-4" style={{ color: '#023047' }} />
                    <h3 style={{ color: '#023047', fontSize: '0.875rem', fontWeight: '600' }}>Freelancer Plans</h3>
                  </div>
                  {subscriptionPlans.freelancers.map((plan, index) => (
                    <div key={index} className="flex items-center justify-between py-2 px-3 mb-1 rounded" style={{ backgroundColor: '#023047' }}>
                      <div>
                        <p style={{ color: '#f6f6f6', fontSize: '0.875rem' }}>{plan.name}</p>
                        <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>{plan.purchases} purchases</p>
                      </div>
                      <div className="text-right">
                        <p style={{ color: '#FFC300', fontWeight: '600' }}>₹{plan.revenue.toLocaleString()}</p>
                        <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>₹{plan.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg overflow-hidden" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <div className="p-6 flex items-center justify-between" style={{ borderBottom: '1px solid #6f6f6f' }}>
              <h2 style={{ color: '#FFC300', fontSize: '1.25rem', fontWeight: '700' }}>Recent Transactions</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedRevenue('all')}
                  className="px-3 py-1 rounded-lg text-xs transition-colors"
                  style={{
                    backgroundColor: selectedRevenue === 'all' ? '#FFC300' : 'transparent',
                    color: selectedRevenue === 'all' ? '#023047' : '#d3d3d3',
                    border: '1px solid #6f6f6f'
                  }}
                >
                  All
                </button>
                <button
                  onClick={() => setSelectedRevenue('company')}
                  className="px-3 py-1 rounded-lg text-xs transition-colors"
                  style={{
                    backgroundColor: selectedRevenue === 'company' ? '#FFC300' : 'transparent',
                    color: selectedRevenue === 'company' ? '#023047' : '#d3d3d3',
                    border: '1px solid #6f6f6f'
                  }}
                >
                  Companies
                </button>
                <button
                  onClick={() => setSelectedRevenue('user')}
                  className="px-3 py-1 rounded-lg text-xs transition-colors"
                  style={{
                    backgroundColor: selectedRevenue === 'user' ? '#FFC300' : 'transparent',
                    color: selectedRevenue === 'user' ? '#023047' : '#d3d3d3',
                    border: '1px solid #6f6f6f'
                  }}
                >
                  Users
                </button>
                <button
                  onClick={() => setSelectedRevenue('freelancer')}
                  className="px-3 py-1 rounded-lg text-xs transition-colors"
                  style={{
                    backgroundColor: selectedRevenue === 'freelancer' ? '#FFC300' : 'transparent',
                    color: selectedRevenue === 'freelancer' ? '#023047' : '#d3d3d3',
                    border: '1px solid #6f6f6f'
                  }}
                >
                  Freelancers
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead style={{ backgroundColor: '#023047', borderBottom: '1px solid #6f6f6f' }}>
                  <tr>
                    <th className="px-6 py-3 text-left" style={{ color: '#d3d3d3' }}>Transaction ID</th>
                    <th className="px-6 py-3 text-left" style={{ color: '#d3d3d3' }}>User/Company</th>
                    <th className="px-6 py-3 text-left" style={{ color: '#d3d3d3' }}>Type</th>
                    <th className="px-6 py-3 text-left" style={{ color: '#d3d3d3' }}>Plan</th>
                    <th className="px-6 py-3 text-left" style={{ color: '#d3d3d3' }}>Amount</th>
                    <th className="px-6 py-3 text-left" style={{ color: '#d3d3d3' }}>Date</th>
                    <th className="px-6 py-3 text-left" style={{ color: '#d3d3d3' }}>Status</th>
                  </tr>
                </thead>
                <tbody style={{ backgroundColor: '#023047' }}>
                  {transactions
                    .filter(t => selectedRevenue === 'all' || t.type === selectedRevenue)
                    .map((transaction) => {
                      const typeStyle = getTypeColor(transaction.type);
                      const statusStyle = getStatusColor(transaction.status);
                      return (
                        <tr key={transaction.id} style={{ borderBottom: '1px solid #6f6f6f' }}>
                          <td className="px-6 py-4" style={{ color: '#d3d3d3' }}>#{transaction.id.toString().padStart(6, '0')}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
                                <span className="text-xs" style={{ color: '#023047' }}>{transaction.userName.charAt(0)}</span>
                              </div>
                              <span style={{ color: '#f6f6f6' }}>{transaction.userName}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex px-3 py-1 rounded-full text-xs" style={{ backgroundColor: typeStyle.bg, color: typeStyle.color }}>
                              {typeStyle.label}
                            </span>
                          </td>
                          <td className="px-6 py-4" style={{ color: '#d3d3d3' }}>{transaction.plan}</td>
                          <td className="px-6 py-4" style={{ color: '#FFC300', fontWeight: '600' }}>₹{transaction.amount}</td>
                          <td className="px-6 py-4" style={{ color: '#d3d3d3' }}>{transaction.date}</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex px-3 py-1 rounded-full text-xs" style={{ backgroundColor: statusStyle.bg, color: statusStyle.color }}>
                              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {activeTab === 'update-plans' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
                  <Building2 className="w-5 h-5" style={{ color: '#023047' }} />
                </div>
              </div>
              <p style={{ color: '#d3d3d3' }}>Total Subscriptions</p>
              <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>{entities.length}</p>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#023047' }}>
                  <CheckCircle className="w-5 h-5" style={{ color: '#f6f6f6' }} />
                </div>
              </div>
              <p style={{ color: '#d3d3d3' }}>Active Plans</p>
              <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>
                {entities.filter(e => e.status === 'active').length}
              </p>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
                  <Tag className="w-5 h-5" style={{ color: '#023047' }} />
                </div>
              </div>
              <p style={{ color: '#d3d3d3' }}>Active Coupons</p>
              <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>
                {coupons.filter(c => c.status === 'active').length}
              </p>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#6f6f6f' }}>
                  <Calendar className="w-5 h-5" style={{ color: '#f6f6f6' }} />
                </div>
              </div>
              <p style={{ color: '#d3d3d3' }}>Expiring Soon</p>
              <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>
                {entities.filter(e => e.status === 'expired').length}
              </p>
            </div>
          </div>

          <div style={{ borderBottom: '1px solid #6f6f6f' }}>
            <div className="flex gap-6">
              <button
                onClick={() => setUpdatePlansSubTab('plans')}
                className="pb-3 px-1 transition-colors"
                style={{
                  borderBottom: updatePlansSubTab === 'plans' ? '2px solid #FFC300' : '2px solid transparent',
                  color: updatePlansSubTab === 'plans' ? '#FFC300' : '#d3d3d3'
                }}
              >
                Manage Customer Plans
              </button>
              <button
                onClick={() => setUpdatePlansSubTab('coupons')}
                className="pb-3 px-1 transition-colors"
                style={{
                  borderBottom: updatePlansSubTab === 'coupons' ? '2px solid #FFC300' : '2px solid transparent',
                  color: updatePlansSubTab === 'coupons' ? '#FFC300' : '#d3d3d3'
                }}
              >
                Manage Coupons
              </button>
            </div>
          </div>

          {updatePlansSubTab === 'plans' && (
            <>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#6f6f6f' }} />
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg"
                    style={{ 
                      backgroundColor: '#023047', 
                      border: '1px solid #6f6f6f',
                      color: '#f6f6f6'
                    }}
                  />
                </div>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as any)}
                  className="px-4 py-2 rounded-lg"
                  style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                >
                  <option value="all">All Types</option>
                  <option value="company">Companies</option>
                  <option value="user">Users</option>
                  <option value="freelancer">Freelancers</option>
                </select>
              </div>

              <div className="rounded-lg overflow-hidden" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead style={{ backgroundColor: '#023047', borderBottom: '1px solid #6f6f6f' }}>
                      <tr>
                        <th className="px-6 py-3 text-left" style={{ color: '#d3d3d3' }}>Name</th>
                        <th className="px-6 py-3 text-left" style={{ color: '#d3d3d3' }}>Type</th>
                        <th className="px-6 py-3 text-left" style={{ color: '#d3d3d3' }}>Current Plan</th>
                        <th className="px-6 py-3 text-left" style={{ color: '#d3d3d3' }}>Price</th>
                        <th className="px-6 py-3 text-left" style={{ color: '#d3d3d3' }}>Renewal Date</th>
                        <th className="px-6 py-3 text-left" style={{ color: '#d3d3d3' }}>Status</th>
                        <th className="px-6 py-3 text-left" style={{ color: '#d3d3d3' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody style={{ backgroundColor: '#023047' }}>
                      {filteredEntities.map((entity) => {
                        const typeStyle = getTypeColor(entity.type);
                        const statusStyle = getStatusColor(entity.status);
                        return (
                          <tr key={entity.id} style={{ borderBottom: '1px solid #6f6f6f' }}>
                            <td className="px-6 py-4">
                              <div>
                                <p style={{ color: '#f6f6f6', fontWeight: '600' }}>{entity.name}</p>
                                <p style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>{entity.email}</p>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: typeStyle.bg }}>
                                  <span style={{ color: typeStyle.color }}>
                                    {getTypeIcon(entity.type)}
                                  </span>
                                </div>
                                <span style={{ color: '#d3d3d3' }}>{entity.type.charAt(0).toUpperCase() + entity.type.slice(1)}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4" style={{ color: '#f6f6f6' }}>{entity.currentPlan}</td>
                            <td className="px-6 py-4" style={{ color: '#FFC300', fontWeight: '600' }}>
                              {entity.planPrice === 0 ? 'Free' : `₹${entity.planPrice}`}
                            </td>
                            <td className="px-6 py-4" style={{ color: '#d3d3d3' }}>{entity.renewalDate}</td>
                            <td className="px-6 py-4">
                              <span className="inline-flex px-3 py-1 rounded-full text-xs" style={{ backgroundColor: statusStyle.bg, color: statusStyle.color }}>
                                {entity.status.charAt(0).toUpperCase() + entity.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <button
                                onClick={() => handleUpdatePlan(entity)}
                                className="flex items-center gap-2 px-3 py-1 rounded-lg transition-colors"
                                style={{ backgroundColor: '#023047', color: '#f6f6f6' }}
                              >
                                <Edit3 className="w-4 h-4" />
                                Update Plan
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {updatePlansSubTab === 'coupons' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {coupons.map((coupon) => (
                  <div
                    key={coupon.id}
                    className="rounded-lg p-6"
                    style={{ 
                      backgroundColor: '#023047', 
                      border: coupon.status === 'active' ? '1px solid #FFC300' : '1px solid #6f6f6f'
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
                          <Tag className="w-6 h-6" style={{ color: '#023047' }} />
                        </div>
                        <div>
                          <p style={{ color: '#FFC300', fontSize: '1.125rem', fontWeight: '700' }}>{coupon.code}</p>
                          <p style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>
                            {coupon.type === 'percentage' ? `${coupon.discount}% OFF` : `₹${coupon.discount} OFF`}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteCoupon(coupon.id)}
                        className="p-2 rounded-lg transition-colors"
                        style={{ color: '#6f6f6f' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#FFC300'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#6f6f6f'}
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Applicable To:</span>
                        <span 
                          className="px-2 py-1 rounded text-xs"
                          style={{ backgroundColor: '#023047', color: '#f6f6f6' }}
                        >
                          {coupon.applicableTo === 'all' ? 'All' : coupon.applicableTo.charAt(0).toUpperCase() + coupon.applicableTo.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Valid Until:</span>
                        <span style={{ color: '#f6f6f6', fontSize: '0.875rem' }}>{coupon.validUntil}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Usage:</span>
                        <span style={{ color: '#FFC300', fontSize: '0.875rem' }}>{coupon.usageCount}/{coupon.usageLimit}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4" style={{ borderTop: '1px solid #6f6f6f' }}>
                      <div className="flex items-center justify-between">
                        <span style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Status</span>
                        <span 
                          className="px-3 py-1 rounded-full text-xs"
                          style={{
                            backgroundColor: coupon.status === 'active' ? '#FFC300' : '#6f6f6f',
                            color: coupon.status === 'active' ? '#023047' : '#f6f6f6'
                          }}
                        >
                          {coupon.status.charAt(0).toUpperCase() + coupon.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {activeTab === 'plan-settings' && (
        <div className="space-y-6">
          <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Building2 className="w-6 h-6" style={{ color: '#FFC300' }} />
                <h2 style={{ color: '#FFC300', fontSize: '1.5rem', fontWeight: '700' }}>Company Plans</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subscriptionPlans.companies.map((plan, index) => (
                <div key={index} className="rounded-lg p-5" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '700' }}>{plan.name}</h3>
                      <p style={{ color: '#FFC300', fontSize: '1.5rem', fontWeight: '700', marginTop: '0.5rem' }}>
                        {plan.price === 0 ? 'Free' : `₹${plan.price}`}
                      </p>
                      <p style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>{plan.duration}</p>
                    </div>
                    <button
                      onClick={() => handleEditPlan(plan, 'company')}
                      className="p-2 rounded-lg transition-colors"
                      style={{ backgroundColor: '#023047', color: '#f6f6f6' }}
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <p style={{ color: '#d3d3d3', fontSize: '0.875rem', fontWeight: '600' }}>Features:</p>
                    <ul className="space-y-1">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#FFC300' }} />
                          <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6" style={{ color: '#FFC300' }} />
                <h2 style={{ color: '#FFC300', fontSize: '1.5rem', fontWeight: '700' }}>User Plans</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subscriptionPlans.users.map((plan, index) => (
                <div key={index} className="rounded-lg p-5" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '700' }}>{plan.name}</h3>
                      <p style={{ color: '#FFC300', fontSize: '1.5rem', fontWeight: '700', marginTop: '0.5rem' }}>₹{plan.price}</p>
                      <p style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>{plan.duration}</p>
                    </div>
                    <button
                      onClick={() => handleEditPlan(plan, 'user')}
                      className="p-2 rounded-lg transition-colors"
                      style={{ backgroundColor: '#FFC300', color: '#023047' }}
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <p style={{ color: '#d3d3d3', fontSize: '0.875rem', fontWeight: '600' }}>Features:</p>
                    <ul className="space-y-1">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#FFC300' }} />
                          <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Zap className="w-6 h-6" style={{ color: '#6f6f6f' }} />
                <h2 style={{ color: '#6f6f6f', fontSize: '1.5rem', fontWeight: '700' }}>Freelancer Plans</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subscriptionPlans.freelancers.map((plan, index) => (
                <div key={index} className="rounded-lg p-5" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '700' }}>{plan.name}</h3>
                      <p style={{ color: '#FFC300', fontSize: '1.5rem', fontWeight: '700', marginTop: '0.5rem' }}>₹{plan.price}</p>
                      <p style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>{plan.duration}</p>
                    </div>
                    <button
                      onClick={() => handleEditPlan(plan, 'freelancer')}
                      className="p-2 rounded-lg transition-colors"
                      style={{ backgroundColor: '#6f6f6f', color: '#f6f6f6' }}
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <p style={{ color: '#d3d3d3', fontSize: '0.875rem', fontWeight: '600' }}>Features:</p>
                    <ul className="space-y-1">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#FFC300' }} />
                          <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showUpdateModal && selectedEntity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="rounded-lg max-w-md w-full" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <div className="p-6" style={{ borderBottom: '1px solid #6f6f6f' }}>
              <div className="flex items-center justify-between">
                <h2 style={{ color: '#FFC300', fontSize: '1.5rem', fontWeight: '700' }}>Update Plan</h2>
                <button
                  onClick={() => setShowUpdateModal(false)}
                  className="p-2 rounded-lg transition-colors"
                  style={{ color: '#6f6f6f' }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Customer</p>
                <p style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>{selectedEntity.name}</p>
                <p style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>{selectedEntity.email}</p>
              </div>
              <div>
                <p style={{ color: '#6f6f6f', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Current Plan</p>
                <div className="p-3 rounded-lg" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
                  <p style={{ color: '#f6f6f6' }}>{selectedEntity.currentPlan}</p>
                  <p style={{ color: '#FFC300', fontSize: '0.875rem' }}>
                    {selectedEntity.planPrice === 0 ? 'Free' : `₹${selectedEntity.planPrice}`}
                  </p>
                </div>
              </div>
              <div>
                <label className="block mb-2" style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Select New Plan</label>
                <select
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                >
                  {getAvailablePlans().map((plan, index) => (
                    <option key={index} value={plan.name}>
                      {plan.name} - {plan.price === 0 ? 'Free' : `₹${plan.price}`} ({plan.duration})
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="p-6 flex gap-3 justify-end" style={{ borderTop: '1px solid #6f6f6f' }}>
              <button
                onClick={() => setShowUpdateModal(false)}
                className="px-4 py-2 rounded-lg transition-colors"
                style={{ border: '1px solid #6f6f6f', color: '#d3d3d3' }}
              >
                Cancel
              </button>
              <button
                onClick={confirmUpdatePlan}
                className="px-4 py-2 rounded-lg transition-colors"
                style={{ backgroundColor: '#FFC300', color: '#023047' }}
              >
                Update Plan
              </button>
            </div>
          </div>
        </div>
      )}

      {showCouponModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="rounded-lg max-w-md w-full" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <div className="p-6" style={{ borderBottom: '1px solid #6f6f6f' }}>
              <div className="flex items-center justify-between">
                <h2 style={{ color: '#FFC300', fontSize: '1.5rem', fontWeight: '700' }}>Create New Coupon</h2>
                <button
                  onClick={() => setShowCouponModal(false)}
                  className="p-2 rounded-lg transition-colors"
                  style={{ color: '#6f6f6f' }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block mb-2" style={{ color: '#d3d3d3' }}>Coupon Code</label>
                <input
                  type="text"
                  value={newCoupon.code}
                  onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                  placeholder="WINTER2024"
                  className="w-full px-4 py-2 rounded-lg"
                  style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2" style={{ color: '#d3d3d3' }}>Discount</label>
                  <input
                    type="number"
                    value={newCoupon.discount}
                    onChange={(e) => setNewCoupon({ ...newCoupon, discount: Number(e.target.value) })}
                    className="w-full px-4 py-2 rounded-lg"
                    style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                  />
                </div>
                <div>
                  <label className="block mb-2" style={{ color: '#d3d3d3' }}>Type</label>
                  <select
                    value={newCoupon.type}
                    onChange={(e) => setNewCoupon({ ...newCoupon, type: e.target.value as any })}
                    className="w-full px-4 py-2 rounded-lg"
                    style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                  >
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block mb-2" style={{ color: '#d3d3d3' }}>Applicable To</label>
                <select
                  value={newCoupon.applicableTo}
                  onChange={(e) => setNewCoupon({ ...newCoupon, applicableTo: e.target.value as any })}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                >
                  <option value="all">All</option>
                  <option value="company">Companies Only</option>
                  <option value="user">Users Only</option>
                  <option value="freelancer">Freelancers Only</option>
                </select>
              </div>
              <div>
                <label className="block mb-2" style={{ color: '#d3d3d3' }}>Valid Until</label>
                <input
                  type="date"
                  value={newCoupon.validUntil}
                  onChange={(e) => setNewCoupon({ ...newCoupon, validUntil: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                />
              </div>
              <div>
                <label className="block mb-2" style={{ color: '#d3d3d3' }}>Usage Limit</label>
                <input
                  type="number"
                  value={newCoupon.usageLimit}
                  onChange={(e) => setNewCoupon({ ...newCoupon, usageLimit: Number(e.target.value) })}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                />
              </div>
            </div>
            <div className="p-6 flex gap-3 justify-end" style={{ borderTop: '1px solid #6f6f6f' }}>
              <button
                onClick={() => setShowCouponModal(false)}
                className="px-4 py-2 rounded-lg transition-colors"
                style={{ border: '1px solid #6f6f6f', color: '#d3d3d3' }}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCoupon}
                className="px-4 py-2 rounded-lg transition-colors"
                style={{ backgroundColor: '#FFC300', color: '#023047' }}
              >
                Create Coupon
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditPlanModal && editingPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <div className="p-6 sticky top-0" style={{ backgroundColor: '#023047', borderBottom: '1px solid #6f6f6f', zIndex: 10 }}>
              <div className="flex items-center justify-between">
                <h2 style={{ color: '#FFC300', fontSize: '1.5rem', fontWeight: '700' }}>Edit Plan - {editingPlan.name}</h2>
                <button
                  onClick={() => setShowEditPlanModal(false)}
                  className="p-2 rounded-lg transition-colors"
                  style={{ color: '#6f6f6f' }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2" style={{ color: '#d3d3d3' }}>Plan Name</label>
                  <input
                    type="text"
                    value={editingPlan.name}
                    onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg"
                    style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                  />
                </div>
                <div>
                  <label className="block mb-2" style={{ color: '#d3d3d3' }}>Price (₹)</label>
                  <input
                    type="number"
                    value={editingPlan.price}
                    onChange={(e) => setEditingPlan({ ...editingPlan, price: Number(e.target.value) })}
                    className="w-full px-4 py-2 rounded-lg"
                    style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                  />
                </div>
              </div>
              <div>
                <label className="block mb-2" style={{ color: '#d3d3d3' }}>Duration</label>
                <select
                  value={editingPlan.duration}
                  onChange={(e) => setEditingPlan({ ...editingPlan, duration: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                >
                  <option value="Lifetime">Lifetime</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Yearly">Yearly</option>
                  <option value="One-time">One-time</option>
                </select>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label style={{ color: '#d3d3d3' }}>Features</label>
                  <button
                    onClick={addFeature}
                    className="flex items-center gap-1 px-3 py-1 rounded-lg transition-colors text-sm"
                    style={{ backgroundColor: '#023047', color: '#f6f6f6' }}
                  >
                    <Plus className="w-4 h-4" />
                    Add Feature
                  </button>
                </div>
                <div className="space-y-2">
                  {editingPlan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        placeholder="Enter feature"
                        className="flex-1 px-4 py-2 rounded-lg"
                        style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
                      />
                      <button
                        onClick={() => removeFeature(index)}
                        className="p-2 rounded-lg transition-colors"
                        style={{ color: '#6f6f6f' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#FFC300'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#6f6f6f'}
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6 flex gap-3 justify-end sticky bottom-0" style={{ backgroundColor: '#023047', borderTop: '1px solid #6f6f6f' }}>
              <button
                onClick={() => setShowEditPlanModal(false)}
                className="px-4 py-2 rounded-lg transition-colors"
                style={{ border: '1px solid #6f6f6f', color: '#d3d3d3' }}
              >
                Cancel
              </button>
              <button
                onClick={handleSavePlan}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
                style={{ backgroundColor: '#FFC300', color: '#023047' }}
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
