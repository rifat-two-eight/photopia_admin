import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Subscriber } from '../types';

interface SubscribersTableProps {
  subscribers: Subscriber[];
  onView?: (subscriber: Subscriber) => void;
  onCancel?: (subscriptionId: string) => void;
  onReactivate?: (subscriptionId: string) => void;
}

const normalizeStatus = (status: string) => {
  const value = String(status || '').toLowerCase();
  if (value === 'active' || value === 'trialing') return 'Active';
  if (value === 'cancelled' || value === 'canceled') return 'Cancelled';
  if (value === 'expired' || value === 'past_due' || value === 'unpaid') return 'Expired';
  if (status === 'Active' || status === 'Cancelled' || status === 'Expired') return status;
  return status;
};

const getStatusBadgeStyle = (status: string) => {
  switch (normalizeStatus(status)) {
    case 'Active': return 'bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-50';
    case 'Cancelled': return 'bg-red-50 text-red-700 border-red-100 hover:bg-red-50';
    case 'Expired': return 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-100';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const getPlanBadgeStyle = (plan: string) => {
   if (String(plan).toLowerCase().includes('premium')) return 'bg-purple-50 text-purple-700 border-purple-100 font-medium';
   return 'bg-gray-50 text-gray-700 border-gray-200';
}

const formatDate = (value: string) => {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString();
};

export const SubscribersTable: React.FC<SubscribersTableProps> = ({ 
  subscribers,
  onView,
  onCancel,
  onReactivate
}) => {
  return (
    <Card className="shadow-sm overflow-hidden py-0 border border-gray-100">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="text-left px-6 h-12 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Subscriber
                </th>
                <th className="text-left px-6 h-12 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Plan
                </th>
                <th className="text-left px-6 h-12 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-6 h-12 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Start Date
                </th>
                <th className="text-left px-6 h-12 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Next Billing
                </th>
                <th className="text-left px-6 h-12 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Total Revenue
                </th>
                <th className="text-right px-6 h-12 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {subscribers.map((sub) => {
                const status = normalizeStatus(sub.status);
                return (
                <tr key={sub.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 h-16">
                     <div>
                        <p className="text-sm font-medium text-gray-900">{sub.name}</p>
                        <p className="text-xs text-gray-500">{sub.email}</p>
                     </div>
                  </td>
                  <td className="px-6 h-16">
                    <Badge variant="secondary" className={`border-0 ${getPlanBadgeStyle(sub.plan)}`}>
                      {sub.plan}
                    </Badge>
                  </td>
                  <td className="px-6 h-16">
                    <Badge variant="secondary" className={`font-medium ${getStatusBadgeStyle(status)}`}>
                      {status}
                    </Badge>
                  </td>
                  <td className="px-6 h-16 text-sm text-gray-900">
                    {formatDate(sub.startDate)}
                  </td>
                  <td className="px-6 h-16 text-sm text-gray-900">
                    {formatDate(sub.nextBilling)}
                  </td>
                   <td className="px-6 h-16 text-sm font-medium text-gray-900">
                    {typeof sub.totalRevenue === 'number'
                      ? `€${sub.totalRevenue.toLocaleString()}`
                      : sub.totalRevenue}
                  </td>
                  <td className="px-6 h-16 text-right">
                    <div className="flex justify-end gap-2">
                        <Button
                            size="sm"
                            className="bg-[#1C1C1E] hover:bg-gray-800 text-white h-7 text-xs px-3"
                            onClick={() => onView?.(sub)}
                        >
                            View
                        </Button>
                         <Button
                            size="sm"
                            variant="outline"
                            className="bg-white hover:bg-gray-50 text-gray-700 border-gray-200 h-7 text-xs px-3"
                            onClick={() => status === 'Cancelled' ? onReactivate?.(sub.id) : onCancel?.(sub.id)}
                        >
                            {status === 'Cancelled' ? 'Reactivate' : 'Cancel'}
                        </Button>
                    </div>
                  </td>
                </tr>
              )})}
              {subscribers.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                    No subscribers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
