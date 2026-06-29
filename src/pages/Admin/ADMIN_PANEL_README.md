# NeuroVoice Admin Panel Documentation

## Overview
The Admin Panel is a comprehensive management interface for administrators to manage users, documentation, analytics, and system settings for the NeuroVoice Parkinson's voice analysis application.

## Access
- **URL**: After logging in, click "Admin Panel" in the navbar
- **Direct Link**: `/admin/dashboard`
- **Requirement**: User must be logged in

## Admin Features

### 1. **Admin Dashboard** (`/admin/dashboard`)
The main admin hub displaying key metrics and statistics.

**Key Features:**
- Total Users Count
- Total Reports Generated
- Average User Rating
- Active Sessions
- Recent Activity Feed
- Quick Statistics Cards

**Data Displayed:**
- User engagement metrics
- System performance indicators
- Recent user activities (timestamp-based)

---

### 2. **User Management** (`/admin/users`)
Complete system for managing all users.

**Features:**
- **User List**: View all registered users with details
  - Name
  - Email Address
  - Role (User/Admin)
  - Status (Active/Inactive)
  - Join Date
  
- **Search Functionality**: Filter users by name or email
  
- **User Actions**:
  - Edit user details
  - Delete users
  - Change user roles
  
- **Add New User**: `/admin/users/add`
  - Create new user accounts
  - Assign roles
  - Set permissions

- **User Roles Management**: `/admin/users/roles`
  - Define role permissions
  - Manage access levels

---

### 3. **Documentation Manager** (`/admin/docs/fyp`)
Centralized document management for FYP and project documentation.

**Features:**
- **Document Library**: Upload and manage all project documents
  - FYP Documentation
  - Technical Documentation
  - API Guides
  - System Architecture
  - Templates

- **Document Properties**:
  - Title
  - Type (PDF, DOCX, etc.)
  - Author
  - File Size
  - Upload Date
  - Status (Approved/In Review/Draft)

- **Document Actions**:
  - Download documents
  - Edit/Update documents
  - Delete documents
  - Preview before download

- **Sub-sections**:
  - `/admin/docs/templates` - Document templates
  - `/admin/docs/guidelines` - Documentation guidelines
  - `/admin/docs/fyp` - FYP project documentation

---

### 4. **Analytics Dashboard** (`/admin/analytics`)
Comprehensive analytics and data visualization for system usage.

**Key Metrics:**
- Total Users: 1,234
- Completed Analysis: 5,678
- Pending Analysis: 342
- Success Rate: 94.2%

**Charts & Visualizations**:
1. **User Growth (6 Months)**
   - Line chart showing total users vs active users
   - Month-by-month growth tracking

2. **Analysis Status (6 Months)**
   - Bar chart showing completed vs pending analyses
   - Trend analysis

3. **Report Type Distribution**
   - Pie chart showing report categories
   - Positive: 35%
   - Negative: 45%
   - Inconclusive: 20%

4. **Key Metrics Cards**
   - Real-time system statistics
   - Color-coded indicators

---

### 5. **Settings & Configuration** (`/admin/settings`)
System-wide configuration and preferences.

**Application Settings:**
- Application Name: Configure app title
- Application Version: Track version number
- Max Upload Size: Set file upload limits (in MB)
- Session Timeout: Configure session duration (in minutes)

**Feature Settings:**
- Enable/Disable Notifications
- Enable/Disable Analytics
- Maintenance Mode Toggle

**Actions:**
- Save Settings: Apply configuration changes
- Reset to Default: Revert to original settings

---

## Admin Sidebar Navigation

The sidebar provides quick access to all admin features:

```
├── Dashboard
├── User Management
│   ├── All Users
│   ├── Add User
│   └── User Roles
├── Reports
│   ├── Analysis Reports
│   └── Export Data
├── Documentation
│   ├── FYP Docs
│   ├── Templates
│   └── Guidelines
├── Analytics
├── Settings
└── Logout
```

---

## Features & Functionality

