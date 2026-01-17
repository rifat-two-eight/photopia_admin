import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, DollarSign, TrendingUp, Target } from 'lucide-react';
import { AnalyticsStat } from '../types';

interface AnalyticsStatsProps {
  stats: AnalyticsStat[];
}

const getIcon = (iconName?: string) => {
  switch (iconName) {
    case 'calendar': return <Calendar className="w-5 h-5 text-blue-600" />;
    case 'dollar': return <DollarSign className="w-5 h-5 text-emerald-600" />;
    case 'trend': return <TrendingUp className="w-5 h-5 text-purple-600" />;
    case 'target': return <Target className="w-5 h-5 text-orange-600" />;
    default: return null;
  }
};

export const AnalyticsStats: React.FC<AnalyticsStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="border border-gray-100 shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className="p-2 bg-gray-50 rounded-lg">
                {getIcon(stat.icon)}
              </div>
            </div>
            {(stat.change) && (
              <div className="flex items-center gap-2 mt-2">
                <span className={`text-xs font-medium ${stat.positive ? 'text-emerald-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
