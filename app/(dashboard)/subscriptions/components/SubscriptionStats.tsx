import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, DollarSign, Crown, Store } from 'lucide-react';

interface SubscriptionStat {
  label: string;
  value: string;
  change?: string;
  subtext?: string;
  icon: 'users' | 'dollar' | 'crown' | 'store';
}

interface SubscriptionStatsProps {
  stats: SubscriptionStat[];
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'users': return <Users className="w-5 h-5 text-blue-500" />;
    case 'dollar': return <DollarSign className="w-5 h-5 text-emerald-500" />;
    case 'crown': return <Crown className="w-5 h-5 text-purple-500" />;
    case 'store': return <Store className="w-5 h-5 text-amber-500" />;
    default: return null;
  }
};

export const SubscriptionStats: React.FC<SubscriptionStatsProps> = ({ stats }) => {
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
            {(stat.change || stat.subtext) && (
              <div className="flex items-center gap-2 mt-2">
                {stat.change && (
                  <span className="text-xs font-medium text-emerald-600">
                    {stat.change}
                  </span>
                )}
                {stat.subtext && (
                  <span className={`text-xs ${stat.change ? 'text-gray-400' : 'text-purple-600 font-medium'}`}>
                    {stat.subtext}
                  </span>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
