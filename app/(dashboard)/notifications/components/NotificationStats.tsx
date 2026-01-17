import React from 'react';
import { User, Flag, CreditCard, Crown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { NotificationStat } from '../types';

interface NotificationStatsProps {
  stats: NotificationStat[];
}

const getIcon = (icon: NotificationStat['icon']) => {
    switch (icon) {
      case 'user': return <User className="w-4 h-4 text-gray-600" />;
      case 'flag': return <Flag className="w-4 h-4 text-red-600" />;
      case 'card': return <CreditCard className="w-4 h-4 text-emerald-600" />;
      case 'crown': return <Crown className="w-4 h-4 text-purple-600" />;
      default: return null;
    }
};

export const NotificationStats: React.FC<NotificationStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
      {stats.map((stat, index) => (
        <Card key={index} className="border border-gray-100 shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
             <div className="bg-gray-50 p-2 rounded-lg">
                {getIcon(stat.icon)}
             </div>
             <div>
                <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
             </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
