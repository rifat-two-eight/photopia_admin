import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ServiceData } from '../types';

interface ServiceBreakdownProps {
  data: ServiceData[];
}

export const ServiceBreakdown: React.FC<ServiceBreakdownProps> = ({ data }) => {
  return (
    <Card className="border border-gray-100 shadow-sm overflow-hidden">
      <CardHeader className="pb-4 border-b border-gray-100 bg-gray-50/30">
        <CardTitle className="text-base font-semibold text-gray-900">Breakdown by Service Type</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="bg-white border-b border-gray-100">
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Service Type</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Bookings</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Avg. Price</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Gross Revenue</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Commission</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Net Revenue</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {data.map((row, index) => (
                        <tr key={index} className="hover:bg-gray-50/50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.type}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{row.bookings}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{row.avgPrice}</td>
                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">{row.grossRevenue}</td>
                            <td className="px-6 py-4 text-sm text-red-500 font-medium">{row.commission}</td>
                            <td className="px-6 py-4 text-sm text-emerald-600 font-medium">{row.netRevenue}</td>
                        </tr>
                    ))}
                    {/* Totals Row */}
                    <tr className="bg-gray-50/50 font-semibold">
                        <td className="px-6 py-4 text-sm text-gray-900">Total</td>
                        <td className="px-6 py-4 text-sm text-gray-900">1623</td>
                        <td className="px-6 py-4 text-sm text-gray-900">-</td>
                        <td className="px-6 py-4 text-sm text-gray-900">€343,140</td>
                        <td className="px-6 py-4 text-sm text-red-600">€14,857</td>
                        <td className="px-6 py-4 text-sm text-emerald-600">€328,283</td>
                    </tr>
                </tbody>
            </table>
        </div>
      </CardContent>
    </Card>
  );
};
