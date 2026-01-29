"use client"
import React, { useState } from 'react';
import { SubscriptionStats } from './components/SubscriptionStats';
import { SubscriptionCharts } from './components/SubscriptionCharts';
import { PlanCard } from './components/PlanCard';
import { SubscriptionFilters } from './components/SubscriptionFilters';
import { SubscribersTable } from './components/SubscribersTable';
import { EditPlanForm } from './components/EditPlanForm';
import { SubscriptionStat, SubscriptionPlan, Subscriber } from './types';
import LocationSelector from "@/components/dashboard/LocationSelector";

const SubscriptionsPage = () => {
  const [isEditingPlan, setIsEditingPlan] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const stats: SubscriptionStat[] = [
    { label: 'Total Provider', value: '1471', change: '+15.2%', subtext: 'this month', icon: 'users', count: '1471' },
    { label: 'Monthly Revenue', value: '€39,057', change: '+8.7%', subtext: 'this month', icon: 'dollar' },
    { label: 'Premium Subscribers', value: '1,284', subtext: '€16/month each', icon: 'crown', change: '' }, // Special styling handled in component
    { label: 'No Subscribers', value: '187', icon: 'store' }
  ];

  const plan: SubscriptionPlan = {
    id: 'premium-plan',
    name: 'Photopia Premium',
    price: 16,
    features: [
        { id: '1', text: 'Priority in search results' },
        { id: '2', text: 'Extended analytics' },
        { id: '3', text: 'Remove platform branding' },
        { id: '4', text: 'Advanced booking tools' },
        { id: '5', text: 'Priority customer support' },
    ],
    stats: {
        subscribers: 1284,
        monthlyRevenue: 20544
    }
  };

  const subscribers: Subscriber[] = [
    { id: '1', name: 'Sarah Johnson', email: 'sarah.j@example.com', plan: 'Premium', status: 'Active', startDate: '2024-06-15', nextBilling: '2025-01-15', totalRevenue: '€144' },
    { id: '2', name: 'Michael Chen', email: 'michael.c@example.com', plan: 'Premium', status: 'Active', startDate: '2024-08-01', nextBilling: '2025-01-01', totalRevenue: '€495' },
    { id: '3', name: 'Emma Wilson', email: 'emma.w@example.com', plan: 'Premium', status: 'Active', startDate: '2024-09-10', nextBilling: '2025-01-10', totalRevenue: '€64' },
    { id: '4', name: 'James Rodriguez', email: 'james.r@example.com', plan: 'Premium', status: 'Cancelled', startDate: '2024-07-05', nextBilling: 'N/A', totalRevenue: '€594' },
    { id: '5', name: 'Lisa Anderson', email: 'lisa.a@example.com', plan: 'Premium', status: 'Active', startDate: '2024-11-01', nextBilling: '2025-01-01', totalRevenue: '€32' },
  ];

  if (isEditingPlan) {
    return (
        <EditPlanForm 
            plan={plan} 
            onBack={() => setIsEditingPlan(false)}
            onSave={(updated) => {
                console.log('Saved:', updated);
                setIsEditingPlan(false);
            }}
        />
    );
  }

  return (
    <div className="space-y-6 bg-white -my-3 p-5 lg:p-10 rounded-xl shadow-md">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-5">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 -mt-4">Subscription Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage Premium and Studio subscriptions
          </p>
        </div>
        <div className="mb-1">
          <LocationSelector />
        </div>
      </div>

      <SubscriptionStats stats={stats} />
      <SubscriptionCharts />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <PlanCard plan={plan} onEdit={() => setIsEditingPlan(true)} />
         {/* Placeholder for potential other plans or info, kept empty or could duplicate plan structure if there were multiple */}
      </div>

      <div className="space-y-4">
        <SubscriptionFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        
        <SubscribersTable subscribers={subscribers} />
      </div>
    </div>
  );
};

export default SubscriptionsPage;
