import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell
} from 'recharts';

const growthData = [
  { month: 'Jan', Premium: 1000, 'No - Subscription': 150 },
  { month: 'Feb', Premium: 1050, 'No - Subscription': 160 },
  { month: 'Mar', Premium: 1100, 'No - Subscription': 170 },
  { month: 'Apr', Premium: 1200, 'No - Subscription': 180 },
  { month: 'May', Premium: 1250, 'No - Subscription': 190 },
  { month: 'Jun', Premium: 1284, 'No - Subscription': 195 },
];

const revenueData = [
  { name: 'Premium', value: 20544, color: '#8B5CF6' },
  { name: 'No - Subscription', value: 18513, color: '#F59E0B' },
];

export const SubscriptionCharts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Subscriber Growth Chart */}
      <Card className="border border-gray-100 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-gray-900">Subscriber Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }} />
                <Line 
                  name="Premium" 
                  type="monotone" 
                  dataKey="Premium" 
                  stroke="#8B5CF6" 
                  strokeWidth={2} 
                  dot={{ r: 4, fill: '#8B5CF6', strokeWidth: 2, stroke: '#fff' }} 
                />
                <Line 
                  name="No - Subscription" 
                  type="monotone" 
                  dataKey="No - Subscription" 
                  stroke="#F59E0B" 
                  strokeWidth={2} 
                  dot={{ r: 4, fill: '#F59E0B', strokeWidth: 2, stroke: '#fff' }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Distribution Chart */}
      <Card className="border border-gray-100 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-gray-900">Revenue Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revenueData}
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  outerRadius={80}
                  paddingAngle={0}
                  dataKey="value"
                >
                  {revenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => `€${value.toLocaleString()}`}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
             {/* Custom Legend Overlay */}
             <div className="absolute bottom-0 right-0 left-0 flex justify-center gap-6 text-xs text-gray-600">
                {revenueData.map((item) => (
                    <div key={item.name} className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                        <span>{item.name}: €{item.value.toLocaleString()}</span>
                    </div>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
