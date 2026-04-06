import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { MonthData } from '../types';

interface RevenueTrendsChartProps {
  data: MonthData[];
}

const COLORS = ['#F59E0B', '#10B981', '#3B82F6', '#EC4899', '#8B5CF6', '#14B8A6'];

export const RevenueTrendsChart: React.FC<RevenueTrendsChartProps> = ({ data }) => {
  // Get all unique keys except 'month' to render dynamic lines
  const categories = data.length > 0 ? Object.keys(data[0]).filter(key => key !== 'month') : [];

  return (
    <Card className="border border-gray-100 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-gray-900">Revenue Trends by Service</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
                tickFormatter={(value) => `€${value.toLocaleString()}`}
              />
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ fontSize: '12px' }}
                formatter={(value: any) => [`€${value.toLocaleString()}`, 'Revenue']}
              />
              <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }} />

              {categories.map((category, index) => (
                <Line
                  key={category}
                  type="monotone"
                  dataKey={category}
                  stroke={COLORS[index % COLORS.length]}
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 2, fill: COLORS[index % COLORS.length], stroke: '#fff' }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
