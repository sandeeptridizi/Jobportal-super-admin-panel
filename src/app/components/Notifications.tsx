import { useState } from 'react';
import { Bell, Briefcase, Users, Building2, FileText, DollarSign, CheckCircle, AlertCircle, Info, X, Filter, Clock } from 'lucide-react';

interface Notification {
  id: number;
  type: 'job' | 'application' | 'company' | 'user' | 'payment' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
  actionUrl?: string;
}

export function Notifications() {
  const [filterType, setFilterType] = useState<'all' | 'unread' | 'read'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'application',
      title: 'New Job Application',
      message: 'John Smith applied for Senior React Developer position at Tech Corp',
      time: '2 minutes ago',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'company',
      title: 'New Company Registration',
      message: 'Innovation Labs has completed registration and is pending verification',
      time: '15 minutes ago',
      read: false,
      priority: 'high'
    },
    {
      id: 3,
      type: 'payment',
      title: 'Payment Received',
      message: 'Tech Corp upgraded to Pro Plan - $299.00 received',
      time: '1 hour ago',
      read: false,
      priority: 'medium'
    },
    {
      id: 4,
      type: 'job',
      title: 'Job Posting Published',
      message: 'UX Designer position at Design Studio has been published successfully',
      time: '2 hours ago',
      read: true,
      priority: 'low'
    },
    {
      id: 5,
      type: 'user',
      title: 'New User Registration',
      message: 'Sarah Williams registered as a job seeker',
      time: '3 hours ago',
      read: false,
      priority: 'medium'
    },
    {
      id: 6,
      type: 'system',
      title: 'System Maintenance',
      message: 'Scheduled maintenance will occur tonight at 2:00 AM EST',
      time: '4 hours ago',
      read: true,
      priority: 'high'
    },
    {
      id: 7,
      type: 'application',
      title: 'Application Withdrawn',
      message: 'Michael Chen withdrew application for Product Manager at Startup Inc',
      time: '5 hours ago',
      read: true,
      priority: 'low'
    },
    {
      id: 8,
      type: 'company',
      title: 'Company Verification Completed',
      message: 'Analytics Co has been verified successfully',
      time: '6 hours ago',
      read: true,
      priority: 'medium'
    },
    {
      id: 9,
      type: 'payment',
      title: 'Subscription Renewed',
      message: 'Cloud Systems renewed Pro Plan subscription - $299.00',
      time: '8 hours ago',
      read: true,
      priority: 'medium'
    },
    {
      id: 10,
      type: 'job',
      title: 'Job Posting Expired',
      message: 'Sales Executive position at Media Group has expired',
      time: '10 hours ago',
      read: true,
      priority: 'low'
    },
    {
      id: 11,
      type: 'user',
      title: 'Profile Updated',
      message: 'Emma Johnson updated her profile and resume',
      time: '12 hours ago',
      read: true,
      priority: 'low'
    },
    {
      id: 12,
      type: 'application',
      title: 'Multiple Applications',
      message: 'Data Scientist position received 15 new applications today',
      time: '1 day ago',
      read: true,
      priority: 'medium'
    },
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'job':
        return <Briefcase className="w-5 h-5" />;
      case 'application':
        return <FileText className="w-5 h-5" />;
      case 'company':
        return <Building2 className="w-5 h-5" />;
      case 'user':
        return <Users className="w-5 h-5" />;
      case 'payment':
        return <DollarSign className="w-5 h-5" />;
      case 'system':
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'job':
        return '#023047';
      case 'application':
        return '#FFC300';
      case 'company':
        return '#023047';
      case 'user':
        return '#6f6f6f';
      case 'payment':
        return '#FFC300';
      case 'system':
        return '#d3d3d3';
      default:
        return '#6f6f6f';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return { bg: '#FFC300', color: '#023047', text: 'High' };
      case 'medium':
        return { bg: '#023047', color: '#f6f6f6', text: 'Medium' };
      case 'low':
        return { bg: '#6f6f6f', color: '#f6f6f6', text: 'Low' };
      default:
        return { bg: '#6f6f6f', color: '#f6f6f6', text: 'Normal' };
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const filteredNotifications = notifications.filter(n => {
    if (filterType === 'unread' && n.read) return false;
    if (filterType === 'read' && !n.read) return false;
    if (selectedCategory !== 'all' && n.type !== selectedCategory) return false;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const stats = {
    total: notifications.length,
    unread: unreadCount,
    high: notifications.filter(n => n.priority === 'high' && !n.read).length,
    today: notifications.filter(n => n.time.includes('ago') && (n.time.includes('minute') || n.time.includes('hour'))).length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
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
            Notifications
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
              {stats.unread}
            </p>
            <p style={{ color: '#6f6f6f' }}>Unread</p>
          </div>
        </div>
        <button 
          onClick={markAllAsRead}
          className="px-4 py-2 rounded-lg transition-colors"
          style={{ backgroundColor: '#023047', color: '#f6f6f6' }}
        >
          <CheckCircle className="w-5 h-5 inline mr-2" />
          Mark All as Read
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
              <Bell className="w-5 h-5" style={{ color: '#023047' }} />
            </div>
          </div>
          <p style={{ color: '#d3d3d3' }}>Total</p>
          <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>{stats.total}</p>
        </div>

        <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#023047' }}>
              <AlertCircle className="w-5 h-5" style={{ color: '#f6f6f6' }} />
            </div>
          </div>
          <p style={{ color: '#d3d3d3' }}>Unread</p>
          <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>{stats.unread}</p>
        </div>

        <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC300' }}>
              <Info className="w-5 h-5" style={{ color: '#023047' }} />
            </div>
          </div>
          <p style={{ color: '#d3d3d3' }}>High Priority</p>
          <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>{stats.high}</p>
        </div>

        <div className="rounded-lg p-6" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#6f6f6f' }}>
              <Clock className="w-5 h-5" style={{ color: '#f6f6f6' }} />
            </div>
          </div>
          <p style={{ color: '#d3d3d3' }}>Today</p>
          <p className="mt-1" style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>{stats.today}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setFilterType('all')}
            className="px-4 py-2 rounded-lg transition-colors"
            style={{
              backgroundColor: filterType === 'all' ? '#FFC300' : 'transparent',
              color: filterType === 'all' ? '#023047' : '#d3d3d3',
              border: filterType === 'all' ? 'none' : '1px solid #6f6f6f'
            }}
          >
            All
          </button>
          <button
            onClick={() => setFilterType('unread')}
            className="px-4 py-2 rounded-lg transition-colors"
            style={{
              backgroundColor: filterType === 'unread' ? '#FFC300' : 'transparent',
              color: filterType === 'unread' ? '#023047' : '#d3d3d3',
              border: filterType === 'unread' ? 'none' : '1px solid #6f6f6f'
            }}
          >
            Unread
          </button>
          <button
            onClick={() => setFilterType('read')}
            className="px-4 py-2 rounded-lg transition-colors"
            style={{
              backgroundColor: filterType === 'read' ? '#FFC300' : 'transparent',
              color: filterType === 'read' ? '#023047' : '#d3d3d3',
              border: filterType === 'read' ? 'none' : '1px solid #6f6f6f'
            }}
          >
            Read
          </button>
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 rounded-lg"
          style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f', color: '#f6f6f6' }}
        >
          <option value="all">All Categories</option>
          <option value="job">Jobs</option>
          <option value="application">Applications</option>
          <option value="company">Companies</option>
          <option value="user">Users</option>
          <option value="payment">Payments</option>
          <option value="system">System</option>
        </select>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="rounded-lg p-12 text-center" style={{ backgroundColor: '#023047', border: '1px solid #6f6f6f' }}>
            <Bell className="w-16 h-16 mx-auto mb-4" style={{ color: '#6f6f6f' }} />
            <p style={{ color: '#d3d3d3', fontSize: '1.125rem' }}>No notifications found</p>
            <p className="mt-2" style={{ color: '#6f6f6f' }}>You're all caught up!</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className="rounded-lg p-4 transition-all cursor-pointer"
              style={{
                backgroundColor: notification.read ? '#023047' : '#1a1a1a',
                border: notification.read ? '1px solid #6f6f6f' : '1px solid #FFC300',
                opacity: notification.read ? 0.7 : 1
              }}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: getNotificationColor(notification.type), color: notification.type === 'application' || notification.type === 'payment' ? '#023047' : '#f6f6f6' }}
                >
                  {getNotificationIcon(notification.type)}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <h3 style={{ color: '#f6f6f6', fontWeight: '600' }}>{notification.title}</h3>
                    <div className="flex items-center gap-2">
                      <span 
                        className="px-2 py-1 rounded text-xs"
                        style={{
                          backgroundColor: getPriorityBadge(notification.priority).bg,
                          color: getPriorityBadge(notification.priority).color
                        }}
                      >
                        {getPriorityBadge(notification.priority).text}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notification.id);
                        }}
                        className="p-1 rounded transition-colors"
                        style={{ color: '#6f6f6f' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#FFC300'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#6f6f6f'}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>{notification.message}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span style={{ color: '#6f6f6f', fontSize: '0.75rem' }}>
                      <Clock className="w-3 h-3 inline mr-1" />
                      {notification.time}
                    </span>
                    {!notification.read && (
                      <span className="flex items-center gap-1" style={{ color: '#FFC300', fontSize: '0.75rem' }}>
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FFC300' }}></span>
                        New
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}