# BGV Screen Redesign - Implementation Guide

## Overview
The User BGV and Company BGV screens have been redesigned to follow this workflow:
1. **Pre-filled data** from sign up (read-only display)
2. **Manual verification** of each section using external sources
3. **Profile score calculation** based on verified sections
4. **Manual final verification** only when score reaches 100%

## Key Changes

### User BGV Screen Structure

#### 1. Profile Information (Pre-filled - Read Only)
```
- Full Name: John Michael Doe
- Email: john.doe@email.com
- Phone: +1 234 567 8900
- DOB: January 15, 1990
- Address: 123 Main St, New York
- Title: Senior Software Developer
```
Displayed in yellow-bordered card with "From Sign Up Data" badge

#### 2. Five Verification Sections

Each section includes:
- **Section Icon & Title** (e.g., Identity Verification)
- **Pre-filled Information** from user signup
- **External Verification Links**:
  - Government Portal
  - ID Verification API
  - LinkedIn Profile
  - etc.
- **Manual Checkbox**: "Mark [Section] as Verified"
- **Visual Status**: Green checkmark when verified, red X when not

**The 5 Sections:**
1. **Identity Verification** (20%)
   - Government ID uploaded
   - Verify from: Government Portal, ID Verification API
   
2. **Address Verification** (20%)
   - Address proof uploaded
   - Verify from: USPS, Google Maps
   
3. **Education Verification** (20%)
   - Degree details
   - Verify from: National Student Clearinghouse, University Portal
   
4. **Employment Verification** (20%)
   - Previous employer details
   - Verify from: LinkedIn, The Work Number, HR Contact
   
5. **Criminal Background Check** (20%)
   - Verify from: FBI Database, State Court Records, Background Check API

#### 3. Profile Score Sidebar (Right Side)

**Circular Progress**:
- Shows 0-100% score
- Updates automatically as sections are verified
- Color-coded:
  - Red (0-39%): Needs Verification
  - Yellow (40-59%): Partial Verification  
  - Light Green (60-79%): Good Verification Score
  - Bright Green/Yellow (80-100%): Fully Verified

**Score Breakdown**:
Shows 5 items with checkmark/X for each section

**Profile Score Impact**:
- Application Priority: High/Medium/Low
- Employer Trust: Excellent/Good/Fair
- Profile Visibility: +40%/+20%/+0%

**Final Verification Button**:
- ONLY enabled when score = 100%
- Yellow button: "Mark User as Verified" (with shield icon)
- When < 100%: Shows warning message "Complete all verification sections to mark as verified"

### Company BGV Screen Structure

Similar structure but with company-specific sections:

#### 1. Company Information (Pre-filled)
```
- Company Name
- Registration Number
- Tax ID/EIN
- Industry
- Year Established
- Registered Address
- Website
- Contact Person Details
```

#### 2. Six Verification Sections (16.67% each)

1. **Business Registration** (16.67%)
   - Certificate of Incorporation
   - Verify from: Business Registry, Companies House
   
2. **Tax Registration** (16.67%)
   - Tax documents
   - Verify from: IRS, State Tax Portal
   
3. **Business License** (16.67%)
   - Operating permits
   - Verify from: Local Authority, License Portal
   
4. **Address Verification** (16.67%)
   - Registered office
   - Verify from: Google Maps, USPS Business Verify
   
5. **Financial Standing** (16.67%)
   - Bank verification
   - Verify from: Dun & Bradstreet, Credit Bureau
   
6. **Background Check** (16.67%)
   - Company history
   - Verify from: BBB, Legal Records Database

#### 3. Company Profile Score Sidebar

Same structure as User BGV:
- Circular progress (0-100%)
- Score breakdown for 6 sections
- Impact on company visibility
- Final "Mark Company as Verified" button (only at 100%)

## Implementation Notes

### State Management
```typescript
const [verificationStatus, setVerificationStatus] = useState({
  identity: false,
  address: false,
  education: false,
  employment: false,
  criminal: false
});

const calculateScore = () => {
  const total = Object.keys(verificationStatus).length;
  const verified = Object.values(verificationStatus).filter(v => v).length;
  return Math.round((verified / total) * 100);
};

const profileScore = calculateScore();
```

### Visual States
- **Unverified**: Grey background, red X icon, grey border
- **Verified**: Yellow/green background, green checkmark, yellow border
- **Section Cards**: Highlight with yellow border when verified

### External Links
All verification source links should:
- Open in new tab
- Be styled as yellow buttons with arrow (→) icon
- Be clearly labeled with source name

### Data Flow
1. User/Company signs up → Data stored
2. Employee opens BGV screen → Pre-filled data displayed
3. Employee clicks external links → Verifies manually
4. Employee checks verification box → Score updates
5. When all sections verified (100%) → "Mark as Verified" button activates
6. Employee clicks final button → Profile gets "Verified" badge
7. Verified status shows on applications and increases visibility

## Color Scheme
- Background: #023047 (Dark Blue)
- Borders: #6f6f6f (Grey)
- Verified borders: #FFC300 (Yellow)
- Text: #f6f6f6 (White), #d3d3d3 (Light Grey), #6f6f6f (Dark Grey)
- Success: #FFC300 (Yellow)
- Warning: #ff6b6b (Red)

## User Experience
1. **Clear Progress**: Circular score indicator shows real-time progress
2. **Visual Feedback**: Each section clearly shows verified/unverified state
3. **External Resources**: Easy access to verification portals
4. **Manual Control**: Employee has full control over verification
5. **Score Impact**: Clear explanation of how score affects applications
6. **Final Gate**: Cannot mark as verified until 100% complete

## Benefits
- **Trust**: Employers see verification score on applications
- **Transparency**: Clear what has been verified
- **Control**: Manual verification ensures quality
- **Motivation**: Score system encourages complete verification
- **Applications**: Higher scores = better application visibility
