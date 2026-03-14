import React from 'react';
import { Eye, AlertTriangle, Ban, Trash2, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { User } from '../types';

interface UserTableProps {
  users: User[];
  onViewUser: (user: User) => void;
  onWarnUser?: (user: User) => void;
  onSuspendUser?: (user: User) => void;
  onDeleteUser?: (user: User) => void;
}

const getImageUrl = (path: string) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.replace('/api/v1', '') || '';
  return `${baseUrl}${path}`;
};

const getRoleBadgeClass = (role: string) => {
  const roles: Record<string, string> = {
    'Premium': 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-yellow-200',
    'user': 'bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200',
    'provider': 'bg-purple-100 text-purple-700 hover:bg-purple-100 border-purple-200'
  };
  return roles[role] || 'bg-gray-100 text-gray-700 hover:bg-gray-100 border-gray-200';
};

const getStatusBadgeClass = (status: string) => {
  const statuses: Record<string, string> = {
    'active': 'bg-green-100 text-green-700 hover:bg-green-100 border-green-200',
    'inactive': 'bg-gray-100 text-gray-700 hover:bg-gray-100 border-gray-200',
    'suspended': 'bg-red-100 text-red-700 hover:bg-red-100 border-red-200'
  };
  return statuses[status] || 'bg-gray-100 text-gray-700 hover:bg-gray-100 border-gray-200';
};

export const UserTable: React.FC<UserTableProps> = ({ 
  users, 
  onViewUser,
  onWarnUser,
  onSuspendUser,
  onDeleteUser
}) => {
  return (
    <Card className="py-0 shadow-sm overflow-hidden">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-gray-100">
                <th className="text-left px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider h-12">
                  User
                </th>
                <th className="text-left px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider h-12">
                  Role
                </th>
                <th className="text-left px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider h-12">
                  Status
                </th>
                <th className="text-left px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider h-12">
                  Join Date
                </th>
                <th className="text-left px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider h-12">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 h-16">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-9 h-9 border border-gray-100">
                        <AvatarImage src={getImageUrl(user.profile)} />
                        <AvatarFallback className="bg-emerald-50 text-emerald-600 text-sm font-medium">
                          {user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 h-16">
                    <Badge variant="secondary" className={`font-normal ${getRoleBadgeClass(user.activeRole)}`}>
                      {user.activeRole}
                    </Badge>
                  </td>
                  <td className="px-6 h-16">
                    <Badge variant="secondary" className={`font-normal ${getStatusBadgeClass(user.status)}`}>
                      {user.status}
                    </Badge>
                  </td>
                  <td className="px-6 text-sm text-gray-500 h-16">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 h-16">
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onViewUser(user)}
                        className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onWarnUser?.(user)} 
                        className="h-8 w-8 text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                        title="Warn User"
                      >
                        <AlertTriangle className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onSuspendUser?.(user)}
                        className={`h-8 w-8 ${user.status === 'active' ? 'text-orange-600 hover:text-orange-700 hover:bg-orange-50' : 'text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50'}`}
                        title={user.status === 'active' ? 'Suspend' : 'Activate'}
                      >
                        {user.status === 'active' ? <Ban className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDeleteUser?.(user)}
                        className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
