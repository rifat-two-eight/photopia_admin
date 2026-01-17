import React from 'react';
import { 
  X, AlertTriangle, Ban, Phone, MapPin, Calendar, Star, ArrowLeft, Trash2
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User } from '../types';

interface UserDetailProps {
  user: User;
  onBack: () => void;
  onWarn?: () => void;
  onSuspend?: () => void;
  onDelete?: () => void;
}

export const UserDetail: React.FC<UserDetailProps> = ({ 
  user, 
  onBack,
  onWarn,
  onSuspend,
  onDelete
}) => {
  const getStatusBadgeClass = (color: string) => {
    const colors: Record<string, string> = {
      green: 'bg-green-100 text-green-700 hover:bg-green-100 border-green-200',
      gray: 'bg-gray-100 text-gray-700 hover:bg-gray-100 border-gray-200',
      red: 'bg-red-100 text-red-700 hover:bg-red-100 border-red-200'
    };
    return colors[color] || '';
  };

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        className="mb-4 -ml-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        onClick={onBack}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to User Management
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - User Info */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <Avatar className="w-24 h-24 mb-4 border-2 border-white shadow-sm">
                <AvatarFallback className="bg-emerald-50 text-emerald-600 text-2xl font-semibold">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-sm text-gray-500 mb-4">{user.email}</p>
              <Badge variant="secondary" className={`font-normal px-4 py-1 ${getStatusBadgeClass(user.statusColor)}`}>
                {user.status}
              </Badge>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Phone className="w-4 h-4 text-gray-400" />
                <span>{user.phone || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>{user.location || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>Joined {user.joinDate}</span>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <Button 
                variant="default" 
                className="w-full bg-[#D08700] hover:bg-amber-600 text-white border-0"
                onClick={onWarn}
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Warn User
              </Button>
              <Button 
                variant="default"
                className="w-full bg-[#F54900] hover:bg-orange-700 text-white border-0"
                onClick={onSuspend}
              >
                <Ban className="w-4 h-4 mr-2" />
                Suspend Account
              </Button>
              <Button 
                variant="default"
                className="w-full bg-[#E7000B] hover:bg-red-700 text-white border-0"
                onClick={onDelete}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
              </Button>
            </div>
          </div>

          {/* Statistics */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-base font-semibold text-gray-900 mb-6">Statistics</h3>
            <div className="space-y-6">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Total Revenue</p>
                <p className="text-lg font-semibold text-gray-900">{user.totalRevenue || '€0.00'}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Completed Jobs</p>
                <p className="text-lg font-semibold text-gray-900">{user.completedJobs || 0}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Average Rating</p>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-semibold text-gray-900">{user.avgRating || 0}</p>
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Response Time</p>
                <p className="text-lg font-semibold text-gray-900">{user.responseTime || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Activity & Payments */}
        <div className="lg:col-span-2 space-y-6">
          {/* Activity History */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-base font-semibold text-gray-900 mb-6">Activity History</h3>
            <div className="relative pl-2 space-y-8 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-px before:bg-gray-200">
              {user.activityHistory?.map((activity, index) => (
                <div key={index} className="relative pl-6">
                  <div className="absolute left-0 top-1.5 w-5 h-5 bg-white border-2 border-blue-500 rounded-full z-10 box-content -ml-[3.5px]">
                    <div className="w-2 h-2 bg-blue-500 rounded-full m-1.5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{activity.type}</p>
                    <p className="text-sm text-gray-600 mt-1">{activity.detail}</p>
                    <p className="text-xs text-gray-400 mt-2">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Payments */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-base font-semibold text-gray-900 mb-6">Recent Payments</h3>
            <div className="space-y-4">
              {user.recentPayments?.map((payment, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{payment.service}</p>
                    <p className="text-xs text-gray-500 mt-1">{payment.date}</p>
                  </div>
                  <p className="text-sm font-bold text-emerald-600">{payment.amount}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
