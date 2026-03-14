import React from 'react';
import { 
  AlertTriangle, Ban, Phone, MapPin, Calendar, Star, ArrowLeft, Trash2, CheckCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserDetailStats } from '../types';

interface UserDetailProps {
  user: UserDetailStats | null;
  onBack: () => void;
  onWarn?: () => void;
  onSuspend?: () => void;
  onDelete?: () => void;
}

const getImageUrl = (path: string | undefined) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.replace('/api/v1', '') || '';
  return `${baseUrl}${path}`;
};

export const UserDetail: React.FC<UserDetailProps> = ({ 
  user, 
  onBack,
  onWarn,
  onSuspend,
  onDelete
}) => {
  if (!user || !user.user) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-sm text-center">
        <p className="text-gray-500">User data not found</p>
        <Button variant="ghost" onClick={onBack} className="mt-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
      </div>
    );
  }

  const { user: userInfo, statistics, activityHistory, recentPayments } = user;

  const getStatusBadgeClass = (status: string | undefined) => {
    const statuses: Record<string, string> = {
      'active': 'bg-green-100 text-green-700 hover:bg-green-100 border-green-200',
      'inactive': 'bg-gray-100 text-gray-700 hover:bg-gray-100 border-gray-200',
      'suspended': 'bg-red-100 text-red-700 hover:bg-red-100 border-red-200'
    };
    return statuses[status || 'inactive'] || 'bg-gray-100 text-gray-700 hover:bg-gray-100 border-gray-200';
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
                <AvatarImage src={getImageUrl(userInfo?.profile)} />
                <AvatarFallback className="bg-emerald-50 text-emerald-600 text-2xl font-semibold">
                  {userInfo?.name?.charAt(0) || '?'}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold text-gray-900">{userInfo?.name || 'N/A'}</h2>
              <p className="text-sm text-gray-500 mb-4">{userInfo?.email || 'N/A'}</p>
              <Badge variant="secondary" className={`font-normal px-4 py-1 ${getStatusBadgeClass(userInfo?.status)}`}>
                {userInfo?.status || 'inactive'}
              </Badge>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Phone className="w-4 h-4 text-gray-400" />
                <span>{userInfo?.phone || 'No phone provided'}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="truncate">{userInfo?.address && userInfo?.address !== ',' ? userInfo.address : 'No address provided'}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>Joined {userInfo?.joinedDate ? new Date(userInfo.joinedDate).toLocaleDateString() : 'N/A'}</span>
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
                className={`w-full ${userInfo?.status === 'active' ? 'bg-[#F54900] hover:bg-orange-700' : 'bg-emerald-600 hover:bg-emerald-700'} text-white border-0`}
                onClick={onSuspend}
              >
                {userInfo?.status === 'active' ? (
                  <>
                    <Ban className="w-4 h-4 mr-2" />
                    Suspend Account
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Activate Account
                  </>
                )}
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
                <p className="text-lg font-semibold text-gray-900">€{statistics?.totalRevenue?.toLocaleString() || '0'}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Completed Jobs</p>
                <p className="text-lg font-semibold text-gray-900">{statistics?.completedJobs || 0}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Average Rating</p>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-semibold text-gray-900">{statistics?.averageRating?.toFixed(1) || '0.0'}</p>
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Response Time</p>
                <p className="text-lg font-semibold text-gray-900">{statistics?.responseTime || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Activity & Payments */}
        <div className="lg:col-span-2 space-y-6">
          {/* Activity History */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-base font-semibold text-gray-900 mb-6">Activity History</h3>
            {activityHistory && activityHistory.length > 0 ? (
              <div className="relative pl-2 space-y-8 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-px before:bg-gray-200">
                {activityHistory.map((activity, index) => (
                  <div key={index} className="relative pl-6">
                    <div className="absolute left-0 top-1.5 w-5 h-5 bg-white border-2 border-blue-500 rounded-full z-10 box-content -ml-[3.5px]">
                      <div className="w-2 h-2 bg-blue-500 rounded-full m-1.5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{activity.type?.replace('_', ' ') || 'Notification'}</p>
                      <p className="text-sm text-gray-600 mt-1">{activity.message || 'No message'}</p>
                      <p className="text-xs text-gray-400 mt-2">{activity.timestamp ? new Date(activity.timestamp).toLocaleString() : 'N/A'}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-gray-500 border-2 border-dashed border-gray-100 rounded-lg">
                No activity history found
              </div>
            )}
          </div>

          {/* Recent Payments */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-base font-semibold text-gray-900 mb-6">Recent Payments</h3>
            {recentPayments && recentPayments.length > 0 ? (
              <div className="space-y-4">
                {recentPayments.map((payment, index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{payment.service || 'Unknown Service'}</p>
                      <p className="text-xs text-gray-500 mt-1">{payment.date ? new Date(payment.date).toLocaleDateString() : 'No date'}</p>
                    </div>
                    <p className="text-sm font-bold text-emerald-600">{payment.amount || '€0.00'}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-gray-500 border-2 border-dashed border-gray-100 rounded-lg">
                No recent payments found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