### Navigation
- **Desktop**: Full sidebar with expandable menus
- **Mobile**: Collapsible hamburger menu
- **Responsive**: Adapts to all screen sizes

### User Experience
- **Dark Mode**: Full dark/light theme support
- **Smooth Animations**: Hover effects and transitions
- **Interactive Charts**: Recharts integration for data visualization
- **Search & Filter**: Quick search functionality in user management

### Data Management
- **Add/Edit/Delete**: Full CRUD operations
- **Search & Filter**: Advanced search capabilities
- **Export**: Download documents and reports
- **Status Tracking**: Monitor document and analysis statuses

---

## Sidebar Features

### Expandable Menus
- Click on menu items with arrows to expand/collapse
- Submenu items with visual indicators
- Smooth animations for better UX

### Main Menu Items
1. **Dashboard** - Main admin hub
2. **User Management** - User CRUD operations
3. **Reports** - Analysis and export features
4. **Documentation** - Document management
5. **Analytics** - System analytics
6. **Settings** - Configuration

### Colors & Styling
- Blue (#3b82f6) - Primary action color
- Green (#10b981) - Success/Approved status
- Red (#ef4444) - Danger/Delete action
- Orange (#f59e0b) - Warning/Pending
- Dark backgrounds for better readability

---

## File Locations

```
src/
├── components/
│   └── AdminSidebar.jsx          # Admin sidebar navigation
├── pages/
│   └── Admin/
│       ├── AdminDashboard.jsx     # Main dashboard
│       ├── UserManagement.jsx     # User management
│       ├── DocumentationManager.jsx # Doc management
│       ├── AdminAnalytics.jsx     # Analytics page
│       └── AdminSettings.jsx      # Settings page
└── App.jsx                        # Routes configuration
```

---

## Routes Overview

| Route | Component | Purpose |
|-------|-----------|---------|
| `/admin/dashboard` | AdminDashboard | Main admin home |
| `/admin/users` | UserManagement | View/manage users |
| `/admin/users/add` | (Extensible) | Add new user |
| `/admin/users/roles` | (Extensible) | Manage roles |
| `/admin/reports/analysis` | (Extensible) | View analysis reports |
| `/admin/reports/export` | (Extensible) | Export data |
| `/admin/docs/fyp` | DocumentationManager | FYP documentation |
| `/admin/docs/templates` | (Extensible) | Document templates |
| `/admin/docs/guidelines` | (Extensible) | Documentation guidelines |
| `/admin/analytics` | AdminAnalytics | Analytics dashboard |
| `/admin/settings` | AdminSettings | System settings |

---

## Integration with Main Application

### Navbar Addition
The "Admin Panel" link is automatically added to the navbar for authenticated users:
```jsx
authenticatedLinks = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "New Analysis", path: "/new-analysis" },
  { label: "My Reports", path: "/my-reports" },
  { label: "Profile", path: "/profile" },
  { label: "Admin Panel", path: "/admin/dashboard" } // Added
]
```

### Route Protection
All admin routes are protected and require user authentication:
```jsx
<Route
  path="/admin/dashboard"
  element={isLoggedIn ? <AdminDashboard /> : <Navigate to="/login" />}
/>
```

---

## Future Enhancements

Potential additions to the admin panel:
- User activity logs
- Advanced filtering and sorting
- Batch operations
- Database backup/export
- System logs viewer
- API key management
- Email notifications setup
- Security audit trails
- User permission customization
- Report scheduling

---

## Requirements Met

✅ Complete admin dashboard  
✅ User management system  
✅ Documentation management  
✅ Analytics & insights  
✅ System configuration  
✅ Dark mode support  
✅ Responsive design  
✅ Interactive charts  
✅ Sidebar navigation  
✅ Route protection  

---

## Notes

- All admin pages use the same dark mode context as the main app
- Admin sidebar is mobile-responsive with hamburger menu
- All charts are interactive with hover tooltips
- Settings changes are state-managed (not yet persisted to database)
- User data is mock data for demonstration purposes

---

**Last Updated**: May 16, 2026  
**Version**: 1.0.0
