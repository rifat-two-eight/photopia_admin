"use client"
import React, { useState, useEffect } from 'react';
import { StatsCards } from './components/StatsCards';
import { UserFilters } from './components/UserFilters';
import { UserTable } from './components/UserTable';
import { UserPagination } from './components/UserPagination';
import { UserDetail } from './components/UserDetail';
import { User, Stat, UserStatsResponse, UsersResponse, UserDetailStatsResponse, UserDetailStats } from './types';
import axiosInstance from '@/lib/axios';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserDetailStats | null>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  const [filters, setFilters] = useState({
    role: 'all',
    status: 'all'
  });
  const [userStats, setUserStats] = useState<Stat[]>([
    { label: 'Total Users', value: '...' },
    { label: 'Providers', value: '...' },
    { label: 'Active This Month', value: '...' },
    { label: 'Suspended', value: '...', highlight: true }
  ]);

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    fetchUserStats();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [currentPage, debouncedSearch, filters]);

  const fetchUserStats = async () => {
    try {
      const response = await axiosInstance.get<UserStatsResponse>('/dashboard/user-stats');
      if (response.data.success) {
        const { totalUsers, providers, activeThisMonth, suspended } = response.data.data;
        setUserStats([
          { label: 'Total Users', value: totalUsers.toLocaleString() },
          { label: 'Providers', value: providers.toLocaleString() },
          { label: 'Active This Month', value: activeThisMonth.toLocaleString() },
          { label: 'Suspended', value: suspended.toLocaleString(), highlight: true }
        ]);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch user stats");
    }
  };

  const fetchUsers = async () => {
    try {
      setIsLoadingUsers(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        searchTerm: debouncedSearch,
      });
      if (filters.role !== 'all') params.append('role', filters.role);
      if (filters.status !== 'all') params.append('status', filters.status);

      const response = await axiosInstance.get<UsersResponse>(`/users?${params.toString()}`);
      if (response.data.success) {
        setUsers(response.data.data);
        setTotalPages(response.data.meta.totalPages);
        setTotalItems(response.data.meta.total);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch users");
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const fetchUserDetails = async (user: User | { id: string }) => {
    try {
      setIsLoadingDetails(true);
      const userId = 'id' in user ? user.id : user._id;
      const response = await axiosInstance.get<UserDetailStatsResponse>(`/dashboard/user-details/${userId}`);
      if (response.data.success) {
        setSelectedUser(response.data.data);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch user details");
    } finally {
      setIsLoadingDetails(false);
    }
  };

  const handleWarnUser = async (user: User | UserDetailStats) => {
    const isStatsType = 'user' in user;
    const userName = isStatsType ? user.user.name : user.name;
    const userId = isStatsType ? user.user.id : user._id;

    const { value: message } = await Swal.fire({
      title: `Warn ${userName}`,
      input: 'textarea',
      inputLabel: 'Warning Message',
      inputPlaceholder: 'Type your warning message here...',
      inputAttributes: {
        'aria-label': 'Type your warning message here'
      },
      showCancelButton: true,
      confirmButtonText: 'Send Warning',
      confirmButtonColor: '#D08700',
      cancelButtonColor: '#6B7280',
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!'
        }
      }
    });

    if (message) {
      try {
        const response = await axiosInstance.post('/dashboard/warn-user', {
          userId,
          message: message
        });
        if (response.data.success) {
          Swal.fire({
            title: 'Success!',
            text: response.data.message || "Warning sent successfully",
            icon: 'success',
            confirmButtonColor: '#1E1E1E'
          });
          // If we are in detail view, refresh it
          if (selectedUser) fetchUserDetails({ id: userId });
        }
      } catch (error: any) {
        Swal.fire({
          title: 'Error!',
          text: error.response?.data?.message || "Failed to send warning",
          icon: 'error',
          confirmButtonColor: '#1E1E1E'
        });
      }
    }
  };

  const handleSuspendUser = async (user: User | UserDetailStats) => {
    const isStatsType = 'user' in user;
    const userName = isStatsType ? user.user.name : user.name;
    const userId = isStatsType ? user.user.id : user._id;
    const status = isStatsType ? user.user.status : user.status;

    const isActive = status === 'active';
    const actionText = isActive ? 'suspend' : 'activate';
    const confirmButtonColor = isActive ? '#F54900' : '#10B981';

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You are about to ${actionText} ${userName}'s account.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: confirmButtonColor,
      cancelButtonColor: '#6B7280',
      confirmButtonText: `Yes, ${actionText} it!`
    });

    if (result.isConfirmed) {
      try {
        const response = await axiosInstance.patch(`/dashboard/user-status/${userId}`);
        if (response.data.success) {
          Swal.fire({
            title: 'Updated!',
            text: response.data.message || `User ${actionText}ed successfully`,
            icon: 'success',
            confirmButtonColor: '#1E1E1E'
          });
          fetchUsers();
          fetchUserStats();
          if (selectedUser) {
            fetchUserDetails({ id: userId });
          }
        }
      } catch (error: any) {
        Swal.fire({
          title: 'Error!',
          text: error.response?.data?.message || `Failed to ${actionText} user`,
          icon: 'error',
          confirmButtonColor: '#1E1E1E'
        });
      }
    }
  };

  const handleDeleteUser = async (user: User | UserDetailStats) => {
    const isStatsType = 'user' in user;
    const userName = isStatsType ? user.user.name : user.name;
    const userId = isStatsType ? user.user.id : user._id;

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete ${userName}. This action cannot be undone!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#E7000B',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        const response = await axiosInstance.delete(`/user/${userId}`);
        if (response.data.success) {
          Swal.fire({
            title: 'Deleted!',
            text: response.data.message || "User deleted successfully",
            icon: 'success',
            confirmButtonColor: '#1E1E1E'
          });
          fetchUsers();
          fetchUserStats();
          if (selectedUser) setSelectedUser(null);
        }
      } catch (error: any) {
        Swal.fire({
          title: 'Error!',
          text: error.response?.data?.message || "Failed to delete user",
          icon: 'error',
          confirmButtonColor: '#1E1E1E'
        });
      }
    }
  };

  if (isLoadingDetails) {
    return (
      <div className="h-[400px] flex items-center justify-center bg-white rounded-xl shadow-md">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading user details...</p>
        </div>
      </div>
    );
  }

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

      <StatsCards stats={userStats} />

      <div className="space-y-4">
        <UserFilters
          searchQuery={searchQuery}
          onSearchChange={(val) => {
            setSearchQuery(val);
            setCurrentPage(1);
          }}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(!showFilters)}
          filters={filters}
          onFilterChange={(newFilters) => {
            setFilters(newFilters);
            setCurrentPage(1);
          }}
        />

        {isLoadingUsers ? (
          <div className="p-8 text-center text-gray-500">Loading users...</div>
        ) : (
          <UserTable
            users={users}
            onViewUser={fetchUserDetails}
            onWarnUser={handleWarnUser}
            onSuspendUser={handleSuspendUser}
            onDeleteUser={handleDeleteUser}
          />
        )}

        <UserPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={10}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default UserManagement;
