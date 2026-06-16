import { 
  Target,
  TrendingUp,
  Users,
  Building2,
  CheckCircle,
  Clock,
  AlertCircle,
  Award,
  Zap,
  UserPlus,
  ArrowUp,
  ArrowDown,
  Calendar,
  ListTodo,
  BarChart3,
  Activity,
  Star,
  Trophy,
  PlayCircle,
  XCircle,
  Timer
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { Page } from '../App';

interface DashboardProps {
  setCurrentPage: (page: Page) => void;
}

export function Dashboard({ setCurrentPage }: DashboardProps) {
  const myPerformance = [
    { 
      label: 'Tasks Completed Today', 
      value: '12', 
      target: '15',
      percentage: 80,
      change: '+3 from yesterday', 
      isPositive: true, 
      icon: CheckCircle,
      color: '#FFC300',
    },
    { 
      label: 'Cold Leads Converted', 
      value: '8', 
      target: '10',
      percentage: 80,
      change: '+5 this week', 
      isPositive: true, 
      icon: UserPlus,
      color: '#FFC300',
    },
    { 
      label: 'Companies Activated', 
      value: '5', 
      target: '7',
      percentage: 71,
      change: '+2 this week', 
      isPositive: true, 
      icon: Building2,
      color: '#FFC300',
    },
    { 
      label: 'Avg. Conversion Time', 
      value: '2.4h', 
      target: '3h',
      percentage: 120,
      change: '20% faster', 
      isPositive: true, 
      icon: Timer,
      color: '#FFC300',
    },
  ];

  const myTasks = [
    { 
      id: 1, 
      title: 'Contact John Doe (Cold Lead)', 
      type: 'user-conversion', 
      priority: 'high', 
      status: 'in-progress', 
      dueDate: 'Today, 3:00 PM',
      assignedTime: '2 hours ago',
      lead: 'John Doe',
      contact: 'john@email.com'
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
      contact: 'contact@techsolutions.com'
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
      contact: 'sarah@email.com'
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
      contact: 'hello@designagency.com'
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
      contact: 'mike@email.com'
    },
  ];

  const completedToday = [
    { id: 1, title: 'Converted Emma Brown to active user', time: '10 mins ago', type: 'user-conversion' },
    { id: 2, title: 'Activated Cloud Systems company', time: '45 mins ago', type: 'company-conversion' },
    { id: 3, title: 'Verified Tom Wilson profile', time: '1 hour ago', type: 'user-conversion' },
    { id: 4, title: 'Onboarded Startup Hub Inc', time: '2 hours ago', type: 'company-conversion' },
  ];

  const teamLeaderboard = [
    { rank: 1, name: 'You (Alex Johnson)', conversions: 47, completionRate: 94, badge: 'gold' },
    { rank: 2, name: 'Sarah Miller', conversions: 45, completionRate: 90, badge: 'silver' },
    { rank: 3, name: 'David Chen', conversions: 42, completionRate: 88, badge: 'bronze' },
    { rank: 4, name: 'Emma Wilson', conversions: 38, completionRate: 85, badge: null },
    { rank: 5, name: 'Mike Brown', conversions: 35, completionRate: 82, badge: null },
  ];

  const weeklyData = [
    { id: 'week-mon', day: 'Mon', conversions: 7, target: 10 },
    { id: 'week-tue', day: 'Tue', conversions: 9, target: 10 },
    { id: 'week-wed', day: 'Wed', conversions: 11, target: 10 },
    { id: 'week-thu', day: 'Thu', conversions: 8, target: 10 },
    { id: 'week-fri', day: 'Fri', conversions: 12, target: 10 },
    { id: 'week-sat', day: 'Sat', conversions: 0, target: 5 },
    { id: 'week-sun', day: 'Sun', conversions: 0, target: 5 },
  ];

  const performanceRadar = [
    { metric: 'Speed', value: 85, fullMark: 100 },
    { metric: 'Quality', value: 92, fullMark: 100 },
    { metric: 'Volume', value: 78, fullMark: 100 },
    { metric: 'Accuracy', value: 88, fullMark: 100 },
    { metric: 'Communication', value: 90, fullMark: 100 },
  ];

  const taskStats = [
    { label: 'Pending', count: 23, color: '#d3d3d3' },
    { label: 'In Progress', count: 8, color: '#FFC300' },
    { label: 'Completed', count: 47, color: '#FFC300' },
    { label: 'Overdue', count: 2, color: '#ff6b6b' },
  ];

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
            Welcome Back, Alex! 👋
          </h1>
          <p className="mt-1" style={{ color: '#d3d3d3' }}>Here&apos;s your performance overview and task assignments for today</p>
        </div>
        <div className="text-right">
          <p style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Today&apos;s Date</p>
          <p style={{ color: '#FFC300', fontSize: '1.25rem', fontWeight: '700' }}>Saturday, Dec 13, 2025</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {myPerformance.map((stat) => {
          const Icon = stat.icon;
          return (
            <div 
              key={stat.label} 
              className="rounded-lg p-6 relative overflow-hidden cursor-pointer transition-all duration-300"
              style={{ 
                backgroundColor: '#023047', 
                border: '1px solid #6f6f6f',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 12px rgba(255, 195, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div 
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '150px',
                  height: '150px',
                  background: 'radial-gradient(circle, rgba(255, 195, 0, 0.1) 0%, transparent 70%)',
                  pointerEvents: 'none'
                }}
              />
              
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: stat.color }}>
                  <Icon className="w-6 h-6" style={{ color: '#023047' }} />
                </div>
                <div className="flex items-center gap-1" style={{ color: stat.color }}>
                  {stat.isPositive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                  <span style={{ fontSize: '0.75rem', fontWeight: '600' }}>{stat.change}</span>
                </div>
              </div>
              
              <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>{stat.label}</p>
              <div className="flex items-baseline gap-2 mt-1">
                <p style={{ color: '#f6f6f6', fontSize: '2rem', fontWeight: '700' }}>{stat.value}</p>
                <p style={{ color: '#6f6f6f', fontSize: '1rem' }}>/ {stat.target}</p>
              </div>
              
              <div className="mt-3">
                <div className="w-full h-2 rounded-full" style={{ backgroundColor: '#6f6f6f' }}>
                  <div 
                    className="h-full rounded-full transition-all duration-300"
                    style={{ 
                      backgroundColor: stat.percentage >= 100 ? '#FFC300' : '#d3d3d3',
                      width: `${Math.min(stat.percentage, 100)}%`
                    }}
                  />
                </div>
                <p className="mt-1 text-right" style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>{stat.percentage}% of target</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {taskStats.map((stat) => (
          <div 
            key={stat.label} 
            className="rounded-lg p-4 flex items-center justify-between cursor-pointer transition-all"
            style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = stat.color}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = '#6f6f6f'}
          >
            <div>
              <p style={{ color: '#d3d3d3', fontSize: '0.75rem' }}>{stat.label}</p>
              <p style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>{stat.count}</p>
            </div>
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stat.color }} />
          </div>
        ))}
      </div>

      <div className="rounded-lg" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
        <div className="p-6 flex items-center justify-between" style={{ borderBottom: '1px solid #6f6f6f' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)' }}>
              <ListTodo className="w-5 h-5" style={{ color: '#FFC300' }} />
            </div>
            <div>
              <h3 style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>My Active Tasks</h3>
              <p style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Tasks assigned to you that need attention</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span style={{ color: '#FFC300', fontSize: '1.5rem', fontWeight: '700' }}>{myTasks.length}</span>
            <span style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Active</span>
          </div>
        </div>
        <div className="p-6 space-y-3">
          {myTasks.map((task) => (
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
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 style={{ color: '#f6f6f6', fontSize: '1rem', fontWeight: '600' }}>{task.title}</h4>
                    {task.type === 'user-conversion' && (
                      <div className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: 'rgba(255, 195, 0, 0.2)', color: '#FFC300', border: '1px solid #FFC300' }}>
                        User Conversion
                      </div>
                    )}
                    {task.type === 'company-conversion' && (
                      <div className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: 'rgba(2, 48, 71, 0.5)', color: '#d3d3d3', border: '1px solid #6f6f6f' }}>
                        Company Conversion
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span style={{ color: '#d3d3d3' }}>👤 {task.lead}</span>
                    <span style={{ color: '#6f6f6f' }}>✉️ {task.contact}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span 
                    className="px-2 py-1 rounded text-xs inline-flex items-center gap-1"
                    style={{
                      backgroundColor: 
                        task.priority === 'urgent' ? 'rgba(255, 0, 0, 0.2)' :
                        task.priority === 'high' ? 'rgba(255, 195, 0, 0.2)' :
                        task.priority === 'medium' ? 'rgba(111, 111, 111, 0.2)' :
                        'rgba(211, 211, 211, 0.1)',
                      color: 
                        task.priority === 'urgent' ? '#ff6b6b' :
                        task.priority === 'high' ? '#FFC300' :
                        task.priority === 'medium' ? '#d3d3d3' :
                        '#6f6f6f',
                      border: `1px solid ${
                        task.priority === 'urgent' ? '#ff6b6b' :
                        task.priority === 'high' ? '#FFC300' :
                        '#6f6f6f'
                      }`
                    }}
                  >
                    {task.priority === 'urgent' && <AlertCircle className="w-3 h-3" />}
                    {task.priority === 'high' && <AlertCircle className="w-3 h-3" />}
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </span>
                  <span 
                    className="px-2 py-1 rounded text-xs inline-flex items-center gap-1"
                    style={{
                      backgroundColor: task.status === 'in-progress' ? 'rgba(255, 195, 0, 0.2)' : 'rgba(211, 211, 211, 0.2)',
                      color: task.status === 'in-progress' ? '#FFC300' : '#d3d3d3',
                      border: `1px solid ${task.status === 'in-progress' ? '#FFC300' : '#6f6f6f'}`
                    }}
                  >
                    {task.status === 'in-progress' ? <PlayCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                    {task.status === 'in-progress' ? 'In Progress' : 'Pending'}
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
                  <button
                    className="px-3 py-1.5 rounded transition-colors text-xs"
                    style={{ backgroundColor: '#FFC300', color: '#023047', fontWeight: '600' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d3d3d3'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFC300'}
                  >
                    Start Task
                  </button>
                  <button
                    className="px-3 py-1.5 rounded transition-colors text-xs"
                    style={{ backgroundColor: 'rgba(111, 111, 111, 0.3)', color: '#d3d3d3', border: '1px solid #6f6f6f' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(111, 111, 111, 0.5)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(111, 111, 111, 0.3)'}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>Weekly Performance</h3>
              <p style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Your conversions vs daily targets</p>
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
                  border: '1px solid #6f6f6f',
                  borderRadius: '8px'
                }}
                labelStyle={{ color: '#f6f6f6' }}
                itemStyle={{ color: '#f6f6f6' }}
              />
              <Bar dataKey="conversions" fill="#FFC300" radius={[8, 8, 0, 0]} name="Conversions" />
              <Bar dataKey="target" fill="#6f6f6f" radius={[8, 8, 0, 0]} name="Target" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>Performance Metrics</h3>
              <p style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Your skill ratings across key areas</p>
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
                  borderRadius: '8px'
                }}
                labelStyle={{ color: '#f6f6f6' }}
                itemStyle={{ color: '#f6f6f6' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)' }}>
                <Trophy className="w-5 h-5" style={{ color: '#FFC300' }} />
              </div>
              <div>
                <h3 style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>Team Leaderboard</h3>
                <p style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Top performers this month</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            {teamLeaderboard.map((member) => (
              <div 
                key={member.rank} 
                className="p-4 rounded-lg flex items-center justify-between transition-all"
                style={{ 
                  backgroundColor: member.rank === 1 ? 'rgba(255, 195, 0, 0.15)' : 'rgba(255, 195, 0, 0.05)', 
                  border: member.rank === 1 ? '1px solid #FFC300' : '1px solid #6f6f6f'
                }}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
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
                    {member.badge ? (
                      <Trophy className="w-5 h-5" />
                    ) : (
                      member.rank
                    )}
                  </div>
                  <div>
                    <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>{member.name}</p>
                    <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>{member.conversions} conversions · {member.completionRate}% completion</p>
                  </div>
                </div>
                {member.rank === 1 && (
                  <div className="flex items-center gap-1" style={{ color: '#FFC300' }}>
                    <Award className="w-5 h-5" />
                    <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>You!</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)' }}>
                <CheckCircle className="w-5 h-5" style={{ color: '#FFC300' }} />
              </div>
              <div>
                <h3 style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>Completed Today</h3>
                <p style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Tasks you&apos;ve finished today</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span style={{ color: '#FFC300', fontSize: '1.5rem', fontWeight: '700' }}>{completedToday.length}</span>
              <span style={{ color: '#6f6f6f', fontSize: '0.875rem' }}>Done</span>
            </div>
          </div>
          <div className="space-y-3">
            {completedToday.map((task) => (
              <div 
                key={task.id} 
                className="p-3 rounded-lg flex items-start gap-3"
                style={{ backgroundColor: 'rgba(255, 195, 0, 0.05)', border: '1px solid #6f6f6f' }}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(255, 195, 0, 0.2)' }}>
                  <CheckCircle className="w-4 h-4" style={{ color: '#FFC300' }} />
                </div>
                <div className="flex-1">
                  <p style={{ color: '#f6f6f6', fontSize: '0.875rem' }}>{task.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 rounded text-xs" style={{ 
                      backgroundColor: task.type === 'user-conversion' ? 'rgba(255, 195, 0, 0.2)' : 'rgba(111, 111, 111, 0.2)',
                      color: task.type === 'user-conversion' ? '#FFC300' : '#d3d3d3',
                      border: '1px solid #6f6f6f'
                    }}>
                      {task.type === 'user-conversion' ? 'User' : 'Company'}
                    </span>
                    <span style={{ color: '#6f6f6f', fontSize: '0.75rem' }} className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {task.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            className="w-full mt-4 px-4 py-2 rounded-lg transition-colors"
            style={{ backgroundColor: 'rgba(255, 195, 0, 0.1)', color: '#FFC300', border: '1px solid #FFC300' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 195, 0, 0.1)'}
          >
            View All Completed Tasks
          </button>
        </div>
      </div>

      <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
        <h3 className="mb-4" style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600' }}>Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => setCurrentPage('tasks')}
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
          >
            <UserPlus className="w-6 h-6 mb-2" style={{ color: '#FFC300' }} />
            <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>Convert Cold Lead</p>
            <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>Start new conversion</p>
          </button>
          <button
            onClick={() => setCurrentPage('tasks')}
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
          >
            <Building2 className="w-6 h-6 mb-2" style={{ color: '#FFC300' }} />
            <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>Activate Company</p>
            <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>Onboard new company</p>
          </button>
          <button
            onClick={() => setCurrentPage('tasks')}
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
          >
            <ListTodo className="w-6 h-6 mb-2" style={{ color: '#d3d3d3' }} />
            <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>View All Tasks</p>
            <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>See complete list</p>
          </button>
          <button
            onClick={() => setCurrentPage('tasks')}
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
          >
            <BarChart3 className="w-6 h-6 mb-2" style={{ color: '#d3d3d3' }} />
            <p style={{ color: '#f6f6f6', fontSize: '0.875rem', fontWeight: '600' }}>My Performance</p>
            <p style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>Detailed analytics</p>
          </button>
        </div>
      </div>
    </div>
  );
}