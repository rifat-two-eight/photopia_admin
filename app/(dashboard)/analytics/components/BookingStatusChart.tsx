import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { BookingStatus } from '../types';

interface BookingStatusChartProps {
  data: BookingStatus[];
}

const COLORS = ['#F59E0B', '#10B981', '#EF4444', '#3B82F6', '#8B5CF6', '#EC4899'];

export const BookingStatusChart: React.FC<BookingStatusChartProps> = ({ data = [] }) => {
  const chartData = (data || []).map((item, index) => ({
    name: item.status,
    value: item.count,
    color: COLORS[index % COLORS.length],
    percentage: item.percentage
  }));

  // booking

  return (
    <Card className="border border-gray-100 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-gray-900">Booking Status Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="#fff" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E5E7EB' }}
                itemStyle={{ fontSize: '12px' }}
                formatter={(value: any, name: any, props: any) => [`${value} (${props.payload.percentage}%)`, name]}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="text-center">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Total</p>
              <p className="text-xl font-bold text-gray-900">
                {data?.reduce((acc, curr) => acc + curr.count, 0) || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-6 pt-4 border-t border-gray-50">
          {chartData.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
              <span className="text-xs font-medium text-gray-600 truncate">
                {item.name}: {item.value} ({item.percentage}%)
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
