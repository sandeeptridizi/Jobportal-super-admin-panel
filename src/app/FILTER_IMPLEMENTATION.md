# Working Filters Implementation Guide

## Overview
This document outlines the comprehensive filter implementation across all major pages of the Job Portal Super Admin Panel.

---

## 1. Job Management ✅ (Implemented)

### Current Filters:
```typescript
const [filters, setFilters] = useState({
  type: 'all',         
  plan: 'all',          
  category: 'all',      
  location: 'all',      
  status: 'all'         
});
```

### Filter Logic:
```typescript
const filteredJobs = jobs.filter(job => {
  const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       job.location.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesType = filters.type === 'all' || job.type === filters.type;
  const matchesPlan = filters.plan === 'all' || job.plan === filters.plan;
  const matchesCategory = filters.category === 'all' || job.category === filters.category;
  const matchesLocation = filters.location === 'all' || job.location === filters.location;
  const matchesStatus = filters.status === 'all' || job.status === filters.status;
  return matchesSearch && matchesType && matchesPlan && matchesCategory && matchesLocation && matchesStatus;
});
```

### Filter Groups for Modal:
- **Job Type**: All (12) | Full-time (10) | Part-time (2)
- **Subscription Plan**: All (12) | Pro (5) | Quick Recruit (3) | Free (4)
- **Category**: Technology | Management | Design | Sales | Marketing | Finance | HR | Hospitality | Customer Service
- **Location**: All unique locations from data
- **Status**: All | Active | Pending | Closed

---

## 2. Internship Hub

### Required Filters:
```typescript
const [filters, setFilters] = useState({
  duration: 'all',      
  department: 'all',    
  status: 'all',        
  plan: 'all',          
  location: 'all',      
  stipend: 'all'        
});
```

### Data Points to Extract:
- Unique departments from internships
- Unique locations
- Duration ranges
- Stipend types

---

## 3. Freelance Gigs

### Required Filters:
```typescript
const [filters, setFilters] = useState({
  category: 'all',      
  budget: 'all',        
  status: 'all',        
  duration: 'all',      
  skillLevel: 'all',    
  location: 'all'       
});
```

### Budget Ranges:
- Based on actual gig budgets in data
- Group into ranges: $0-$500, $500-$1000, $1000-$5000, $5000+

---

## 4. Companies ✅ (Needs FilterModal Integration)

### Required Filters:
```typescript
const [filters, setFilters] = useState({
  industry: 'all',      
  plan: 'all',          
  location: 'all',      
  status: 'all',        
  verified: 'all',      
  isPro: 'all',         
  size: 'all'           
});
```

### Filter Groups:
- **Industry**: Extract unique from companies.industry
- **Plan**: Pro | Quick Recruit | Complete Recruit | Free
- **Location**: Extract unique from companies.location
- **Status**: Active | Pending | Suspended
- **Verified**: Yes (BGV completed) | No
- **Pro Status**: Yes (paid) | No
- **Company Size**: Small (10-50) | Medium (50-500) | Large (500+)

---

## 5. User Management

### Required Filters:
```typescript
const [filters, setFilters] = useState({
  plan: 'all',          
  location: 'all',      
  status: 'all',        
  verified: 'all',      
  isPro: 'all',         
  skills: 'all',        
  experience: 'all',    
  dateRange: 'all'      
});
```

### Data Extraction:
```typescript
const uniqueLocations = [...new Set(users.map(u => u.location))];
const uniqueSkills = [...new Set(users.flatMap(u => u.skills || []))];

const counts = {
  plan: {
    'Elite Plan': users.filter(u => u.plan === 'Elite Plan').length,
    'Pro Plan': users.filter(u => u.plan === 'Pro Plan').length,
    'Free': users.filter(u => u.plan === 'Free').length
  },
  verified: {
    true: users.filter(u => u.verified).length,
    false: users.filter(u => !u.verified).length
  }
};
```

---

## 6. Cold Leads

### Required Filters:
```typescript
const [filters, setFilters] = useState({
  status: 'all',        
  source: 'all',        
  assignedTo: 'all',    
  location: 'all',      
  industry: 'all'       
});
```

### Filter Logic:
```typescript
const filteredUsers = coldUsers.filter(user => {
  return (filters.status === 'all' || user.status === filters.status) &&
         (filters.source === 'all' || user.source === filters.source) &&
         (filters.assignedTo === 'all' || user.assignedTo === filters.assignedTo || (filters.assignedTo === 'unassigned' && !user.assignedTo)) &&
         (filters.location === 'all' || user.location.includes(filters.location));
});

const filteredCompanies = coldCompanies.filter(company => {
  return (filters.status === 'all' || company.status === filters.status) &&
         (filters.source === 'all' || company.source === filters.source) &&
         (filters.assignedTo === 'all' || company.assignedTo === filters.assignedTo || (filters.assignedTo === 'unassigned' && !company.assignedTo)) &&
         (filters.location === 'all' || company.location.includes(filters.location)) &&
         (filters.industry === 'all' || company.industry === filters.industry);
});
```

---

## 7. Income Section

### Revenue Analytics Tab Filters:
```typescript
const [filters, setFilters] = useState({
  timeRange: '30days',  
  planType: 'all',      
  paymentStatus: 'all'  
});
```

