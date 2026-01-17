import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { MonthData } from '../types';

interface RevenueTrendsChartProps {
    data: MonthData[];
}

export const RevenueTrendsChart: React.FC<RevenueTrendsChartProps> = ({ data }) => {
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
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ fontSize: '12px' }}
              />
              <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }} />
              
              <Line type="monotone" dataKey="Commercial" stroke="#F59E0B" strokeWidth={2} dot={{ r: 4, strokeWidth: 2, fill: '#F59E0B', stroke: '#fff' }} />
              <Line type="monotone" dataKey="Event" stroke="#10B981" strokeWidth={2} dot={{ r: 4, strokeWidth: 2, fill: '#10B981', stroke: '#fff' }} />
              <Line type="monotone" dataKey="Portrait" stroke="#3B82F6" strokeWidth={2} dot={{ r: 4, strokeWidth: 2, fill: '#3B82F6', stroke: '#fff' }} />
              <Line type="monotone" dataKey="Wedding" stroke="#EC4899" strokeWidth={2} dot={{ r: 4, strokeWidth: 2, fill: '#EC4899', stroke: '#fff' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
