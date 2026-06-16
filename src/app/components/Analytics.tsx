import { useState } from 'react';
import { MapPin, Users, Building2, UserCheck, Building, Briefcase, GraduationCap, Pencil, Globe, Smartphone, Tablet, Monitor, TrendingUp, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

type Category = 'users' | 'companies' | 'tutors' | 'institutes' | 'jobs' | 'internships' | 'freelance';
type UserMetricsTab = 'demographics' | 'medium';

interface DataPoint {
  id: string;
  lat: number;
  lng: number;
  name: string;
  count: number;
  state: string;
}

const analyticsData: Record<Category, DataPoint[]> = {
  users: [
    { id: '1', lat: 28.6139, lng: 77.2090, name: 'Delhi Users', count: 1250, state: 'Delhi' },
    { id: '2', lat: 19.0760, lng: 72.8777, name: 'Mumbai Users', count: 2340, state: 'Maharashtra' },
    { id: '3', lat: 12.9716, lng: 77.5946, name: 'Bangalore Users', count: 1890, state: 'Karnataka' },
    { id: '4', lat: 13.0827, lng: 80.2707, name: 'Chennai Users', count: 1420, state: 'Tamil Nadu' },
    { id: '5', lat: 22.5726, lng: 88.3639, name: 'Kolkata Users', count: 1120, state: 'West Bengal' },
    { id: '6', lat: 17.3850, lng: 78.4867, name: 'Hyderabad Users', count: 1560, state: 'Telangana' },
    { id: '7', lat: 23.0225, lng: 72.5714, name: 'Ahmedabad Users', count: 890, state: 'Gujarat' },
    { id: '8', lat: 18.5204, lng: 73.8567, name: 'Pune Users', count: 1340, state: 'Maharashtra' },
    { id: '9', lat: 26.9124, lng: 75.7873, name: 'Jaipur Users', count: 670, state: 'Rajasthan' },
    { id: '10', lat: 11.0168, lng: 76.9558, name: 'Coimbatore Users', count: 540, state: 'Tamil Nadu' },
  ],
  companies: [
    { id: '1', lat: 28.6139, lng: 77.2090, name: 'Delhi Companies', count: 340, state: 'Delhi' },
    { id: '2', lat: 19.0760, lng: 72.8777, name: 'Mumbai Companies', count: 567, state: 'Maharashtra' },
    { id: '3', lat: 12.9716, lng: 77.5946, name: 'Bangalore Companies', count: 489, state: 'Karnataka' },
    { id: '4', lat: 13.0827, lng: 80.2707, name: 'Chennai Companies', count: 298, state: 'Tamil Nadu' },
    { id: '5', lat: 22.5726, lng: 88.3639, name: 'Kolkata Companies', count: 234, state: 'West Bengal' },
    { id: '6', lat: 17.3850, lng: 78.4867, name: 'Hyderabad Companies', count: 387, state: 'Telangana' },
    { id: '7', lat: 23.0225, lng: 72.5714, name: 'Ahmedabad Companies', count: 198, state: 'Gujarat' },
    { id: '8', lat: 18.5204, lng: 73.8567, name: 'Pune Companies', count: 312, state: 'Maharashtra' },
  ],
  tutors: [
    { id: '1', lat: 28.6139, lng: 77.2090, name: 'Delhi Tutors', count: 156, state: 'Delhi' },
    { id: '2', lat: 19.0760, lng: 72.8777, name: 'Mumbai Tutors', count: 234, state: 'Maharashtra' },
    { id: '3', lat: 12.9716, lng: 77.5946, name: 'Bangalore Tutors', count: 198, state: 'Karnataka' },
    { id: '4', lat: 13.0827, lng: 80.2707, name: 'Chennai Tutors', count: 167, state: 'Tamil Nadu' },
    { id: '5', lat: 22.5726, lng: 88.3639, name: 'Kolkata Tutors', count: 134, state: 'West Bengal' },
    { id: '6', lat: 17.3850, lng: 78.4867, name: 'Hyderabad Tutors', count: 189, state: 'Telangana' },
    { id: '7', lat: 26.9124, lng: 75.7873, name: 'Jaipur Tutors', count: 87, state: 'Rajasthan' },
    { id: '8', lat: 11.0168, lng: 76.9558, name: 'Coimbatore Tutors', count: 76, state: 'Tamil Nadu' },
  ],
  institutes: [
    { id: '1', lat: 28.6139, lng: 77.2090, name: 'Delhi Institutes', count: 89, state: 'Delhi' },
    { id: '2', lat: 19.0760, lng: 72.8777, name: 'Mumbai Institutes', count: 134, state: 'Maharashtra' },
    { id: '3', lat: 12.9716, lng: 77.5946, name: 'Bangalore Institutes', count: 112, state: 'Karnataka' },
    { id: '4', lat: 13.0827, lng: 80.2707, name: 'Chennai Institutes', count: 98, state: 'Tamil Nadu' },
    { id: '5', lat: 22.5726, lng: 88.3639, name: 'Kolkata Institutes', count: 87, state: 'West Bengal' },
    { id: '6', lat: 17.3850, lng: 78.4867, name: 'Hyderabad Institutes', count: 104, state: 'Telangana' },
    { id: '7', lat: 23.0225, lng: 72.5714, name: 'Ahmedabad Institutes', count: 76, state: 'Gujarat' },
  ],
  jobs: [
    { id: '1', lat: 28.6139, lng: 77.2090, name: 'Delhi Jobs', count: 456, state: 'Delhi' },
    { id: '2', lat: 19.0760, lng: 72.8777, name: 'Mumbai Jobs', count: 678, state: 'Maharashtra' },
    { id: '3', lat: 12.9716, lng: 77.5946, name: 'Bangalore Jobs', count: 789, state: 'Karnataka' },
    { id: '4', lat: 13.0827, lng: 80.2707, name: 'Chennai Jobs', count: 423, state: 'Tamil Nadu' },
    { id: '5', lat: 22.5726, lng: 88.3639, name: 'Kolkata Jobs', count: 312, state: 'West Bengal' },
    { id: '6', lat: 17.3850, lng: 78.4867, name: 'Hyderabad Jobs', count: 567, state: 'Telangana' },
    { id: '7', lat: 23.0225, lng: 72.5714, name: 'Ahmedabad Jobs', count: 289, state: 'Gujarat' },
    { id: '8', lat: 18.5204, lng: 73.8567, name: 'Pune Jobs', count: 398, state: 'Maharashtra' },
    { id: '9', lat: 26.9124, lng: 75.7873, name: 'Jaipur Jobs', count: 234, state: 'Rajasthan' },
  ],
  internships: [
    { id: '1', lat: 28.6139, lng: 77.2090, name: 'Delhi Internships', count: 234, state: 'Delhi' },
    { id: '2', lat: 19.0760, lng: 72.8777, name: 'Mumbai Internships', count: 345, state: 'Maharashtra' },
    { id: '3', lat: 12.9716, lng: 77.5946, name: 'Bangalore Internships', count: 456, state: 'Karnataka' },
    { id: '4', lat: 13.0827, lng: 80.2707, name: 'Chennai Internships', count: 198, state: 'Tamil Nadu' },
    { id: '5', lat: 22.5726, lng: 88.3639, name: 'Kolkata Internships', count: 167, state: 'West Bengal' },
    { id: '6', lat: 17.3850, lng: 78.4867, name: 'Hyderabad Internships', count: 287, state: 'Telangana' },
  ],
  freelance: [
    { id: '1', lat: 28.6139, lng: 77.2090, name: 'Delhi Freelance', count: 189, state: 'Delhi' },
    { id: '2', lat: 19.0760, lng: 72.8777, name: 'Mumbai Freelance', count: 267, state: 'Maharashtra' },
    { id: '3', lat: 12.9716, lng: 77.5946, name: 'Bangalore Freelance', count: 298, state: 'Karnataka' },
    { id: '4', lat: 13.0827, lng: 80.2707, name: 'Chennai Freelance', count: 156, state: 'Tamil Nadu' },
    { id: '5', lat: 22.5726, lng: 88.3639, name: 'Kolkata Freelance', count: 134, state: 'West Bengal' },
    { id: '6', lat: 17.3850, lng: 78.4867, name: 'Hyderabad Freelance', count: 198, state: 'Telangana' },
    { id: '7', lat: 18.5204, lng: 73.8567, name: 'Pune Freelance', count: 176, state: 'Maharashtra' },
  ],
};

const categories = [
  { id: 'users' as Category, label: 'Users', icon: Users, color: '#FFC300' },
  { id: 'companies' as Category, label: 'Companies', icon: Building2, color: '#00B4D8' },
  { id: 'tutors' as Category, label: 'Tutors', icon: UserCheck, color: '#06FFA5' },
  { id: 'institutes' as Category, label: 'Institutes', icon: Building, color: '#FF006E' },
  { id: 'jobs' as Category, label: 'Jobs', icon: Briefcase, color: '#8338EC' },
  { id: 'internships' as Category, label: 'Internships', icon: GraduationCap, color: '#FB5607' },
  { id: 'freelance' as Category, label: 'Freelance', icon: Pencil, color: '#3A86FF' },
];

export function Analytics() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('users');
  const [hoveredPoint, setHoveredPoint] = useState<DataPoint | null>(null);
  const [userMetricsTab, setUserMetricsTab] = useState<UserMetricsTab>('demographics');

  const currentData = analyticsData[selectedCategory];
  const currentColor = categories.find(c => c.id === selectedCategory)?.color || '#FFC300';

  const totalCount = currentData.reduce((sum, point) => sum + point.count, 0);

  const mapToScreen = (lat: number, lng: number) => {
    const mapWidth = 600;
    const mapHeight = 700;
    
    const minLat = 6;
    const maxLat = 37;
    const minLng = 67;
    const maxLng = 98;
    
    const x = ((lng - minLng) / (maxLng - minLng)) * mapWidth;
    const y = ((maxLat - lat) / (maxLat - minLat)) * mapHeight;
    
    return { x, y };
  };

  const demographicsData = [
    { id: 'age-18-24', ageGroup: '18-24', users: 3450, percentage: 28.5 },
    { id: 'age-25-34', ageGroup: '25-34', users: 5240, percentage: 43.2 },
    { id: 'age-35-44', ageGroup: '35-44', users: 2130, percentage: 17.6 },
    { id: 'age-45-54', ageGroup: '45-54', users: 890, percentage: 7.3 },
    { id: 'age-55-plus', ageGroup: '55+', users: 410, percentage: 3.4 },
  ];

  const genderData = [
    { id: 'gender-male', name: 'Male', value: 6780, percentage: 56 },
    { id: 'gender-female', name: 'Female', value: 4320, percentage: 35.6 },
    { id: 'gender-other', name: 'Other', value: 1020, percentage: 8.4 },
  ];

  const mediumData = [
    { id: 'device-mobile', device: 'Mobile', users: 7850, percentage: 64.7, icon: Smartphone },
    { id: 'device-desktop', device: 'Desktop', users: 3120, percentage: 25.7, icon: Monitor },
    { id: 'device-tablet', device: 'Tablet', users: 1150, percentage: 9.5, icon: Tablet },
  ];

  const browserData = [
    { id: 'browser-chrome', name: 'Chrome', value: 5890 },
    { id: 'browser-safari', name: 'Safari', value: 2340 },
    { id: 'browser-firefox', name: 'Firefox', value: 1560 },
    { id: 'browser-edge', name: 'Edge', value: 890 },
    { id: 'browser-others', name: 'Others', value: 1440 },
  ];

  const CHART_COLORS = ['#FFC300', '#023047', '#6f6f6f', '#d3d3d3', '#00B4D8'];

  return (
    <div className="space-y-6">
      <div>
        <h1 style={{ color: '#f6f6f6', fontSize: '1.875rem', marginBottom: '0.5rem' }}>Analytics</h1>
        <p style={{ color: '#d3d3d3' }}>Geographical distribution insights across India</p>
      </div>

      <div 
        className="p-6 rounded-xl"
        style={{
          background: 'radial-gradient(ellipse at top left, rgba(255, 195, 0, 0.15), rgba(2, 48, 71, 0.8))',
          border: '2px solid #FFC300',
        }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: '#FFC300' }}
          >
            <Activity className="w-6 h-6" style={{ color: '#023047' }} />
          </div>
          <div>
            <h2 style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>User Active Metrics</h2>
            <p style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Analyze user demographics and platform usage</p>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setUserMetricsTab('demographics')}
            className="px-6 py-3 rounded-lg transition-all font-medium"
            style={{
              backgroundColor: userMetricsTab === 'demographics' ? '#FFC300' : 'rgba(111, 111, 111, 0.2)',
              color: userMetricsTab === 'demographics' ? '#023047' : '#f6f6f6',
              border: '1px solid ' + (userMetricsTab === 'demographics' ? '#FFC300' : '#6f6f6f'),
            }}
          >
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>Demographics</span>
            </div>
          </button>
          <button
            onClick={() => setUserMetricsTab('medium')}
            className="px-6 py-3 rounded-lg transition-all font-medium"
            style={{
              backgroundColor: userMetricsTab === 'medium' ? '#FFC300' : 'rgba(111, 111, 111, 0.2)',
              color: userMetricsTab === 'medium' ? '#023047' : '#f6f6f6',
              border: '1px solid ' + (userMetricsTab === 'medium' ? '#FFC300' : '#6f6f6f'),
            }}
          >
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              <span>User Medium</span>
            </div>
          </button>
        </div>

        {userMetricsTab === 'demographics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div
                className="p-6 rounded-xl"
                style={{
                  backgroundColor: '#023047',
                  border: '1px solid #6f6f6f',
                }}
              >
                <h3 style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
                  Age Group Distribution
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={demographicsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#6f6f6f" opacity={0.3} />
                    <XAxis dataKey="ageGroup" stroke="#d3d3d3" />
                    <YAxis stroke="#d3d3d3" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#023047',
                        border: '1px solid #6f6f6f',
                        borderRadius: '8px',
                      }}
                      labelStyle={{ color: '#f6f6f6' }}
                      itemStyle={{ color: '#f6f6f6' }}
                    />
                    <Bar dataKey="users" fill="#FFC300" radius={[8, 8, 0, 0]} name="Users" />
                  </BarChart>
                </ResponsiveContainer>
                
                <div className="mt-4 space-y-2">
                  {demographicsData.map((age, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>{age.ageGroup} years</span>
                      <div className="flex items-center gap-3">
                        <div className="w-32 h-2 rounded-full" style={{ backgroundColor: '#6f6f6f' }}>
                          <div
                            className="h-full rounded-full"
                            style={{ 
                              width: `${age.percentage}%`, 
                              backgroundColor: '#FFC300',
                            }}
                          />
                        </div>
                        <span style={{ color: '#FFC300', fontSize: '0.875rem', fontWeight: '600', minWidth: '60px' }}>
                          {age.users.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="p-6 rounded-xl"
                style={{
                  backgroundColor: '#023047',
                  border: '1px solid #6f6f6f',
                }}
              >
                <h3 style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
                  Gender Distribution
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={genderData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name} ${percentage.toFixed(1)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {genderData.map((entry, index) => (
                        <Cell key={`gender-cell-${index}-${entry.name}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#023047',
                        border: '1px solid #6f6f6f',
                        borderRadius: '8px',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>

                <div className="mt-4 space-y-3">
                  {genderData.map((gender, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'rgba(111, 111, 111, 0.2)' }}>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
                        />
                        <span style={{ color: '#f6f6f6', fontSize: '0.875rem' }}>{gender.name}</span>
                      </div>
                      <span style={{ color: '#FFC300', fontSize: '0.875rem', fontWeight: '600' }}>
                        {gender.value.toLocaleString()} ({gender.percentage}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {userMetricsTab === 'medium' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div
                className="p-6 rounded-xl"
                style={{
                  backgroundColor: '#023047',
                  border: '1px solid #6f6f6f',
                }}
              >
                <h3 style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
                  Device Distribution
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mediumData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#6f6f6f" opacity={0.3} />
                    <XAxis dataKey="device" stroke="#d3d3d3" />
                    <YAxis stroke="#d3d3d3" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#023047',
                        border: '1px solid #6f6f6f',
                        borderRadius: '8px',
                      }}
                      labelStyle={{ color: '#f6f6f6' }}
                      itemStyle={{ color: '#f6f6f6' }}
                    />
                    <Bar dataKey="users" fill="#FFC300" radius={[8, 8, 0, 0]} name="Users" />
                  </BarChart>
                </ResponsiveContainer>

                <div className="mt-4 space-y-3">
                  {mediumData.map((device, index) => {
                    const Icon = device.icon;
                    return (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'rgba(111, 111, 111, 0.2)' }}>
                        <div className="flex items-center gap-2">
                          <Icon className="w-5 h-5" style={{ color: '#FFC300' }} />
                          <span style={{ color: '#f6f6f6', fontSize: '0.875rem' }}>{device.device}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-24 h-2 rounded-full" style={{ backgroundColor: '#6f6f6f' }}>
                            <div
                              className="h-full rounded-full"
                              style={{ 
                                width: `${device.percentage}%`, 
                                backgroundColor: '#FFC300',
                              }}
                            />
                          </div>
                          <span style={{ color: '#FFC300', fontSize: '0.875rem', fontWeight: '600', minWidth: '80px' }}>
                            {device.users.toLocaleString()} ({device.percentage}%)
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div
                className="p-6 rounded-xl"
                style={{
                  backgroundColor: '#023047',
                  border: '1px solid #6f6f6f',
                }}
              >
                <h3 style={{ color: '#f6f6f6', fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
                  Browser Distribution
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={browserData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name} ${value.toLocaleString()}`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {browserData.map((entry, index) => (
                        <Cell key={`browser-cell-${index}-${entry.name}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#023047',
                        border: '1px solid #6f6f6f',
                        borderRadius: '8px',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>

                <div className="mt-4 space-y-3">
                  {browserData.map((browser, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'rgba(111, 111, 111, 0.2)' }}>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
                        />
                        <span style={{ color: '#f6f6f6', fontSize: '0.875rem' }}>{browser.name}</span>
                      </div>
                      <span style={{ color: '#FFC300', fontSize: '0.875rem', fontWeight: '600' }}>
                        {browser.value.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div
                className="p-4 rounded-lg text-center"
                style={{ 
                  background: 'radial-gradient(ellipse at center, rgba(255, 195, 0, 0.2), rgba(2, 48, 71, 0.5))',
                  border: '1px solid #FFC300',
                }}
              >
                <Smartphone className="w-8 h-8 mx-auto mb-2" style={{ color: '#FFC300' }} />
                <p style={{ color: '#d3d3d3', fontSize: '0.75rem' }}>Mobile Users</p>
                <p style={{ color: '#FFC300', fontSize: '1.5rem', fontWeight: '700' }}>
                  {mediumData[0].percentage}%
                </p>
              </div>
              <div
                className="p-4 rounded-lg text-center"
                style={{ 
                  backgroundColor: '#023047',
                  border: '1px solid #6f6f6f',
                }}
              >
                <Monitor className="w-8 h-8 mx-auto mb-2" style={{ color: '#d3d3d3' }} />
                <p style={{ color: '#d3d3d3', fontSize: '0.75rem' }}>Desktop Users</p>
                <p style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>
                  {mediumData[1].percentage}%
                </p>
              </div>
              <div
                className="p-4 rounded-lg text-center"
                style={{ 
                  backgroundColor: '#023047',
                  border: '1px solid #6f6f6f',
                }}
              >
                <Tablet className="w-8 h-8 mx-auto mb-2" style={{ color: '#d3d3d3' }} />
                <p style={{ color: '#d3d3d3', fontSize: '0.75rem' }}>Tablet Users</p>
                <p style={{ color: '#f6f6f6', fontSize: '1.5rem', fontWeight: '700' }}>
                  {mediumData[2].percentage}%
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div 
        className="p-6 rounded-lg"
        style={{
          background: 'linear-gradient(135deg, rgba(2, 48, 71, 0.4) 0%, rgba(2, 48, 71, 0.2) 100%)',
          border: '1px solid rgba(111, 111, 111, 0.3)',
        }}
      >
        <h2 style={{ color: '#f6f6f6', fontSize: '1.125rem', marginBottom: '1rem' }}>Select Category</h2>
        <div className="flex items-center gap-8 flex-wrap">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2 transition-all pb-2"
                style={{
                  color: isSelected ? '#FFC300' : '#f6f6f6',
                  borderBottom: isSelected ? '2px solid #FFC300' : '2px solid transparent',
                }}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{category.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div 
        className="p-6 rounded-lg"
        style={{
          background: 'linear-gradient(135deg, rgba(2, 48, 71, 0.4) 0%, rgba(2, 48, 71, 0.2) 100%)',
          border: '1px solid rgba(111, 111, 111, 0.3)',
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 style={{ color: '#f6f6f6', fontSize: '1.125rem' }}>
            India Map - {categories.find(c => c.id === selectedCategory)?.label} Distribution
          </h2>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5" style={{ color: currentColor }} />
            <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>
              {currentData.length} locations
            </span>
          </div>
        </div>

        <div className="relative flex justify-center">
          <svg 
            width="600" 
            height="700" 
            viewBox="0 0 600 700"
            className="max-w-full h-auto"
            style={{
              background: 'linear-gradient(180deg, rgba(2, 48, 71, 0.3) 0%, rgba(2, 48, 71, 0.1) 100%)',
              borderRadius: '0.5rem',
              padding: '1rem',
            }}
          >
            <g>
              <path 
                d="M 180 80 L 200 65 L 225 60 L 245 55 L 270 58 L 290 65 L 310 75 L 330 90 L 345 105 L 358 125 L 368 145 L 378 170 L 388 195 L 395 220 L 400 245 L 402 270 L 405 295 L 408 320 L 410 345 L 412 370 L 413 395 L 414 420 L 413 445 L 410 470 L 405 490 L 398 510 L 388 530 L 375 545 L 360 558 L 342 568 L 322 575 L 300 578 L 280 576 L 262 570 L 245 560 L 230 548 L 218 535 L 208 520 L 200 505 L 193 488 L 188 470 L 185 450 L 183 430 L 182 410 L 182 390 L 183 370 L 185 350 L 188 330 L 192 310 L 197 290 L 203 270 L 210 250 L 217 230 L 225 210 L 233 190 L 242 170 L 250 150 L 258 130 L 265 110 L 270 95 Z" 
                fill="rgba(2, 48, 71, 0.4)"
                stroke={currentColor}
                strokeWidth="3"
                opacity="1"
              />
              
              <path 
                d="M 180 80 L 175 95 L 172 110 L 170 125 L 169 140 L 170 155 L 173 170 L 178 185 L 185 200 L 192 210 L 203 220 L 215 228 L 227 234 L 238 237 L 248 235 L 258 230 L 265 220 L 270 210 L 272 198 L 270 186 L 265 175 L 258 165 L 250 155 L 242 145 L 233 135 L 225 125 L 217 115 L 210 105 L 200 95 L 190 88 Z" 
                fill="rgba(2, 48, 71, 0.3)"
                stroke={currentColor}
                strokeWidth="2"
                opacity="0.8"
              />
              
              <path 
                d="M 408 320 L 415 315 L 423 312 L 432 310 L 442 310 L 452 312 L 460 316 L 467 322 L 472 330 L 475 340 L 476 350 L 475 360 L 472 370 L 467 378 L 460 384 L 452 388 L 442 390 L 432 390 L 423 388 L 415 384 L 410 378 L 408 370 Z" 
                fill="rgba(2, 48, 71, 0.3)"
                stroke={currentColor}
                strokeWidth="2"
                opacity="0.8"
              />
              
              <g opacity="0.7">
                <path 
                  d="M 520 380 L 523 370 L 525 360 L 526 350 L 525 340 L 523 330 L 520 325 L 517 330 L 515 340 L 514 350 L 515 360 L 517 370 Z" 
                  fill="rgba(2, 48, 71, 0.3)"
                  stroke={currentColor}
                  strokeWidth="1.5"
                />
                <path 
                  d="M 530 440 L 533 430 L 535 420 L 536 410 L 535 400 L 533 395 L 530 400 L 528 410 L 527 420 L 528 430 Z" 
                  fill="rgba(2, 48, 71, 0.3)"
                  stroke={currentColor}
                  strokeWidth="1.5"
                />
              </g>
              
              <g opacity="0.7">
                <circle cx="75" cy="410" r="3" fill="rgba(2, 48, 71, 0.3)" stroke={currentColor} strokeWidth="1" />
                <circle cx="70" cy="425" r="2.5" fill="rgba(2, 48, 71, 0.3)" stroke={currentColor} strokeWidth="1" />
                <circle cx="68" cy="440" r="2" fill="rgba(2, 48, 71, 0.3)" stroke={currentColor} strokeWidth="1" />
              </g>
              
              <path 
                d="M 280 576 L 285 585 L 288 595 L 290 605 L 290 615 L 288 625 L 285 633 L 280 638 L 275 640 L 270 638 L 265 633 L 262 625 L 260 615 L 260 605 L 262 595 L 265 587 L 270 580 Z" 
                fill="rgba(2, 48, 71, 0.3)"
                stroke={currentColor}
                strokeWidth="2"
                opacity="0.8"
              />
            </g>

            <g opacity="0.3" stroke={currentColor} strokeWidth="1" fill="none" strokeDasharray="3,3">
              <line x1="245" y1="245" x2="400" y2="245" />
              <line x1="220" y1="320" x2="405" y2="320" />
              <line x1="230" y1="395" x2="410" y2="395" />
              <line x1="250" y1="470" x2="395" y2="470" />
              <line x1="280" y1="155" x2="350" y2="280" />
              <line x1="195" y1="200" x2="240" y2="350" />
              <line x1="300" y1="245" x2="300" y2="520" />
            </g>

            <g opacity="0.5" fill="#d3d3d3" fontSize="11" fontWeight="600">
              <text x="185" y="150" textAnchor="middle">J&K</text>
              <text x="215" y="210" textAnchor="middle">Punjab</text>
              <text x="250" y="280" textAnchor="middle">Rajasthan</text>
              <text x="320" y="200" textAnchor="middle">UP</text>
              <text x="380" y="280" textAnchor="middle">Bihar</text>
              <text x="450" y="340" textAnchor="middle">NE</text>
              <text x="300" y="350" textAnchor="middle">MP</text>
              <text x="250" y="430" textAnchor="middle">Gujarat</text>
              <text x="320" y="430" textAnchor="middle">Maharashtra</text>
              <text x="370" y="500" textAnchor="middle">AP</text>
              <text x="300" y="500" textAnchor="middle">Karnataka</text>
              <text x="270" y="600" textAnchor="middle">TN</text>
              <text x="240" y="560" textAnchor="middle">Kerala</text>
            </g>

            {currentData.map((point) => {
              const { x, y } = mapToScreen(point.lat, point.lng);
              const isHovered = hoveredPoint?.id === point.id;
              const size = Math.max(6, Math.min(35, (point.count / totalCount) * 250));
              
              return (
                <g key={point.id}>
                  <circle
                    cx={x}
                    cy={y}
                    r={size + 8}
                    fill={currentColor}
                    opacity="0.1"
                  />
                  
                  {isHovered && (
                    <circle
                      cx={x}
                      cy={y}
                      r={size + 15}
                      fill={currentColor}
                      opacity="0.2"
                    >
                      <animate
                        attributeName="r"
                        from={size + 5}
                        to={size + 25}
                        dur="1.5s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        from="0.4"
                        to="0"
                        dur="1.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                  
                  <circle
                    cx={x}
                    cy={y}
                    r={size}
                    fill={currentColor}
                    opacity={isHovered ? 0.95 : 0.75}
                    style={{ 
                      cursor: 'pointer',
                      filter: isHovered ? `drop-shadow(0 0 15px ${currentColor})` : `drop-shadow(0 2px 4px rgba(0,0,0,0.3))`,
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={() => setHoveredPoint(point)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                  
                  <circle
                    cx={x}
                    cy={y}
                    r={size / 2.5}
                    fill="#f6f6f6"
                    opacity={isHovered ? 0.6 : 0.4}
                    style={{ 
                      cursor: 'pointer',
                      pointerEvents: 'none',
                    }}
                  />
                  
                  <circle
                    cx={x}
                    cy={y}
                    r={2}
                    fill="#023047"
                    opacity={isHovered ? 0.8 : 0.5}
                    style={{ 
                      pointerEvents: 'none',
                    }}
                  />
                </g>
              );
            })}

            <g transform="translate(20, 650)">
              <text x="0" y="0" fill="#d3d3d3" fontSize="10" opacity="0.7">
                Bubble size represents volume
              </text>
              <circle cx="160" cy="-3" r="4" fill={currentColor} opacity="0.7" />
              <text x="170" y="0" fill="#d3d3d3" fontSize="9" opacity="0.7">Low</text>
              <circle cx="210" cy="-3" r="8" fill={currentColor} opacity="0.7" />
              <text x="225" y="0" fill="#d3d3d3" fontSize="9" opacity="0.7">Medium</text>
              <circle cx="280" cy="-3" r="14" fill={currentColor} opacity="0.7" />
              <text x="300" y="0" fill="#d3d3d3" fontSize="9" opacity="0.7">High</text>
            </g>
          </svg>

          {hoveredPoint && (
            <div
              className="absolute p-4 rounded-lg shadow-lg"
              style={{
                background: 'linear-gradient(135deg, rgba(2, 48, 71, 0.98) 0%, rgba(2, 48, 71, 0.95) 100%)',
                border: `2px solid ${currentColor}`,
                boxShadow: `0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px ${currentColor}40`,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                minWidth: '220px',
                pointerEvents: 'none',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ 
                    backgroundColor: currentColor,
                    boxShadow: `0 0 10px ${currentColor}`
                  }} 
                />
                <div style={{ color: currentColor, fontWeight: '700', fontSize: '1.25rem' }}>
                  {hoveredPoint.name}
                </div>
              </div>
              <div style={{ color: '#d3d3d3', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
                📍 {hoveredPoint.state}
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <div style={{ color: '#f6f6f6', fontSize: '2rem', fontWeight: '700' }}>
                  {hoveredPoint.count.toLocaleString()}
                </div>
                <div style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>
                  records
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 rounded-full" style={{ backgroundColor: 'rgba(111, 111, 111, 0.3)' }}>
                  <div 
                    className="h-full rounded-full" 
                    style={{ 
                      width: `${(hoveredPoint.count / totalCount) * 100}%`,
                      backgroundColor: currentColor,
                      boxShadow: `0 0 8px ${currentColor}`
                    }} 
                  />
                </div>
                <div style={{ color: currentColor, fontSize: '0.875rem', fontWeight: '600' }}>
                  {((hoveredPoint.count / totalCount) * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: currentColor, opacity: 0.7 }}
            />
            <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Low density</span>
          </div>
          <div className="flex items-center gap-2">
            <div 
              className="w-5 h-5 rounded-full"
              style={{ backgroundColor: currentColor, opacity: 0.7 }}
            />
            <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Medium density</span>
          </div>
          <div className="flex items-center gap-2">
            <div 
              className="w-7 h-7 rounded-full"
              style={{ backgroundColor: currentColor, opacity: 0.7 }}
            />
            <span style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>High density</span>
          </div>
        </div>
      </div>

      <div 
        className="p-6 rounded-lg"
        style={{
          background: 'linear-gradient(135deg, rgba(2, 48, 71, 0.4) 0%, rgba(2, 48, 71, 0.2) 100%)',
          border: '1px solid rgba(111, 111, 111, 0.3)',
        }}
      >
        <h2 style={{ color: '#f6f6f6', fontSize: '1.125rem', marginBottom: '1rem' }}>
          Top Locations by {categories.find(c => c.id === selectedCategory)?.label}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(111, 111, 111, 0.3)' }}>
                <th className="text-left p-3" style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Rank</th>
                <th className="text-left p-3" style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Location</th>
                <th className="text-left p-3" style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>State</th>
                <th className="text-right p-3" style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>Count</th>
                <th className="text-right p-3" style={{ color: '#d3d3d3', fontSize: '0.875rem' }}>% of Total</th>
              </tr>
            </thead>
            <tbody>
              {currentData
                .sort((a, b) => b.count - a.count)
                .slice(0, 10)
                .map((point, index) => (
                  <tr
                    key={point.id}
                    className="transition-colors"
                    style={{ borderBottom: '1px solid rgba(111, 111, 111, 0.1)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(111, 111, 111, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <td className="p-3">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ 
                          backgroundColor: index < 3 ? currentColor : 'rgba(111, 111, 111, 0.3)',
                          color: index < 3 ? '#023047' : '#f6f6f6',
                          fontWeight: '700',
                        }}
                      >
                        {index + 1}
                      </div>
                    </td>
                    <td className="p-3" style={{ color: '#f6f6f6' }}>{point.name}</td>
                    <td className="p-3" style={{ color: '#d3d3d3' }}>{point.state}</td>
                    <td className="p-3 text-right" style={{ color: currentColor, fontWeight: '700' }}>
                      {point.count.toLocaleString()}
                    </td>
                    <td className="p-3 text-right" style={{ color: '#d3d3d3' }}>
                      {((point.count / totalCount) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}