### Update Plans Tab Filters:
```typescript
const [filters, setFilters] = useState({
  customerType: 'all',  
  currentPlan: 'all',   
  status: 'all',        
  nextRenewal: 'all'    
});
```

---

## 8. Employees

### Required Filters:
```typescript
const [filters, setFilters] = useState({
  department: 'all',    
  role: 'all',          
  status: 'all',        
  accessLevel: 'all'    
});
```

---

## 9. Reports Section

### Jobs Report Filters:
```typescript
const [filters, setFilters] = useState({
  category: 'all',
  type: 'all',          
  status: 'all',
  dateRange: '30days',  
  plan: 'all'
});
```

### Internship Hub Report Filters:
```typescript
const [filters, setFilters] = useState({
  department: 'all',
  duration: 'all',
  status: 'all',
  dateRange: '30days'
});
```

### Freelance Gigs Report Filters:
```typescript
const [filters, setFilters] = useState({
  category: 'all',
  budget: 'all',
  status: 'all',
  skillLevel: 'all',
  dateRange: '30days'
});
```

### Companies Report Filters:
```typescript
const [filters, setFilters] = useState({
  industry: 'all',
  plan: 'all',
  size: 'all',
  verified: 'all',
  dateRange: '30days'
});
```

### User Management Report Filters:
```typescript
const [filters, setFilters] = useState({
  plan: 'all',
  verified: 'all',
  experience: 'all',
  dateRange: '30days'
});
```

---

## Implementation Pattern

### Step 1: Extract Unique Values
```typescript
const extractFilterOptions = (data: any[], field: string) => {
  const unique = [...new Set(data.map(item => item[field]))];
  return unique.map(value => ({
    label: value,
    value: value,
    count: data.filter(item => item[field] === value).length
  }));
};
```

### Step 2: Create Filter Groups
```typescript
const createFilterGroups = () => {
  return [
    {
      id: 'status',
      label: 'Status',
      options: [
        { label: 'All', value: 'all', count: data.length },
        ...extractFilterOptions(data, 'status')
      ]
    },
    {
      id: 'location',
      label: 'Location',
      options: [
        { label: 'All', value: 'all', count: data.length },
        ...extractFilterOptions(data, 'location')
      ]
    }
  ];
};
```

### Step 3: Apply Filters
```typescript
const applyFilters = (data: any[], filters: Record<string, string>) => {
  return data.filter(item => {
    return Object.entries(filters).every(([key, value]) => {
      if (value === 'all') return true;
      return item[key] === value;
    });
  });
};
```

### Step 4: Handle Filter Changes
```typescript
const handleFilterChange = (filterId: string, value: string) => {
  setFilters(prev => ({
    ...prev,
    [filterId]: value
  }));
};

const handleResetFilters = () => {
  setFilters({
    type: 'all',
    plan: 'all',
    category: 'all',
    location: 'all',
    status: 'all'
  });
};
```

---

## FilterModal Integration

### Usage Example:
```tsx
import { FilterModal } from './FilterModal';

const [showFilterModal, setShowFilterModal] = useState(false);

const filterGroups = [
  {
    id: 'status',
    label: 'Status',
    options: [
      { label: 'All', value: 'all', count: jobs.length },
      { label: 'Active', value: 'active', count: jobs.filter(j => j.status === 'active').length },
      { label: 'Pending', value: 'pending', count: jobs.filter(j => j.status === 'pending').length },
      { label: 'Closed', value: 'closed', count: jobs.filter(j => j.status === 'closed').length }
    ]
  },
];

<button onClick={() => setShowFilterModal(true)}>
  <Filter /> Filters
</button>

<FilterModal
  isOpen={showFilterModal}
  onClose={() => setShowFilterModal(false)}
  filterGroups={filterGroups}
  activeFilters={filters}
  onFilterChange={handleFilterChange}
  onReset={handleResetFilters}
/>
```

---

## UI Features

### Filter Button States:
- **Active Filter**: Yellow background (#FFC300), Black text
- **Inactive Filter**: Dark background (#1a1a1a), White text
- **Hover**: Border color changes to yellow
- **Count Badge**: Shows number of items for each option

### Filter Persistence:
- Filters remain active when switching tabs
- Filters combine with search functionality (AND logic)
- Reset button clears all filters at once
- Active filters shown with visual indicator

### Performance Optimization:
```typescript
const filterOptions = useMemo(() => {
  return extractFilterOptions(data, 'status');
}, [data]);

const filteredData = useMemo(() => {
  return applyFilters(data, filters);
}, [data, filters]);
```

---

## Testing Checklist

- [ ] Filters work independently
- [ ] Filters combine correctly (AND logic)
- [ ] Search + Filters work together
- [ ] Counts update correctly
- [ ] Reset clears all filters
- [ ] Filter state persists across tab switches
- [ ] Mobile responsive
- [ ] Performance with large datasets
- [ ] Empty state shows when no results

---

## Next Steps

1. Implement FilterModal in remaining pages
2. Add date range picker for time-based filters
3. Add multi-select filters (e.g., multiple skills)
4. Add filter presets (e.g., "Hot Jobs", "New Companies")
5. Add "Save Filter" functionality
6. Add export filtered data feature

