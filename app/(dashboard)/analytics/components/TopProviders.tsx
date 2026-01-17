import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Crown, Star } from 'lucide-react';
import { ProviderPerformance } from '../types';

interface TopProvidersProps {
  providers: ProviderPerformance[];
}

export const TopProviders: React.FC<TopProvidersProps> = ({ providers }) => {
  return (
    <Card className="border border-gray-100 shadow-sm h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-amber-400 fill-amber-400" />
            <CardTitle className="text-base font-semibold text-gray-900">Top Performing Providers</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {providers.map((provider) => (
          <div key={provider.rank} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                ${provider.rank === 1 ? 'bg-amber-100 text-amber-700' : 
                  provider.rank === 2 ? 'bg-gray-100 text-gray-700' :
                  provider.rank === 3 ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-600'
                }`}>
                #{provider.rank}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{provider.name}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{provider.bookings} bookings</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5">
                        {provider.rating} <Star className="w-3 h-3 fill-gray-400 text-gray-400" />
                    </span>
                </div>
              </div>
            </div>
            <div className="text-sm font-medium text-emerald-600">
              {provider.earnings}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
