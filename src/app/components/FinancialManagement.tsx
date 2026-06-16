import { useState } from 'react';
import { DollarSign, TrendingUp, Users, Briefcase, Zap, CreditCard, Download, Calendar, ArrowUpRight, ArrowDownRight, Crown, CheckCircle } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Transaction {
  id: number;
  type: 'user-pro' | 'job-pro' | 'freelancer-credits';
  userName: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  plan?: string;
}

export function Income() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');
  const [selectedRevenue, setSelectedRevenue] = useState<'all' | 'user-pro' | 'job-pro' | 'freelancer-credits'>('all');

  // Revenue Stats
  const revenueStats = {
    total: 124580,
    monthly: 38450,
    weekly: 8920,
    growth: 15.3,
    userPro: 45600,
    jobPro: 52340,
    freelancerCredits: 26640,
  };

  // Monthly Revenue Trend Data
  const monthlyRevenueData = [
    { month: 'Jan', userPro: 12500, jobPro: 15200, freelancerCredits: 8400, total: 36100 },
    { month: 'Feb', userPro: 13800, jobPro: 16500, freelancerCredits: 7800, total: 38100 },
    { month: 'Mar', userPro: 15200, jobPro: 14800, freelancerCredits: 9200, total: 39200 },
    { month: 'Apr', userPro: 14600, jobPro: 17200, freelancerCredits: 8900, total: 40700 },
    { month: 'May', userPro: 16400, jobPro: 18600, freelancerCredits: 10200, total: 45200 },
    { month: 'Jun', userPro: 18100, jobPro: 19800, freelancerCredits: 11400, total: 49300 },
  ];

  // Revenue Distribution Data
  const revenueDistribution = [
    { name: 'User Pro', value: revenueStats.userPro, color: '#FFC300' },
    { name: 'Job Pro', value: revenueStats.jobPro, color: '#023047' },
    { name: 'Freelancer Credits', value: revenueStats.freelancerCredits, color: '#6f6f6f' },
  ];

  // Subscription Plans
  const subscriptionPlans = {
    userPro: [
      { name: 'Basic Pro', price: 9.99, subscribers: 845, revenue: 8440 },
      { name: 'Premium Pro', price: 19.99, subscribers: 623, revenue: 12454 },
      { name: 'Elite Pro', price: 49.99, subscribers: 287, revenue: 14347 },
    ],
    jobPro: [
      { name: 'Single Job Post', price: 99, posts: 156, revenue: 15444 },
      { name: 'Job Pack (5)', price: 399, packs: 67, revenue: 26733 },
      { name: 'Unlimited Monthly', price: 799, subscribers: 42, revenue: 33558 },
    ],
    freelancerCredits: [
      { name: 'Starter Pack', price: 29.99, purchases: 234, revenue: 7017 },
      { name: 'Professional Pack', price: 79.99, purchases: 145, revenue: 11599 },
      { name: 'Enterprise Pack', price: 199.99, purchases: 67, revenue: 13399 },
    ],
  };

  // Recent Transactions
  const transactions: Transaction[] = [
    { id: 1, type: 'user-pro', userName: 'John Doe', amount: 19.99, date: '2024-12-08', status: 'completed', plan: 'Premium Pro' },
    { id: 2, type: 'job-pro', userName: 'Tech Corp', amount: 399, date: '2024-12-08', status: 'completed', plan: 'Job Pack (5)' },
    { id: 3, type: 'freelancer-credits', userName: 'Sarah Wilson', amount: 79.99, date: '2024-12-07', status: 'completed', plan: 'Professional Pack' },
    { id: 4, type: 'user-pro', userName: 'Mike Johnson', amount: 49.99, date: '2024-12-07', status: 'completed', plan: 'Elite Pro' },
    { id: 5, type: 'job-pro', userName: 'Startup Inc', amount: 99, date: '2024-12-07', status: 'pending', plan: 'Single Job Post' },
    { id: 6, type: 'freelancer-credits', userName: 'Emily Davis', amount: 199.99, date: '2024-12-06', status: 'completed', plan: 'Enterprise Pack' },
    { id: 7, type: 'user-pro', userName: 'David Brown', amount: 9.99, date: '2024-12-06', status: 'completed', plan: 'Basic Pro' },
    { id: 8, type: 'job-pro', userName: 'Analytics Co', amount: 799, date: '2024-12-06', status: 'completed', plan: 'Unlimited Monthly' },
    { id: 9, type: 'freelancer-credits', userName: 'Lisa Anderson', amount: 29.99, date: '2024-12-05', status: 'completed', plan: 'Starter Pack' },
    { id: 10, type: 'user-pro', userName: 'Chris Lee', amount: 19.99, date: '2024-12-05', status: 'failed', plan: 'Premium Pro' },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'user-pro':
        return { bg: '#FFC300', color: '#023047', label: 'User Pro' };
      case 'job-pro':
        return { bg: '#023047', color: '#f6f6f6', label: 'Job Pro' };
      case 'freelancer-credits':
        return { bg: '#6f6f6f', color: '#f6f6f6', label: 'Freelancer Credits' };
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
              {entry.name}: ${entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
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
            Income
          </h1>
          <p className="mt-1" style={{ color: '#6f6f6f' }}>Track platform revenue and transactions</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: '#023047', color: '#f6f6f6' }}>
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Time Range Selector */}
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

      {/* Revenue Overview Stats */}
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
          <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.875rem', fontWeight: '700' }}>${revenueStats.total.toLocaleString()}</p>
          <p className="mt-2" style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>All time earnings</p>
        </div>

        <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
              <Crown className="w-6 h-6" style={{ color: '#023047' }} />
            </div>
          </div>
          <p style={{ color: '#d3d3d3' }}>User Pro Revenue</p>
          <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.875rem', fontWeight: '700' }}>${revenueStats.userPro.toLocaleString()}</p>
          <p className="mt-2" style={{ color: '#FFC300', fontSize: '0.875rem' }}>1,755 Pro users</p>
        </div>

        <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#023047' }}>
              <Briefcase className="w-6 h-6" style={{ color: '#f6f6f6' }} />
            </div>
          </div>
          <p style={{ color: '#d3d3d3' }}>Job Pro Revenue</p>
          <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.875rem', fontWeight: '700' }}>${revenueStats.jobPro.toLocaleString()}</p>
          <p className="mt-2" style={{ color: '#FFC300', fontSize: '0.875rem' }}>265 job postings</p>
        </div>

        <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#6f6f6f' }}>
              <Zap className="w-6 h-6" style={{ color: '#f6f6f6' }} />
            </div>
          </div>
          <p style={{ color: '#d3d3d3' }}>Freelancer Credits</p>
          <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.875rem', fontWeight: '700' }}>${revenueStats.freelancerCredits.toLocaleString()}</p>
          <p className="mt-2" style={{ color: '#FFC300', fontSize: '0.875rem' }}>446 purchases</p>
        </div>
      </div>

      {/* Revenue Trend Chart */}
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
            <Line key="userPro-line" type="monotone" dataKey="userPro" stroke="#FFC300" strokeWidth={2} name="User Pro" />
            <Line key="jobPro-line" type="monotone" dataKey="jobPro" stroke="#023047" strokeWidth={2} name="Job Pro" />
            <Line key="freelancerCredits-line" type="monotone" dataKey="freelancerCredits" stroke="#6f6f6f" strokeWidth={2} name="Freelancer Credits" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Revenue Distribution & Subscription Plans */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Distribution Pie Chart */}
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
                <span style={{ color: '#f6f6f6' }}>${item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Subscription Plans Overview */}
        <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
          <h2 className="mb-6" style={{ color: '#FFC300', fontSize: '1.25rem', fontWeight: '700' }}>Top Performing Plans</h2>
          <div className="space-y-4">
            {/* User Pro Plans */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-4 h-4" style={{ color: '#FFC300' }} />
                <h3 style={{ color: '#FFC300', fontSize: '0.875rem', fontWeight: '600' }}>User Pro Plans</h3>
              </div>
              {subscriptionPlans.userPro.map((plan, index) => (
                <div key={index} className="flex items-center justify-between py-2 px-3 mb-1 rounded" style={{ backgroundColor: '#1a1a1a' }}>
                  <div>
                    <p style={{ color: '#f6f6f6', fontSize: '0.875rem' }}>{plan.name}</p>
                    <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>{plan.subscribers} subscribers</p>
                  </div>
                  <div className="text-right">
                    <p style={{ color: '#FFC300', fontWeight: '600' }}>${plan.revenue.toLocaleString()}</p>
                    <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>${plan.price}/mo</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Job Pro Plans */}
            <div>
              <div className="flex items-center gap-2 mb-2 mt-4">
                <Briefcase className="w-4 h-4" style={{ color: '#023047' }} />
                <h3 style={{ color: '#023047', fontSize: '0.875rem', fontWeight: '600' }}>Job Pro Plans</h3>
              </div>
              {subscriptionPlans.jobPro.slice(0, 2).map((plan, index) => (
                <div key={index} className="flex items-center justify-between py-2 px-3 mb-1 rounded" style={{ backgroundColor: '#1a1a1a' }}>
                  <div>
                    <p style={{ color: '#f6f6f6', fontSize: '0.875rem' }}>{plan.name}</p>
                    <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>
                      {plan.packs ? `${plan.packs} packs sold` : plan.subscribers ? `${plan.subscribers} subscribers` : `${plan.posts} posts`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p style={{ color: '#FFC300', fontWeight: '600' }}>${plan.revenue.toLocaleString()}</p>
                    <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>${plan.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
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
              onClick={() => setSelectedRevenue('user-pro')}
              className="px-3 py-1 rounded-lg text-xs transition-colors"
              style={{
                backgroundColor: selectedRevenue === 'user-pro' ? '#FFC300' : 'transparent',
                color: selectedRevenue === 'user-pro' ? '#023047' : '#d3d3d3',
                border: '1px solid #6f6f6f'
              }}
            >
              User Pro
            </button>
            <button
              onClick={() => setSelectedRevenue('job-pro')}
              className="px-3 py-1 rounded-lg text-xs transition-colors"
              style={{
                backgroundColor: selectedRevenue === 'job-pro' ? '#FFC300' : 'transparent',
                color: selectedRevenue === 'job-pro' ? '#023047' : '#d3d3d3',
                border: '1px solid #6f6f6f'
              }}
            >
              Job Pro
            </button>
            <button
              onClick={() => setSelectedRevenue('freelancer-credits')}
              className="px-3 py-1 rounded-lg text-xs transition-colors"
              style={{
                backgroundColor: selectedRevenue === 'freelancer-credits' ? '#FFC300' : 'transparent',
                color: selectedRevenue === 'freelancer-credits' ? '#023047' : '#d3d3d3',
                border: '1px solid #6f6f6f'
              }}
            >
              Freelancer Credits
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
                      <td className="px-6 py-4" style={{ color: '#FFC300', fontWeight: '600' }}>${transaction.amount}</td>
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
    </div>
  );
}