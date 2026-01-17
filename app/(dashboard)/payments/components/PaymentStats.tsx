import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { PaymentStat } from '../types';

interface PaymentStatsProps {
  stats: PaymentStat[];
}

export const PaymentStats: React.FC<PaymentStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="border border-gray-100 shadow-sm overflow-hidden">
          <CardContent className="p-6 relative">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className={`text-xs font-medium ${
                stat.trend === 'down' ? 'text-red-600' : 
                stat.trend === 'neutral' ? 'text-blue-600' : 'text-emerald-600'
              }`}>
                {stat.change}
              </span>
              <span className="text-xs text-gray-400">{stat.subtext}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
