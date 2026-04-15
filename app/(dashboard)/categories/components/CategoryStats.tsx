import React from 'react';
import { Card } from '@/components/ui/card';
import { Layers, FolderTree, Tag, CheckCircle2 } from 'lucide-react';

interface Stat {
  label: string;
  value: string | number;
  highlight?: boolean;
}

interface CategoryStatsProps {
  stats: Stat[];
}

export const CategoryStats = ({ stats }: CategoryStatsProps) => {
  const getIcon = (label: string) => {
    switch (label.toLowerCase()) {
      case 'total themes':
        return <Layers className="w-5 h-5 text-blue-500" />;
      case 'total categories':
        return <FolderTree className="w-5 h-5 text-purple-500" />;
      case 'total subcategories':
        return <Tag className="w-5 h-5 text-orange-500" />;
      case 'active items':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      default:
        return <Layers className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className={`p-4 border-none shadow-sm bg-gray-50/50 hover:bg-gray-100/50 transition-colors ${stat.highlight ? 'ring-1 ring-primary/20 bg-primary/5' : ''}`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-white shadow-sm`}>
              {getIcon(stat.label)}
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-xl font-bold text-gray-900 mt-0.5">{stat.value}</h3>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
