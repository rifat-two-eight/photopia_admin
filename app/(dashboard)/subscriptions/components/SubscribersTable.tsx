import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Subscriber, SubscriptionStatus } from '../types';

interface SubscribersTableProps {
  subscribers: Subscriber[];
}

const getStatusBadgeStyle = (status: SubscriptionStatus) => {
  switch (status) {
    case 'Active': return 'bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-50';
    case 'Cancelled': return 'bg-red-50 text-red-700 border-red-100 hover:bg-red-50';
    case 'Expired': return 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-100';
    default: return '';
  }
};

const getPlanBadgeStyle = (plan: Subscriber['plan']) => {
   if (plan === 'Premium') return 'bg-purple-50 text-purple-700 border-purple-100 font-medium';
   return 'bg-gray-50 text-gray-700 border-gray-200';
}

export const SubscribersTable: React.FC<SubscribersTableProps> = ({ subscribers }) => {
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
              {subscribers.map((sub) => (
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
                    <Badge variant="secondary" className={`font-medium ${getStatusBadgeStyle(sub.status)}`}>
                      {sub.status}
                    </Badge>
                  </td>
                  <td className="px-6 h-16 text-sm text-gray-900">
                    {sub.startDate}
                  </td>
                  <td className="px-6 h-16 text-sm text-gray-900">
                    {sub.nextBilling}
                  </td>
                   <td className="px-6 h-16 text-sm font-medium text-gray-900">
                    {sub.totalRevenue}
                  </td>
                  <td className="px-6 h-16 text-right">
                    <div className="flex justify-end gap-2">
                        <Button
                            size="sm"
                            className="bg-[#1C1C1E] hover:bg-gray-800 text-white h-7 text-xs px-3"
                        >
                            View
                        </Button>
                         <Button
                            size="sm"
                            variant="outline"
                            className="bg-white hover:bg-gray-50 text-gray-700 border-gray-200 h-7 text-xs px-3"
                        >
                            {sub.status === 'Cancelled' ? 'Reactivate' : 'Cancel'}
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
