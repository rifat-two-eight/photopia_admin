import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Pending', value: 245, color: '#F59E0B' },   // Orange
  { name: 'Confirmed', value: 1623, color: '#10B981' }, // Green
  { name: 'Cancelled', value: 187, color: '#EF4444' },  // Red
  { name: 'Completed', value: 3456, color: '#3B82F6' }, // Blue
];

export const BookingStatusChart = () => {
  return (
    <Card className="border border-gray-100 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-gray-900">Booking Status Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={0}
                outerRadius={100}
                paddingAngle={0}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="#fff" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E5E7EB' }}
                itemStyle={{ fontSize: '12px' }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Custom Labels overlay - simpler approach than SVG text for better responsiveness */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
             {/* Note: In a real app with dynamic data, Recharts 'label' prop on Pie is better. 
                 For this static reproduction to match the image precisely, hardcoding positions via CSS or using specific Label lists is common, 
                 but simple Legend is safer. I'll add a custom legend that looks like the labels in the image. 
             */}
          </div>
          
           {/* Custom Distributed Legend to match image roughly */}
           <div className="absolute top-4 right-4 text-xs font-medium text-emerald-600">Confirmed: 1623 (29%)</div>
           <div className="absolute bottom-4 left-4 text-xs font-medium text-blue-600">Completed: 3456 (63%)</div>
           <div className="absolute top-10 left-1/4 text-xs font-medium text-amber-600">Pending: 245 (4%)</div>
           <div className="absolute bottom-1/3 right-2 text-xs font-medium text-red-600">Cancelled: 187 (3%)</div>
        </div>
      </CardContent>
    </Card>
  );
};
