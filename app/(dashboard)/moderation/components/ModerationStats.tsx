import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ModerationStat } from '../types';
import { Skeleton } from '@/components/ui/skeleton';

interface ModerationStatsProps {
  stats: ModerationStat[];
  loading?: boolean;
}

export const ModerationStats: React.FC<ModerationStatsProps> = ({ stats, loading }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {loading ? (
        [1, 2, 3, 4].map((i) => (
          <Card key={i} className="border border-gray-100 shadow-sm">
            <CardContent className="p-6">
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-8 w-12" />
            </CardContent>
          </Card>
        ))
      ) : (
        stats.map((stat, index) => (
          <Card key={index} className="border border-gray-100 shadow-sm">
            <CardContent className="p-6">
              <p className="text-sm font-medium text-gray-500 mb-2">{stat.label}</p>
              <p className={`text-3xl font-medium ${stat.color || 'text-gray-900'}`}>
                {stat.value}
              </p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

