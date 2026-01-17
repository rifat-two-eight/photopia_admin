import React from 'react';
import { Crown, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SubscriptionPlan } from '../types';

interface PlanCardProps {
  plan: SubscriptionPlan;
  onEdit: (plan: SubscriptionPlan) => void;
}

export const PlanCard: React.FC<PlanCardProps> = ({ plan, onEdit }) => {
  return (
    <Card className="border border-gray-100 shadow-sm relative overflow-hidden">
      <CardContent className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
             <Crown className="w-8 h-8 text-black" strokeWidth={1.5} />
             <div>
                <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-gray-900">€{plan.price}</span>
                    <span className="text-xs text-gray-500">/month</span>
                </div>
             </div>
          </div>
          <Button 
            onClick={() => onEdit(plan)}
            className="bg-[#1C1C1E] hover:bg-gray-800 text-white shadow-sm"
          >
            Edit Plan
          </Button>
        </div>

        <div className="space-y-4 mb-8">
            <p className="text-sm font-medium text-gray-700">Features:</p>
            <ul className="space-y-2">
                {plan.features.map((feature) => (
                    <li key={feature.id} className="flex items-start gap-2 text-sm text-gray-600">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400 mt-0.5" />
                        <span>{feature.text}</span>
                    </li>
                ))}
            </ul>
        </div>

        <div className="flex gap-12 pt-6 border-t border-gray-100">
            <div>
                <p className="text-xs text-gray-500 mb-1">Subscribers</p>
                <p className="text-xl font-bold text-gray-900">{plan.stats.subscribers}</p>
            </div>
            <div>
                <p className="text-xs text-gray-500 mb-1">Monthly Revenue</p>
                <p className="text-xl font-bold text-gray-900">€{plan.stats.monthlyRevenue.toLocaleString()}</p>
            </div>
        </div>
      </CardContent>
    </Card>
  );
};
