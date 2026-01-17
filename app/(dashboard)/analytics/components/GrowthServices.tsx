import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, ArrowUpRight } from 'lucide-react';
import { GrowthService } from '../types';

interface GrowthServicesProps {
  services: GrowthService[];
}

export const GrowthServices: React.FC<GrowthServicesProps> = ({ services }) => {
  return (
    <Card className="border border-gray-100 shadow-sm h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-500" />
            <CardTitle className="text-base font-semibold text-gray-900">Highest Growth Services</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
         {services.map((service, index) => (
          <div key={index} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50/50 transition-colors">
            <div>
                <p className="text-sm font-medium text-gray-900">{service.name}</p>
                <p className="text-xs text-gray-500">{service.bookings} bookings</p>
            </div>
            <div className="flex items-center gap-1 text-sm font-medium text-emerald-600">
                <ArrowUpRight className="w-4 h-4" />
                {service.growth}
            </div>
          </div>
         ))}
      </CardContent>
    </Card>
  );
};
