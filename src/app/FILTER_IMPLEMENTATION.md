# Working Filters Implementation Guide

## Overview
This document outlines the comprehensive filter implementation across all major pages of the Job Portal Super Admin Panel.

---

## 1. Job Management ✅ (Implemented)

### Current Filters:
```typescript
const [filters, setFilters] = useState({
  type: 'all',          // Full-time | Part-time
  plan: 'all',          // Pro | Quick Recruit | Free
  category: 'all',      // Technology | Management | Design | Sales | Marketing | Finance | HR | Hospitality | Customer Service
  location: 'all',      // Extracted from data (New York, San Francisco, Boston, Austin, Chicago, Seattle, Remote)
  status: 'all'         // active | pending | closed
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
  duration: 'all',      // 1-3 months | 3-6 months | 6+ months
  department: 'all',    // Engineering | Design | Marketing | Sales | HR | Operations | Finance
  status: 'all',        // active | pending | closed
  plan: 'all',          // Pro | Quick Recruit | Free
  location: 'all',      // Extracted from data
  stipend: 'all'        // Paid | Unpaid | Performance-based
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
  category: 'all',      // Web Development | Mobile Development | Design | Content Writing | Marketing | Video Editing | Data Entry
  budget: 'all',        // $0-$500 | $500-$1000 | $1000-$5000 | $5000+
  status: 'all',        // open | in-progress | completed | cancelled
  duration: 'all',      // Less than 1 week | 1-2 weeks | 2-4 weeks | 1-3 months | 3+ months
  skillLevel: 'all',    // beginner | intermediate | expert
  location: 'all'       // Remote | On-site | Hybrid
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
  industry: 'all',      // Technology | Healthcare | Finance | Design | Data & Analytics | Manufacturing | Retail | Consulting
  plan: 'all',          // Pro | Quick Recruit | Complete Recruit | Free
  location: 'all',      // Extracted unique locations
  status: 'all',        // active | pending | suspended
  verified: 'all',      // true | false
  isPro: 'all',         // true | false
  size: 'all'           // Small | Medium | Large
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
  plan: 'all',          // Free | Elite Plan (₹99) | Pro Plan (₹199)
  location: 'all',      // Extracted from data
  status: 'all',        // active | inactive | suspended
  verified: 'all',      // true | false (BGV completed)
  isPro: 'all',         // true | false (paid user)
  skills: 'all',        // React | Node.js | Python | Java | etc.
  experience: 'all',    // 0-2 years | 2-5 years | 5-10 years | 10+ years
  dateRange: 'all'      // Last 7 days | Last 30 days | Last 90 days | All time
});
```

### Data Extraction:
```typescript
// Extract unique values
const uniqueLocations = [...new Set(users.map(u => u.location))];
const uniqueSkills = [...new Set(users.flatMap(u => u.skills || []))];

// Count per filter
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
  status: 'all',        // new | contacted | interested | not-interested
  source: 'all',        // LinkedIn | Indeed | Referral | Job Fair | Website | Cold Outreach | Conference | Partnership
  assignedTo: 'all',    // Employee names | Unassigned
  location: 'all',      // Extracted from data
  industry: 'all'       // For companies only
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
  timeRange: '30days',  // 7days | 30days | 90days | 1year | all
  planType: 'all',      // Companies | Users | Freelancers | All
  paymentStatus: 'all'  // completed | pending | failed
});
```

### Update Plans Tab Filters:
```typescript
const [filters, setFilters] = useState({
  customerType: 'all',  // company | user | freelancer
  currentPlan: 'all',   // All plan types
  status: 'all',        // active | expired | cancelled
  nextRenewal: 'all'    // This week | This month | Next 3 months | Later
});
```

---

## 8. Employees

### Required Filters:
```typescript
const [filters, setFilters] = useState({
  department: 'all',    // Sales | Marketing | Operations | HR | IT | Finance | Customer Support
  role: 'all',          // Extracted from data
  status: 'all',        // active | on-leave | inactive
  accessLevel: 'all'    // admin | manager | employee
});
```

---

## 9. Reports Section

### Jobs Report Filters:
```typescript
const [filters, setFilters] = useState({
  category: 'all',
  type: 'all',          // Full-time | Part-time
  status: 'all',
  dateRange: '30days',  // 7days | 30days | 90days | custom
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

// In component:
const [showFilterModal, setShowFilterModal] = useState(false);

// Create filter groups
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
  // ... more filter groups
];

// In JSX:
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
// Memoize filter options
const filterOptions = useMemo(() => {
  return extractFilterOptions(data, 'status');
}, [data]);

// Memoize filtered data
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

