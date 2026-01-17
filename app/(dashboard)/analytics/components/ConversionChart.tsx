import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const data = [
  { month: 'Jan', bookings: 12000, views: 1000, rate: 10 },
  { month: 'Feb', bookings: 12500, views: 1200, rate: 10.5 },
  { month: 'Mar', bookings: 13800, views: 1300, rate: 11 },
  { month: 'Apr', bookings: 15000, views: 1500, rate: 11.5 },
  { month: 'May', bookings: 16500, views: 1800, rate: 12 },
  { month: 'Jun', bookings: 18500, views: 2405, rate: 13 },
];

export const ConversionChart = () => {
  return (
    <div className="space-y-6">
        <Card className="border border-gray-100 shadow-sm">
            <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold text-gray-900">Profile-to-Booking Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                            <YAxis 
                              yAxisId="left" 
                              axisLine={{ stroke: '#3B82F6' }} 
                              tickLine={{ stroke: '#3B82F6' }} 
                              tick={{ fontSize: 12, fill: '#3B82F6' }} 
                            />
                            <YAxis 
                              yAxisId="right" 
                              orientation="right" 
                              axisLine={{ stroke: '#10B981' }} 
                              tickLine={{ stroke: '#10B981' }} 
                              tick={{ fontSize: 12, fill: '#10B981' }} 
                              domain={[0, 16]} 
                            />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                itemStyle={{ fontSize: '12px' }}
                            />
                            <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="square" />
                            <Bar yAxisId="left" dataKey="bookings" name="Profile Views" fill="#3B82F6" barSize={40} />
                            <Bar yAxisId="left" dataKey="views" name="Bookings" fill="#10B981" barSize={40} />
                            <Line yAxisId="right" type="monotone" dataKey="rate" name="Conversion Rate %" stroke="#F59E0B" strokeWidth={2} dot={{ r: 4, strokeWidth: 2, fill: '#F59E0B', stroke: '#fff' }} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>

        {/* Summary Statistics below chart */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-blue-50/50 border-blue-100 border shadow-sm">
                <CardContent className="p-6 text-center">
                    <p className="text-sm font-medium text-gray-500 mb-1">Total Profile Views</p>
                    <p className="text-2xl font-bold text-blue-600">18,500</p>
                </CardContent>
            </Card>
            <Card className="bg-green-50/50 border-green-100 border shadow-sm">
                <CardContent className="p-6 text-center">
                    <p className="text-sm font-medium text-gray-500 mb-1">Total Bookings</p>
                    <p className="text-2xl font-bold text-green-600">2,405</p>
                </CardContent>
            </Card>
            <Card className="bg-orange-50/50 border-orange-100 border shadow-sm">
                <CardContent className="p-6 text-center">
                    <p className="text-sm font-medium text-gray-500 mb-1">Conversion Rate</p>
                    <p className="text-2xl font-bold text-orange-600">13%</p>
                </CardContent>
            </Card>
        </div>
    </div>
  );
};
