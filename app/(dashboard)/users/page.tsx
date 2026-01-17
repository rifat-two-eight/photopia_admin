"use client"
import React, { useState } from 'react';
import { StatsCards } from './components/StatsCards';
import { UserFilters } from './components/UserFilters';
import { UserTable } from './components/UserTable';
import { UserPagination } from './components/UserPagination';
import { UserDetail } from './components/UserDetail';
import { User, Stat } from './types';

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    role: 'all',
    status: 'all'
  });

  const stats: Stat[] = [
    { label: 'Total Users', value: '2,847' },
    { label: 'Providers', value: '810' },
    { label: 'Active This Month', value: '2,341' },
    { label: 'Suspended', value: '12', highlight: true }
  ];

  const users: User[] = [
    {
      id: 1,
      name: 'Lisa Anderson',
      email: 'lisa.a@example.com',
      role: 'Premium',
      roleColor: 'yellow',
      status: 'Active',
      statusColor: 'green',
      joinDate: '2024-11-01',
      activity: '30 minutes ago',
      phone: '+33 6 12 34 56 78',
      location: 'Paris, France',
      totalRevenue: '€12,450',
      completedJobs: 47,
      avgRating: 4.8,
      responseTime: '2.3 hours',
      activityHistory: [
        { type: 'Profile updated', detail: 'Changed profile picture', date: '2024-12-20 14:30' },
        { type: 'Payment received', detail: '€249.00 for wedding photography', date: '2024-12-18 09:15' },
        { type: 'New booking', detail: 'Wedding photography service', date: '2024-12-15 16:45' },
        { type: 'Profile created', detail: 'Account registration', date: '2024-11-01' }
      ],
      recentPayments: [
        { service: 'Wedding Photography', date: '2024-12-18', amount: '€249.00' },
        { service: 'Portrait Session', date: '2024-12-05', amount: '€120.00' },
        { service: 'Event Coverage', date: '2024-11-29', amount: '€380.00' }
      ]
    },
    {
      id: 2,
      name: 'Sophie Martin',
      email: 'sophie.m@example.com',
      role: 'User',
      roleColor: 'blue',
      status: 'Active',
      statusColor: 'green',
      joinDate: '2024-10-18',
      activity: '3 hours ago'
    },
    {
      id: 3,
      name: 'Robert Taylor',
      email: 'robert.t@example.com',
      role: 'User',
      roleColor: 'blue',
      status: 'Active',
      statusColor: 'green',
      joinDate: '2024-09-28',
      activity: '1 hour ago'
    },
    {
      id: 4,
      name: 'Emma Wilson',
      email: 'emma.w@example.com',
      role: 'User',
      roleColor: 'blue',
      status: 'Active',
      statusColor: 'green',
      joinDate: '2024-09-10',
      activity: '5 minutes ago'
    },
    {
      id: 5,
      name: 'Michael Chen',
      email: 'michael.c@example.com',
      role: 'Premium',
      roleColor: 'yellow',
      status: 'Active',
      statusColor: 'green',
      joinDate: '2024-08-22',
      activity: '1 day ago'
    },
    {
      id: 6,
      name: 'James Rodriguez',
      email: 'james.r@example.com',
      role: 'Provider',
      roleColor: 'purple',
      status: 'Inactive',
      statusColor: 'gray',
      joinDate: '2024-07-05',
      activity: '2 weeks ago'
    },
    {
      id: 7,
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      role: 'Provider',
      roleColor: 'purple',
      status: 'Active',
      statusColor: 'green',
      joinDate: '2024-06-15',
      activity: '2 hours ago'
    },
    {
      id: 8,
      name: 'David Kim',
      email: 'david.k@example.com',
      role: 'Provider',
      roleColor: 'purple',
      status: 'Suspended',
      statusColor: 'red',
      joinDate: '2024-05-20',
      activity: '1 month ago'
    }
  ];

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filters.role === 'all' || user.role === filters.role;
    const matchesStatus = filters.status === 'all' || user.status === filters.status;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleWarnUser = (user: User) => {
    console.log('Warn user:', user.name);
  };

  const handleSuspendUser = (user: User) => {
    console.log('Suspend user:', user.name);
  };

  const handleDeleteUser = (user: User) => {
    console.log('Delete user:', user.name);
  };

  if (selectedUser) {
    return (
      <UserDetail 
        user={selectedUser} 
        onBack={() => setSelectedUser(null)}
        onWarn={() => handleWarnUser(selectedUser)}
        onSuspend={() => handleSuspendUser(selectedUser)}
        onDelete={() => handleDeleteUser(selectedUser)}
      />
    );
  }

  return (
    <div className="space-y-6 bg-white -my-3 p-5 lg:p-10 rounded-xl shadow-md">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 -mt-4">User Management</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage and monitor all users on your platform
        </p>
      </div>

      <StatsCards stats={stats} />

      <div className="space-y-4">
        <UserFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(!showFilters)}
          filters={filters}
          onFilterChange={setFilters}
        />

        <UserTable 
          users={filteredUsers} 
          onViewUser={setSelectedUser}
          onWarnUser={handleWarnUser}
          onSuspendUser={handleSuspendUser}
          onDeleteUser={handleDeleteUser}
        />

        <UserPagination 
          currentPage={currentPage}
          totalPages={3}
          totalItems={filteredUsers.length}
          itemsPerPage={10}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default UserManagement;