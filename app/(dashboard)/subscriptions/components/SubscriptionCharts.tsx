import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell
} from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';

interface SubscriptionChartsProps {
  loading?: boolean;
  growthData?: {
    months: string[];
    premium: number[];
    noSubscription: number[];
  };
  revenueDistribution?: {
    premium: number;
    noSubscription: number;
  };
}

export const SubscriptionCharts: React.FC<SubscriptionChartsProps> = ({ 
  loading, 
  growthData, 
  revenueDistribution 
}) => {
  // Transform parallel arrays to Recharts format
  const transformedGrowthData = growthData?.months.map((month, i) => ({
    month,
    Premium: growthData.premium[i],
    'No - Subscription': growthData.noSubscription[i],
  })) || [];

  const transformedRevenueData = [
    { name: 'Premium', value: revenueDistribution?.premium || 0, color: '#8B5CF6' },
    { name: 'No - Subscription', value: revenueDistribution?.noSubscription || 0, color: '#F59E0B' },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <Card key={i} className="border border-gray-100 shadow-sm">
            <CardHeader className="pb-2">
              <Skeleton className="h-5 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[250px] w-full rounded-lg" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

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
              <LineChart data={transformedGrowthData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
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
                  data={transformedRevenueData}
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  outerRadius={80}
                  paddingAngle={0}
                  dataKey="value"
                >
                  {transformedRevenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: any) => `€${Number(value).toLocaleString()}`}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
             {/* Custom Legend Overlay */}
             <div className="absolute bottom-0 right-0 left-0 flex justify-center gap-6 text-xs text-gray-600">
                {transformedRevenueData.map((item) => (
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

