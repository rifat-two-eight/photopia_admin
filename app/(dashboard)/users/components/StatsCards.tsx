import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Stat } from '../types';

interface StatsCardsProps {
  stats: Stat[];
}

export const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="border border-gray-100 shadow-sm">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.highlight ? 'text-red-500' : 'text-gray-900'}`}>
              {stat.value}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
